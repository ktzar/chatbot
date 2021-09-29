
module.exports = {
    name: "Intro",
    exitCue: /donde|zona|madrid|barcelona|valencia|sevilla/,
    exitSentence: [
        "yo vivo en madrid, centrica",
        "yo por Madrid",
        "soy de madrid",
        "por la zona de Madrid",
        "vivo en Madrid",
    ],
    failSentence: "ok|que más me dices de ti?",
    sentences: [
        ["qué me dices de ti?", "estas en casa?", "que me cuentas?", "me mola tu nick...", "eres amable?"],
        ["como estas {nick}?", "como estas?|eres majo?", "que buscas?|yo hablar sin limites", "muchos mensajes!"],
        ["de donde?", "yo en madrid|que buscas, ciber o real?"],
    ],
    answers: {
        'hola': [
            'hola amor',
            'hola caracola',
            'hola bebe',
            'hola peque',
            'hola cariño',
            ],
        'bot': 'jaja, tu si que pareces un bot|con esas preguntas',
        'charlar': 'y que que quieres hablar, {nick}?|estoy un poco sola {nick}',
        'llamo': 'encantada {nick}|estas solito?',
        'ciber': 'pues te podria dar mi telegram...',
        'edad': 'tengo entre 35 y 40 ;-)',
        'buscas': 'un ratito de charla...|sin limites ;-)',
        'sola': 'estoy un poco sola {nick}',
        'jugar': 'a mi al menos sí me gustan los juegos ;-)',
        'tetas': 'quieres saber como son mis tetitas?',
        'años': 'yo tengo algo menos de 40',
        'te gusta': 'lo que me gusta es una conversacion|a poder ser inteligente',
        'besos': 'me gustan los besos, si',
        'sumisa': 'no soy muy sumisa, me gusta mandar, jajaj',
        'como eres': 'con curvas ;-). te gusta?',
        'pais': 'soy de españa',
        'pene': 'describeme como es tu polla',
        'que tal': 'muy bien, y tu, amor?',
        'q tal': 'super bien, y tu, amor?',
        'telegram': [
            'antes de darte mi telegram|nos conocemos un poco?',
            'ok, me apetece telegram',
            'vale a telegram ;-)',
            'ok, cuentame algo de ti',
        ],
        'ok': 'ok makey jajaja',
        'skype': 'antes de darte mi skype|hablamos un poco?',
        'polla': 'describeme como es tu polla',
        'solita': 'si solita, tu tambieen?',
        'puta': 'eso se lo llamas a tu madre, vale?',
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
        'toca': 'aun no me toco...',
        'toc': 'quien es? :-)',
        'mo est': 'hoy un poco solita...|me haces compañia?',
        '?': [
            "mmm|no se que decir|jijij",
            "qué buscas tu?",
            "depende... ;-)",
            ],
    } 
}