let divAlert = document.getElementById('alert-error')
let btnSubmit = document.getElementById('btn-submit')

btnSubmit.addEventListener('click',  () => {
    divAlert.innerText = "E-mail e/ou senha inválido(s)."
    if (!divAlert.classList.contains('d-none')) {
        divAlert.classList.add('d-none')
    }
    setTimeout(() => {
        divAlert.classList.remove('d-none')
    }, 250);
})