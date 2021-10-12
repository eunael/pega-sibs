import { Bloco } from './components/Bloco.js';
import { Silabas } from './components/Silabas.js';
import { Sprite } from './components/Sprite.js';
import { GameState } from './utils/estadoJogo.js';

let canvas, ctx, frame=1, plano, padrao, bloco, spriteBloco, silabas,
comecaJogo, perdeuJogo, ganhouJogo, estadoJogo, dir_img = "../images/dicas/";

function detectar_mobile() { 
    if( navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}

/* setar um tamanho do canvas para cada tamanho de tela*/
function setSizePC(){
    let width = window.innerWidth
    let val;
    if (width < 576){
        val = 300
    } else if (width < 768) {
        val = 360
    } else if (width < 992) {
        val = 420
    } else {
        val = 600
    }

    return val
}

// window.addEventListener('resize',  () => {
//     if(detectar_mobile()){
//         plano = setSizeMobile()
//     } else {
//         plano = setSizePC()
//     }
//     padrao = plano / 10
//     canvas.width = plano
//     canvas.height = plano
//     let blocoAtt = bloco.getAtributos()
//     bloco.atualizaBloco(blocoAtt.quadroX*padrao, blocoAtt.quadroY*padrao, plano, padrao, true)
// })
/** */

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

    if(estadoJogo.getState() == "jogando"){
        if(tecla==38){
            // setinha para CIMA: 38
            // letra W: tecla==119 || tecla==87
            bloco.atualizaBloco(0, -padrao, plano, padrao)
        } else if(tecla==39){
            // setinha para DIREITA: 39
            // letra D: tecla==100 ||tecla==68
            bloco.atualizaBloco(padrao, 0, plano, padrao)
        } else if(tecla==40){
            // setinha para BAIXO: 40
            // letra S: tecla==115 || tecla==83
            bloco.atualizaBloco(0, padrao, plano, padrao)
        } else if(tecla==37){
            // setinha para ESQUERDA: 37
            // letra A: tecla==97 || tecla==65
            bloco.atualizaBloco(-padrao, 0, plano, padrao)
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
            // img.style.display = 'block'

            estadoJogo.setState(1)
        } else if ((estadoJogo.getState() == "ganhou" || estadoJogo.getState() == "perdeu")) {
            // let img_src_split = img.getAttribute('src').split('/')
            // let img_src = `${img_src_split[0]}/${img_src_split[1]}/`
            img.setAttribute('src', `${dir_img}vamos-la.png`)
            
            estadoJogo.setState(0)
        }
    }
}

function atualiza(){
    if(estadoJogo.getState() == "jogando"){
        frame++;
        let infoBloco = bloco.getAtributos()
        silabas.atualiza(infoBloco.x, infoBloco.y, plano)
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
        comecaJogo.desenha((406*plano/600)/4, (300*plano/600)/2, plano)
    } else if(estadoJogo.getState() == "jogando"){
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "#014c78"
        ctx.fillRect(0, 0, plano, plano)
        
        silabas.desenha(padrao, plano)
        
        linhas()
        
        bloco.desenhaBloco(frame, padrao, spriteBloco)
    } else if (estadoJogo.getState()  == "ganhou") {
        ganhouJogo.desenha((406*plano/600)/4, (300*plano/600)/2, plano)
    } else if (estadoJogo.getState()  == "perdeu") {
        perdeuJogo.desenha((406*plano/600)/4, (300*plano/600)/2, plano)
    }
}

function roda() {
    atualiza()
    desenha()

    window.requestAnimationFrame(roda)
}

function main() {
    if(detectar_mobile()){
        plano = 360
    } else {
        plano = setSizePC()
        window.addEventListener('resize',  () => {
            plano = setSizePC()
            padrao = plano / 10
            canvas.width = plano
            canvas.height = plano
            let blocoAtt = bloco.getAtributos()
            bloco.atualizaBloco(blocoAtt.quadroX*padrao, blocoAtt.quadroY*padrao, plano, padrao, true)
        })
    }
    padrao = plano / 10

    let img = document.getElementById('img-dica')
    img.setAttribute('src', `${dir_img}vamos-la.png`)

    canvas = document.createElement('canvas')
    canvas.setAttribute('id', 'canvas')
    canvas.width = plano
    canvas.height = plano
    canvas.style.border = "1px solid #282828";
    ctx = canvas.getContext("2d")

    // Objetos
    estadoJogo = new GameState()
    bloco = new Bloco()
    silabas = new Silabas(estadoJogo, canvas)

    // Sprites
    comecaJogo = new Sprite(canvas, 20, 650, 406, 300);
    perdeuJogo = new Sprite(canvas, 447, 650, 406, 300);
    ganhouJogo = new Sprite(canvas,874, 650, 406, 300);
    spriteBloco = new Sprite(canvas, 620, 0, 60, 60)

    estadoJogo.setState(0)

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
        })
    });
    
    roda()
}
main()