/*                                                  a ação     e o evento     */
document.querySelector("#salvar").addEventListener("click", cadastrar)

let tarefas=[]

/*() => {} significad que vamo chamar a função que esat dentro das chaves */
window.addEventListener("load", ()=>{
    /*JSON.parse() transforma uma String em Objeto. Pois nós tinhamos transformado o Objeto em String */
    tarefas=JSON.parse(localStorage.getItem("tarefas")) || []
    atualizar()
})

document.querySelector("#busca").addEventListener("keyup", ()=>{
    let busca =document.querySelector("#busca").value
    let tarefasFiltradas=tarefas.filter((tarefa)=>{
        return tarefa.titulo.toLowerCase().includes(busca.toLowerCase())
    })
    filtrar(tarefasFiltradas)
})
function filtrar(){
    document.querySelector("#tarefas").innerHTML =""
    tarefas.forEach((tarefa)=>{  
        document.querySelector("#tarefas").innerHTML += createCard(tarefa)
    })
}

function atualizar(){
    document.querySelector("#tarefas").innerHTML =""
    /*o setItem(1,2) o segundo parametro deve ser uma String 
    O JSON.stringfy() vai meio que fazer o toString() do objeto vai meio que ler o objeto*/
    /*                      chave  ,  valor */
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
    tarefas.forEach((tarefa)=>{  
        document.querySelector("#tarefas").innerHTML += createCard(tarefa)
    })
}

function cadastrar(){
    /*Vai me devolver a caixa de texto Eu quero o que foi digitado no texto 
    const titulo = document.querySelector("#titulo")
    portanto eu coloco um .value */
    const titulo = document.querySelector("#titulo").value
    const descricao = document.querySelector("#descricao").value
    const categoria = document.querySelector("#categoria").value
    const modal =  bootstrap.Modal.getInstance(document.querySelector("#exampleModal"))

    /*Precisamo criar um card que tenha os elementos que nós pegamos */

    const tarefa ={
        /*Tava assim 
        titulo: titulo
        quando os nomes são iguais nós podemos só colocar o titulo*/
        id: Date.now(),
        titulo: titulo,
        descricao: descricao,
        categoria: categoria,
        concluida: false
    }
    
    
    if(!validar(tarefa.titulo, document.querySelector("#titulo"))) return
    if(!validar(tarefa.descricao, document.querySelector("#descricao"))) return

    /*Colocando a tarefa no array */
    tarefas.push(tarefa)

    atualizar()
    
    modal.hide()
}

function validar(valor, campo){
    if(valor==""){
        /*No boostrap a class is-invalid vai deixar nossa caixa de texto vermelha */
        campo.classList.add("is-invalid")
        campo.classList.remove("is-valid")
        return false
    }
    campo.classList.remove("is-invalid")
    campo.classList.add("is-valid")
    return true
}

function apagar(id){
     tarefas = tarefas.filter((tarefa)=>{
        return tarefa.id !=id
    })
    atualizar()
}

function concluir(id){
    let tarefaEncontrada=tarefas.find((tarefa)=>{
        return tarefa.id==id
    })
    tarefaEncontrada.concluida=true
    atualizar()
}

/*ia ficar muito grande ficar passando todos os parametros por isso estamos passando um objeto tarfea
function createCard(titulo,descricao,categoria) */
function createCard(tarefa){
    let disabled= tarefa.concluida ? "disabled" : ""


    return `
    <div class="col-lg-3 col-md-6 col-12">
        <div class="card">
            <div class="card-header">
                ${tarefa.titulo}
            </div>
            <div class="card-body">
                <p class="card-text">${tarefa.descricao}</p>
                <!--Badge é tipo um Label, colocamos o badge dentro de um paragrafo pois o span é inline-->
                <p>
                    <span class="badge text-bg-danger">${tarefa.categoria}</span>
                    </p>
                <a onClick="concluir(${tarefa.id})" href="#" class="btn btn-success ${disabled}" title="Marcar como concluída">
                    <!--é o icone-->
                    <i class="bi bi-check"></i>
                </a>
            
                <a onClick="apagar(${tarefa.id})" href="#" class="btn btn-danger" title="Apagar tarefa">
                    <!--é o icone-->
                    <i class="bi bi-trash3-fill"></i>
                </a>
            </div>
        </div><!-- Fechamento do card-->
    </div><!-- Fechamento da coluna-->    
    `//`` à  templeta literals vai ajudar a faazer concatenação (juntar texto)
}