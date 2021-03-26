var canvas, ctx, img, frame,  // essas variáveis, mais p frente, vão guardar informações p construir o canvas
ALTURA=600, LARGURA=600, // dimensões do canvas em pixels
PADRAO=60, // padronizar o tamanho do elementos dentro ddo canvas
numSib = 12; // número de sílabas que vão aparecer

// estados que o jogo pode está
const estados = { 
    'jogar': 0,
    'jogando': 1,
    'ganhou': 2,
    'perdeu': 3,
};
// vai indicar o estado do jogo: se está para começar ainda, se estão jogando, se ganhou ou se perdeu
let estadoJogo;

// PALAVRAS
// quem vai dar a meta do jogo
// {'imagem': 'nome-da-imagem.png', 'word': ['as sílabas da palavra']}
const palavras = [
    {'imagem': "img-dica-bala.png", 'word': ['BA', 'LA']},
    {'imagem': "img-dica-mala.png", 'word': ['MA', 'LA']},
    {'imagem': "img-dica-bolo.png", 'word': ['BO', 'LO']}
] // *** automatizar o índice de imagem

// vai sortear uma das palavras acima
function sorteiaPalavra() {
    let qnt_palavras = parseInt(palavras.length)
    let sort = Math.floor(Math.random() * qnt_palavras)
    let sort_palavra = palavras[sort]
    
    return sort_palavra;
}

// SÍLABAS
// todas as sílabas
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
    ["QUA", "QUE", "QUI", "QUO"],
    ["RA", "RE", "RI", "RO", "RU"],
    ["SA", "SE", "SI", "SO", "SU"],
    ["TA", "TE", "TI", "TO", "TU"],
    ["VA", "VE", "VI", "VO", "VU"],
    ["XA", "XE", "XI", "XO", "XU"],
    ["ZA", "ZE", "ZI", "ZO", "ZU"],
]
// posições possíveis para as sílabas dentro do canvas
let posicaoX = [60, 120, 180, 240, 300, 360, 420, 480]
let posicaoY = [60, 120, 180, 240, 300, 360, 420, 480]

var bloco = {
    // coordenadas do ponto dentro do canvas que o bloco vai começar a ser desenhado
    x: 0, // eixo X
    y: 0, // eixo Y
    // a partir do ponto acima vai dimencionar o bloco dando altura e largura para ele
    alt: PADRAO, // altura
    larg: PADRAO, // largura
    cor: "#f26e11",
    rastros: [],
    corRastro: "#37c978",

    atualizaBloco: function(coordX, coordY){
        if(this.x + coordX >= 0 && this.x + this.larg + coordX <= LARGURA && this.y + coordY >= 0 && this.y + this.alt + coordY <= ALTURA){
            this.rastros.push([bloco.x, bloco.y])
            this.x += coordX;
            this.y += coordY
        }
    },
    desenhaBloco: function(){
        // vai desenhar o bloco da cor ctx.fillStyle e nas coordenadas indicadas em ctx.fillRect
        spriteBloco.desenhaSpriteBloco(frame, this.x, this.y)
        
    },
    desenhaRastros: function () {
        ctx.fillStyle = this.corRastro
        if (this.rastros.length > 20) {
            this.rastros.shift()
        }
        this.rastros.forEach(element => {
            let coord = element
            ctx.fillRect(coord[0], coord[1], this.larg, this.alt)

        });  
    },
    resetaBloco: function () {
        // quando ganhar ou perder o jogo, essa função vai resetar tudo que for do bloco
        this.x = 0
        this.y = 0
        this.alt = PADRAO
        this.larg = PADRAO
        this.rastros = []
        this.corRastro = "#37c978"
    },
}

