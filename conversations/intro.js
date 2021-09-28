
module.exports = {
    name: "Intro",
    exitCue: /donde\ eres|zona|madrid|barcelona|valencia|sevilla/,
    exitSentence: "yo vivo en madrid, por Sol",
    sentences: [
        ["qué me dices de ti?", "estas en casa?"],
        ["como estas {nick}?", "como estas?|dime", "que buscas?|yo un ratito de charla", "me abrumais muchos mensajes!"],
        ["de donde?", "yo en madrid, te pilla bien?|o solo quieres ciber?"],
    ],
    answers: {
        'bot': 'jaja, tu si que pareces un bot|con esas preguntas',
        'charlar': 'y que que quieres hablar, {nick}?|estoy un poco sola {nick}',
        'llamo': 'encantada {nick}|estas solito?',
        'sola': 'estoy un poco sola {nick}',
        'años': 'yo tengo alrededor de 40',
        'besos': 'me gustan los besos, si',
        'solita': 'si solita, tu tambieen?',
        ' put': 'eso se lo llamas a tu madre, vale?',
        'mujer?': [
            'si, soy chica',
            'si, y tu?',
            ],
        'dias': [
            'que educado!|buenos dias :)',
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
            'a mi tu nick tambien me hace gracia, {nick} :-)'
            ],
        'sexo': [
            'un poco deprisa vas tu, no?',
            'que lanzado!',
            ],
        'toc': [
            'quien es? :-)',
            ],
        'hola': [
            'hola amor',
            'hola bebe',
            'hola cariño',
            ],
        'mo est': 'hoy un poco solita...|me haces compañia?',
        '?': [
            "mmm|no se que decir|jijij",
            "qué buscas tu?",
            "depende... ;-)",
            ],
    } 
}