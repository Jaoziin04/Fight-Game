
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
        this.scale = scale // define a dimensão das imagens
        this.qtdFrames = qtdFrames // define a quantidade de frames da imagem
        this.frameAtual = 0 // define qual o frame atual da imagem
        this.framesUsados = 0 // define quantos frames foram usados na animação
        this.framesHold = 7 // define a velocidade dos frames do shopping
        this.offset = offset
 
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
    constructor({
        posicao, 
        speed, 
        cor = 'blue', 
        imagem, 
        scale = 1, 
        qtdFrames = 1, 
        offset = {x:0, y:0}, 
        sprites, // contem todas as sprites que um player possui
        hitBox = { offset: {}, width: undefined, height: undefined}
    })
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
            offset: hitBox.offset,
            width:  hitBox.width,
            height: hitBox.height 
            
        }

        this.cor = cor;
        this.atacando;
        this.health = 100;
        this.frameAtual = 0 // define qual o frame atual da imagem
        this.framesUsados = 0 // define quantos frames foram usados na animação
        this.framesHold = 7 // define a velocidade dos frames do shopping
        this.sprites = sprites // contem todas as sprites de um player
        this.morto = false // indica que o player está morto

        // foreach
        for(const sprite in this.sprites)
        {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imagem; 
        }


    }


    atualizar()
    {
        this.desenhar(); // coloca o player na tela

        if(!this.morto)
            this.animar() // anima os frames da iamgem

        // coloca a hitBox dos ataques nas posições corretas
        this.hitBox.posicao.x = this.position.x + this.hitBox.offset.x; 
        this.hitBox.posicao.y = this.position.y + this.hitBox.offset.y;

    
        
        this.position.y += this.speed.y; // vai descendo a cada loop 
        this.position.x += this.speed.x; // mexe pro lado

        // gravidade
        if(this.position.y + this.height + this.speed.y >= canvas.height - 96) // se o objeto for passar da tela do canvas
        {
            this.speed.y = 0; // para de cair
            this.position.y = 330 // posição exata do solo
        }
        else // se não
            this.speed.y += gravidade; // objetos vão caindo

        console.log(this.position.y)
            
    }

    ataque()
    {
        this.trocarSprite('ataque1');
        this.atacando = true;

    }

    levouDano()
    {
        this.health -= 20;

        if(this.health <= 0)
        {
            this.trocarSprite('morte');
        }
        else
            this.trocarSprite('hit');
    }

    trocarSprite(sprite) // método que vai trocar as imagens das sprites dos players
    {
          // sobrepondo quando algum dos player morre
          if(this.image === this.sprites.morte.image)
          {
             if(this.frameAtual === this.sprites.morte.qtdFrames - 1)
                 this.morto = true; 
             return
          }

        // sobrepondo todas as outras animações, com a animação de ataque
        if(this.image === this.sprites.ataque1.image && this.frameAtual < this.sprites.ataque1.qtdFrames - 1)
            return

        // sobrepondo quando algum dos player leva dano
        if(this.image === this.sprites.hit.image && this.frameAtual < this.sprites.hit.qtdFrames - 1)
            return


        switch(sprite)
        {
            case 'idle':
                if(this.image !== this.sprites.idle.image)
                { 
                    this.image = this.sprites.idle.image; // coloca a padrão na tela
                    this.qtdFrames = this.sprites.idle.qtdFrames; // coloca a quantidade de frames certa
                    this.frameAtual = 0; 
                }
            break;

            case 'correr':
                if(this.image !== this.sprites.correr.image)
                {
                    this.image = this.sprites.correr.image; // coloca a imagem de correr
                    this.qtdFrames = this.sprites.correr.qtdFrames; // coloca a quantidade de frames certa
                    this.frameAtual = 0;
                }
            break;

            case 'pular':
                if(this.image !== this.sprites.pular.image)
                {
                    this.image = this.sprites.pular.image; // coloca a imagem de pular na tela
                    this.qtdFrames = this.sprites.pular.qtdFrames; // coloca a quantidade de frames certa
                    this.frameAtual = 0; 
                }
            break;

            case 'cair':
                if(this.image !== this.sprites.cair.image)
                {
                    this.image = this.sprites.cair.image; // coloca a imagem de cair na tela
                    this.qtdFrames = this.sprites.cair.qtdFrames; // coloca a quantidade de frames certa
                    this.frameAtual = 0; 
                }
            break;

            case 'ataque1':
                if(this.image !== this.sprites.ataque1.image)
                {
                    this.image = this.sprites.ataque1.image; // coloca a imagem de atacar na tela
                    this.qtdFrames = this.sprites.ataque1.qtdFrames; // coloca a quantidade de frames certa
                    this.frameAtual = 0; 
                }
            break;

            case 'hit':
                if(this.image !== this.sprites.hit.image)
                {
                    this.image = this.sprites.hit.image; // coloca a imagem de dano na tela
                    this.qtdFrames = this.sprites.hit.qtdFrames; // coloca a quantidade de frames certa
                    this.frameAtual = 0; 
                }
            break;

            case 'morte':
                if(this.image !== this.sprites.morte.image)
                {
                    this.image = this.sprites.morte.image; // coloca a imagem de morte na tela
                    this.qtdFrames = this.sprites.morte.qtdFrames; // coloca a quantidade de frames certa
                    this.frameAtual = 0; 
                }
            break;

        }
    }
}