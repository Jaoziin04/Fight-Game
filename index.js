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
    qtdFrames: 8, // quantidade de frames por padrão
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
        },

        ataque1:{
            imagem:'./assets/samuraiMack/attack1.png',
            qtdFrames: 6
        },
    
        hit:{
            imagem: './assets/samuraiMack/take hit - white silhouette.png',
            qtdFrames: 4
        },

        morte:{
            imagem: './assets/samuraiMack/death.png',
            qtdFrames: 6
        }
    },
    hitBox:{
        offset:{
            x: 100,
            y: 50
        },
        width: 160,
        height: 50
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
    },
    imagem: './assets/kenji/idle.png',
    qtdFrames: 4,  // quantidade de frames por padrão
    scale: 2.5,
    offset:{
        x: 215,
        y: 167
    },
    sprites:{
        idle:{
            imagem:'./assets/kenji/idle.png',
            qtdFrames: 4
        },

        correr:{
            imagem:'./assets/kenji/run.png',
            qtdFrames: 8,
        },

        pular:{
            imagem:'./assets/kenji/jump.png',
            qtdFrames: 2
        },

        cair:{
            imagem:'./assets/kenji/fall.png',
            qtdFrames: 2
        },

        ataque1:{
            imagem:'./assets/kenji/attack1.png',
            qtdFrames: 4
        },

        hit:{
            imagem: './assets/kenji/take hit.png',
            qtdFrames: 3
        },

        morte:{
            imagem: './assets/kenji/death.png',
            qtdFrames: 7
        }
    },
    hitBox:{
        offset:{
            x: -170,
            y: 50
        },
        width: 170,
        height: 50
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
    inimigo.atualizar(); // desenha inimigo na tela

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
        inimigo.trocarSprite('correr');
    }
    else 
        if(teclas.ArrowRight.pressed == true && inimigo.ultimaTecla === 'ArrowRight')
        {
            inimigo.speed.x = 5; // mexe player pra direita 
            inimigo.trocarSprite('correr');
        }
        else
        inimigo.trocarSprite('idle');

    // animação de pular
    if(inimigo.speed.y < 0)
    {
        inimigo.trocarSprite('pular');
    }
    else if(inimigo.speed.y > 0)
    {
        inimigo.trocarSprite('cair');
    }

    // detectar colisão

    // quando o player 2 leva dano 
    if( 
        colisaoRetangular({ retangulo1: player, retangulo2: inimigo}) &&  player.atacando && player.frameAtual === 4)
    {
        inimigo.levouDano();
        player.atacando = false; // para o player não atacar duas vezes de uma vez só
        document.querySelector('#enemyLife').style.width = inimigo.health + '%';
    }

    // se o player1 errar

    if(player.atacando && player.frameAtual === 4)
    {
        player.atacando = false;
    }

    // quando player 1 leva dano
    if( 
        colisaoRetangular({ retangulo1: inimigo, retangulo2: player}) &&  inimigo.atacando && inimigo.frameAtual === 2)
       {
            player.levouDano();
            inimigo.atacando = false; // para o player não atacar duas vezes de uma vez só
            document.querySelector('#playerLife').style.width = player.health + "%";
       }

       
    // se o player2 errar

    if(inimigo.atacando && inimigo.frameAtual === 2)
    {
        inimigo.atacando = false;
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
     // Player 1
    if(!player.morto)
    {
        switch(event.key)
        {


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
        }

        // Player 2
        if(!inimigo.morto)
        {
            switch(event.key)
            {
                

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
        }
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