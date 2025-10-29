
const urlCatg="https://deisishop.pythonanywhere.com/categories/";
const urlProducts="https://deisishop.pythonanywhere.com/products/"
const selectCategorias= document.querySelector("#tiposFiltragem");


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

          productsFiltrados= listaProdutos.filter(product=>product.category===catgEscolhida);
        carregarProdutos(productsFiltrados);

    }
  


);

function carregarProdutos(produtos){

 
    const sectionProdutos=document.getElementById("produtos");

    produtos.forEach(
        
        produto=>{
            const artigo = criarProduto(produto);
            sectionProdutos.append(artigo);
        }
    )
}

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

    //ainda nao sei como implementar

    });


    artigo.append(titulo,secImg,preco,descricao,botao);

    return artigo;

}







  
   






































//B funçao


//C declarar