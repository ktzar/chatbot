
module.exports = {
    exitCue: /donde\ eres/,
    exitSentence: "ok, soy de madrid",
    sentences: [
        ["como estas?", "te conozco?|dime", "perdona, tengo muchos privados|cuanta gente", "jo|cuantos privados!"],
        ["de donde?", "eres de españa?", "desde donde escribes?"],
        ["soy nueva", "es la primera vez que entro a este chat"],
    ],
    answers: {
        'bot': [
            'el que parece un bot eres tú, con esas preguntas...',
            ],
        'mujer': [
            'si, soy chica',
            'si, y tu?',
            ],
        'noches': [
            'buenas noches a ti tambien',
            'una noche un poco solitaria|hay mucho pesado suelto',
            ],
        'nick': [
            'te gusta?|se me ocurrio mirandome al espejo',
            'a mi tu nick tambien me hace gracia :-)'
            ],
        'sexo': [
            'un poco deprisa vas tu, no?',
            ],
        'hola': [
            'holi',
            'hola!|que cuentas?',
            ],
        '?': [
            "hoy un poco sola...",
            "jaja|también quiero yo|saber cosas de ti",
            "no se si contestarte...|jijij",
            "no se que decirte, qué buscas?",
            ],
    } 
}