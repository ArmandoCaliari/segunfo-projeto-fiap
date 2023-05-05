/*                                                  a ação     e o evento     */
document.querySelector("#salvar").addEventListener("click", cadastrar)
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
        titulo: titulo,
        descricao: descricao,
        categoria: categoria
    }
    
    if(!validar(tarefa.titulo, document.querySelector("#titulo"))) return
    if(!validar(tarefa.descricao, document.querySelector("#descricao"))) return

    document.querySelector("#tarefas").innerHTML += createCard(tarefa)
    
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

function apagar(botao){
    botao.parentNode.parentNode.parentNode.remove()
}
/*ia ficar muito grande ficar passando todos os parametros por isso estamos passando um objeto tarfea
function createCard(titulo,descricao,categoria) */
function createCard(tarefa){
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
                <a href="#" class="btn btn-success" title="Marcar como concluída">
                    <!--é o icone-->
                    <i class="bi bi-check"></i>
                </a>
            
                <a onClick="apagar(this)" href="#" class="btn btn-danger" title="Apagar tarefa">
                    <!--é o icone-->
                    <i class="bi bi-trash3-fill"></i>
                </a>
            </div>
        </div><!-- Fechamento do card-->
    </div><!-- Fechamento da coluna-->    
    `//`` à  templeta literals vai ajudar a faazer concatenação (juntar texto)
}