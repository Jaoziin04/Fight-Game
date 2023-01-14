// verifica a colisão dos ataques dos players 
function colisaoRetangular({ retangulo1, retangulo2})
{
    return(retangulo1.hitBox.posicao.x + retangulo1.hitBox.width >= 
           retangulo2.position.x && 
           retangulo1.hitBox.posicao.x <= 
           retangulo2.position.x + retangulo2.width && 
           retangulo1.hitBox.posicao.y + retangulo1.hitBox.height >= 
           retangulo2.position.y && 
           retangulo1.hitBox.posicao.y <= retangulo2.position.y + retangulo2.height)
}

// função que determina quem venceu o jogo+
function determinaVencedor({player, inimigo, timerId})
{
    clearTimeout(timerId); // para o timer  
     
    if(player.health == inimigo.health) // se a vida dos player forem iguais
        {
            document.querySelector('#resultado').innerHTML = "EMPATE";
            document.querySelector('#resultado').style.display = 'flex';
        }
        else
        if(player.health > inimigo.health) // se a vida do player 1 for maior que a do player 2
        {
            document.querySelector('#resultado').innerHTML = "PLAYER 1 VENCEU";
            document.querySelector('#resultado').style.display = 'flex';
        }
        else
        {
            document.querySelector('#resultado').innerHTML = "PLAYER 2 VENCEU";
            document.querySelector('#resultado').style.display = 'flex';
        }
}

let temp = 60;
let timerId;
// função que diminui o tempo do relógio do jogo
function timer()
{
  
    if(temp > 0)
    {
        timerId = setTimeout(timer, 1000) // loop
        temp--; // subtraí um do temp
        document.querySelector('#tempo').innerHTML = temp // tudo que está dentro do elemento com id tempo, recebe temp
    }

    if(temp === 0) // se o timer chegar a 0
    {
        determinaVencedor({player, inimigo, timerId});
    }
}