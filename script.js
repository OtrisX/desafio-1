const Alunos = require("./alunosClass")
const prompt = require("prompt-sync")()
var colors = require('colors');

function main() {
    // Iniciar a classe alunos :)
    const alunos = new Alunos
    // Ler o arquivo .csv e adicionar os alunos a classe
    alunos.lerCsv("./alunos.csv")
    // Coletar os dados do aluno a partir da matrícula e gerar os possiveis emails
    let matricula = prompt("Digite sua matrícula: ".bold.white)
    
    let aluno = alunos.pesquisarAluno(matricula)
    let emails = alunos.gerarEmailValido(matricula)
    let nomeAluno = aluno.nome.split(" ")[0]

    //  Questionario e verificar se aluno é ativo ou não
    if(aluno.status === "Ativo" && aluno.uffmail.length === 0){
        // Identação ficou bizarra pra sair direito no terminal
        console.log(`
        \n${nomeAluno}, por favor escolha uma das opções abaixo para o seu UFFMail\n
    1 - ${emails["1"]}
    2 - ${emails["2"]}
    3 - ${emails["3"]}
    4 - ${emails["4"]}
    5 - ${emails["5"]}\n`.bold.white)
    
        let emailOpc = prompt("Digite um número: ".bold.white)
    
        console.log(`\nA criação de seu e-mail (${emails[emailOpc]}) será feita nos próximos minutos.
Um SMS foi enviado para ${aluno.telefone} com a sua senha de acesso.`.bold.green)   
    } 
    if(aluno.status === "Inativo") {
        console.error("Aluno inativo".bold.red)
    }
    if(aluno.uffmail.length > 0) {
        console.error("Aluno já possui uffmail".bold.red)
    }

    
} 
main()