const EventEmitter = require('events');

const pickOne = function (arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

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

    say(message) {
        const delay = parseInt(Math.random() * 5000 + 5000)
        setTimeout(() => {
            this.emit('reply', message)
        }, delay + 300 * message.length)
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
                this.say(replies[index])
            }, index * 8000)
        })

    }

}

module.exports = SubConversation