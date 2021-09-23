const irc = require('irc')
const Conversation = require('./conversation')

const conversations = new Map()

const IRCW3 = 'irc.w3.org'
const HISPANO = 'irc.irc-hispano.org'
const ZONA = 'irc.chatzona.org'

const client = new irc.Client(ZONA, 'mr_robot', {
    channels: ['#amistad']
})

client.addListener('message', (from, to, message) => {
    //console.log({from, to, message})
})

client.addListener('pm', (from, message) => {
    let conv = conversations.get(from)
    if (!conv) {
        conv = new Conversation(from, client)
        conversations.set(from, conv)
    }
    conv.incoming(message)
});

client.addListener('error', function(message) {
    console.log('error: ', message);
});

process.on('beforeExit', (code) => {
    console.log('Process beforeExit event with code: ', code);
    conversations.forEach(c => console.log(c.dump()))
});
