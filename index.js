const canvas = document.querySelector('canvas'); // pega o elemento, com o nome canvas
const con = canvas.getContext('2d'); // pega context do canvas

canvas.width = 1024;
canvas.height = 576;

con.fillRect(0 , 0, canvas.width, canvas.height); // método da api do canvas, que desenha um retângulo
                                                  // este retângulo, vai ser a area do jogo 

const gravidade = 0.7; // gravidade, para certificar que os objetos, estão no chão

// classe sprite, que ira ajudar na criação do player e do inimigo
class Sprite
{
    constructor({posicao, speed, cor = 'blue', offset})
    {
        this.position = posicao;
        this.speed = speed;
        this.width = 50;
        this.height = 150;
        this.ultimaTecla;
        // zona de ataque que o player possui 
        this.hitBox ={
            posicao: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width:  100,
            height: 50 
            
        }

        this.cor = cor;
        this.atacando;
    }

    desenhar()
    {
        con.fillStyle = this.cor;
        con.fillRect(this.position.x, this.position.y, this.width, this.height);

        // hitBox
          if(this.atacando)
         {
            con.fillStyle = 'white';
            con.fillRect(this.hitBox.posicao.x, this.hitBox.posicao.y, this.hitBox.width, this.hitBox.height);
         }
    }

    atualizar()
    {
        this.desenhar();

        // coloca a hitBox dos ataques nas posições corretas
        this.hitBox.posicao.x = this.position.x + this.hitBox.offset.x; 
        this.hitBox.posicao.y = this.position.y;

        
        this.position.y += this.speed.y; // vai descendo a cada loop 
        this.position.x += this.speed.x; // mexe pro lado

        if(this.position.y + this.height + this.speed.y >= canvas.height) // se o objeto for passar da tela do canvas
        {
            this.speed.y = 0; // para de cair
        }
        else // se não
            this.speed.y += gravidade; // objetos vão caindo
            
    }

    ataque()
    {
        this.atacando = true;
        setTimeout(() =>{
            this.atacando = false;
        }, 100) // depois de 100 milesegundos, atacando recebe false
    }
}

//criando player
const player = new Sprite({
    posicao:{
    x: 0,
    y: 0
    },
    speed:{
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y: 0
    }
})

//criando inimigo
const inimigo = new Sprite({
    posicao:{
    x: 400, // 400, pois vai ser bem no fim da tela
    y: 0
    },
    speed:{
        x: 0,
        y: 0
    },
    cor: 'red',
    offset:{
        x: -50,
        y: 0
    }
})



console.log(player);

// teclas que iremos usar no jogo
const teclas = {
    a:{
        pressed: false
    },

    d:{
        pressed: false
    },
    // espaço
    ' ':{
        pressed: false
    },
    w:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    }
}

//let ultimaTecla;

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

// função para animar objetos
function animar()
{
    window.requestAnimationFrame(animar); // recursão
    //console.log('animacao funcionou');
    con.fillStyle = 'black'; // mantem a tela preta
    con.fillRect(0, 0, canvas.width, canvas.height); // limpa o canvas
    player.atualizar() // desenha player na tela
    inimigo.atualizar() // desenha inimigo na tela

    player.speed.x = 0;
    inimigo.speed.x = 0;

    // Player 1
    if(teclas.a.pressed == true && player.ultimaTecla === 'a') // se o jogador apertar a
    {
        player.speed.x = -5; // mexe player pra esquerda
    }
    else 
        if(teclas.d.pressed == true && player.ultimaTecla === 'd') // se o jogador apertar d
        {
            player.speed.x = 5; // mexe player pra direita 
        }

    // Player 2
    if(teclas.ArrowLeft.pressed == true && inimigo.ultimaTecla === 'ArrowLeft') 
    {
        inimigo.speed.x = -5; // mexe player pra esquerda
    }
    else 
        if(teclas.ArrowRight.pressed == true && inimigo.ultimaTecla === 'ArrowRight')
        {
            inimigo.speed.x = 5; // mexe player pra direita 
        }

    // detectar colisão

    if( 
        colisaoRetangular({ retangulo1: player, retangulo2: inimigo}) &&  player.atacando)
    {
        player.atacando = false; // para o player não atacar duas vezes de uma vez só
        console.log('colidiu');
    }

    if( 
        colisaoRetangular({ retangulo1: inimigo, retangulo2: player}) &&  inimigo.atacando
       )
       {
           inimigo.atacando = false; // para o player não atacar duas vezes de uma vez só
           console.log('inimigo colidiu');
       }
}

animar();


// funciona, sempre que o jogador pressiona uma tecla do teclado
window.addEventListener('keydown', (event) =>{
    switch(event.key)
    {

       // Player 1

        case 'd': 
            teclas.d.pressed = true; 
            player.ultimaTecla = 'd';
            break;

        case 'a': 
            teclas.a.pressed = true;
            player.ultimaTecla = 'a';
            break;

        case ' ':  // espaço
            player.ataque();
            break;

        
        case 'w': 
            player.speed.y = -20; // y recebe - 10, fazendo o player pular
            break;

        // Player 2

        case 'ArrowRight': 
            teclas.ArrowRight.pressed = true; 
            inimigo.ultimaTecla = 'ArrowRight';
            break;

        case 'ArrowLeft': 
            teclas.ArrowLeft.pressed = true;
            inimigo.ultimaTecla = 'ArrowLeft';
            break;

        case 'ArrowUp': 
            inimigo.speed.y = -20; // y recebe - 10, fazendo o player pular
            break;

        
        case 'ArrowDown': 
            inimigo.ataque();
            break;
    }
    //console.log(event.key);
})

window.addEventListener('keyup', (event) =>{
    switch(event.key)
    {
        // Player 1

        case 'd': // se o jogador soltar d
            teclas.d.pressed = false // player para de se mexer
            break;

        case 'a': 
            teclas.a.pressed = false; 
            break;

        case ' ':  // espaço
            teclas.pressed = false; 
            break;
        
        case 'w':
            teclas.w.pressed = false;
            break;

        // Player 2

        case 'ArrowRight': 
            teclas.ArrowRight.pressed = false // player para de se mexer
            break;

        case 'ArrowLeft': 
            teclas.ArrowLeft.pressed = false; 
            break;

        case 'ArrowUp':  // espaço
            teclas.ArrowUp.pressed = false; 
            break;
    }
   // console.log(event.key);
})