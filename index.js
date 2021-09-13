
var alunos = []

var editedAlunoId = 0

var alunoFields = {
    name: document.getElementById("nameNewAluno"),
    phone: document.getElementById("telefoneNewAluno"),
    lastName: document.getElementById("lastNameNewAluno"),
    email: document.getElementById("emailNewAluno"),
    confirmEmail: document.getElementById("emailConfirmNewAluno")
}

let endpointURL = "http://172.16.48.54:5000/api/alunos"

function showAlert(type, text) {
    var alertPlaceholder = document.getElementById("alertPlaceholder")
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + text + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
  
    alertPlaceholder.append(wrapper)

    
    setTimeout(function(){
        wrapper.classList.add('invisivel');
        setTimeout(function(){
            alertPlaceholder.removeChild(wrapper);
        }, 2000)    
    }, 3000);
}


function createNewAluno(data) {
    self.alunos.push(data)
    showAlert("success", `Aluno adicionado com sucesso`)
}

function updateAluno(data) {
    apagaAluno(data.id)
    self.alunos.push(data)
    showAlert("success", `Aluno alterado com sucesso`)
    updateAlunosList()
}

function updateAlunosList() {
    let list = document.getElementById("items")
    var alunoEntries = ""
    self.alunos.forEach(aluno => {
        alunoEntries += `<tr><td>${aluno.first_name}</td><td>${aluno.last_name}</td><td>${aluno.email}</td><td>${aluno.phone}</td><td><button class="btnEdit" onClick="editAluno(${aluno.id})">Editar</button></td><td><button class="btnDelete" onClick="apagaAluno(${aluno.id})">Apagar</button></td><td><button class= "btnAlert" onClick="alertaAluno(${aluno.id})">Alerta!</button></td></tr>`
    });

    list.innerHTML = alunoEntries
}

function alertaAluno(alunoId) {
    console.log(alunoId)
    let alunoFiltrados = alunos.filter(aluno => aluno.id == alunoId)
    let aluno = alunoFiltrados[0]
    alert(`${aluno.first_name} ${aluno.last_name}`);
}

function apagaAluno(idAluno) {
    var newAlunos = self.alunos.filter(aluno => aluno.id != idAluno)
    self.alunos = newAlunos
    updateAlunosList()
}

function editAluno(idAluno) {
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = false
    self.editedAlunoId = idAluno
    let aluno = alunos.filter(aluno => aluno.id == idAluno)[0]
    setCampos(aluno)
}

function setCampos(aluno) {
    console.log(aluno)
    alunoFields.name.value = aluno.first_name
    alunoFields.phone.value = aluno.phone
    alunoFields.lastName.value = aluno.last_name
    alunoFields.email.value = aluno.email
    alunoFields.confirmEmail.value = aluno.confirmEmail
}

function getCampos() {
    return {first_name: alunoFields.name.value, phone: alunoFields.phone.value, last_name: alunoFields.lastName.value, email: alunoFields.email.value, confirmEmail: alunoFields.confirmEmail.value}
}

function clearCampos() {
    alunoFields.name.value = ""
    alunoFields.phone.value = ""
    alunoFields.lastName.value = ""
    alunoFields.email.value = ""
    alunoFields.confirmEmail.value = ""
}


function validaAluno(){
    
    if(alunoFields.name.value == "") {
        showAlert("danger","Preencha com o seu nome:");
         alunoFields.name.focus();
         return false;
     } 
     else if(!isNaN(alunoFields.name.value)){
         showAlert("danger","Digite um nome valido!");
         alunoFields.name.focus();
         return false;

     }
     else if (alunoFields.lastName.value == ""){
         showAlert("danger","Preencha com o seu sobrenome:");
         alunoFields.lastName.focus()
         return false;
     }
     else if(!isNaN(alunoFields.lastName.value)){
        showAlert("danger","Digite um sobrenome valido!");
        alunoFields.name.focus();
        return false;

    }else if (alunoFields.email.value == "") {
         showAlert("danger","Preencha com o seu email:");
         alunoFields.email.focus();
         return false;
     }
     else if(alunoFields.email.value.indexOf('@') ==-1 || alunoFields.email.value.indexOf('.') ==-1) {
        showAlert("danger","Digite um email valido! ")
        alunoFields.email.focus();
        return false;
    }
    else if(alunoFields.confirmEmail.value != alunoFields.email.value){
        showAlert("danger","Email de confirmação errado! ")
        alunoFields.confirmEmail.focus();
        return false;

    }
     else if (alunoFields.phone.value == "") {
         showAlert("danger","Preencha com o seu telefone:");
         alunoFields.phone.focus();
         return false;
     } 
 
     return true;
 }
 
 
function addAluno(){
    if(validaAluno()){
       
           let infoNewAluno = getCampos()
           infoNewAluno.id = getRandomInt(1,100000)
           clearCampos()
           createNewAluno(infoNewAluno)
           updateAlunosList()
       
    }
}
 
 

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

function submitAlunoEdit() {
    var editedAluno = getCampos()
    editedAluno.id = self.editedAlunoId
    updateAluno(editedAluno)
    clearCampos()

}

function exemplo(cond, callback) {
    if(cond){ 
        callback()
    }
}

function clickLimpar() {
    console.log('limpa')
    clearCampos()
    let limparBtn = document.getElementById("limpar")
    limparBtn.hidden = true
    exemplo(false, function() {
        console.log("teste")
    })
}



    document.addEventListener("DOMContentLoaded", function() {
        updateAlunosList(self.alunos)
        let createButton = document.getElementById("criarAlunoBtn")
        createButton.addEventListener('click', () => {
            addAluno()
        })

        let editButton = document.getElementById("editarAlunoBtn")
        let limparBtn = document.getElementById("limpar")
        limparBtn.hidden = true
        limparBtn.addEventListener('click', clickLimpar)
        editButton.addEventListener('click', () => {
            if(self.editedAlunoId == 0) {
                showAlert('warning', "Favor selecionar um aluno")
            } else {
                limparBtn.hidden = true
                submitAlunoEdit()
            }
        })
    });
