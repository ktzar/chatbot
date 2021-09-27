require('dotenv').config()

process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});

const irc = require('irc')
const Conversation = require('./conversation')

const conversations = new Map()

const { SERVER, NICK, CHANNELS}  = process.env

console.log({SERVER, NICK, CHANNELS})

const client = new irc.Client(SERVER, NICK, {
    channels: CHANNELS.split(',')
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
