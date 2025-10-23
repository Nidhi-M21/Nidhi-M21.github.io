import { produtos } from "./produtos.js";

if(!localStorage.getItem('produtos-selecionados')){
    localStorage.setItem('produtos-selecionados','[]');
}


document.addEventListener('DOMContentLoaded', function() {carregarProdutos(produtos);});
document.addEventListener('DOMContentLoaded', function() {atualizarCesto()});


//Defenir função 

function carregarProdutos(produtos){

     console.log("Função carregarProdutos foi chamada!");
    const sectionProdutos=document.getElementById("produtos");

    produtos.forEach(
        
        produto=>{
            const artigo = criarProduto(produto);
            sectionProdutos.append(artigo);
        }
    )
}


//criar função

function criarProduto(produto){

    const artigo= document.createElement("article");

    const titulo= document.createElement("h4");
    titulo.textContent=produto.title;



    const secImg= document.createElement("section");
    const imagem= document.createElement("img");
    imagem.src=produto.image;
    secImg.append(imagem);


    const preco=  document.createElement("h5")
    preco.textContent=`Custo total: ${produto.price} €`;

    const descricao= document.createElement("p");
    descricao.textContent=produto.description

    const botao= document.createElement("button");
    botao.textContent="+ Adicionar ao Cesto";

    botao.addEventListener("click",function(){

        
        //criei lista para guardar o produto

        let produtosSelecionados= JSON.parse(localStorage.getItem('produtos-selecionados'));

        produtosSelecionados.push(produto);// adicionei o produto á lista

    //voltei a colocar como string

        localStorage.setItem('produtos-selecionados',JSON.stringify(produtosSelecionados))

 atualizarCesto();

    });


    artigo.append(titulo,secImg,preco,descricao,botao);

    return artigo;

}



function criarProdutoCesto(produto){

    const artigoCesto = document.createElement("article");

    const tituloCesto= document.createElement("h5");
    tituloCesto.textContent=produto.title;


    const secCesto= document.createElement("section");
    const imagenCesto=document.createElement('img');
    imagenCesto.src= produto.image;
    secCesto.append(imagenCesto);


    const precoCesto= document.createElement("h5");
    precoCesto.textContent=`Custo total: ${produto.price} €`;


    const botaoRemover= document.createElement("button");
    botaoRemover.textContent=`- Remover do Cesto`;

     artigoCesto.append(tituloCesto,secCesto,precoCesto,botaoRemover);

    botaoRemover.addEventListener('click',function(){
        removerProdutoCesto(produto.id)
        atualizarCesto();
    
    });
   

    console.log("criei produtos cesto");
    return artigoCesto;


}

function removerProdutoCesto(idProduto){

    
        let listaProdutos = JSON.parse(localStorage.getItem('produtos-selecionados'));

        let indiceDoElementoRemover= listaProdutos.findIndex(  produto => produto.id === idProduto);

        listaProdutos.splice(indiceDoElementoRemover,1);

        

        //colocar lista como string

       localStorage.setItem('produtos-selecionados',JSON.stringify(listaProdutos));

}



function atualizarCesto(){

    const listaProdutos= JSON.parse(localStorage.getItem('produtos-selecionados'));

    const cesto = document.getElementById('cesto');

    //linmpar cesto so para segurança limpo antes

    cesto.innerHTML='';

    listaProdutos.forEach(
        
            produto=> {
            const artigoCesto= criarProdutoCesto(produto);
            cesto.append(artigoCesto);


        }
    );


mostraPreco();


console.log("Cesto atualizado com", listaProdutos.length, "produtos.");

}


function mostraPreco(){

    let preco=0;

    const parteCesto= document.getElementById('precoTotal');

    const listaProdutos=JSON.parse(localStorage.getItem('produtos-selecionados'));

    listaProdutos.forEach(produto=>{
        preco+=produto.price;

    })

    parteCesto.textContent=`Custo total: ${preco} €`;

}


/*armazenameto*/
















//B funçao


//C declarar