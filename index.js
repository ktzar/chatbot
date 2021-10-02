require('dotenv').config()
const IRC = require('irc-framework')

const { SERVER, NICK, CHANNELS}  = process.env
console.log({SERVER, NICK, CHANNELS})

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});

const Conversation = require('./conversation')
const conversations = new Map()
const channels = []


const bot = new IRC.Client()
bot.connect({
    host: SERVER,
    port: 6667,
    nick: NICK,
})

bot.on('registered', function () {
    console.log('Registered!')
    const loginChannels = CHANNELS.split(',')
    loginChannels.forEach((ch) => {
        channels[ch] = bot.channel(ch)
    })
})


bot.on('privmsg', (event) => {
    const { target, nick, message } = event
    if (target === NICK) {
        let conv = conversations.get(nick)
        if (!conv) {
            conv = new Conversation(nick, bot)
            conversations.set(nick, conv)
        }
        conv.incoming(message)
    }
});

bot.on('close', function(message) {
    console.log('close: ', message);
});

process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
    conversations.forEach(c => console.log(c.dump()))
});
