function Pessoa(nome, sobrenome, filiacao) { //função construtora
    this.nome = nome; //comando para o pessoa.nome receber o valor do atributo declarado no campo nome
    this.sobrenome = sobrenome;
    this.filiacao = filiacao;
    this.dizOi = function () {
        console.log(this.nome + " diz olá"); //método aplicado à função construtora
    }
    this.dizCargo = function() {
        console.log(this.cargo); //é possivel chamar um atributo da função construtora filha na função construtora mãe, se o instanciamento for feito na função na qual o this.cargo se aplica (no caso, funcionarios)
    }
}

function Funcionario(nome, sobrenome, filiacao,  cargo, salario) {//a função herdada precisa ter os atributos que irá herdar da mãe pra não dar erro
    Pessoa.call(this, nome, sobrenome, filiacao); //comando de ligação entre a função construtora Pessoa e sua decendente, Funcionario, mostrando quais atributos serão herdados
    this.cargo = cargo;  //a ordem dos atributos da função construtora altera o a sequencia na qual sai o resultado
    let _salario = salario; //declarando uma variavel para virar um atributo privado, por convenção o atributo privado é precedido de um underline

    //existe uma convenção para funcões que buscam valores sendo como get e as que atribuem valores sendo como set, logo elas são:
    //Getters e Setters
    this.getSalario = function() {//É preciso criar um metodo para que o atributo privado seja reconhecido pelo programa
        return _salario; 
    }
    
    this.setSalario = function(valor){ //É preciso criar um outro metodo para alterar valores atribuidos a atributos privados.
        if (typeof valor === 'number'){
            _salario = valor;
        }
    }

    this.aumento = function(){
        const novoSalario = _salario * 1.1;
        _salario = novoSalario;
    }
}

function Estagiario(nome, sobrenome){
    Funcionario.call(this, nome, sobrenome, "nao especificada", "Estagiario", 2000); // ele herda todas as funções do funcionário

    this.aumento = function (){
    const novoSalario = this.getSalario() * 1.07; // aqui está sendo aplicado o polimofismo, para que não seja preciso colocar o if lá na função getSalario (if (cargo == estagiario) { const novoSalario = _novoSalario * 1.07})
    this.setSalario(novoSalario);
}}

function Gerente(nome, sobrenome){
    Funcionario.call(this, nome, sobrenome, "nao especificada", "Estagiario", 10000); // ele herda todas as funções do funcionário

    this.aumento = function (){
    const novoSalario = this.getSalario() * 1.02; // aqui está sendo aplicado o polimofismo, para que não seja preciso colocar o if lá na função getSalario (if (cargo == estagiario) { const novoSalario = _novoSalario * 1.07})
    this.setSalario(novoSalario);
}
}

const funcionario1 = new Funcionario("Gustavo", "Goncalves", "nao especificada", "dev frontend", 5000); //instancioando as duas funções construtoras mãe e filha.
//os valores concedidos aos atributos devem ser em ordem de forma a se estabelecerem no mesmo campo do parenteses da função construtora a qual ela se referencia
const funcionario2 = new Estagiario("João", "Marcos");
const funcionario3 = new Gerente("Paula", "Braga");

funcionario1.aumento();
console.log(funcionario1.getSalario());

funcionario2.aumento();
console.log(funcionario2.getSalario());

funcionario3.aumento();
console.log(funcionario3.getSalario());
