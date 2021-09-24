
module.exports = {
    name: "Age retrieval",
    exitCue: /\d{2}/,
    exitSentence: "yo tengo 34",
    sentences: [
        ["cuantos años tienes?", "edad?"],
        ["eres maduro?", "primero dime tu edad"],
        "pero cómo de mayor eres?",
        "no se que quieres decir"
    ],
    answers: {
        'bot': [
            'el que parece un bot eres tú |con esas preguntas...',
            ],
        'hola': [
            'holi',
            'saludos!',
            ],
        '?': [
            "bueno... te digo mi edad|despues de ti, jiji",
            "te digo los que tengo, pero no te asustes!|despues de ti",
        ],
    } 
}