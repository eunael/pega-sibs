let canvas, ctx, ALTURA=600, LARGURA=600, QUADRO=60, dimenBloco=60, somaBloco=60, PADRAO=60;

let comandos = []
var bloco = {
    x: -60 + dimenBloco, //0 + 20
    y: 480 + dimenBloco, // 600 - 60 + 20
    largBloco: dimenBloco, // 20
    altBloco: dimenBloco, // 20
    cor: "#0f0",
    movimentos: [],
    espera: 0,

    atualizaBloco: function(){
        if(this.movimentos.length != 0){
            this.espera = 1
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
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largBloco, this.altBloco)
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
            if(x+dir[0] == LARGURA || x+dir[0] == 0 - this.largBloco){
                x -= dir[0]
            }
            if(y+dir[1] == ALTURA || y+dir[1] == 0 - this.altBloco){
                y -= dir[1]
            }
            this.movimentos.push([x+dir[0], y+dir[1], dir[2]])
        }
        comandos = []
    },
    resetBloco: function(){
        this.x = sortPos()
        this.y = sortPos()
        this.movimentos = []
        this.espera = 0
        comandos = []
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
        // qnd aperta backsapce
        let ind = itens.length-1
        lista.removeChild(lista.childNodes[ind])
    } else if(num == 0){
        // depois q o bloco executa um movimento
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
        comandos.push([-60, 0, "e"])
        addDirecao("&larr;")
        // bloco.moveBloco(-somaBloco,0)
    } else if(tecla==38){
        // setinha para CIMA: 38
        // letra W: tecla==119 || tecla==87
        comandos.push([0, -60, "c"])
        addDirecao("&uarr;")
        // bloco.moveBloco(0,-somaBloco)
    } else if(tecla==39){
        // setinha para DIREITA: 39
        // letra D: tecla==100 ||tecla==68
        comandos.push([60, 0, "d"])
        addDirecao("&rarr;")
        // bloco.moveBloco(somaBloco,0)
    } else if(tecla==40){
        // setinha para BAIXO: 40
        // letra S: tecla==115 || tecla==83
        comandos.push([0, 60, "b"])
        addDirecao("&darr;")
        // bloco.moveBloco(0,somaBloco)	
    } else if(tecla==8){
        // backspace
        addDirecao("back")
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

function atualiza(){
    bloco.atualizaBloco()
}

function desenha(){
    ctx.fillStyle = "#000"
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
    document.body.appendChild(canvas)

    document.addEventListener('keydown', (event) => {
        var num = event.keyCode
        mover(num)
    })
    roda()
}
main()