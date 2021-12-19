let btnAddSelect = document.querySelectorAll('[add-select]')[0]

btnAddSelect.addEventListener('click', () => {
    let divSelects = document.getElementById('div-selects')
    let selectBase = document.getElementById('select-base')
    let selectClone = selectBase.cloneNode(true)
    divSelects.appendChild(selectClone)
})