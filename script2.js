import { Bloco } from './components/Bloco.js'
import { Silabas } from './components/Silabas.js'
import { Sprite } from './components/Sprite.js';
import { GameState } from './utils/estadoJogo.js'

let canvas, ctx, frame=1, plano=600, padrao=60, bloco, spriteBloco, silabas,
comecaJogo, perdeuJogo, ganhouJogo, estadoJogo;

function linhas(){
    ctx.strokeStyle="#262626"
    ctx.lineWidth = 1
    // vertical
    for(var x=padrao; x<plano; x+=padrao){
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, plano);
        ctx.stroke();
    }
    // horizontal
    for(var y=padrao; y<plano; y+=padrao){
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(plano, y);
        ctx.stroke();
    }
}

function mover(tecla) {
    let img = document.getElementById('img-dica');
    let dir_img = "imagens/dicas/"

    if(estadoJogo.getState() == "jogando"){
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
    } else if(tecla=='click') {
        if(estadoJogo.getState() == "jogar"){
            bloco.resetaBloco()
            silabas.resetaSilabas(true)

            silabas.constroiPalavra()
            silabas.constroiSilabas()

            let palavra = silabas.getPalavra()

            // let img_src = img.getAttribute('src') + palavra.imagem
            img.setAttribute('src', `${dir_img}${palavra.imagem}`)
            img.style.display = 'block'

            estadoJogo.setState(1)
        } else if ((estadoJogo.getState() == "ganhou" || estadoJogo.getState() == "perdeu")) {
            // let img_src_split = img.getAttribute('src').split('/')
            // let img_src = `${img_src_split[0]}/${img_src_split[1]}/`
            img.setAttribute('src', "")
            img.style.display = "none"
            
            estadoJogo.setState(0)
        }
    }
}

function atualiza(){
    if(estadoJogo.getState() == "jogando"){
        frame++;
        let infoBloco = bloco.getAtributos()
        silabas.atualiza(infoBloco.x, infoBloco.y)
    } else {
        frame = 0
    }
}

function desenha(){
    if (estadoJogo.getState() == "jogar") {
        ctx.save();
        ctx.resetTransform();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.fillStyle = "#014c78"

        ctx.fillRect(0, 0, plano, plano)
        comecaJogo.desenha(95, 150)
    } else if(estadoJogo.getState() == "jogando"){
        ctx.clearRect(0, 0, plano, plano)
        ctx.fillStyle = "#014c78"
        ctx.fillRect(0, 0, plano, plano)

        silabas.desenha()

        linhas()
        
        bloco.desenhaBloco(frame)
    } else if (estadoJogo.getState()  == "ganhou") {
        ctx.clearRect(0, 0, plano, plano)
        ctx.fillStyle = "#014c78"
        ctx.fillRect(0, 0, plano, plano)
        ganhouJogo.desenha(95, 150)
    } else if (estadoJogo.getState()  == "perdeu") {
        ctx.clearRect(0, 0, plano, plano)
        ctx.fillStyle = "#014c78"
        ctx.fillRect(0, 0, plano, plano)
        perdeuJogo.desenha(95, 150)
    }
}

function roda() {
    atualiza()
    desenha()

    window.requestAnimationFrame(roda)
}

function main() {
    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    canvas.width = plano
    canvas.height = plano
    canvas.style.border = "1px solid #282828";
    ctx = canvas.getContext("2d")

    estadoJogo = new GameState()
    estadoJogo.setState(0)

    comecaJogo = new Sprite(canvas, 20, 650, 406, 300);
    perdeuJogo = new Sprite(canvas, 447, 650, 406, 300);
    ganhouJogo = new Sprite(canvas,874, 650, 406, 300);
    
    spriteBloco = new Sprite(canvas, 620, 0, 60, 60)
    bloco = new Bloco(padrao, plano, spriteBloco)

    silabas = new Silabas(padrao, estadoJogo, canvas)

    document.getElementById('telaCanvas').appendChild(canvas)

    document.body.addEventListener('keydown', (event) => {
        var num = event.keyCode
        mover(num)
    })
    document.getElementById('canvas').addEventListener('click', function() {
        mover('click')
    })
    document.querySelectorAll(['.direcoes']).forEach(element => {
        element.addEventListener('mousedown', function() {
            let num = Number(element.getAttribute('direc'))
            mover(num)
            console.log(num);
        })
    });

    roda()
}
main()