
// classe onde iremos utilizar as imagens do jogo
class Sprite
{
    constructor({posicao, imagem})
    {
        this.position = posicao;
        this.width = 50;
        this.height = 150;
        this.image = new Image();  // cria uma nova imagem
        this.image.src = imagem; // imagem recebe o link da imagem, que queremos mostrar

    }

    desenhar()
    {
        con.drawImage(this.image, this.position.x, this.position.y);
    }

    atualizar()
    {
        this.desenhar();
            
    }
}

// classe onde iremos usar o player e do inimigo
class Jogadores
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
        this.health = 100;
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