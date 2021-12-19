let trs = document.getElementsByClassName('tr-hover')
let divs = document.getElementsByClassName('div-action')

Array.from(trs).forEach((elem, idx) => {
    elem.addEventListener("mouseenter", ()=>{
        divs[idx].style.visibility = 'visible'
    })
});
Array.from(trs).forEach((elem, idx) => {
    elem.addEventListener("mouseout", ()=>{
        divs[idx].style.visibility = 'hidden'
    })
});
Array.from(divs).forEach((elem, idx) => {
    elem.addEventListener("mouseenter", () => {
        if(elem.style.visibility="hidden"){
            elem.style.visibility = "visible"
            console.log("enter-div");
        }
    })
    let children = elem.childNodes
    Array.from(children).forEach((chil, idx) => {
        chil.addEventListener("mouseenter", () => {
            if(elem.style.visibility="hidden"){
                elem.style.visibility = "visible"
            }
        })
    })
})

document.addEventListener('keydown', (event) => {
    let element = document.getElementById('click-j')

    if (event.keyCode == 74) {
        element.classList.remove('d-none')
    } else if(event.keyCode == 70){
        element.classList.add('d-none')
    }
})