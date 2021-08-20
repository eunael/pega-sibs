const estados = [ 
    'jogar',
    'jogando',
    'ganhou',
    'perdeu',
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