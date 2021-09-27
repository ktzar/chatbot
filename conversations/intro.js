
module.exports = {
    name: "Intro",
    exitCue: /donde\ eres|zona|madrid|barcelona|valencia|sevilla/,
    exitSentence: "ok, vivo en madrid, por sol",
    sentences: [
        ["como estas {nick}?", "te conozco?|dime", "no quiero perder tiempo|que buscas?", "me mandais muchos mensajes!"],
        ["de donde?", "yo en madrid, te pilla bien?"],
        ["busco charla inteligente", "no entro mucho a este chat"],
        ["qué me dices de ti?", "estas en casa?"],
    ],
    answers: {
        'bot': 'jaja, tu si que pareces un bot|con esas preguntas',
        'charlar': 'y que que quieres hablar, {nick}?|estoy un poco sola {nick}',
        'sola': 'estoy un poco sola {nick}',
        'solita': 'si solita, tu tambieen {nick}?',
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