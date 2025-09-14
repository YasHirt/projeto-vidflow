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
const api  =  fetch("http://localhost:3000/videos")
.then(resposta => resposta.json())
.then(videos => videos.forEach((video)=> 
    {
     containerVideo.innerHTML += `
     <li class="videos__item">
     <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen> </iframe>
     <div class="descricao-video">
     <img class="img-canal" src="${video.imagem}" alt="logo do canal">
     <h3 class="titulo-video">${video.titulo}</h3>
     <p class="titulo-canal">${video.descricao}</p>
     </div>
     </li>
     `;
}))
//Um .catch(...) no final do encadeamento pega qualquer rejeição que aconteça em qualquer ponto anterior da cadeia.
.catch(erro => {
    containerVideo.innerHTML = `<p> Houve um erro ao carregar os videos ${erro} </p>`
})