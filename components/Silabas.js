import { sorteiaPalavra, sorteiaSilaba, sorteiaPosicao } from '../utils/silabas.js'

export function Silabas(dimenBloco, stateGame, canvas){
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
                    largSilaba: dimenBloco,
                    altSilaba: dimenBloco,
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
                    largSilaba: dimenBloco,
                    altSilaba: dimenBloco,
                    passou: false,
                    is_essa: false,
                }

                objs_sibs.push(objeto)
                sibs_aleatorias.push(objeto)
            }
        },
        atualiza: (blocoX, blocoY) => {
            objs_sibs.forEach((sib, index) => {
                var esta_na_ordem=true, sib_certa, sib_certa_anterior, index_sib_certa;
                if(blocoX == sib.x && blocoY == sib.y){
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
        desenha: () => {
            // console.log(objs_sibs);
            let ctx = canvas.getContext('2d')
            objs_sibs.forEach(sib => {
                ctx.fillStyle = sib.color
                ctx.fillRect(sib.x, sib.y, sib.largSilaba, sib.largSilaba)
                ctx.fillStyle = "#282828"
                ctx.font = "25px Arial"
                ctx.fillText(sib.s, sib.x+3, sib.y+40)
                /*
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
                */
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
