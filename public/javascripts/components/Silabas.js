import { sorteiaPalavra, sorteiaSilaba, sorteiaPosicao } from '../utils/silabas.js'

export function Silabas(stateGame, canvas){
    let objs_sibs = [],
        sibs_certas = [],
        sibs_aleatorias = [],
        numSib = 12,
        palavra;
    
    return {
        constroiPalavra: () => {
            var coord, coord_existe;
            palavra = sorteiaPalavra()

            palavra.word.forEach(sib => {
                do {
                    coord = sorteiaPosicao()
                    coord_existe = objs_sibs.some((obj) => obj.x==coord[0] && obj.y==coord[1])
                } while (coord_existe)

                const objeto = {
                    s: sib,
                    color: "#f2f2f2",
                    x: coord[0],
                    y: coord[1],
                    // largSilaba: dimenBloco,
                    // altSilaba: dimenBloco,
                    passou: false,
                    is_essa: true,
                }

                objs_sibs.push(objeto)
                sibs_certas.push(objeto)
            });
        },
        constroiSilabas: () => {
            var silaba, sib_existe=false, coord, coord_existe=false;

            for (var i = 0; i < (numSib + Math.trunc(palavra.word.length / 3)); i++){
                do {
                    silaba = sorteiaSilaba()
                    sib_existe = objs_sibs.some((obj) => obj.s === silaba || silaba==null)
                } while(sib_existe)
                do {
                    coord = sorteiaPosicao()
                    coord_existe = objs_sibs.some((obj) => obj.x==coord[0] && obj.y==coord[1])
                } while (coord_existe)

                const objeto = {
                    s: silaba,
                    color: "#f2f2f2",
                    x: coord[0],
                    y: coord[1],
                    // largSilaba: dimenBloco,
                    // altSilaba: dimenBloco,
                    passou: false,
                    is_essa: false,
                }

                objs_sibs.push(objeto)
                sibs_aleatorias.push(objeto)
            }
        },
        atualiza: (blocoX, blocoY, dimenPlano) => {
            objs_sibs.forEach((sib, index) => {
                var esta_na_ordem=true, sib_certa, sib_certa_anterior, index_sib_certa;
                if(blocoX == (dimenPlano*sib.x/600) && blocoY == (dimenPlano*sib.y/600)){
                    sib.passou = true
                    if(sib.is_essa){
                        sib_certa = sibs_certas.find(elem => elem.s == sib.s)
                        sib_certa.passou = true

                        index_sib_certa = sibs_certas.findIndex(elem => elem.s == sib.s)
                        if(index_sib_certa - 1 > -1){
                            sib_certa_anterior = sibs_certas[index_sib_certa-1]
                            if(sib_certa_anterior.passou == false){
                                esta_na_ordem = false
                            }
                        }
                    }

                    if (esta_na_ordem && sib.is_essa) {
                        sib.color = "#37c978"
                        let passou_certas = sibs_certas.every((silaba) => silaba.passou == true)
                        let passou_erradas = sibs_aleatorias.some((silaba) => silaba.passou == true)
                        if (passou_certas == true && passou_erradas == false) {
                            setTimeout(function() {
                                stateGame.setState(2)
                            }, 10)
                            // document.getElementById('btn-play').removeAttribute('disabled')
                            // document.getElementById('btn-play').style.backgroundColor = "#00966b"
                        }
                    } else {
                        sib.color = "#f45728"
                        setTimeout(function() {
                            stateGame.setState(3)
                        }, 10)
                        // document.getElementById('btn-play').removeAttribute('disabled')
                        // document.getElementById('btn-play').style.backgroundColor = "#00966b"
                    }
                }
            })
        },
        desenha: (dimenBloco, dimenPlano) => {
            let ctx = canvas.getContext('2d')
            objs_sibs.forEach(sib => {
                let coordX = (dimenPlano*sib.x/600), coordY = (dimenPlano*sib.y/600);
                ctx.fillStyle = sib.color
                ctx.fillRect(coordX, coordY, dimenBloco, dimenBloco)
                ctx.fillStyle = "#282828"

                var sizeFont = 25 * dimenBloco / 60
                // ctx.fillText(sib.s, sib.x+3, sib.y+40)
                if (sib.s.includes("Q")) { // sílabas com Q
                    ctx.font = `${sizeFont}px Arial`
                    // ctx.font = "25px Arial"
                    ctx.fillText(sib.s, coordX+(3*dimenBloco/60), coordY+(40*dimenBloco/60))
                } else {
                    // var sizeFont = 30 * dimenBloco / 60
                    ctx.font = `${sizeFont}px Arial`
                    if (sib.s.includes('I')) { // sílabas com I
                        ctx.fillText(sib.s, coordX+(15*dimenBloco/60), coordY+(40*dimenBloco/60))
                    } else { // sílabas com A, E, O ou U
                        ctx.fillText(sib.s, coordX+(12*dimenBloco/60), coordY+(40*dimenBloco/60))
                    }
                }
            })
        },
        desenhaSibsPassou: (dimenBloco, dimenPlano) => {
            let sibsPassou = objs_sibs.filter((val) => {
                if(val.passou){
                    return val;
                }
            })
            let ctx = canvas.getContext('2d')
            sibsPassou.forEach(sib => {
                let coordX = (dimenPlano*sib.x/600), coordY = (dimenPlano*sib.y/600);
                ctx.fillStyle = sib.color
                ctx.fillRect(coordX, coordY, dimenBloco, dimenBloco)
                ctx.fillStyle = "#282828"

                var sizeFont = 25 * dimenBloco / 60
                // ctx.fillText(sib.s, sib.x+3, sib.y+40)
                if (sib.s.includes("Q")) { // sílabas com Q
                    ctx.font = `${sizeFont}px Arial`
                    // ctx.font = "25px Arial"
                    ctx.fillText(sib.s, coordX+(3*dimenBloco/60), coordY+(40*dimenBloco/60))
                } else {
                    // var sizeFont = 30 * dimenBloco / 60
                    ctx.font = `${sizeFont}px Arial`
                    if (sib.s.includes('I')) { // sílabas com I
                        ctx.fillText(sib.s, coordX+(15*dimenBloco/60), coordY+(40*dimenBloco/60))
                    } else { // sílabas com A, E, O ou U
                        ctx.fillText(sib.s, coordX+(12*dimenBloco/60), coordY+(40*dimenBloco/60))
                    }
                }
            })
        },
        resetaSilabas: (all=false) => {
            if(all){
                objs_sibs = []
                palavra = sorteiaPalavra()
        
                sibs_certas = []
                sibs_aleatorias = []
            } else {
                objs_sibs.forEach(sib => {
                    sib.color = "#f2f2f2";
                    sib.passou = false
                })
                sibs_certas.forEach(sib => {
                    sib.color = "#f2f2f2";
                    sib.passou = false
                })
                sibs_aleatorias.forEach(sib => {
                    sib.color = "#f2f2f2";
                    sib.passou = false
                })
            }
        },
        getPalavra: () => {
            if(palavra){
                return palavra
            }

            return null
        }
    }

}
