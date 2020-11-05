(function(){ //Circle Game -M1020

        //Globales

    let ancho = 1000, alto = 500;

    let player = {

        x : 100,
        y : 250
    };

    let arriba = document.getElementById('arriba'),
        derecha = document.getElementById('derecha'),
        izquierda = document.getElementById('izquierda'),
        abajo = document.getElementById('abajo'),
        game_over = false,
        numVid = 5,
        PunTos = 0,
        elemento,
        color_jugador = 'rgb(39, 255, 93)';

        //Funciones
            const inicializar = () =>{

                elemento = document.getElementById('game');
                game = elemento.getContext('2d');
            }

            const borrarCanvas = ()=>{

                elemento.width = ancho;
                elemento.height = alto;
            }

        class jugador{

                constructor(posX, posY){
                    this.posX = posX;
                    this.posY = posY; 
                }

            posiciones (P) {

                let PosX = this.posX;
                let PosY = this.posY;

                    if( P == 'x' ){

                        return PosX;
                    }

                    if( P == 'y' ){

                        return PosY;
                    }
            }

            dibujar (color) {

                //Jugador
                game.beginPath(); 
                    game.lineWidth = 5;
                    game.strokeStyle = color;
                    game.arc(this.posX, this.posY, 40, 0, Math.PI*2, false);
                game.stroke();
            }

            moverArriba () {

                this.posY -= 25;
    
                    if( this.posY <= 30 ){
        
                        this.posY += 25;
                    }
            }

            moverAbajo () {

                this.posY += 25;
                    
                    if( this.posY >= 475 ){
    
                        this.posY -= 25;
                    }
            }

            moverDerecha () {

                this.posX += 25;
    
                    if( this.posX >= 975 ){
    
                        this.posX -= 25;
                    }
            }

            moverIzquierda () {

                this.posX -= 25;
    
                    if( this.posX <= 25 ){
    
                        this.posX += 25;
                    }
            }

            vidas () {

                let Vidas = document.getElementById('vidas');

                Vidas.innerHTML = numVid;

                if( numVid <= 0 ){
                    
                    clearInterval(Time);
                    clearInterval(generarEnemigosT);
                    clearInterval(timeGame);

                    game_over = true;

                    msg('sin_vidas', 'png');

                    borrarCanvas();
                }
            }
        }

        class puntos{

            constructor(x, y){

                this.x = x;
                this.y = y;
            }

            dibujar (color) {

                game.beginPath(); 
                    game.lineWidth = 5;
                    game.strokeStyle = color;
                    game.arc(this.x, this.y, 16, 0, Math.PI*2, false);
                game.stroke();
            }

            wind () {
                    //abajo
                if( Jugador.posiciones('x') === this.x && Jugador.posiciones('y') + 50 === this.y ){

                    this.x = NumX();
                    this.y = NumY();

                        PunTos += 3;
                }
                    //abajo-derecha
                    else if( Jugador.posiciones('x') + 25 === this.x && Jugador.posiciones('y') + 50 === this.y){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }
                    //abajo-izquierda
                    else if( Jugador.posiciones('x') - 25 === this.x && Jugador.posiciones('y') + 50 === this.y){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }

                    //arriba
                else if( Jugador.posiciones('x') === this.x && Jugador.posiciones('y') - 50 === this.y ){

                    this.x = NumX();
                    this.y = NumY();

                        PunTos += 3;
                }
                    //arriba izquierda
                    else if( Jugador.posiciones('x') - 25 === this.x && Jugador.posiciones('y') - 50 === this.y ){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }
                    //arriba derecha
                    else if( Jugador.posiciones('x') + 25 === this.x && Jugador.posiciones('y') - 50 === this.y ){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }

                    //dercha
                else if( Jugador.posiciones('x') - 50 === this.x  && Jugador.posiciones('y') === this.y ){

                    this.x = NumX();
                    this.y = NumY();

                        PunTos += 3;
                }
                    //derecha arriba
                    else if( Jugador.posiciones('x') - 50 === this.x  && Jugador.posiciones('y') === this.y + 25 ){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }
                    //derecha abajo
                    else if( Jugador.posiciones('x') - 50 === this.x  && Jugador.posiciones('y') === this.y - 25 ){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }

                    //izquierda
                else if( Jugador.posiciones('x') + 50 === this.x  && Jugador.posiciones('y') === this.y){

                    this.x = NumX();
                    this.y = NumY();

                        PunTos += 3;
                }
                    //izquierda abajo
                    else if( Jugador.posiciones('x') + 50 === this.x  && Jugador.posiciones('y') === this.y + 25 ){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }
                    //izquierda abajo
                    else if( Jugador.posiciones('x') + 50 === this.x  && Jugador.posiciones('y') === this.y - 25 ){

                        this.x = NumX();
                        this.y = NumY();

                            PunTos += 3;
                    }
            }
        }


        class enemigo{

                constructor(posX, posY){
                    this.posX = posX;
                    this.posY = posY;
                }

            posiciones (p) {

                let Posx = this.posX;
                let Posy = this.posY;

                if( p == 'x' ){

                    return Posx;
                }
                else{

                    return Posy;
                }
            }

            dibujar (color, tipo) {

                switch(tipo){

                    

                    case 'cuadrado': //Enemigos cuadrados :v
                                    game.strokeStyle = color;
                                    game.strokeRect( this.posX, this.posY, 60, 60 );
                    
                                    let face = new Image();
                    
                                        face.src = "recursos/face_enemigo.png"
                    
                                    game.drawImage( face, this.posX+3, this.posY, 55, 57 );

                                        break;

                    case 'triangulo': //Enemigos triangulos
                                    game.beginPath();
                                        game.moveTo( this.posX + 25, this.posY + 25 );
                                        game.lineTo( this.posX, this.posY - 25 );
                                        game.lineTo( this.posX - 25, this.posY + 25 );
                                        game.closePath();
                                        game.strokeStyle = color;
                                    game.stroke();

                                    game.beginPath();
                                        game.moveTo( this.posX + 23, this.posY + 23 );
                                        game.lineTo( this.posX, this.posY - 22 );
                                        game.lineTo( this.posX - 23, this.posY + 23 );
                                        game.fillStyle = "#fff";
                                    game.fill();

                                    let face2 = new Image();
                    
                                        face2.src = "recursos/face_enemigo2.png"
                    
                                    game.drawImage( face2, this.posX-8, this.posY-2, 18, 18 );

                                        break;
                }
            }

            moverX () {

                this.posX -= 25;
            }

            choque (e) {

                switch(e){

                    case 'cuadrado': //Cuadrados
                                //1
                        if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY - 25){

                            numVid--;
                            color_jugador = 'red';
                        }
                            //2
                        else if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY + 25){

                            numVid--;
                            color_jugador = 'red';
                        }
                            //3
                        else if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY + 50){

                            numVid--;
                            color_jugador = 'red';
                        }
                            //4
                        else if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY + 75){

                            numVid--;
                            
                        }
                            //5
                        else if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY ){

                            numVid--;
                            color_jugador = 'red';
                        }
                        
                        //---------------
                            //1
                        if( Jugador.posiciones('x') === this.posX + 75 && Jugador.posiciones('y') === this.posY - 25){

                            numVid--;
                            color_jugador = 'red';
                        }
                        
                        //2
                        else if( Jugador.posiciones('x') === this.posX + 75 && Jugador.posiciones('y') === this.posY + 25){

                            numVid--;
                            color_jugador = 'red';
                        }
                        
                            //3
                        else if( Jugador.posiciones('x') === this.posX + 75 && Jugador.posiciones('y') === this.posY + 50){

                            numVid--;
                            color_jugador = 'red';
                        }
                        
                            //4
                        if( Jugador.posiciones('x') === this.posX + 75 && Jugador.posiciones('y') === this.posY + 75){

                            numVid--;
                            color_jugador = 'red';
                        }
                        
                            //5
                        if( Jugador.posiciones('x') === this.posX + 75 && Jugador.posiciones('y') === this.posY){

                            numVid--;
                            color_jugador = 'red';
                        }

                        break;

                    case 'triangulo': //triangulo

                        //arriba
                        if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY - 50){

                            numVid-=2;
                            color_jugador = 'red';
                        }

                        if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY - 25){

                            numVid-=2;
                            color_jugador = 'red';
                        }
                        
                        //En medio
                        if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY){

                            numVid-=2;
                            color_jugador = 'red';
                        }

                        if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY + 25){

                            numVid-=2;
                            color_jugador = 'red';
                        }
                        
                        //abajo
                        if( Jugador.posiciones('x') === this.posX && Jugador.posiciones('y') === this.posY + 50){

                            numVid-=2;
                            color_jugador = 'red';
                        }
                }
            }
        }

        //choque entre enemigo y player
            const NumY = () =>{

                let numY = Math.floor(Math.random() * 400 / 25);

                Y = parseInt(numY) * 25;

                return Y;
            }

            const NumX = () =>{

                let numX = Math.floor(Math.random() * 1000 / 25);

                X = parseInt(numX) * 25;

                return X;
            }


        //Eventos en Pc
        document.addEventListener('keydown', function(evento){

            switch(evento.keyCode){

                case 73: Jugador.moverArriba(); break;    //i
                case 75: Jugador.moverAbajo(); break;     //k
                case 76: Jugador.moverDerecha(); break;   //l
                case 74: Jugador.moverIzquierda(); break; //j
            }

        });  

        //---------Principal Function of the game-----------

        let band = false;

        let Jugador = new jugador( player.x, player.y );
        let Enemigo1, Enemigo2, Enemigo3, Enemigo4, Enemigo5, Enemigo6, Enemigo7;

            arriba.addEventListener('click', function(){ Jugador.moverArriba(); });
            abajo.addEventListener('click', function(){ Jugador.moverAbajo(); });
            derecha.addEventListener('click', function(){ Jugador.moverDerecha(); });
            izquierda.addEventListener('click', function(){ Jugador.moverIzquierda(); });

        let generarEnemigosT = setInterval(function(){

            band = true;

            Enemigo4 = new enemigo( 1000 + 300 , NumY() + 25 );
            Enemigo5 = new enemigo( 1000 + 600 , NumY() + 25 );
            Enemigo6 = new enemigo( 1000 + 900 , NumY() + 25 );

            let moverEnemigo4 = setInterval( function(){

                Enemigo4.moverX();

                    if( Enemigo4.posiciones('x') <= -100 ){

                        clearInterval(moverEnemigo4);
                    }

                Enemigo4.choque('triangulo');

            }, 100 );

            let moverEnemigo5 = setInterval( function(){

                Enemigo5.moverX();

                    if( Enemigo5.posiciones('x') <= -100 ){

                        clearInterval(moverEnemigo5);
                    }

                Enemigo5.choque('triangulo');

            }, 100 );

        }, 8000);

        const Cuadrados = (tipo) =>{

            switch(tipo){

                case 'a':

                    let generarEnemigosCA = setInterval(function(){

                        Enemigo1 = new enemigo( 1000 , NumY() );
                        Enemigo2 = new enemigo( 1000 + 100 , NumY() );

                        let moverEnemigo1 = setInterval( function(){ 

                            Enemigo1.moverX();
            
                                if( Enemigo1.posiciones('x') <= -100 ){
            
                                    clearInterval(moverEnemigo1);
                                }
            
                            Enemigo1.choque('cuadrado');
            
                        }, 200);
            
            
                        let moverEnemigo2 = setInterval( function(){ 
            
                            Enemigo2.moverX();
            
                                if( Enemigo2.posiciones('x') <= -100 ){
            
                                    clearInterval(moverEnemigo2);
                                }
            
                            Enemigo2.choque('cuadrado');
             
                        }, 200);

                        if( game_over == true ){

                            clearInterval(generarEnemigosCA);
                        }

                    }, 11000); break;

                case 'b':

                    let generarEnemigosCB = setInterval( function(){

                        Enemigo3 = new enemigo( 1000 + 200 , NumY() );
                        Enemigo8 = new enemigo( 1000 + 300 , NumY() );
            
                        let moverEnemigo3 = setInterval( function(){ 
            
                            Enemigo3.moverX();
            
                                if( Enemigo3.posiciones('x') <= -100 ){
            
                                    clearInterval(moverEnemigo3);
                                }
                            
                            Enemigo3.choque('cuadrado');
             
                        }, 200);
            
                        let moverEnemigo8 = setInterval( function(){ 
            
                            Enemigo8.moverX();
            
                                if( Enemigo8.posiciones('x') <= -100 ){
            
                                    clearInterval(moverEnemigo8);
                                }
                            
                            Enemigo8.choque('cuadrado');
             
                        }, 200);

                        if( game_over == true ){

                            clearInterval(generarEnemigosCB);
                        }
                        
                    }, 11000 );
            }
    }

            //---DATOS DEL JUEGO---

            let pts;
        let punts = setInterval( function(){

            pts = new puntos( NumX() + 25, NumY() + 25 );

            t = setInterval( function(){

                p = document.getElementById('puntos');

                    p.innerHTML = PunTos;

            }, 500 );

        }, 7000 );

        //Msg
        const msg = (img, type) =>{

            document.getElementById('msg').className = 'msg_V'; 

            let cont=0;

            let time = setInterval(function(){cont++; if(cont==1){
                
                    clearInterval(time)
                    document.getElementById('msg').className = 'msg_NV'; 
                }
            }, 5000);

            if( type == 'png' ){

                document.querySelector('#msg img').src = `recursos/${img}.png`;
            
            } else if( type == 'gif' ){

                document.querySelector('#msg img').src = `recursos/${img}.gif`;
            }
        }

        msg('EnemigoC','gif');

        //-------------------------------------------

            let contador = 0;
        let timeGame = setInterval( function(){

            color_jugador = 'rgb(39, 255, 93)';

                contador++;

            tiempo = document.getElementById('tiempo');
            
            tiempo.innerHTML = contador;


            if( contador == 20 ){

                Cuadrados('a');
                console.log(true);
            }

            if( contador == 60 ){

                Cuadrados('b');
            }

        }, 1000 );

        const Draw = () =>{

                pts.dibujar('#00D9FF'); 
                pts.wind();
        
                Enemigo4.dibujar( 'yellow', 'triangulo' );
                Enemigo5.dibujar( 'yellow', 'triangulo' );


            Enemigo1.dibujar('red', 'cuadrado');
            Enemigo2.dibujar('blue', 'cuadrado');
            Enemigo3.dibujar('green', 'cuadrado');
            Enemigo8.dibujar('orange', 'cuadrado'); 
        }


    const Principal = () =>{ //Funcion principal

        borrarCanvas();
        Jugador.dibujar(color_jugador);
        Jugador.vidas();

        if( band == true ){

            Draw();
        }
    }

    let FPS = 30;

           let Time = setInterval( Principal, 1000/FPS );

        window.addEventListener('load', inicializar, false);
}())