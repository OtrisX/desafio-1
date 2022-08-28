const Alunos = require("./alunosClass")
const fs = require("fs")
const axios = require("axios")
const prompt = require("prompt-sync")()

// Criar a classe alunos :)
const alunos = new Alunos


// Fazer a requisição dos dados dos alunos

// function getAlunos() {
//     return axios.get("https://raw.githubusercontent.com/sti-uff/trabalhe-conosco/master/datasets/alunos.csv")
//         .then((res) => {
//             return res.data
//         })
//         .catch((err) => {
//             console.error(err)
//         })
// }

function getAlunos() {
    return fs.readFileSync("./alunos.csv", "utf-8")
}

// Formatar o array de alunos recebido pela requisição e cadastrar os alunos na classe Alunos
async function alunosFormatter() {
    let alunosRaw = await getAlunos() // await seria caso fosse uma requisição http, vou deixar pq não faz diferença
    let alunosLinesArray = alunosRaw.split(/\r\n|\r|\n/)
    let alunosArray = []
    alunosLinesArray.forEach(e => {
        alunosArray.push(e.split(","))
    })
    alunosArray.forEach(aluno => {
        alunos.novoAluno(
            aluno[0],
            aluno[1],
            aluno[2],
            aluno[3],
            aluno[4],
            aluno[5]
        )
    })
}

async function main() {
    await alunosFormatter()     

    console.log()

    let matricula = prompt("Digite sua matrícula: ")
    let aluno = alunos.pesquisarAluno(matricula)
    let emails = alunos.gerarEmailValido(matricula)
    let nomeAluno = alunos.pesquisarAluno(matricula).nome.split(" ")

    if(aluno.status === "Ativo"){
        // Identação ficou bizarra pra sair direito no terminal
        console.log(`
        \n${nomeAluno[0]}, por favor escolha uma das opções abaixo para o seu UFFMail\n
    1 - ${emails["1"]}
    2 - ${emails["2"]}
    3 - ${emails["3"]}
    4 - ${emails["4"]}
    5 - ${emails["5"]}\n`)
    
        let emailOpc = prompt("Digite um número: ")
    
        console.log(`\nA criação de seu e-mail (${emails[emailOpc]}) será feita nos próximos minutos.
Um SMS foi enviado para ${aluno.telefone} com a sua senha de acesso.`)   
    } else{
        console.error("Aluno inativo.")
    }

    
} 
main()