const estados = [ 
    'jogar', // 0
    'jogando', // 1
    'ganhou', // 2
    'perdeu', // 3
];

export function GameState() {
    let state = 0
    return {
        getState: () => {
            return state
        },
        setState: (val) => {
            state = estados[val]
        }
    }
}