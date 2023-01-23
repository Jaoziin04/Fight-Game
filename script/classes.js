
// classe onde iremos utilizar as imagens do jogo
class Sprite
{
    constructor({posicao, imagem, scale = 1, qtdFrames = 1, offset = {x:0, y:0}})
    {
        this.position = posicao;
        this.width = 50;
        this.height = 150;
        this.image = new Image();  // cria uma nova imagem
        this.image.src = imagem; // imagem recebe o link da imagem, que queremos mostrar
        this.scale = scale; // define a dimensão das imagens
        this.qtdFrames = qtdFrames; // define a quantidade de frames da imagem
        this.frameAtual = 0; // define qual o frame atual da imagem
        this.framesUsados = 0; // define quantos frames foram usados na animação
        this.framesHold = 7; // define a velocidade dos frames do shopping
        this.offset = offset;
 
    }

    desenhar()
    {
        con.drawImage(
            this.image,
            this.frameAtual * (this.image.width / this.qtdFrames),
            0,
            this.image.width / this.qtdFrames,
            this.image.height,
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y, 
            (this.image.width / this.qtdFrames) * this.scale, // largura real da imagem
            this.image.height * this.scale // altura real da imagem
            );
    }

    atualizar()
    {
        this.desenhar(); // coloca a imagem na tela
        this.animar(); // anima os frames da imagem
            
    }

    animar() // método que irá animar os frames das imagens
    {
        this.framesUsados++;

        if(this.framesUsados % this.framesHold === 0)
        {

            if(this.frameAtual < this.qtdFrames - 1)
            {
                this.frameAtual++;
            }
            else
            this.frameAtual = 0;
        }
    }
}

// classe onde iremos usar o player e do inimigo
class Jogadores extends Sprite
{
    constructor({posicao, speed, cor = 'blue', imagem, scale = 1, qtdFrames = 1, offset = {x:0, y:0}})
    {
        super({posicao, imagem, scale, qtdFrames, offset}); // chama o construtor do parente

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
        this.health = 100;
        this.frameAtual = 0 // define qual o frame atual da imagem
        this.framesUsados = 0 // define quantos frames foram usados na animação
        this.framesHold = 7 // define a velocidade dos frames do shopping
    }


    atualizar()
    {
        this.desenhar(); // coloca o player na tela
        this.animar() // anima os frames da iamgem

        // coloca a hitBox dos ataques nas posições corretas
        this.hitBox.posicao.x = this.position.x + this.hitBox.offset.x; 
        this.hitBox.posicao.y = this.position.y;

        
        this.position.y += this.speed.y; // vai descendo a cada loop 
        this.position.x += this.speed.x; // mexe pro lado

        if(this.position.y + this.height + this.speed.y >= canvas.height - 96) // se o objeto for passar da tela do canvas
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