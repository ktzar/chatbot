const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

const Conversation = require('./conversation')
const client = {
    say: (name, msg) => console.log("> " + msg)
}

const conv = new Conversation('pepe', client)

function ask() {
    readline.question('message: ', msg => {
        if (msg === 'exit') {
            readline.close();
            process.exit()
        }
        conv.incoming(msg)
        ask();
    });
}

ask();