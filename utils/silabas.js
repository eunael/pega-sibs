// import '../dados/palavras.json'
const palavras = [
    {'imagem': "img-dica-bala.png", 'word': ['BA', 'LA']},
    {'imagem': "img-dica-mala.png", 'word': ['MA', 'LA']},
    {'imagem': "img-dica-bolo.png", 'word': ['BO', 'LO']},
    {'imagem': "img-dica-sapato.png", 'word': ['SA', 'PA', 'TO']},
    {'imagem': "img-dica-telefone.png", 'word': ['TE', 'LE', 'FO', 'NE']}
]
const todasSilabas = [
    ["BA", "BE", "BI", "BO", "BU"],
    ["CA", "CE", "CI", "CO", "CU"],
    ["DA", "DE", "DI", "DO", "DU"],
    ["FA", "FE", "FI", "FO", "FU"],
    ["GA", "GE", "GI", "GO", "GU"],
    ["HA", "HE", "HI", "HO", "HU"],
    ["JA", "JE", "JI", "JO", "JU"],
    ["KA", "KE", "KI", "KO", "KU"],
    ["LA", "LE", "LI", "LO", "LU"],
    ["MA", "ME", "MI", "MO", "MU"],
    ["NA", "NE", "NI", "NO", "NU"],
    ["PA", "PE", "PI", "PO", "PU"],
    ["QUA", "QUE", "QUI", "QUO", null],
    ["RA", "RE", "RI", "RO", "RU"],
    ["SA", "SE", "SI", "SO", "SU"],
    ["TA", "TE", "TI", "TO", "TU"],
    ["VA", "VE", "VI", "VO", "VU"],
    ["XA", "XE", "XI", "XO", "XU"],
    ["ZA", "ZE", "ZI", "ZO", "ZU"],
]
let posicaoX = [60, 120, 180, 240, 300, 360, 420, 480]
let posicaoY = [60, 120, 180, 240, 300, 360, 420, 480]

function sorteiaPalavra() {
    let qnt_palavras = parseInt(palavras.length)
    let sort = Math.floor(Math.random() * qnt_palavras)
    let sort_palavra = palavras[sort]
    
    return sort_palavra;
}

function sorteiaSilaba(){
    let linha, coluna, sibSorteada;

    linha = Math.floor(Math.random() * (todasSilabas.length))
    coluna = Math.floor(Math.random()*5)
    sibSorteada = todasSilabas[linha][coluna]
    if(sibSorteada == null){
        // caso sorteie oq seria a sílaba "QUU"
        sorteiaSilaba()
    }

    return sibSorteada;
}

function sorteiaPosicao(){ 
    let sort, posx, posy;

    let posiX = posicaoX.slice()
    sort = Math.floor(Math.random()*posiX.length)
    posx = posiX[sort]

    let posiY = posicaoY.slice()
    sort = Math.floor(Math.random()*posiY.length)
    posy = posiY[sort]
    
    return [posx, posy]
}

export { sorteiaPalavra, sorteiaSilaba, sorteiaPosicao };