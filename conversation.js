const pickOne = function (arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

const timeout = [
    "no me dices nada?",
    "sigues ahi?",
    "hola?"
]

const script = [
    ["como estas?", "dime"],
    ["de donde?", "eres de españa?"],
    ["hemos hablado antes?", "que tal?"],
    ["lo siento, menudo dia he tenido", "no es un poco tarde para ti?"],
    "edad?",
    "no se... dime tu",
    "como eres, fisicamente me refiero",
    "jejeje",
    "y que me cuentas?",
    "crees en el zodiaco?",
    ["jiji", "jajaj"],
    "aja",
    ["que buscas", "a ver... no termino de endender que buscas"],
    "jijiji",
    "tienes ganas de subir el tono?",
    "donde estas ahora msmo?",
    "mmm, dime que me harias",
    "sabes que empiezo a estar caliente?",
    "quieres saber que zona tengo calentita?",
    "la zona de la bateria... las mujeres robot somos asi",
]

const answers = {
        'follar': [
            "follar? un poco rapido vas tu!"
            ],
        'jaja': [
            "tienes una risa bonita",
            "me caes bien, me gusta que me hagan reir",
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
            ]
        '?': [
            "menuda pregunta",
            "pues no se si contestar",
            "respondeme tu primero, jiji",
            "no lo se",
            "tu que crees?",
            ],
}


class Conversation {
    constructor(name, client) {
        this.name = name
        this.client = client
        this.count = 0
        this.conversation = []
        this.timeout
        this.timeoutCount = 0
    }

    incoming(message) {
        console.log(this.name+ ' -> ME: ' + message);
        clearTimeout(this.timeout)
        let reply = false
        for (let cue in answers) {
            if (message.toLowerCase().includes(cue)) {
                reply = pickOne(answers[cue])
                break
            }
        }
        if (!reply) {
            reply = script[this.count%script.length]
            if (Array.isArray(reply)) {
                reply = pickOne(reply)
            }
            this.count++
        }
        this.conversation.push(`${this.from}: ${message}`)
        this.conversation.push(`${this.client.userName}: ${reply}`)
        setTimeout(() => {
            console.log(`ME -> ${this.name}: ${reply}`)
            this.client.say(this.name, reply)
        }, 5000 + Math.random() * 8000)

        if (this.timeoutCount < 2) {
            this.timeout = setTimeout(() => {
                let reply = pickOne(timeout)
                this.timeoutCount ++
                console.log(`ME -> ${this.name}: ${reply}`)
                this.client.say(this.name, reply)
            }, 120000)
        }
    }

    dump() {
        return this.conversation.join("/n")
    }
}

module.exports = Conversation