var silabas = {
    _sibs: [], // vai receber cada quadradinho de sílabas cada um com seus atributos

    palavra: sorteiaPalavra(), // vai sortear e retornar uma palavra {'imagem', 'word'}
    sibs_certas: [], // vai receber o objeto de cada sílaba certa
    sibs_aleatorias: [], // as demais sílabas

    sorteiaSilaba: function(){ // sorteio das demais sílabas
        let linha, coluna, sibsSorteada, achou;
        // sorteia uma sílaba e vê se ela já existe, se existir ele sortea outra
        do {
            achou = 0 // essa variável vai identificar se a sílaba que vai ser sorteada já foi sorteada antes
            linha = Math.floor(Math.random() * (todasSilabas.length)) //consoante
            coluna = Math.floor(Math.random()*5) //vogal

            if (linha == 12 && coluna == 4) { // ([12,4] dá erro pq não existe a sílaba "QUU")
                // vamos forçar o dowhile se repetir dnv
                achou = 1
            } else {
                sibsSorteada = todasSilabas[linha][coluna] // sílaba sorteada lá de todasSilabas
                
                for (i in this._sibs){
                    // aqui vai verificar se sibsSorteada já foi sorteada
                    if(this._sibs[i].s === sibsSorteada){
                        achou = 1
                        break // quebra o for
                    }
                }
            }
        }while(achou == 1) // se a sílaba já foi sorteada, ele vai repetir até sortear uma que não foi sorteada antes
        
        return sibsSorteada // vai retornar UMA sílaba que não foi sorteada antes
    },

    sorteiaPosicao: function(){
        let sort, achou, posx, posy
        let posiX = posicaoX.slice()
        let posiY = posicaoY.slice()
        
        do {
            // mesmo esquema do sorteio das sílabas
            achou = 0 // indicador para saber ser as coordenadas que vão ser sorteadas já foram sorteadas
            sort = Math.floor(Math.random()*posiX.length)
            posx = posiX[sort] // sorteia uma posição no eixo X
            sort = Math.floor(Math.random()*posiY.length)
            posy = posiY[sort] // sorteia uma posição no eixo Y

            for (i in this._sibs){
                // vai verificar se posx e posy já foram sorteadas para que uma sílaba não fique encima de outra
                if((this._sibs[i].x === posx && this._sibs[i].y === posy)){
                    achou = 1

                    break // quebra o for
                }
            }
        } while(achou == 1) // se achou essa coordenada, repete até sortear uma que não foi
        
        return [posx, posy] // retorna UMA coordenada que nunca foi sorteada
    },

    constroiPalavra: function () {
        // vai construi o quadrado com as sílabas da palavra que foi sorteada
        for (let x = 0; x < this.palavra.word.length; x++) {
            let sibWord = this.palavra.word[x]; // será cada sílaba que a palavra tem
            let posis = this.sorteiaPosicao() // vai sortear uma coordenada para o quadrado da sílaba
            // vai adicionar no Array de sílabas
            let silaba = {
                s: sibWord,
                color: "#f2f2f2",
                x: posis[0],
                y: posis[1],
                largSilaba: PADRAO,
                altSilaba: PADRAO,
                passou: false,
                is_essa: true, // identidicados para saber que essa é sílaba certa qnd o bloco passar
            }
            this._sibs.push(silaba)
            this.sibs_certas.push(silaba)
        }
        return this.palavra.imagem // retorna a frase para poder escrevê-la no painel de dicas
    },

    constroiSilabas: function(){
        // vai contruir as demais sílabas e seus respectivos quadrados
        for (var x=0; x<(numSib + Math.trunc(this.palavra.word.length / 3)); x++){
            // x máx é 64, se for mais vai cair num loop eterno
            // a cada três sílabas da palavra certa, é adiconada uma sílaba aleatória
            let sib = this.sorteiaSilaba()
            let posis = this.sorteiaPosicao()
            let silaba = {
                s: sib,
                color: "#f2f2f2",
                x: posis[0],
                y: posis[1],
                largSilaba: PADRAO,
                altSilaba: PADRAO,
                passou: false,
                is_essa: false,
            }
            this._sibs.push(silaba)
            this.sibs_aleatorias.push(silaba)
        }
        // Há um problema com as posições onde pode acontecer que 5 sílabas formem uma cruz "+" e o bloco não consegue alcançada a do meio sem ter que passar pelas sílabas que estão rodeando ela. É PARA RESOLVER.
    },

    atualizaSilabas: function(){
        // como as sílabas não vão mudar de lugar, elas vão apenas atualizar sua cor quando o bloco passa por cima
        for(var x=0; x<(this._sibs.length); x++){
            let silaba = this._sibs[x]
            let na_ordem = true
            if(bloco.x == silaba.x && bloco.y == silaba.y){
                silaba.passou = true // vai indicar que o bloco passou por essa sílaba
                if (silaba.is_essa) { // se for a sílaba certa, pinta de verde
                    let sib_c = this.sibs_certas.find(element => element.s == silaba.s) // sílaba do array sibs_certas que o bloco passou
                    sib_c.passou = true
                    let ind_s_anterior = Number(this.sibs_certas.indexOf(sib_c)) - 1 // índice da sílaba em sibs_certas anterior a que o bloco passou
                    
                    if (ind_s_anterior != -1) {
                        // se a sílaba que o bloco passou não for a primeira das certas
                        if (this.sibs_certas[ind_s_anterior].passou == false) {
                            // e a sílaba anterior a ela não foi passada, o jogador perde
                            na_ordem = false // o jogador pegou a sílaba na ordem errada
                        }
                    }
                }
                if (na_ordem == true && silaba.is_essa) {
                    // se estiver na ordem e for a sílaba certa
                    silaba.color = "#37c978"
                    bloco.cor = "#37c978"
                    setTimeout(function() {
                        bloco.cor = "#f26e11"
                    }, 500)
                    
                    let passou_certas = silabas.sibs_certas.every((silaba) => silaba.passou == true)
                    let passou_erradas = silabas.sibs_aleatorias.some((silaba) => silaba.passou == true)

                    if (passou_certas == true && passou_erradas == false) {
                        setTimeout(function() {
                            estadoJogo = estados.ganhou
                        }, 10)
                        document.getElementById('btn-play').removeAttribute('disabled')
                        document.getElementById('btn-play').style.backgroundColor = "#00966b"
                    }
                } else { // se for a sílaba errada, pinta de vermelho
                    silaba.color = "#f45728"
                    bloco.cor = "#f45728"
                    bloco.corRastro = "#f45728"
                    setTimeout(function() {
                        estadoJogo = estados.perdeu
                    }, 10)
                    document.getElementById('btn-play').removeAttribute('disabled')
                    document.getElementById('btn-play').style.backgroundColor = "#00966b"
                }
            }
        }

    },

    desenhaSilabas: function(){
        for(var b=0; b<this._sibs.length; b++){
            // vai desenhar cada quadrado com sua respectiva sílaba dentro
            let sib = this._sibs[b]
            ctx.fillStyle = sib.color
            ctx.fillRect(sib.x, sib.y, sib.largSilaba, sib.largSilaba)
            
            // alinhar direitinho as sílabas dentro dos seus quadrados
            ctx.fillStyle = "#282828"
            if (todasSilabas[12].indexOf(sib.s) != -1) { // sílabas com Q
                ctx.font = "25px Arial"
                ctx.fillText(sib.s, sib.x+3, sib.y+40)
            } else {
                ctx.font = "30px Arial"
                if (sib.s.indexOf('I') != -1) { // sílabas com I
                    ctx.fillText(sib.s, sib.x+14, sib.y+40)
                } else { // sílabas com A, E, O ou U
                    ctx.fillText(sib.s, sib.x+9, sib.y+40)
                }
            }
        }
    },
    resetaSilabas: function () {
        this._sibs = []
        this.palavra = sorteiaPalavra()

        this.sibs_certas = []
        this.sibs_aleatorias = []
    }
}

