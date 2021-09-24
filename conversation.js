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

const answers = {
        'follar': [
            "follar? un poco rapido vas tu!"
            ],
        'jaja': [
            "tienes una risa bonita",
            "me caes bien, me gusta que me hagan reir",
            ],
        'años': [
            "41", "32", "35 y medio",
            ],
        'edad': [
            "41", "33", "37 y medio",
            ],
        'donde': [
            "de madrid, y tu?"
            ],
        'adios': [
            "hasta pronto, majo", "chau"
            ],
        'skype': [
            'mi cuenta de skype... prefiero no dartela aun, tu tienes?',
            'y para que quieres skype',
            ],
        'hola': [
            'holi',
            'saludos!',
            ],
        '?': [
            "menuda pregunta",
            "pues no se si contestar",
            "respondeme tu primero, jiji",
            "no lo se",
            "tu que crees?",
            ],
}


class SubConversation extends EventEmitter {
    constructor(exitCue, exitSentence, sentences, answers) {
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
        let reply = false
        if (this.exitCue.test(message)) {
            this.emit('reply', this.exitSentence)
            this.emit('success')
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
        this.emit('reply', reply)
    }

}

const intro = new SubConversation(
    /hdsfhdslfhsd/,
    "ok, soy de málaga",
    [
        ["como estas?", "dime"],
        ["de donde?", "eres de españa?"],
    ],
    {
        'bot': [
            'el que parece un bot eres tú, con esas preguntas...',
            ],
        'hola': [
            'holi',
            'hola!',
            ],
        '?': [
            "a ver, quiero yo tambien saber cosas de ti",
            "te voy a hacer una pregunta yo",
            "a ver...",
            ],
    } 
)

const ageRetrieval = new SubConversation(
    /\d{2}/,
    "yo tengo 34",
    [
        ["cuantos años tienes?", "edad?"],
        ["eres maduro?", "primero dime tu edad"],
        "pero cómo de mayor eres?",
        "no se que quieres decir"
    ],
    {
        'bot': [
            'el que parece un bot eres tú, con esas preguntas...',
            ],
        'hola': [
            'holi',
            'saludos!',
            ],
        '?': [
            "yo tengo 33",
            "yo tengo más de 35 y menos de 40 ;-)",
        ],
    } 
)

const telegramSuccess = new SubConversation(
    /dshfkdshfls/,
    "un besito de tu amiga bot",
    [
        "vale, creo que te voy a dar mi telegram, te lo has ganado",
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
    {
        'bot': [
            'si, mi creador te manda saludos atentos',
            ],
    } 
)

const telegramRetrieval = new SubConversation(
    /\@[a-z0-9]*/,
    "sabes? me caes bien",
    [
        "me gustaria oir tu voz",
        ["tienes telegram o skype?", "ayer me instale telegram, esta super bien"],
        ["bueno, y qué propones entonces?", "vaya"],
    ],
    {
        'telegram': [
            'ok, dime tu usuario, con la @',
            'vale, dame tu usuario con la @',
            ],
        'skype': [
            'prefiero telegram, mi usuario es gatitaGallega',
            'skype no me gusta nada, tienes telegram?',
            ],
        'usuario': [
            'te paso mi usuario de telegram?',
            'quieres buscarme en telegram o skype?',
            ],
        '?': [
            "antes de contestar, me gustaría comprobar cómo eres",
            "quiero primero que nos oigamos, para ver que eres real",
        ],
    } 
)

const borde = new SubConversation(
    /joder|mierda/,
    "hasta nunca, déjame en paz",
    [
        ["crees que esta mierda de conversacion me interesa?", "eres un mierda, jajaja"],
        "qué cojones te pasa?",
        "eres un poco tonto, no?",
        "te mola perder el tiempo en el chat?",
    ],
    {
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
)


class Conversation {
    constructor(name, client) {
        this.name = name
        this.client = client
        this.count = 0
        this.conversation = []
        this.timeout
        this.timeoutCount = 0

        intro.successNextSubConv = ageRetrieval
        intro.failNextSubConv = ageRetrieval
        ageRetrieval.successNextSubConv = telegramRetrieval
        ageRetrieval.failNextSubConv = telegramRetrieval

        telegramRetrieval.successNextSubConv = telegramSuccess
        telegramRetrieval.failNextSubConv = borde

        this.setNewSubConv(intro)
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
                console.log(">>> End of conversation")
            }
        })
        this.currentSubConv.on('fail', () => {
            if (this.currentSubConv.failNextSubConv) {
                this.setNewSubConv(this.currentSubConv.failNextSubConv)
            } else {
                console.log(">>> End of conversation")
            }
        })
    }

    incoming(message) {
        this.currentSubConv.incoming(message)
        console.log(this.name+ ' > ' + message);
        clearTimeout(this.timeout)

        if (this.timeoutCount < 2) {
            this.timeout = setTimeout(() => {
                const reply = pickOne(timeout)
                this.timeoutCount ++
                console.log(`${this.name} < ${reply}`)
                this.client.say(this.name, reply)
            }, 12000)
        }
    }

    dump() {
        return this.conversation.join("/n")
    }
}

module.exports = Conversation
