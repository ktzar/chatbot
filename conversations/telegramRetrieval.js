module.exports = {
    name: "Telegram Retrieval",
    exitCue: /\@[a-z0-9]*/,
    exitSentence: "gracias, ahora te añado|sabes? me caes bien",
    sentences: [
        "me gustaria oir tu voz",
        ["tienes telegram o skype?", "ayer me instale telegram|esta super bien"],
        ["bueno, y qué propones entonces?", "vaya"],
        ["venga, la verdad es que me apetece", ":-)"],
        ["cual es tu usuario, y te añado"],
        ["dale..."],
    ],
    answers: {
        'telegram': [
            'ok, dime tu usuario, con la @',
            'vale, dame tu usuario|con la @',
            ],
        'skype': [
            'prefiero telegram|mi usuario es gatitaGallega|pon el simbolo ese @ antes',
            'skype no me gusta nada|tienes telegram?',
            ],
        'usuario': [
            'te paso mi usuario de telegram?',
            'quieres buscarme en telegram o skype?',
            ],
        '?': [
            "antes de contestar|me gustaría comprobar cómo eres",
            "quiero primero que nos oigamos|para ver que eres real|vale?",
        ],
    } 
}