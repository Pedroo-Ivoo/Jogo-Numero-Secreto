// // Aqui temos um modelo de selecionar o html e alterar via js. 
// // Porém não é muito recomendado quando começa a se utilizar muito. Assim dê preferencia a funções.
// // let titulo = document.querySelector('h1');
// // titulo.innerHTML = 'Jogo do Número Secreto';

// // let paragrafo = document.querySelector('p');
// // paragrafo.innerHTML ='Escolha um número entre 1 a 10';

let listaDeNumerosSorteados = [];
let numeroLimite  = 10;
let numeroSecreto = gerarNumeroAliatorio();
let tentativa = 1

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );

}
function mensagemInicial(){
    exibirTextoNaTela("h1", "Jogo do Número Secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 a 10");
}
mensagemInicial();

function verificarChute(){
    let chute = document.querySelector("input").value;
    if(chute == numeroSecreto){
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `O número secreto é ${numeroSecreto} e acertou com ${tentativa} ${palavraTentativa}`;
        exibirTextoNaTela("p", mensagemTentativa);
        document.getElementById("reiniciar").removeAttribute("disabled");
    }else{
        if (chute < numeroSecreto) {
        exibirTextoNaTela("h1", "Errou, tente de novo");
        exibirTextoNaTela("p","O número secreto é maior");
        } else{
        exibirTextoNaTela("h1", "Errou, tente de novo");
        exibirTextoNaTela("p","O número secreto é menor");
         }
    };
    
    tentativa++;
    limparCampo();
   
}
function gerarNumeroAliatorio() {
    let numerosEscolhido = parseInt(Math.random() * numeroLimite +1);
    let quantidadeDeElementosNaLista =listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite ){
        listaDeNumerosSorteados=[];
    }

    if(listaDeNumerosSorteados.includes(numerosEscolhido)){
        return gerarNumeroAliatorio()
    }else{
        listaDeNumerosSorteados.push(numerosEscolhido);
        return numerosEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector("input");
    chute.value = "";
    
}
function reiniciarJogo(){
   numeroSecreto = gerarNumeroAliatorio();
    limparCampo();
    tentativa = 1;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

