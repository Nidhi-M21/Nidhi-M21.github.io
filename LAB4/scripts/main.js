
let counter = 0;
const button=document.querySelector('button');
const texto= document.querySelector('#texto');
const fraseEmoji= document.querySelector('#mudaEmogi');
const caixa= document.querySelector('#caixa');
const count= document.querySelector('#count');





function contar() {

   counter++;
   count.textContent=counter;

}

function reset(){
   counter=0;
   count.textContent=counter;


}

function mudarEmoji(){

   texto.textContent=`🤗`;

}
function emojiPassaTriste(){

   fraseEmoji.textContent=`Passa por cima: 😔`;


}
function emojiPassaContente(){

   fraseEmoji.textContent=` Passa por cima: 😊`;


}

function trocarFundo(){
   caixa.style.backgroundColor='lightBlue';
   caixa.textContent='Olá';

}
function trocarFundoDepois(){
   caixa.style.backgroundColor='purple';

}




