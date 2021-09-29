const SubConversation = require('./subconversation')
const borde = require('./conversations/borde')
const intro = require('./conversations/intro')
const ageRetrieval = require('./conversations/ageRetrieval')
const telegramRetrieval = require('./conversations/telegramRetrieval')
const telegramSuccess = require('./conversations/telegramSuccess')


const pickOne = function (arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

const timeout = [
    "me abres para no escribirme luegoo?",
    "eooo???",
    "estas?",
    "sigues ahi?",
    "no quieres hablar?",
    "hola???",
    "te echo de menos",
    "vaya...",
    "te caiste?"
]


class Conversation {
    constructor(name, client) {
        this.name = name
        this.client = client
        this.count = 0
        this.conversation = []
        this.timeout
        this.timeoutCount = 0

        this.intro = new SubConversation({...intro, nick: name})
        this.ageRetrieval = new SubConversation({...ageRetrieval, nick: name})
        this.telegramRetrieval = new SubConversation({...telegramRetrieval, nick: name})
        this.telegramSuccess = new SubConversation({...telegramSuccess, nick: name})
        this.borde = new SubConversation({...borde, nick: name})

        this.intro.successNextSubConv = this.ageRetrieval
        this.intro.failNextSubConv = this.ageRetrieval

        this.ageRetrieval.successNextSubConv = this.telegramRetrieval
        this.ageRetrieval.failNextSubConv = this.telegramRetrieval

        this.telegramRetrieval.successNextSubConv = this.telegramSuccess
        this.telegramRetrieval.failNextSubConv = this.borde

        this.telegramSuccess.successNextSubConv = this.borde
        this.telegramSuccess.failNextSubConv = this.borde

        this.borde.successNextSubConv = this.telegramRetrieval

        this.setNewSubConv(this.telegramRetrieval)
    }

    setNewSubConv(subConv) {
        const name = this.name
        const subConvName = subConv.name
        this.currentSubConv = subConv
        this.currentSubConv.on('reply', reply => {
            console.log(`${this.name} < ${reply}`)
            this.client.say(this.name, reply)
        })
        this.currentSubConv.on('success', () => {
            console.log('   >>> Success for ' + name + " on " + subConvName)
            if (this.currentSubConv.successNextSubConv) {
                this.setNewSubConv(this.currentSubConv.successNextSubConv)
            } else {
                console.log('>>> Endgame for ' + name + ' on ' + subConvName)
            }
        })
        this.currentSubConv.on('fail', () => {
            console.log('   >>> Fail for ' + name + " on " + subConvName)
            if (this.currentSubConv.failNextSubConv) {
                this.setNewSubConv(this.currentSubConv.failNextSubConv)
            } else {
                console.log('>>> Endgame for ' + name + ' on ' + subConvName)
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
