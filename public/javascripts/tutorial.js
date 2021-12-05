// restar e dá play um vídeo (tutorial)
function resetAndPlayVideo(elem){
    elem.pause();
    elem.currentTime = 0;
    elem.play();
}

// botões do carrosel
const btnPrev = document.getElementById('btn-previous')
const btnNext = document.getElementById('btn-next')

// slides do carrossel
let slides = document.querySelectorAll('.slides')

function passaSlide(){
    var proxSlide;
    slides.forEach((elem, idx) => {
        if(!elem.classList.contains('d-none')){
            proxSlide = idx+1 == slides.length ? 0 : idx+1;
            elem.classList.add('d-none')
            var videoAnt = elem.getElementsByTagName('video')
            Array.from(videoAnt).forEach(elem=>{
                if(elem){
                    elem.pause()
                }
            })
        }
    })
    slides[proxSlide].classList.remove('d-none')
    var videoProx = slides[proxSlide].getElementsByTagName('video')
    Array.from(videoProx).forEach(elem=>{
        if(elem){
            resetAndPlayVideo(elem)
        }
    })
}

function voltaSlide(){
    var anteSlide;
    slides.forEach((elem, idx) => {
        if(!elem.classList.contains('d-none')){
            anteSlide = idx-1 == -1 ? slides.length - 1 : idx-1;
            elem.classList.add('d-none')
            var videoProx = elem.getElementsByTagName('video')
            Array.from(videoProx).forEach(elem=>{
                if(elem){
                    elem.pause()
                }
            })
        }
    })
    slides[anteSlide].classList.remove('d-none')
    var videoAnte = slides[anteSlide].getElementsByTagName('video')
    Array.from(videoAnte).forEach(elem=>{
        if(elem){
            resetAndPlayVideo(elem)
        }
    })
}

btnNext.addEventListener('click', () => {
    passaSlide()
})

btnPrev.addEventListener('click', () => {
    voltaSlide()
})

document.body.addEventListener('keydown',  event => {
    if(event.key === "ArrowRight"){
        passaSlide()
        return
    } else if(event.key === "ArrowLeft") {
        voltaSlide()
    }
})
