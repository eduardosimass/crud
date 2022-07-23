'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {document.getElementById('modal')
    .classList.remove('active')
    clearFields()
}

// CRUD - CREATE/READ/UPDATE/DELETE 


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client",JSON.stringify(dbClient))


const deleteClient = (index) => {
    const dbClient= readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, Client) => {
    const dbClient = readClient()
    dbClient[index]= Client
    setLocalStorage(dbClient)
}

const readClient =  () => getLocalStorage()

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}


const isValidFields = () => {
   return document.getElementById('form').reportValidity()
}

const clearFields = ()=> {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = "")
}

 //Eventos   - Interacao com o User
const saveClient = () => {
  if (isValidFields()) {
    const client = { 
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        celular: document.getElementById('celular').value,
        cidade: document.getElementById('cidade').value
    }
    createClient(client)
    closeModal()
  }
}
const createRow = (client) => {
  const newRow = document.createElement('tr')
  newRow.innerHTML = `
<td>${client.nome}</td>
<td>${client.email}</td>
<td>${client.celular}</td>
<td>${client.cidade}</td>
 <td>
 <button type="button" class="button green">editar</button>
 <button type="button" class="button red">excluir</button>
 </td>
  
  `
document.querySelector('#tableClient>tbody').appendChild(newRow)

}


const updateTable = () =>{
    const dbClient = readClient()
    dbClient.forEach(createRow)
}

updateTable()
 
document.getElementById('cadastrarCliente')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

    document.getElementById('salvar')
    .addEventListener('click', saveClient)