var desenhoDeFundo = {
    linhas: [],
    tempoInsere: 0,

    insere: function() {
      this.linhas.push({
          x: LARGURA+10,
          y: 0,
      })
      this.tempoInsere = 148; 
    },
    atualiza: function() {
        if (this.tempoInsere == 0) {
            this.insere()
        } else {
            this.tempoInsere--;
        }
        let tam = this.linhas.length
        for (let i = 0; i < tam; i++) {
            const linha = this.linhas[i];
            linha.y += 1
            if (linha.y > 800) {
                // console.log('oi');
                this.linhas.splice(i, 1)
                tam--
                i--
            }
        }
    },
    desenha: function() {
        let tam = this.linhas.length
        for (let i = 0; i < tam; i++) {
            const linha = this.linhas[i];
            ctx.strokeStyle = "#f5e020aa"
            ctx.beginPath();
            ctx.moveTo(-10, linha.y-200) // começa nos pontos da coordenada (0, y)
            ctx.lineTo(610, linha.y) // e vai até as coordenada (LARGURA, y)
            ctx.lineWidth = 15
            ctx.stroke()   
        }
    }
}

function linhas(){
    // isso é p desenhas aquelas linhas no canvas que nem um xadrez
    ctx.strokeStyle="#262626"
    ctx.lineWidth = 1
    // vertical
    for(var x=PADRAO; x<LARGURA; x+=PADRAO){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ALTURA);
        ctx.stroke();
    }
    // horizontal
    for(var y=PADRAO; y<ALTURA; y+=PADRAO){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(LARGURA, y);
        ctx.stroke();
    }
}

