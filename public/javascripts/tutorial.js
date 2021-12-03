// botões do carrosel
const btnPrev = document.getElementById('btn-previous')
const btnNext = document.getElementById('btn-next')

// slides do carrossel
let slides = document.querySelectorAll('.slides')

btnNext.addEventListener('click', () => {
    var proxSlide;
    slides.forEach((elem, idx) => {
        if(!elem.classList.contains('d-none')){
            proxSlide = idx+1 == slides.length ? 0 : idx+1;
            elem.classList.add('d-none')
        }
    })
    console.log(slides[proxSlide]);
    slides[proxSlide].classList.remove('d-none')
})

btnPrev.addEventListener('click', () => {
    var anteSlide;
    slides.forEach((elem, idx) => {
        if(!elem.classList.contains('d-none')){
            anteSlide = idx-1 == -1 ? slides.length - 1 : idx-1;
            elem.classList.add('d-none')
        }
    })
    console.log(slides[anteSlide]);
    slides[anteSlide].classList.remove('d-none')
})