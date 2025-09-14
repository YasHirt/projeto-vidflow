// Você chama fetch(...). Ele devolve uma Promise<response>. "prometo que no futuro vou te dar um objeto response"
// Quando o servidor responde, a Promise é resolvida com um objeto Response.
// Esse objeto Response é passado automaticamente como argumento para a função dentro do .then(...).
// Aqui, você chamou esse parâmetro de resposta.
// Então:
// resposta = objeto do tipo Response.
// O Response guarda o corpo da resposta (os dados), mas não vem pronto.
// Ele tem métodos como .json(), .text(), .blob() etc.
// Cada um desses métodos lê o corpo da resposta e o transforma em um formato específico.
// Como a API retorna JSON, você usa resposta.json(). resposta.json() → Promise<any>
// “prometo que vou te dar os dados em formato JavaScript”.
// Esse método também retorna uma Promise, porque pode demorar para converter os dados.
//"Assim que essa promessa for resolvida (fulfilled), execute esta função com o valor de retorno".
const containerVideo = document.querySelector(".videos__container")

async function buscarEMostrarVideos() {
    try{
    const busca  =  await fetch("http://localhost:3000/videos")
    const videos =  await busca.json()
        videos.forEach((video)=> 
        {
            if (video.categoria == "")
            {
                throw new Error("Video não tem categoria")
            }
        containerVideo.innerHTML += `
        <li class="videos__item" data-categoria="${video.categoria}">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen> </iframe>
            <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="logo do canal">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
        </li>
        `;
    })
    }
    catch(error)
    {
        containerVideo.innerHTML = `<p>Houve um erro a carregar os vídeos: ${error}</p>`
    }
    finally
    {
        console.log('Isso sempre acontece')
    }
}

buscarEMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input")
barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa()
{
    const videos = document.querySelectorAll(".videos__item")
    if(barraDePesquisa.value != "")
    {
        videos.forEach(video =>{
            let titulo = video.querySelector(".titulo-video").textContent.toLowerCase()
            let valorFiltro = barraDePesquisa.value.toLowerCase()
            titulo.includes(valorFiltro) ? video.style.display = "block": video.style.display = "none"
        } )
    }
    else
    {
        videos.forEach(video => video.style.display = "block")
    }
}
const botaoCategoria = document.querySelectorAll(".superior__item")
botaoCategoria.forEach(botao => addEventListener("click", filtrarCategoria))

function filtrarCategoria(evento)
{
    const videos = document.querySelectorAll(".videos__item");
    const botaoClicado = evento.target.name;
    console.log(botaoClicado);
    if(botaoClicado != "Tudo")
    {
        videos.forEach(video => 
        {
            if(video.dataset.categoria == botaoClicado)
            {
                video.style.display = "block"
            }
            else
            {
                video.style.display = "None"
            }
        }
        )
    }
    else
    {
        videos.forEach(video => video.style.display = "block")
    }
}