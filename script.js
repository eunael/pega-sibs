let canvas, ctx; // essas variáveis, mais p frente, vão guardar informações p construir o canvas
let ALTURA=600, LARGURA=600; // dimensões do canvas em pixels
let PADRAO=60; // padronizar o tamanho do elementos dentro ddo canvas

let comandos = [] 
/* este array vai se uma matriz que vai guardar: [deslocamento no eixo X, deslocamento no eixo Y, "inicial da direção"], esses valores vão depender das setinhas q foram clicadas antes de dar enter */

// SÍLABAS
// todas as sílabas
let todasSilabas = [
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
    y: ALTURA - PADRAO, // eixo Y
    // a partir do ponto acima vai dimencionar o bloco dando altura e largura para ele
    alt: PADRAO, // altura
    larg: PADRAO, // largura
    movimentos: [], /* qnd clicar enter, vai chamar a função moveBloco() e os elementos dentro de comandos vão
    compôr as coordenadas q o bloco vai percorrer pelo canvas. movimentos vai guardar coordenadas  junto com
    a inicial da direção q o bloco vai (d, e, c, b) */
    estadoBloco: false, // vai indicar o estado do bloco, se ele está andando (true) ou parado (false)

    atualizaBloco: function(){
        // atualizaBloco vai atualizar a posição do bloco a cada movimento executado antes do bloco ser desenhado novamente

        /* -------------- VALIDAÇÕES -------------- */
        if(this.movimentos.length != 0){
            // se ainda tiver algum movimento dentro de this.movimentos para ser executado:
            this.estadoBloco = true
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
        } else{
            // qnd os movimentos acabarem, a estrelinha volta a ficar branca
            this.estadoBloco = false
            mudaCorDiv("white")
        }
    },
    desenhaBloco: function(){
        // vai desenhar o bloco da cor ctx.fillStyle e nas coordenadas indicadas em ctx.fillRect
        ctx.fillStyle = "#ff0000"
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
}

var silabas = {
    _sibs: [], // vai receber cada quadradinho de sílabas cada um com seus atributos
    posicoes: [], // vai sortear posições dentro do canvas para cada sílaba

    sorteiaSilaba: function(){
        let linha, coluna, sibsSorteada, achou;
        // sorteia uma sílaba e vê se ela já existe, se existir ele sortea outra
        do {
            achou = 0 // essa variável vai identificar se a sílaba que vai ser sorteada já foi sorteada antes
            linha = Math.floor(Math.random()*todasSilabas.length) //consoante
            coluna = Math.floor(Math.random()*5) //vogal
            sibsSorteada = todasSilabas[linha][coluna] // sílaba sorteada lá de todasSilabas
            for (i in this._sibs){
                // aqui vai verificar se sibsSorteada já foi sorteada
                if(this._sibs[i].s === sibsSorteada){
                    console.log("já tem "+sibsSorteada)
                    achou = 1
                    break // quebra o for
                }
            }
        }while(achou == 1) // se a sílaba já foi sorteada, ele vai repetir até sortear uma que não foi sorteada antes
        // console.log(sibsSorteada)
        return sibsSorteada // vai retornar um sílaba que não foi sorteada antes
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
                    console.log("já tem "+posx+" "+posy)
                    achou = 1
                    break // quebra o for
                }
            }
        } while(achou == 1) // se achou essa coordenada, repete até sortear uma que não foi
        // console.log([posx, posy])
        
        return [posx, posy] // retorna uma coordenada que nunca foi sorteada
    },

    constroiSilabas: function(){
        for (var x=0; x<14; x++){ // x máx é 64, se for mais vai cair num loop eterno
            let sib = this.sorteiaSilaba()
            let posis = this.sorteiaPosicao()
            // console.log([sib, posis])
            this._sibs.push({
                color: "#fff",
                x: posis[0],
                y: posis[1],
                largSilaba: PADRAO,
                altSilaba: PADRAO,
                s: sib,
                passou: false
            })
        }
        // Há um problema com as posições onde pode acontecer que 5 sílabas formem uma cruz "+" e o bloco não consegue alcançada a do meio sem ter que passar pelas sílabas que estão rodeando ela. É PARA RESOLVER.
    },

    atualizaSilabas: function(){
        // p fazer
    },

    desenhaSilabas: function(){
        for(var b=0; b<this._sibs.length; b++){
            let sib = this._sibs[b]
            ctx.fillStyle = sib.color
            ctx.fillRect(sib.x, sib.y, sib.largSilaba, sib.largSilaba)
            ctx.fillStyle = "#0f0"
            ctx.font = "30px Arial"
            ctx.fillText(sib.s, sib.x+7, sib.y+40)
        }
    }
}

function linhas(){
    // isso é p desenhas aquelas linhas no canvas que nem um xadrez
    ctx.strokeStyle="#009f00"
    for(var x=PADRAO; x<LARGURA; x+=PADRAO){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ALTURA);
        ctx.stroke();
    }
    for(var x=PADRAO; x<ALTURA; x+=PADRAO){
        ctx.beginPath();
        ctx.moveTo(0, x);
        ctx.lineTo(LARGURA, x);
        ctx.stroke();
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
    if(num == -1){
        // qnd apertar backspace vai apagar a última setinha clicada
        let ind = itens.length-1
        lista.removeChild(lista.childNodes[ind])
    } else if(num == 0){
        // esse vai apagar as setinhas assim q o movimento for executado
        lista.removeChild(lista.childNodes[0])
    }
}
function addDirecao(simb){
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
    // essa função identificar qual seta do teclado foi clicada e faz as condições
    let estBloco = bloco.estadoBloco
    if(!estBloco){
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
        } else if(tecla==13){
            // enter: 13
            bloco.moveBloco()
            addDirecao("enter")
        } else if(tecla==8){
            // enter: 13
            comandos.pop()
            addDirecao("back")
        }
    } else {
        // console.log('o bloco tá andando, calma')
    }
}

function atualiza(){
    // essa função vai atualizar tudas as posições antes de desenhar
    bloco.atualizaBloco()
}
function desenha(){
    // essa função vai desenhar tudo no html

    // desenha o canvas
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, LARGURA, ALTURA)

    // vai desenhas o xadrez no canvas
    linhas()

    // vai desenhar as sílabas
    silabas.desenhaSilabas()

    // vai desenhar o bloco no canvas a cada posição nova
    bloco.desenhaBloco()
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
    // o contexto do canvas é 2d, só poder fazer desenhos de figuras 2d
    ctx = canvas.getContext("2d")
    // adiciona esse canvas criado no html
    document.body.appendChild(canvas)

    // vai inserir as sílabas sorteadas para cada partida
    silabas.constroiSilabas()

    // isso vai identidicar qual tecla foi clicada
    document.addEventListener('keydown', (event) => {

        var num = event.keyCode // cada tecla tem um código q identifica ela
        mover(num) // envio esse código p função "mover()" lá em cima e faços as condições (if) p pegar só os códigos referentes as setas
    })
    roda() // aqui da o start p renderisar os quadros
}
main() // chamo a função main() p começar tudo