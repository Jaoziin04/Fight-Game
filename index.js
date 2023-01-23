const canvas = document.querySelector('canvas'); // pega o elemento, com o nome canvas
const con = canvas.getContext('2d'); // pega context do canvas

canvas.width = 1024;
canvas.height = 576;

con.fillRect(0 , 0, canvas.width, canvas.height); // método da api do canvas, que desenha um retângulo
                                                  // este retângulo, vai ser a area do jogo 

const gravidade = 0.7; // gravidade, para certificar que os objetos, estão no chão

// criando bacground
const background = new Sprite({
    posicao:{
        x: 0,
        y: 0
    },

    imagem: './assets/background.png'
})

// criando shop
const shop = new Sprite({
    posicao:{
        x: 600,
        y: 128
    },

    imagem: './assets/shop.png',
    scale: 2.75,
    qtdFrames: 6 // quantidade de frames que o shopping possui
})

//criando player
const player = new Jogadores({
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
    },
    imagem: './assets/samuraiMack/idle.png',
    qtdFrames: 8, // quantidade de frames que o shopping possui
    scale: 2.5,
    offset:{
        x: 215,
        y: 157
    },
    sprites:{
        idle:{
            imagem:'./assets/samuraiMack/idle.png',
            qtdFrames: 8
        },

        correr:{
            imagem:'./assets/samuraiMack/run.png',
            qtdFrames: 8,
        },

        pular:{
            imagem:'./assets/samuraiMack/jump.png',
            qtdFrames: 2
        },

        cair:{
            imagem:'./assets/samuraiMack/fall.png',
            qtdFrames: 2
        }
    }
})

//criando inimigo
const inimigo = new Jogadores({
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


timer();

// função para animar objetos
function animar()
{
    window.requestAnimationFrame(animar); // recursão
    //console.log('animacao funcionou');
    con.fillStyle = 'black'; // mantem a tela preta
    con.fillRect(0, 0, canvas.width, canvas.height); // limpa o canvas

    background.atualizar(); // desenha o background na tela
    shop.atualizar(); // desenha shop na tela
    player.atualizar(); // desenha player na tela
    //inimigo.atualizar(); // desenha inimigo na tela

    player.speed.x = 0;
    inimigo.speed.x = 0;

    // Player 
    if(teclas.a.pressed == true && player.ultimaTecla === 'a') // se o jogador apertar a
    {
        player.speed.x = -5; // mexe player pra esquerda
        player.trocarSprite('correr');
    }
    else 
        if(teclas.d.pressed == true && player.ultimaTecla === 'd') // se o jogador apertar d
        {
            player.speed.x = 5; // mexe player pra direita 
            player.trocarSprite('correr');
        }
        else
            player.trocarSprite('idle');

        // animação de pular
    if(player.speed.y < 0)
    {
        player.trocarSprite('pular');
    }
    else if(player.speed.y > 0)
    {
        player.trocarSprite('cair');
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
        //console.log('colidiu');
        inimigo.health -= 20;
        document.querySelector('#enemyLife').style.width = inimigo.health + '%';
    }

    if( 
        colisaoRetangular({ retangulo1: inimigo, retangulo2: player}) &&  inimigo.atacando
       )
       {
           inimigo.atacando = false; // para o player não atacar duas vezes de uma vez só
           //console.log('inimigo colidiu');
            player.health -=20;
            document.querySelector('#playerLife').style.width = player.health + "%";
       }

    // fim de jogo, de acordo com a vida

    if(inimigo.health <= 0 || player.health <= 0) // se a vida de um dos dois plaers acabar
    {
        determinaVencedor({player, inimigo, timerId})
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