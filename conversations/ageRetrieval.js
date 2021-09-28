
module.exports = {
    name: "Age retrieval",
    exitCue: /\d{2}/,
    exitSentence: "mmm yo tengo 44",
    sentences: [
        ["tienes {age}?", "edad?"],
        ["me van maduros, pero tambien jovencitos", "dime tu edad"],
        "pero cuántos tienes, {age}?",
    ],
    answers: {
        'bot': [
            'el que parece un bot eres tú |con esas preguntas...',
            ],
        'hola': [
            'holi',
            'hola :)',
            ],
        '?': [
            "bueno...|te digo mi edad, jiji",
            "te digo mi edad|pero no te asustes!",
        ],
    } 
}