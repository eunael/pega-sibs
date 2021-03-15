var canvas, ctx; // essas variáveis, mais p frente, vão guardar informações p construir o canvas
const ALTURA=600, LARGURA=600; // dimensões do canvas em pixels
const PADRAO=60; // padronizar o tamanho do elementos dentro ddo canvas
const numSib = 12; // número de sílabas que vão aparecer
var img;

// estados que o jogo pode está
const estados = { 
    'jogar': 0,
    'jogando': 1,
    'ganhou': 2,
    'perdeu': 3,
};
// vai indicar o estado do jogo: se está para começar ainda, se estão jogando, se ganhou ou se perdeu
let estadoJogo;

// estados em que o bloco pode estar
const estadosBloco = { 
    'start': 0, // esperando receber os movimentos
    'andando': 1, // executando os movimentos
    'fim': 2, // terminou de executar os movimentos
};

let comandos = [] 
/* este array vai se uma matriz que vai guardar: [deslocamento no eixo X, deslocamento no eixo Y, "inicial da direção"], esses valores vão depender das setinhas q foram clicadas antes de dar enter */

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
    movimentos: [], /* qnd clicar enter, vai chamar a função moveBloco() e os elementos dentro de comandos vão
    compôr as coordenadas q o bloco vai percorrer pelo canvas. movimentos vai guardar coordenadas  junto com
    a inicial da direção q o bloco vai (d, e, c, b) */
    
    estado: estadosBloco.start, // vai indicar o estado do bloco a cada momento, incialmente ela vai está em start

    atualizaBloco: function(){
        // atualizaBloco vai atualizar a posição do bloco a cada movimento executado antes do bloco ser desenhado novamente

        /* -------------- VALIDAÇÕES -------------- */
        if(this.movimentos.length != 0 && estadoJogo == estados.jogando){
            // se ainda tiver algum movimento dentro de this.movimentos para ser executado:
            this.estado = estadosBloco.andando
            if(this.movimentos[0][2]==="d"){
                // se for para direita:
                if(this.x == this.movimentos[0][0]){
                    // se o X do bloco for igual a coordenada X q está nesse movimento para direita:
                    delDirecao(0)
                    this.movimentos.shift() // remove o primeiro elemento de this.movimento q é a direção q acabou de ser executada
                } else{
                    // se o X do bloco ainda não for igual a da coordenada, o X do bloco vai somar mais 5 até chegar
                    this.x += 5
                }
            } else if(this.movimentos[0][2] === "e"){
                // se for para esquerda:
                if(this.x == this.movimentos[0][0]){
                    delDirecao(0)
                    this.movimentos.shift()
                } else{
                    this.x -= 5
                }
            } else if(this.movimentos[0][2]==="b"){
                // se for para baixo:
                if(this.y == this.movimentos[0][1]){
                    // se o Y do bloco for igual a coordenada Y q está nesse movimento para baixo:
                    delDirecao(0)
                    this.movimentos.shift() // remove o primeiro elemento de this.movimento q é a direção q acabou de ser executada
                } else{
                    // se o X do bloco ainda não for igual a da coordenada, o X do bloco vai somar mais 5 até chegar
                    this.y += 5
                }
            } else if(this.movimentos[0][2] === "c"){
                if(this.y == this.movimentos[0][1]){
                    delDirecao(0)
                    this.movimentos.shift()
                } else{
                    this.y -= 5
                }
            }
        } else {
            if(this.estado == estadosBloco.andando){
                // caso o bloco estava andando e terminou de andar
                this.estado = estadosBloco.fim
            }
            // qnd os movimentos acabarem, a estrelinha volta a ficar branca
            mudaCorDiv("white")
        }
    },
    desenhaBloco: function(){
        // vai desenhar o bloco da cor ctx.fillStyle e nas coordenadas indicadas em ctx.fillRect
        ctx.fillStyle = "#f26e11"
        ctx.fillRect(this.x, this.y, this.larg, this.alt)
    },

    moveBloco: function(){
        // moveBloco vai compôr os movimentos de acordo com os elementos dentro de comandos
        for(com in comandos){
            // vai percorrer cada elemento em comandos
            let dir = comandos[com] // dir vai ser cada vetor dentro da matriz comandos [desloc. x, desloc. y, "letra"]
            let x, y // vai guardar cada coordenada novas nos eixos X e Y
            // as novas coordenadas vão ser assim: vai pegar a última posição q o bloco tava para compôr a próxima coordenada somando com o respectivo desloc.
            
            if(com == 0){
                /* se for o primeiro vetor de comandos, vai pegar a coordenada atual do bloco e vai para validação*/
                x = this.x
                y = this.y
            } else{
                // os demais vetores, depois q fizer a primeira coordenada
                /* esse X e Y vai pegar a última coordenada adicionada em movimentos e vai para a validação */
                x = this.movimentos[com-1][0]
                y = this.movimentos[com-1][1]
            }
            
            /* -------------- VALIDAÇÕES -------------- */
            /* estas validações vão ser para se a nova coordena do bloco exceder os limites do canvas */
            if(x+dir[0] == LARGURA || x+dir[0] == 0 - this.larg){
                // o x vai somar com o desloc. x do dir q o for está no momento
                /* se essa soma exceder os limites do canvas:
                 em vez de somar, vai diminuir de x o valor do desloc. x pq aí o bloco vai se manter no
                 lugar, na mesma coordenada e essa coordenada não passar do limite do canvas */
                x -= dir[0]
            }
            if(y+dir[1] == ALTURA || y+dir[1] == 0 - this.alt){
                y -= dir[1]
            }
            
            // dps de todas as validações, vai enviar para movimentos cada coordenadas
            this.movimentos.push([x+dir[0], y+dir[1], dir[2]])
            // movimentos vai ter uma matriz com cada coordenada q o bloco vai passar
        }
        comandos = [] // dps q enviar todos as coordenadas para movimentos, vai resetar comandos
    },

    resetaBloco: function () {
        // quando ganhar ou perder o jogo, essa função vai resetar tudo que for do bloco
        this.x = 0
        this.y = 0
        this.alt = PADRAO
        this.larg = PADRAO
        while (this.movimentos.length) {
            this.movimentos.pop();
        }
        this.estado = estadosBloco.start
    },
}

