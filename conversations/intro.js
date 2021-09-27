
module.exports = {
    name: "Intro",
    exitCue: /donde\ eres|zona|madrid|barcelona|valencia|sevilla/,
    exitSentence: "ok, vivo en madrid",
    sentences: [
        ["como estas?", "te conozco?|dime", "perdona si tardo|tengo muchos privados!", "jo|cuantos privados!"],
        ["de donde?", "yo en madrid, tu cerca?"],
        ["soy nueva", "es la primera vez que entro a este chat"],
        ["qué me dices de ti?", "estas en casa?"],
    ],
    answers: {
        'bot': 'jaja, tu si que pareces un bot|con esas preguntas',
        'charlar': 'y que que quieres hablar?|estoy un poco sola',
        'mujer?': [
            'si, soy chica',
            'si, y tu?',
            ],
        'dias': [
            'buenos dias, ante todo educacion',
            ],
        'noches': [
            'buenas noches a ti tambien',
            'una noche un poco solitaria|hay mucho pesado suelto',
            ],
        'llamas': [
            'me llamo Andrea',
            'aqui en el chat me llamo Adriana',
            ],
        'nick': [
            'te gusta?|se me ocurrio mirandome al espejo',
            'a mi tu nick tambien me hace gracia :-)'
            ],
        'sexo': [
            'un poco deprisa vas tu, no?',
            ],
        'toc': [
            'quien es? :-)',
            ],
        'hola': [
            'hola peque',
            'hola guapo',
            ],
        'mo est': 'hoy un poco solita...|me haces compañia?',
        '?': [
            "no se si contestarte...|jijij",
            "y tu, qué buscas?",
            "depende... ;-)",
            ],
    } 
}