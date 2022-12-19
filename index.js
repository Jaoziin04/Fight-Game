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
    constructor({posicao, speed})
    {
        this.position = posicao;
        this.speed = speed;
        this.height = 150;
        this.ultimaTecla;
    }

    desenhar()
    {
        con.fillStyle = 'blue';
        con.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    atualizar()
    {
        this.desenhar();
        this.position.y += this.speed.y; // vai descendo a cada loop 
        this.position.x += this.speed.x; // mexe pro lado

        if(this.position.y + this.height + this.speed.y >= canvas.height) // se o objeto for passar da tela do canvas
        {
            this.speed.y = 0; // para de cair
        }
        else // se não
            this.speed.y += gravidade; // objetos vão caindo
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
    }
})

//criando inimigo
const inimigo = new Sprite({
    posicao:{
    x: 400,
    y: 0
    },
    speed:{
        x: 0,
        y: 0
    }
    // 400, pois vai ser bem no fim da tela
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
            player.speed.y = -10; // y recebe - 10, fazendo o player pular
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
    }
    console.log(event.key);
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
    console.log(event.key);
})