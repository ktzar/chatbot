const intro = require('./intro')

module.exports = {
    name: "Telegram Retrieval",
    exitCue: /\@[a-z0-9]*|[a-z]{12,}|[0-9]{6,}/,
    exitSentence: "gracias, ahora te añado|sabes? me caes bien",
    sentences: [
        ["escribir me cansa|me pone oir la voz de un hombre", "oye...|me canso de escribir|me gustaria oir tu voz"],
        ["tienes telegram|o skype?", "ayer me instale telegram|esta super bien"],
        ["bueno, y qué propones entonces?", "vaya"],
        ["jo, me apetece hablar por voz", ":-)"],
        ["dime tu usuario, y te añado"],
        ["si no tienes telegram, dame tu telefono para whatsapp", "y por whatsapp, {nick}?"],
        ["anda, cariño...|dime tu usuario"],
    ],
    answers: {
        'busco': 'tienes que ir a añadir usuaria',
        'telegram': [
            'ok, dime tu usuario, con la @',
            'vale, dame tu usuario|con la @',
            'el usuario es con la @ delante|no?',
            'telegram lo tengo en el telefono|para ir a la camita con el',
            ],
        'skype': [
            'prefiero telegram|mi usuario es gatitaGallega|pon el simbolo ese @ antes',
            'skype no lo tengo en el movil|tienes telegram?',
            'skype solo lo tengo en el ordenador|y prefiero ir al sofa',
            ],
        'usuario': [
            'te paso mi nombre de telegram?',
            'quieres buscarme en telegram o skype?',
            ],
        '?': [
            "antes de contestar|me gustaría comprobar cómo eres",
            "quiero primero que nos oigamos|para ver que eres real|vale?",
        ],
        ...intro.answers
    } 
}