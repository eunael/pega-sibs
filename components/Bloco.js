export function Bloco(){
    var x=0, y=0, quadroX=0, quadroY=0, tamanho;
    return {
        atualizaBloco: (coordX, coordY, dimenPlano, dimenBloco, setPosi=false) => {
            if(setPosi){
                x = coordX
                y = coordY
                return
            }
            if(x + coordX >= 0 && x + dimenBloco + coordX <= dimenPlano && y + coordY >= 0 && y + dimenBloco + coordY <= dimenPlano){
                quadroX += (coordX/dimenBloco)
                quadroY += (coordY/dimenBloco)
                x += coordX
                y += coordY
            }
        },

        desenhaBloco: (frame, dimenBloco, sprite) => {
            tamanho = dimenBloco
            sprite.desenhaSpriteBloco(frame, x, y, dimenBloco)
        },

        resetaBloco: () => {
            x = y = 0
        },

        getAtributos: () => {
            return {
                x: x, y: y, quadroX:quadroX, quadroY:quadroY, tamanho: tamanho
            }
        }
    }
}
