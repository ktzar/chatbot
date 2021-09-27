const EventEmitter = require('events');
const delayUnit = 100

const pickOne = function (arr) {
    if (typeof arr === 'string') {
        return arr
    }
    if (Array.isArray(arr)) {
        return arr[Math.floor(Math.random()*arr.length)]
    }
    return 'no se...'
}

class SubConversation extends EventEmitter {
    constructor({exitCue, exitSentence, sentences, answers, name, nick}) {
        super()
        try {
            this.nick = nick.match(/[A-Za-z]{4,}/)[0]
        } catch(e) {
            this.nick = nick
        }
        try {
            this.age = nick.match(/\d{2}/)[0]
        }catch(e) {
            this.age = 'mas de 18'
        }

        this.name = name
        this.exitCue = exitCue
        this.exitSentence = exitSentence
        this.answers = answers
        this.sentences = sentences
        this.count = 0
        this.successNextSubConv = null
        this.failNextSubConv = null
        this.timeout = null
    }

    say(message) {
        message = message.replace('{age}', this.age).replace('{nick}', this.nick)

        const delay = parseInt(Math.random() * (delayUnit * 50) + (delayUnit*50))
        this.timeout = setTimeout(() => {
            this.emit('reply', message)
        }, delay + delayUnit * 3 * message.length)
    }

    incoming(message) {
        let reply = ''
        message = message.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        if (this.exitCue.test(message)) {
            this.emit('success')
            reply = this.exitSentence
        } else {
            for (let cue in this.answers) {
                if (message.includes(cue)) {
                    reply = pickOne(this.answers[cue])
                    delete this.answers[cue]
                    break
                }
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
        const replies = reply ? reply.split('|') : ["no se..."]
        replies.forEach((rep, index) => {
            setTimeout(() => {
                this.say(rep)
            }, index * 80 * delayUnit)
        })

    }

}

module.exports = SubConversation
