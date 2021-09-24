const EventEmitter = require('events');

const pickOne = function (arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

const timeout = [
    "no me dices nada?",
    "sigues ahi?",
    "que muermo",
    "hola?"
]

class SubConversation extends EventEmitter {
    constructor({exitCue, exitSentence, sentences, answers}) {
        super()
        this.exitCue = exitCue
        this.exitSentence = exitSentence
        this.answers = answers
        this.sentences = sentences
        this.count = 0
        this.successNextSubConv = null
        this.failNextSubConv = null
    }

    incoming(message) {
        let reply = ''
        const delay = parseInt(Math.random() * 5000 + 5000)
        if (this.exitCue.test(message)) {
            setTimeout(() => {
                this.emit('reply', this.exitSentence)
                this.emit('success')
            }, delay + 5000)
            return
        }
        for (let cue in this.answers) {
            if (message.toLowerCase().includes(cue)) {
                reply = pickOne(this.answers[cue])
                break
            }
        }
        if (!reply) {
            reply = this.sentences[this.count]
            if (Array.isArray(reply)) {
                reply = pickOne(reply)
            }
            this.count++
            if (this.count >= this.sentences.length) {
                this.emit('fail')
            }
        }
        const replies = reply ? reply.split('|') : "no se..."
        replies.forEach((rep, index) => {
            setTimeout(() => {
                this.emit('reply', replies[index])
            }, delay + index * 2000)
        })

    }

}

const intro = {
    exitCue: /donde\ eres/,
    exitSentence: "ok, soy de madrid",
    sentences: [
        ["como estas?", "te conozco?|dime", "perdona, tengo muchos privados|cuanta gente", "jo|cuantos privados!"],
        ["de donde?", "eres de españa?"],
        ["soy nueva", "es la primera vez que entro a este chat"],
    ],
    answers: {
        'bot': [
            'el que parece un bot eres tú, con esas preguntas...',
            ],
        'noches': [
            'buenas noches a ti tambien',
            'una noche un poco solitaria|hay mucho pesado suelto',
            ],
        'nick': [
            'te gusta?|se me ocurrio mirandome al espejo',
            'a mi tu nick tambien me hace gracia :-)'
            ],
        'sexo': [
            'un poco deprisa vas tu, no?',
            ],
        'hola': [
            'holi',
            'hola!|que cuentas?',
            ],
        '?': [
            "hoy un poco sola...",
            "jaja|también quiero yo|saber cosas de ti",
            "te puedo preguntar?|es facil! jajaja",
            "no se que decirte, qué buscas?",
            ],
    } 
}

const ageRetrieval = {
    exitCue: /\d{2}/,
    exitSentence: "yo tengo 34",
    sentences: [
        ["cuantos años tienes?", "edad?"],
        ["eres maduro?", "primero dime tu edad"],
        "pero cómo de mayor eres?",
        "no se que quieres decir"
    ],
    answers: {
        'bot': [
            'el que parece un bot eres tú |con esas preguntas...',
            ],
        'hola': [
            'holi',
            'saludos!',
            ],
        '?': [
            "bueno... te digo mi edad",
            "te digo los que tengo, pero no te asustes!",
        ],
    } 
}

const telegramSuccess = {
    exitCue: /dshfkdshfls/,
    exitSentence: "un besito de tu amiga bot",
    sentences: [
        "vale, creo que te voy a dar mi telegram|te lo has ganado",
        "estás listo? te voy a añadir",
        [
            "tienes ganas de subir el tono?",
            "donde estas ahora msmo?",
        ],
        [
            "mmm, dime que me harias",
            "sabes que empiezo a estar caliente?",
            "quieres saber que zona tengo calentita?",
        ],
        "@soyunbot, te estoy agregando",
    ],
    answers: {
        'bot': [
            'si, mi creador te manda saludos cordiales',
            ],
    } 
}

const telegramRetrieval = {
    exitCue: /\@[a-z0-9]*/,
    exitSentence: "sabes? me caes bien",
    sentences: [
        "me gustaria oir tu voz",
        ["tienes telegram o skype?", "ayer me instale telegram|esta super bien"],
        ["bueno, y qué propones entonces?", "vaya"],
    ],
    answers: {
        'telegram': [
            'ok, dime tu usuario, con la @',
            'vale, dame tu usuario|con la @',
            ],
        'skype': [
            'prefiero telegram|mi usuario es gatitaGallega|pon el simbolo ese @ antes',
            'skype no me gusta nada|tienes telegram?',
            ],
        'usuario': [
            'te paso mi usuario de telegram?',
            'quieres buscarme en telegram o skype?',
            ],
        '?': [
            "antes de contestar|me gustaría comprobar cómo eres",
            "quiero primero que nos oigamos|para ver que eres real|vale?",
        ],
    } 
}

const borde = {
    exitCue: /joder|mierda/,
    exitSentence: "hasta nunca, déjame en paz",
    sentences: [
        ["crees que esta mierda de conversacion me interesa?", "eres un mierda, jajaja"],
        "qué cojones te pasa?",
        "eres un poco tonto, no?",
        "te mola perder el tiempo en el chat?",
    ],
    answers: {
        'puta': [
            'menudos modales tienes',
            'vaya, y además faltón',
            ],
        'zorra': [
            'zorra que cuida de las gallinitas como tu',
            ],
        '?': [
            "aqui las preguntas las hago yo",
            "no te voy a contestar",
        ],
    } 
}

class Conversation {
    constructor(name, client) {
        this.name = name
        this.client = client
        this.count = 0
        this.conversation = []
        this.timeout
        this.timeoutCount = 0

        this.intro = new SubConversation(intro)
        this.ageRetrieval = new SubConversation(ageRetrieval)
        this.telegramRetrieval = new SubConversation(telegramRetrieval)
        this.telegramSuccess = new SubConversation(telegramSuccess)
        this.borde = new SubConversation(borde)

        this.intro.successNextSubConv = this.ageRetrieval
        this.intro.failNextSubConv = this.ageRetrieval
        this.ageRetrieval.successNextSubConv = this.telegramRetrieval
        this.ageRetrieval.failNextSubConv = this.telegramRetrieval

        this.telegramRetrieval.successNextSubConv = this.telegramSuccess
        this.telegramRetrieval.failNextSubConv = this.borde

        this.setNewSubConv(this.intro)
    }

    setNewSubConv(subConv) {
        this.currentSubConv = subConv
        this.currentSubConv.on('reply', reply => {
            console.log(`${this.name} < ${reply}`)
            this.client.say(this.name, reply)
        })
        this.currentSubConv.on('success', () => {
            if (this.currentSubConv.successNextSubConv) {
                this.setNewSubConv(this.currentSubConv.successNextSubConv)
            } else {
                console.log(">>> End of conversation for " + this.name)
            }
        })
        this.currentSubConv.on('fail', () => {
            if (this.currentSubConv.failNextSubConv) {
                this.setNewSubConv(this.currentSubConv.failNextSubConv)
            } else {
                console.log(">>> End of conversation" + this.name)
            }
        })
    }

    incoming(message) {
        this.currentSubConv.incoming(message)
        console.log(this.name + ' > ' + message);
        clearTimeout(this.timeout)

        if (this.timeoutCount < 2) {
            this.timeout = setTimeout(() => {
                const reply = pickOne(timeout)
                this.timeoutCount ++
                console.log(`${this.name} < ${reply}`)
                this.client.say(this.name, reply)
            }, 120000)
        }
    }

    dump() {
        return this.conversation.join("/n")
    }
}

module.exports = Conversation
