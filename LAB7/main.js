


const urlCatg="https://deisishop.pythonanywhere.com/categories/";
const urlProducts="https://deisishop.pythonanywhere.com/products/"
const selectCategorias= document.querySelector("#tiposFiltragem");
const selectOrdem=document.getElementById("secOrdenar");
const procurar=document.getElementById("procurar");
const cesto = document.getElementById('cesto');
const produtosCesto=[];
const botaoComprar=document.getElementById("comprar");
const sectionMostraPreco=document.getElementById("mostraPreco");




document.addEventListener('DOMContentLoaded', function() {carregarProdutos(produtos);});
let listaProdutos=[];
let productsFiltrados=[]

//      FILTAR
// vou buscas as categorias
fetch(urlCatg)
    .then(response=>response.json())
    .then(data=>{
         console.log("Categorias recebidas:", data);
        data.forEach(catg=>{

              const opcao= document.createElement('option');
              opcao.value=catg;
              opcao.textContent=catg;
             selectCategorias.appendChild(opcao);
        });

});

//passar os produtos para a lista

fetch(urlProducts)
  .then(response => response.json())
  .then(data => {
    listaProdutos = data;
   carregarProdutos(listaProdutos);
});

//ecento de escolher Categoria

selectCategorias.addEventListener("change", ()=>{

    const catgEscolhida=selectCategorias.value;

   

    const limpar=document.getElementById('produtos');
    limpar.innerHTML='';

        productsFiltrados= listaProdutos.filter(product=>product.category===catgEscolhida);
        carregarProdutos(productsFiltrados);


         if(catgEscolhida==="todosProdutos"){
         carregarProdutos(listaProdutos);
        }

});






// estou a carregar os produtos na section produtos
function carregarProdutos(produtos) {


    const sectionProdutos = document.getElementById("produtos");

    produtos.forEach(

        produto => {
            const artigo = criarProduto(produto);
            sectionProdutos.append(artigo);
        }
    )
}

function criarProduto(produto) {

    const artigo = document.createElement("article");

    const titulo = document.createElement("h4");
    titulo.textContent = produto.title;



    const secImg = document.createElement("section");
    const imagem = document.createElement("img");
    imagem.src = produto.image;
    secImg.append(imagem);


    const preco = document.createElement("h5")
    preco.textContent = `Custo total: ${produto.price} €`;

    const descricao = document.createElement("p");
    descricao.textContent = produto.description

    const botao = document.createElement("button");
    botao.textContent = "+ Adicionar ao Cesto";

    botao.addEventListener("click", function () {

       produtosCesto.push(produto);
       atualizarCesto();
       

    });


    artigo.append(titulo, secImg, preco, descricao, botao);

    return artigo;

}


//-----------PARTE DE ADICIONAR CESTO

function atualizarCesto(){

    cesto.innerHTML='';

   produtosCesto.forEach(
        
            produto=> {
            const artigoCesto= criarProdutoCesto(produto);
            cesto.append(artigoCesto);


        }
    );


mostraPreco();

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

        let indiceDoElementoRemover= produtosCesto.findIndex(  produto => produto.id === idProduto);
        produtosCesto.splice(indiceDoElementoRemover,1);

}





//------------ORDENAÇÃO------------------

selectOrdem.addEventListener("change", () => {
    const ordemEscolhida = selectOrdem.value;
    const limpar = document.getElementById("produtos");
    limpar.innerHTML = "";

    let produtosParaOrdenar =listaProdutos;

    if (ordemEscolhida === "des") {
        produtosParaOrdenar.sort((a, b) => b.price - a.price);
       
    } else if (ordemEscolhida === "cres") {
        produtosParaOrdenar.sort((a, b) => a.price - b.price);
    
    }
   carregarProdutos(produtosParaOrdenar);
});

//------------PROCURAR------------------

procurar.addEventListener("input",()=>{
    const palavra= procurar.value.toLowerCase();

    const objetosComPlavra=listaProdutos.filter(producto=>producto.title.toLowerCase().includes(palavra));
     const limpar = document.getElementById("produtos");
    limpar.innerHTML = "";
     carregarProdutos(objetosComPlavra);
});


//-----------MOSTRAR PREÇO------------------

function mostraPreco(){

    let preco=0;
    const parteCesto= document.getElementById('precoTotal');
   produtosCesto.forEach(produto=>{
        preco+=produto.price;
    })

    parteCesto.textContent=`Custo total: ${preco} €`;

    botaoComprar.addEventListener("click",()=>{

    const checkBox=document.getElementById("butaoCheck");
    if(checkBox.checked==true){
        const textPrecoComDesconto=document.getElementById("desconto");
        preco=preco*(1-0.25);
        textPrecoComDesconto.textContent=`Valor final a pagar (com eventuais descontos):${preco}`;
        sectionMostraPreco.append(textPrecoComDesconto);
    }
});
}






























































//B funçao


//C declarar