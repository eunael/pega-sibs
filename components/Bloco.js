export function Bloco(dimenBloco, dimenPlano, sprite){
    var x=0, y=0, alt=dimenBloco, larg=dimenBloco, plano=dimenPlano;
    return {

        atualizaBloco: (coordX, coordY) => {
            if(x + coordX >= 0 && x + larg + coordX <= plano && y + coordY >= 0 && y + alt + coordY <= plano){
                x += coordX;
                y += coordY
            }
        },

        desenhaBloco: (frame) => {
            sprite.desenhaSpriteBloco(frame, x, y, dimenBloco)
        },

        resetaBloco: () => {
            x = y = 0
        },

        getAtributos: () => {
            return {
                x: x, y: y, tamanho: dimenBloco
            }
        }
    }
}
