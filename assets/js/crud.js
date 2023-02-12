const modal = document.querySelector('.modal__container');
const tbody = document.querySelector('tbody');
const sNome = document.querySelector('#m__nome');
const sEmail = document.querySelector('#m__email');
const sNumero = document.querySelector('#m__numero');
const btnSalvar = document.querySelector('#bot__salvar');

let itens
let id

function openModal(edit = false, index = 0) {
    modal.classList.add('active')

    modal.onclick = e => {
        if (e.target.className.indexOf('modal-container') !== -1) {
            modal.classList.remove('active')
        } 
    }

    if (edit) {
        sNome.value = itens[index].nome
        sEmail.value = itens[index].email
        sNumero.value = itens[index].numero
        id = index
    } else {
        sNome.value = ''
        sEmail.value = ''
        sNumero.value = ''
    }
}

function editItem(index) {
    openModal(true, index)
}

function deleteItem(index) {
    itens.splice(index, 1)
    setItensBD()
    loadItens()
}

function insertItem(item, index) {
    let tr = document.createElement('tr')

    tr.innerHTML = `
        <td>${item.nome}</td>
        <td>${item.email}</td>
        <td>${item.numero}</td>
        <td class='acao'>
            <button onclick="editItem(${index})"><i class="fa-regular fa-pen-to-square"></i></button>
        </td>
        <td class='acao'>
            <button onclick="deleteItem(${index})"><i class="fa-regular fa-trash-can"></i></i></button>
        </td>
    `
    tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
        
    if(sNome.value == '' || sEmail.value == '' ||  sNumero.value ==  ''){
        return
    }
    
    e.preventDefault();

    if (id !== undefined) {
        itens[id].nome = sNome.value
        itens[id].email = sEmail.value
        itens[id].numero = sNumero.value
    } else {
        itens.push({'nome' : sNome.value, 'email' : sEmail.value, 'numero' : sNumero.value})
    }

    setItensBD()

    modal.classList.remove('active')
    loadItens()
    id = undefined
}

function loadItens() {
    itens = getItensBD()
    tbody.innerHTML = ''
    itens.forEach((item, index) => {
        insertItem(item, index)
    })
}


    const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
    const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

    loadItens()