var silabas = {
    _sibs: [], // vai receber cada quadradinho de sílabas cada um com seus atributos
    posicoes: [], // vai sortear posições dentro do canvas para cada sílaba

    palavra: sorteiaPalavra(), // vai sortear e retornar uma palavra {'imagem', 'word'}
    sibs_certas: [],
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
                // console.log('a');
                sibsSorteada = todasSilabas[linha][coluna] // sílaba sorteada lá de todasSilabas
                
                // console.log(sibsSorteada);
                for (i in this._sibs){
                    // aqui vai verificar se sibsSorteada já foi sorteada
                    if(this._sibs[i].s === sibsSorteada){
                        // console.log("já tem "+sibsSorteada)
                        achou = 1
                        break // quebra o for
                    }
                }
            }
        }while(achou == 1) // se a sílaba já foi sorteada, ele vai repetir até sortear uma que não foi sorteada antes
        // console.log(sibsSorteada)
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
                    // console.log("já tem "+posx+" "+posy)
                    achou = 1
                    break // quebra o for
                }
            }
        } while(achou == 1) // se achou essa coordenada, repete até sortear uma que não foi
        // console.log([posx, posy])
        
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
        // console.log(this._sibs);
        // Há um problema com as posições onde pode acontecer que 5 sílabas formem uma cruz "+" e o bloco não consegue alcançada a do meio sem ter que passar pelas sílabas que estão rodeando ela. É PARA RESOLVER.
    },

    atualizaSilabas: function(){
        // como as sílabas não vão mudar de lugar, elas vão apenas atualizar sua cor quando o bloco passa por cima
        for(var x=0; x<(this._sibs.length); x++){
            let silaba = this._sibs[x]
            if(bloco.x == silaba.x && bloco.y == silaba.y){
                // console.log(`certa: ${silaba.is_essa} / passou: ${silaba.passou}`);
                silaba.passou = true // vai indicar que o bloco passou por essa sílaba
                if (silaba.is_essa) { // se for a sílaba certa, pinta de verde
                    silaba.color = "#37c978"   
                } else { // se for a sílaba errada, pinta de vermelho
                    silaba.color = "#f45728"
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
            // console.log(sib.s);
            
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
        this.posicoes = []
        this.palavra = sorteiaPalavra()

        this.sibs_certas = []
        this.sibs_aleatorias = []
    }
}

function linhas(){
    // isso é p desenhas aquelas linhas no canvas que nem um xadrez
    ctx.strokeStyle="#282828"
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

function numeraCanvas() { // vai enumerar o canvas tipo um batalha naval
    ctx.fillStyle = "#282828"

    // linhas
    let y = 45
    for(var i=0; i<10; i++){
        ctx.font = "40px Arial"
        ctx.fillText(`${i}`, 20, y)
        y += 60
    }
    // colunas
    let x = 80
    for(var i=1; i<10; i++){
        ctx.font = "40px Arial"
        ctx.fillText(`${i}`, x, 45)
        x += 60
    }  
}

/** CAIXINHA DA DIV */
let lista
function mudaCorDiv(cor){
    // muda a cor da estrelinha qnd clicar enter para indicar q os movimentos então sendi executados pelo bloco
    let start = document.querySelector('#start')
    start.style.background = cor
}
function delDirecao(num){
    // vai apagar as setinhas da div
    lista = document.querySelector('#lista')
    let itens = lista.childNodes
    if(num == -1 && itens.length > 0){
        // qnd apertar backspace vai apagar a última setinha clicada
        let ind = itens.length-1
        lista.removeChild(lista.childNodes[ind])
    } else if(num == 0){
        // esse vai apagar as setinhas assim q o movimento for executado
        lista.removeChild(lista.childNodes[0])
    }
}
function addDirecao(simb){
    // vai adicionar, ou remover as setinha da div, ou mudar a cor da estrela p verde
    // simb recebe oq foi clicado
    lista = document.querySelector('#lista')
    if (simb === "back"){
        delDirecao(-1)
    } else if(simb === "enter"){
        mudaCorDiv("#40e347ce")
    }else{
        // essa função vai add as setinhas na div se chegar ness condição
        let item = document.createElement('li')
        let label = document.createElement('label')
        label.innerHTML = simb
        item.appendChild(label)
        lista.appendChild(item)
    }
    
}

function mover(tecla){
    /** RESOLVER: SE EU CLICO NO BOTÃO E DPS NO ENTER, VALE POR 2 ENTER E ISSO NÃO É BOM, EM */
    // essa função identificar qual seta do teclado foi clicada e faz as condições
    let estBloco = bloco.estado
    let img = document.getElementById('img-dica'); // imagem da dica
    if(estBloco == estadosBloco.start && estadoJogo == estados.jogando){
        if(tecla==37){
            // setinha para ESQUERDA: 37
            // letra A: tecla==97 || tecla==65
            comandos.push([-PADRAO, 0, "e"])
            addDirecao("&larr;")
        } else if(tecla==38){
            // setinha para CIMA: 38
            // letra W: tecla==119 || tecla==87
            comandos.push([0, -PADRAO, "c"])
            addDirecao("&uarr;")
        } else if(tecla==39){
            // setinha para DIREITA: 39
            // letra D: tecla==100 ||tecla==68
            comandos.push([PADRAO, 0, "d"])
            addDirecao("&rarr;")
        } else if(tecla==40){
            // setinha para BAIXO: 40
            // letra S: tecla==115 || tecla==83
            comandos.push([0, PADRAO, "b"])
            addDirecao("&darr;")
        } else if(tecla=="play") {
            bloco.moveBloco()
            addDirecao("enter")
        } 
        else if(tecla==8){
            // enter: 13
            comandos.pop()
            addDirecao("back")
        }
    } else if(tecla=="play"){
        // enter: 13
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
            btnplay.children[0].textContent = "PLAY"
            // dps, vai inserir as sílabas sorteadas para cada partida
            silabas.constroiSilabas()
            
            // por fim, muda o estado do jogo
            estadoJogo =  estados.jogando
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
        bloco.atualizaBloco()
        silabas.atualizaSilabas()
    }
}

// desenha o canvas em cada estado do jogo
function canvasJogar() {
    ctx.fillStyle = "#0000004e"
    ctx.fillRect(0, 0, LARGURA, ALTURA)

    ctx.fillStyle = "#f2f2f2"
    ctx.font = "40px Arial"
    ctx.fillText(`COMEÇAR`, 197, 225)

    ctx.fillStyle = "#ff0"
    ctx.fillRect(240, 240, 120, 120)
}
function canvasGanhou() {
    ctx.fillStyle = "#0000004e"
    ctx.fillRect(0, 0, LARGURA, ALTURA)

    ctx.fillStyle = "#f2f2f2"
    ctx.font = "40px Arial"
    ctx.fillText(`VOCÊ GANHOU!`, 145, 225)

    ctx.fillStyle = "#0f0"
    ctx.fillRect(240, 240, 120, 120)
}
function canvasPerdeu() {
    ctx.fillStyle = "#0000004e"
    ctx.fillRect(0, 0, LARGURA, ALTURA)

    ctx.fillStyle = "#f2f2f2"
    ctx.font = "40px Arial"
    ctx.fillText(`VOCÊ PERDEU.`, 155, 225)

    ctx.fillStyle = "#f00"
    ctx.fillRect(240, 240, 120, 120)
}
function canvasJogando() {
    // vai desenhar as sílabas
    silabas.desenhaSilabas()
        
    // vai desenhas o xadrez no canvas
    linhas()

    // desenhas os números
    numeraCanvas()

    // vai desenhar o bloco no canvas a cada posição nova
    bloco.desenhaBloco()

    if (bloco.estado == estadosBloco.fim) {
        let passou_certas = silabas.sibs_certas.every((silaba) => silaba.passou == true)
        let passou_erradas = silabas.sibs_aleatorias.some((silaba) => silaba.passou == true)
        // console.log(`${passou_certas} / ${passou_erradas}`);
        if (passou_certas == true && passou_erradas == false) {
            // ganhou
            estadoJogo = estados.ganhou
        } else {
            // perdeu
            estadoJogo = estados.perdeu
        }
    }
}

function desenha(){
    // essa função vai desenhar tudo no html

    // desenha o canvas
    // ctx.fillStyle = "#014c78"
    // ctx.fillRect(0, 0, LARGURA, ALTURA)
    bg.desenha(0, 0)

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
    canvas = document.createElement("canvas")
    canvas.width = LARGURA
    canvas.height = ALTURA
    canvas.style.border = "1px solid #282828";
    // o contexto do canvas é 2d, só poder fazer desenhos de figuras 2d
    ctx = canvas.getContext("2d")
    // adiciona esse canvas criado no html
    document.body.appendChild(canvas)

    // iniciamente, o estado do jogo começa em 'jogar':0
    estadoJogo = estados.jogar

    // isso vai identidicar qual tecla foi clicada
    document.addEventListener('keydown', (event) => {

        var num = event.keyCode // cada tecla tem um código q identifica ela
        mover(num) // envio esse código p função "mover()" lá em cima e faços as condições (if) p pegar só os códigos referentes as setas
    })
    document.getElementById("btn-play").addEventListener('click', () => {
        mover("play")
    })
    img = new Image();
    img.src = "imagens/sheet.png"
    roda() // aqui da o start p renderisar os quadros
}
main() // chamo a função main() p começar tudo