function mover(tecla){
    let img = document.getElementById('img-dica'); // imagem da dica
    if(estadoJogo == estados.jogando){
        if(tecla==38){
            // setinha para CIMA: 38
            // letra W: tecla==119 || tecla==87
            bloco.atualizaBloco(0, -60)
        } else if(tecla==39){
            // setinha para DIREITA: 39
            // letra D: tecla==100 ||tecla==68
            bloco.atualizaBloco(60, 0)
        } else if(tecla==40){
            // setinha para BAIXO: 40
            // letra S: tecla==115 || tecla==83
            bloco.atualizaBloco(0, 60)
        } else if(tecla==37){
            // setinha para ESQUERDA: 37
            // letra A: tecla==97 || tecla==65
            bloco.atualizaBloco(-60, 0)
        } 
    }else if(tecla == 'click'){
        const btnplay = document.getElementById("btn-play") // botão que também tem a função do enter
        if (estadoJogo == estados.jogar) { // qnd o estado do jogo for 'jogar'
            // qnd clicar no enter, vai começar o jogo
            bloco.resetaBloco() // reseta o bloco
            silabas.resetaSilabas() // apaga as sílabas do jogo anterior

            // primeiro desenhas as sílabas certas da palavra e retorna a dica
            const nome_imagem = silabas.constroiPalavra()
            // mostra a dica no painel
            let img_src = img.getAttribute('src') + nome_imagem
            img.setAttribute('src', img_src)
            img.style.display = "block"
            // muda a palavra do botão
            btnplay.children[0].textContent = "NOVO JOGO"
            // dps, vai inserir as sílabas sorteadas para cada partida
            silabas.constroiSilabas()
            
            // por fim, muda o estado do jogo
            document.getElementById('btn-play').setAttribute('disabled', 'disabled')
            document.getElementById('btn-play').style.backgroundColor = "#c4c4c4"
            estadoJogo = estados.jogando
        } else if ((estadoJogo == estados.ganhou || estadoJogo == estados.perdeu)) {
            btnplay.children[0].textContent = "INICIAR"
            // resetar o caminho até as imagens tirando a imagem que tava antes
            let img_src_split = img.getAttribute('src').split('/')
            let img_src = `${img_src_split[0]}/${img_src_split[1]}/`
            img.setAttribute('src', img_src)
            img.style.display = "none"
            // muda o estado para 'jogar' para que o jogador possa jogar novamente
            estadoJogo = estados.jogar
        }
    }
}

