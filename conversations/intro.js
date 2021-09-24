
module.exports = {
    name: "Intro",
    exitCue: /donde\ eres/,
    exitSentence: "ok, vivo en madrid",
    sentences: [
        ["como estas?", "te conozco?|dime", "perdona si tardo|tengo muchos privados!", "jo|cuantos privados!"],
        ["de donde?", "eres de españa?", "desde donde escribes?"],
        ["soy nueva", "es la primera vez que entro a este chat"],
        ["qué me dices de ti?", "estas en casa?"],
    ],
    answers: {
        'bot': 'el que parece un bot eres tú, con esas preguntas...',
        'charlar': 'pues si, me apetece charlar un rato|estoy un poco sola',
        'mujer': [
            'si, soy chica',
            'si, y tu?',
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
            'holi',
            'hola!|que cuentas?',
            ],
        '?': [
            "hoy un poco sola...",
            "no se si contestarte...|jijij",
            "no se que decirte, qué buscas?",
            "depende... ;-)",
            ],
    } 
}