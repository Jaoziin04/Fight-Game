const canvas = document.querySelector('canvas'); // pega o elemento, com o nome canvas
const con = canvas.getContext('2d'); // pega context do canvas

canvas.width = 1024;
canvas.height = 576;

con.fillRect(0 , 0, canvas.width, canvas.height); // método da api do canvas, que desenha um retângulo
                                                  // este retângulo, vai ser a area do jogo 

const gravidade = 0.2; // gravidade, para certificar que os objetos, estão no chão

// classe sprite, que ira ajudar na criação do player e do inimigo
class Sprite
{
    constructor({posicao, speed})
    {
        this.position = posicao;
        this.speed = speed;
        this.height = 150
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

// função para animar objetos
function animar()
{
    window.requestAnimationFrame(animar);
    console.log('animacao funcionou');
    con.fillStyle = 'black'; // mantem a tela preta
    con.fillRect(0, 0, canvas.width, canvas.height); // limpa o canvas
    player.atualizar() // desenha player na tela
    inimigo.atualizar() // desenha inimigo na tela
}

animar()