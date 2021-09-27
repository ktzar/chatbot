const EventEmitter = require('events');
const delayUnit = 100

const pickOne = function (arr) {
    if (typeof arr === 'string') {
        return arr
    }
    if (Array.isArray(arr)) {
        return arr.splice(Math.floor(Math.random()*arr.length), 1)[0]
    }
    return 'no se...'
}

class SubConversation extends EventEmitter {
    constructor({exitCue, exitSentence, sentences, answers, name}) {
        super()
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
        const delay = parseInt(Math.random() * (delayUnit * 50) + (delayUnit*50))
        this.timeout = setTimeout(() => {
            this.emit('reply', message)
        }, delay + delayUnit * 3 * message.length)
    }

    incoming(message) {
        let reply = ''
        if (this.exitCue.test(message)) {
            this.emit('success')
            this.say(this.exitSentence)
            return
        }
        for (let cue in this.answers) {
            if (message.toLowerCase().includes(cue)) {
                reply = pickOne(this.answers[cue])
                delete this.answers[cue]
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
        const replies = reply ? reply.split('|') : ["no se..."]
        replies.forEach((rep, index) => {
            setTimeout(() => {
                this.say(rep)
            }, index * 80 * delayUnit)
        })

    }

}

module.exports = SubConversation
