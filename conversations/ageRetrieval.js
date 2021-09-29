
module.exports = {
    name: "Age retrieval",
    exitCue: /\d{2}/,
    exitSentence: [
        "mmm yo tengo 38",
        "que bien, yo tengo 38",
        "yo 38 :-)",
        "yo 48 :-)|perdon, 38",
    ],
    failSentence: "no me dices tu edad? yo tengo 38",
    sentences: [
        ["tienes {age}?", "edad?"],
        ["me van maduros, pero tambien jovencitos|jiji", "dime tu edad"],
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