import { produtos } from "./produtos.js";


document.addEventListener('DOMContentLoaded', function() {carregarProdutos(produtos);});

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

    const titulo= document.createElement("h3");
    titulo.textContent=produto.title;



    const secImg= document.createElement("section");
    const imagem= document.createElement("img");
    imagem.src=produto.image;
    secImg.append(imagem);


    const preco=  document.createElement("p")
    preco.textContent=`Custo total: ${produto.price} €`;

    const descricao= document.createElement("p");
    descricao.textContent=produto.description

    const botao= document.createElement("button");
    botao.textContent="+ Adicionar ao Cesto";

    botao.addEventListener("click",function(){adicionarProdutoCesto(produto);});


    artigo.append(titulo,secImg,preco,descricao,botao);

    return artigo;

}














//B funçao


//C declarar