function atualiza(){
    // essa função vai atualizar todas as posições dos elementos do canvas antes de serem redesenhar
    if (estadoJogo == estados.jogando) {
        frame ++
        // desenhoDeFundo.atualiza()
        silabas.atualizaSilabas()
    } else {
        frame = 0
    }
}

// desenha o canvas em cada estado do jogo
function canvasJogar() {
    ctx.clearRect(0, 0, LARGURA, ALTURA)
    ctx.fillStyle = "#014c78"
    ctx.fillRect(0, 0, LARGURA, ALTURA)
    comecaJogo.desenha(95, 150)
}
function canvasGanhou() {
    ganhouJogo.desenha(95, 150)
    
}
function canvasPerdeu() {
    perdeuJogo.desenha(95, 150)

}
function canvasJogando() {
    ctx.clearRect(0, 0, LARGURA, ALTURA)
    ctx.fillStyle = "#014c78"
    ctx.fillRect(0, 0, LARGURA, ALTURA)
    // desenhoDeFundo.desenha()

    // imagem do Sprite
    // bg.desenha(0, 0)

    // desenha os rastros de onde o bloco passou
    // bloco.desenhaRastros()

    // vai desenhar as sílabas
    silabas.desenhaSilabas()
        
    // vai desenhas o xadrez no canvas
    linhas()

    // vai desenhar o bloco no canvas a cada posição nova
    bloco.desenhaBloco()
}

function desenha(){
    // essa função vai desenhar tudo no html

    // desenha o canvas

    if (estadoJogo == estados.jogar) {
        // canvas com o jogo no estado 'joga'

        canvasJogar()
    } else if(estadoJogo == estados.jogando){
        // canvas com o jogo no estado 'jogando'

        canvasJogando()
    } else if (estadoJogo == estados.ganhou) {
        // canvas com o jogo no estado 'ganhou'

        canvasGanhou()
    } else if (estadoJogo == estados.perdeu) {
        // canvas com o jogo no estado 'perdeu'

        canvasPerdeu()
    }

}

function roda(){
    // essa função vai renderizar cada quadro

    // vai chamar a função q atualiza e depois desenha, assim cria cada quadro novo para ser rederizado
    atualiza()
    desenha()
    // aqui vai criar tipo um loop p rederização dos quadros não parar
    window.requestAnimationFrame(roda)
}

function main(){
    // esse main vai dar o start em tudo sempre q der um f5

    // cria o elemento <canvas></canvas> no html
    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    canvas.width = LARGURA
    canvas.height = ALTURA
    canvas.style.border = "1px solid #282828";
    // o contexto do canvas é 2d, só poder fazer desenhos de figuras 2d
    ctx = canvas.getContext("2d")
    // adiciona esse canvas criado no html
    document.getElementById('telaCanvas').appendChild(canvas)

    // iniciamente, o estado do jogo começa em 'jogar':0
    estadoJogo = estados.jogar

    // isso vai identidicar qual tecla foi clicada
    document.body.addEventListener('keydown', (event) => {
        var num = event.keyCode // cada tecla tem um código q identifica ela
        mover(num) // envio esse código p função "mover()" lá em cima e faços as condições (if) p pegar só os códigos referentes as setas
    })
    document.getElementById('canvas').addEventListener('click', function() {
        mover('click')
    })
    document.getElementById('btn-play').addEventListener('click', function() {
        mover('click')
    })
    document.querySelectorAll(['.direcoes']).forEach(element => {
        element.addEventListener('mousedown', function() {
            let num = Number(element.getAttribute('direc'))
            mover(num)
            // console.log(num);
        })
    });

    img = new Image();
    img.src = "imagens/folha.png"

    roda() // aqui da o start p renderisar os quadros
}
main() // chamo a função main() p começar tudo3