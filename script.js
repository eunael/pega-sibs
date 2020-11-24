let canvas, ctx, ALTURA=600, LARGURA=600, PADRAO=60, tempo=50;
let comandos = []
var bloco = {
    x: 240,
    y: 240,
    alt: 60,
    larg: 60,
    movimentos: [],

    atualizaBloco: function(){
        if(this.movimentos.length != 0){
            if(this.movimentos[0][2]==="d"){
                if(this.x == this.movimentos[0][0]){
                    delDirecao(0)
                    this.movimentos.shift()
                } else{
                    this.x += 5
                }
            } else if(this.movimentos[0][2] === "e"){
                if(this.x == this.movimentos[0][0]){
                    delDirecao(0)
                    this.movimentos.shift()
                } else{
                    this.x -= 5
                }
            } else if(this.movimentos[0][2]==="b"){
                if(this.y == this.movimentos[0][1]){
                    delDirecao(0)
                    this.movimentos.shift()
                } else{
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
            mudaCorDiv("white")
        }
    },
    desenhaBloco: function(){
        ctx.fillStyle = "#ff0000"
        ctx.fillRect(this.x, this.y, this.larg, this.alt)
    },

    moveBloco: function(){
        for(com in comandos){
            let dir = comandos[com]
            let x, y
            if(com == 0){
                x = this.x
                y = this.y
            } else{
                x = this.movimentos[com-1][0]
                y = this.movimentos[com-1][1]
            }
            if(x+dir[0] == LARGURA || x+dir[0] == 0 - this.larg){
                x -= dir[0]
            }
            if(y+dir[1] == ALTURA || y+dir[1] == 0 - this.alt){
                y -= dir[1]
            }
            this.movimentos.push([x+dir[0], y+dir[1], dir[2]])
        }
        comandos = []
    },
}

function linhas(){
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
    let seta
    if(tecla==37){
        // setinha para ESQUERDA: 37
        // letra A: tecla==97 || tecla==65
        comandos.push([-60, 0, "e"])
        addDirecao("&larr;")
    } else if(tecla==38){
        // setinha para CIMA: 38
        // letra W: tecla==119 || tecla==87
        comandos.push([0, -60, "c"])
        addDirecao("&uarr;")
    } else if(tecla==39){
        // setinha para DIREITA: 39
        // letra D: tecla==100 ||tecla==68
        comandos.push([60, 0, "d"])
        addDirecao("&rarr;")
    } else if(tecla==40){
        // setinha para BAIXO: 40
        // letra S: tecla==115 || tecla==83
        comandos.push([0, 60, "b"])
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
}
function atualiza(){
    bloco.atualizaBloco()
}

function desenha(){
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, LARGURA, ALTURA)
    linhas()
    bloco.desenhaBloco()
}

function roda(){
    atualiza()
    desenha()
    window.requestAnimationFrame(roda)
}
function main(){
    canvas = document.createElement("canvas")
    canvas.width = LARGURA
    canvas.height = ALTURA
    ctx = canvas.getContext("2d")
    document.addEventListener('keydown', (event) => {
        var num = event.keyCode
        mover(num)
    })
    roda()
    document.body.appendChild(canvas)
}
main()