
module.exports = {
    name: "Age retrieval",
    exitCue: /\d{2}/,
    exitSentence: "mmm yo tengo 44",
    sentences: [
        ["tienes {age}?", "edad?"],
        ["eres maduro?", "primero dime tu edad"],
        "pero cómo de mayor eres, {age}?",
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
            "bueno...|te digo mi edad, jiji",
            "te digo los que tengo|pero no te asustes!",
        ],
    } 
}