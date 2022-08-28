const fs = require("fs")


module.exports = class Alunos {
    constructor() {
        this.alunos = []
    }
    novoAluno(nome, matricula, telefone, email, uffmail, status) {
        let aluno = {"nome": nome, "matricula": matricula, "telefone": telefone, "email":email, "uffmail": uffmail, "status": status}
        this.alunos.push(aluno)
    }
    lerCsv(path){
        let alunosRaw = fs.readFileSync(path, "utf-8")
        let alunosLinesArray = alunosRaw.split(/\r\n|\r|\n/)
        let alunosArray = []
        alunosLinesArray.forEach(e => {
            alunosArray.push(e.split(","))
        })
        alunosArray.forEach(aluno => {
            this.novoAluno(
            aluno[0],
            aluno[1],
            aluno[2],
            aluno[3],
            aluno[4],
            aluno[5]
        )
    })
        
    }
    pesquisarAluno(matricula){
        return this.alunos.find(e => e.matricula === matricula)
    }
    gerarEmailValido(matricula){
        let aluno = this.pesquisarAluno(matricula)
        let nome = aluno.nome.toLowerCase().split(" ")

        return {
            "1": `${nome[0]}_${nome[1]}@id.uff.br`,
            "2": `${nome[0]}${nome[1][0]}${nome[2][0]}@id.uff.br`,
            "3": `${nome[0]}${nome[2]}@id.uff.br`,
            "4": `${nome[0][0]}${nome[2]}@id.uff.br`,
            "5": `${nome[2]}_${nome[0]}@id.uff.br`,
        }
    }
}
