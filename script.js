let canvas, ctx, ALTURA=600, LARGURA=600, QUADRO=60, dimenBloco=60, somaBloco=60, PADRAO=60;
var bloco = {
    x: -60 + dimenBloco, //0 + 20
    y: 480 + dimenBloco, // 600 - 60 + 20
    largBloco: dimenBloco, // 20
    altBloco: dimenBloco, // 20

    moveBloco: function(dirX, dirY){
        if (this.x + dirX < -1 || this.x+this.largBloco+dirX > LARGURA+1){
            
        } else{
            this.x += dirX
        }
        if (this.y + dirY < -1 || this.y+this.altBloco+dirY > ALTURA+1){
            
        } else{
            this.y += dirY
        }
        
    },
    desenhaBloco: function(){
        ctx.fillStyle ="#0f0"
        ctx.fillRect(this.x, this.y, this.largBloco, this.altBloco)
    }
}


let lista
function mudaCorDiv(cor){
    let start = document.querySelector('#start')
    start.style.background = cor
    
}
function delDirecao(num){
    lista = document.querySelector('#lista')
    let itens = lista.childNodes
    if(num == -1){
        let ind = itens.length-1
        lista.removeChild(lista.childNodes[ind])
    } else if(num == 0){
        lista.removeChild(lista.childNodes[0])
    }
    
}
function addDirecao(simb){
    lista = document.querySelector('#lista')
    if (simb === "back"){
        delDirecao(-1)
    } else if(simb === "enter"){
        mudaCorDiv("#40e347ce")
    }else{
        let item = document.createElement('li')
        let label = document.createElement('label')
        label.innerHTML = simb
        item.appendChild(label)
        lista.appendChild(item)
    }
    
}

function mover(tecla){
    if (tecla==13){
        // ENTER
        addDirecao("enter")
        bloco.moveBloco(0,0)
    } else if(tecla==37){
        // setinha para ESQUERDA: 37
        // letra A: tecla==97 || tecla==65
        addDirecao("&larr;")
        bloco.moveBloco(-somaBloco,0)
    } else if(tecla==38){
        // setinha para CIMA: 38
        // letra W: tecla==119 || tecla==87
        addDirecao("&uarr;")
        bloco.moveBloco(0,-somaBloco)
    } else if(tecla==39){
        // setinha para DIREITA: 39
        // letra D: tecla==100 ||tecla==68
        addDirecao("&rarr;")
        bloco.moveBloco(somaBloco,0)
    } else if(tecla==40){
        // setinha para BAIXO: 40
        // letra S: tecla==115 || tecla==83
        addDirecao("&darr;")
        bloco.moveBloco(0,somaBloco)	
    }
}

function linhas(){
    ctx.strokeStyle="green"
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

function desenha(){
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, LARGURA, ALTURA)
    linhas()
    bloco.desenhaBloco()
}
function roda(){
    desenha()
    window.requestAnimationFrame(roda)
}

function main(){
    canvas = document.createElement("canvas")
    canvas.width = LARGURA
    canvas.height = ALTURA
    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)

    document.addEventListener('keydown', (event) => {
        var num = event.keyCode
        mover(num)
    })
    roda()
}
main()