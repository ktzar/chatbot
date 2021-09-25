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
    "no me dices nada?",
    "sigues ahi?",
    "que muermo",
    "hola?"
]


class Conversation {
    constructor(name, client) {
        this.name = name
        this.client = client
        this.count = 0
        this.conversation = []
        this.timeout
        this.timeoutCount = 0

        this.intro = new SubConversation({...intro})
        this.ageRetrieval = new SubConversation({...ageRetrieval})
        this.telegramRetrieval = new SubConversation({...telegramRetrieval})
        this.telegramSuccess = new SubConversation({...telegramSuccess})
        this.borde = new SubConversation({...borde})

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
                console.log(">>> End of conversation for " + this.name)
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
