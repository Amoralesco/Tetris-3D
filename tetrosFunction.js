
  class  tetrominoTemporal {
     constructor(x,y,z){
     this.show = this.generarTetrominoTemporal();
     this.x = x;
     this.y = y;
     this.z = z;
     }
     
       generarTetrominoTemporal() { //elegir aleatoriamente el siguiente tetromino
         const tetrominosDisponibles = [Tcuadrado,Tlinea,TetroT,TetroZizquierda,TetroZderecha, TetroLderecha,TetroLizquierda];
         const tetrominoAleatorio = tetrominosDisponibles[Math.floor(Math.random() * tetrominosDisponibles.length)];
         return tetrominoAleatorio;
      } 
      
      espacioLadoY(){ // calcula el espacio debajo del tetromino
        const hight = 0;
        const N = this.show.length;
          
        for (let k = 0; k < N; k++) {
              for (let j = 0; j < N; j++) {
                for (let i = 0; i < N; i++) {
                    if(this.show[j][k][i] != 0){
                          return k;
                    }
                }
              }
            }
        }
        
        espacioLadoX(isPositive){ // calcula el espacio del eje X del tetromino
          const N = this.show.length;
            
          if(isPositive){
            for(let k = N-1; k >= 0; k--){
              for(let j= 0; j < N; j++){
                 for(let i = 0; i < N; i++){
                    if(this.show[i][j][k] != 0){
                      return N-k-1;
                   }
                }             
              }         
            }    
          }else{
            for(let k = 0; k < N; k++){
              for(let j= 0; j < N; j++){
                 for(let i = 0; i < N; i++){
                    if(this.show[i][j][k] != 0){
                      return k;
                   }
                }             
              }         
            } 
          }
          
          return 0;
        }
        
        espacioLadoZ(isPositive){
        const N = this.show.length;
         
         if(isPositive){
           for(let k = N-1; k >= 0; k--){
              for (let j = 0; j < N; j++) {
                for (let i = 0; i < N; i++) {
                    if(this.show[k][j][i] != 0){
                         return N-k-1;
                    }
                }
              }
            }
         }else{
            for(let k = 0; k < N; k++){
              for(let j= 0; j < N; j++){
                 for(let i = 0; i < N; i++){
                    if(this.show[k][j][i] != 0){
                      return k;
                   }
                }             
              }         
            } 
          }
        
        }
      
      
      TetrominoesRotationX(isClockwise) { //rotar en el eje x
            const rotatedTetromino = [];
            const N = this.show.length;
          
            for (let i = 0; i < N; i++) {
              rotatedTetromino.push([]);
              for (let j = 0; j < N; j++) {
                rotatedTetromino[i][j] = isClockwise ? this.show[N - j - 1][i] : this.show[j][N - i - 1];//solo es un bucle for porque no se necesita la posicion x solo la y,z
              }
            }
          
            this.show =  rotatedTetromino;
            this.spacedown = this.espacioLadoX();
       }
      
      TetrominoesRotationY(isClockwise) {//rotar en el eje Y
            const rotatedTetromino = [];
            const N = this.show.length;
          
            for (let k = 0; k < N; k++) {
              rotatedTetromino.push([]);
              for (let j = 0; j < N; j++) {
                rotatedTetromino[k].push([]);
                for (let i = 0; i < N; i++) {
                  rotatedTetromino[k][j][i] = isClockwise ? this.show[ N - i - 1][j][k] : this.show[i][j][N - k - 1];
                }
              }
            }
            this.show = rotatedTetromino;
            this.spacedown = this.espacioLadoY();
      }
      
      
      TetrominoesRotationZ(isClockwise) { //rotar en el eje Z
          const rotatedTetromino = [];
          const N = this.show.length;
        
        
          for (let k = 0; k < N; k++) {
            rotatedTetromino.push([]);
            for (let j = 0; j < N; j++) {
              rotatedTetromino[k].push([]);
              for (let i = 0; i < N; i++) {
                rotatedTetromino[k][j][i] = isClockwise ? this.show[k][N - i - 1][j] : this.show[k][i][N - j - 1];
              }
            }
          }
        
           this.show = rotatedTetromino;
           this.spacedown = this.espacioLadoZ();
        } 
        
        
    }



  class Tablero { // clase tablero, de tamaño 10 de ancho, 10 de profundo, y 20 de alto 
    constructor(profundidad, filas, columnas) {
      this.profundidad = profundidad;
      this.filas = filas;
      this.columnas = columnas;
      this.tablero = this.inicializarTablero();
      this.tetromino = new tetrominoTemporal(3,20,3);
      this.shadowH = 0;
      this.fall = true;
      this.level = 1;
      this.score = 0;
      this.completeLines = 0;

    }
    
    inicializarTablero() { //llena el tablero de ceros
      let tablero = [];
      for (let k = 0; k < this.profundidad; k++) {
        let capa = [];
        for (let i = 0; i < this.filas; i++) {
          let fila = [];
          for (let j = 0; j < this.columnas; j++) {
            if(j != 0  && i != 0  && i != 1  && j != 1){
              fila.push(0); // Inicialmente, todas las celdas están vacías
            }else{
               fila.push(0); // Inicialmente, todas las celdas están vacías
            }
            
          }
          capa.push(fila);
        }
        tablero.push(capa);
      }
      return tablero;
    }
    
    
     imprimirTablero() { //imprime por consola el tablero
      for (let k = 0; k < this.profundidad; k++) {
        console.log("Capa " + k + ":");
        for (let i = 0; i < this.filas; i++) {
          console.log(this.tablero[k][i].join(" "));
        }
        console.log("\n");
      }
    }
    
    play(){  // logica del juego por si una figura cae, actualizar las filas, e ingresar nuevos tetrominos, actualizar las cards de nivel, score y filas etc
        this.actualizarTablero();
        
        if (!this.fall){
          if (!this.limiteSuperior()){
            showLostCard(this.score);
            clearInterval(this.interval);
            return; 
          }
          this.tetromino.show = this.tetromino.generarTetrominoTemporal();
          this.borrarFilasColumnas();
           this.limpiarShadow();
          this.score = this.score + 1;
          this.nivelTablero();
          this.ingresarTetromino();
          this.fall = true;
        }
        updateInfoCard();
        this.velocidadCaida();
}

    
    
    limiteSuperior(){ // metodo que mira si el usuario supera el limite del tablero, es decir, el usuario pierde
      for (let k = 20; k < 24; k++) {
                for (let j = 0; j < 10; j++) {
                  for (let i = 0; i < 10; i++) {
                      if(this.tablero[i][k][j]!= 0){
                          return false;
                      }
                  }
                }
              } 
         return true;
      }
    
   
   ingresarTetromino(){ // metodo que genera un tetromino nuevo en el tablero
        const N = this.tetromino.show.length;
        this.tetromino.y = 20;
        this.tetromino.x = 3;
        this.tetromino.z = 3;
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = this.tetromino.show[k][j][i];
                  }
                }
              }
        this.shadowTablero();
   }
   
   actualizarTablero() { // metodo que genera la logica de caida de la pieza, corroborando los limites y si no colisiona 
    const N = this.tetromino.show.length;
    const S = this.tetromino.espacioLadoY();
    
    if(this.tetromino.y + S <= 0) {
      this.fall = false;
      return;
     }

    for (let k = 0; k < N; k++) {
        for (let j = 0; j < N; j++) {
            for (let i = 0; i < N; i++) {              
               let z = this.tetromino.z + j;
               let y = this.tetromino.y + k;
               let x = this.tetromino.x + i;
               if(this.tetromino.show[j][k][i]!= 0  && this.tablero[z][y - 1][x]!= 0 && this.tetromino.show[j][k][i]!= 10  && this.tablero[z][y - 1][x]!= 10){
                 if(k == 0){
                   this.fall = false;
                   return;
                 }else if(this.tetromino.show[j][k-1][i] == 0 || this.tetromino.show[j][k-1][i] == 10){
                   this.fall = false;
                   return;
                 }              
               }
            }
        }
    }
    

    for (let k = 0; k < N; k++) {
        for (let j = 0; j < N; j++) {
            for (let i = 0; i < N; i++) {
                let x = this.tetromino.x + i;
                let y = this.tetromino.y + j;
                let z = this.tetromino.z + k;
                if (this.tetromino.show[k][j][i] !=0 && this.tetromino.show[k][j][i] !=10) {
                    this.tablero[z][y][x] = 0;
                }
            }
        }
    }
    

    for (let k = 0; k < N; k++) {
        for (let j = 0; j < N; j++) {
            for (let i = 0; i < N; i++) {
                let z = this.tetromino.z + k;
                let y = this.tetromino.y + j - 1;
                let x = this.tetromino.x + i;
                  if(this.tetromino.show[k][j][i] !=0 && this.tetromino.show[k][j][i] !=10){
                    this.tablero[z][y][x] = this.tetromino.show[k][j][i];
                  }
                    
                
            }
        }
    }

        this.tetromino.y--;
   }
   
      limpiarShadow(){  //borrar la proyeccion del tetromino
        const N = this.tetromino.show.length;
        const S = this.tetromino.espacioLadoY();
        for (let k = 0; k < 24; k++) {
            for (let j = 0; j < 10; j++) {
              for (let i = 0; i < 10; i++) {
                 if(this.tablero[j][k][i] == 10){
                    this.tablero[j][k][i] = 0;                 
                 }
              }
            }
          } 
      }
   
   
      
      shadowTablero(){ //dibujar la proyecion del tetromino 
        const N = this.tetromino.show.length;
        const S = this.tetromino.espacioLadoY();   
        let band = true;
        this.shadowH = -S;
        let high = 0;
        for (let m = -S; m < this.tetromino.y-N+1; m++) {
      //    if(this.tetromino.y > 16){break;}
          for (let k = 0; k < N; k++) {
            for (let j = S; j < N; j++){
              for (let i = 0; i < N; i++) {
 
                  // console.log("altura",high, k,i);
                  if(this.tetromino.show[k][j][i]!=0 && this.tablero[this.tetromino.z+k][j+m][this.tetromino.x+i]!= 0 &&  this.tablero[this.tetromino.z+k][j+m][this.tetromino.x+i]!= 10){                    
                      this.shadowH = m+1;
                     band = false;
                      break;
                  }                     
              }
            }
          }
        }

        
           
        
        for (let k = 0; k < N; k++) {
            for (let j = S; j < N; j++) {
              for (let i = 0; i < N; i++) {
                 if(this.tetromino.show[k][j][i]!=0  && this.tablero[this.tetromino.z+k][j+this.shadowH][this.tetromino.x+i] == 0){
                    this.tablero[this.tetromino.z+k][j+this.shadowH][this.tetromino.x+i] = 10;                 
                 }
              }
            }
          } 
          
           for (let j = 0; j < N; j++) {
              for (let i = 0; i < N; i++) {
                if(this.tetromino.show[j][0][i]!=0 && this.tablero[this.tetromino.z+j][this.tetromino.y+S-2][this.tetromino.x+i]!= 0  && this.tablero[this.tetromino.z+j][this.tetromino.y+S-2][this.tetromino.x+i]!= 0 && this.tablero[this.tetromino.z+j][this.tetromino.y+S-3][this.tetromino.x+i]!= 0){
                  return;
                }
              }
            }
 
     
        
    }   

   
      TetrominoTraslationZ(isPositive){ //mover el tetromino en el tablero en el eje Z

            const N = this.tetromino.show.length;    
            const S = this.tetromino.espacioLadoZ(isPositive);
            if(isPositive && 10 <= this.tetromino.z+N-S){
              return;
            }
            if(!isPositive && 0 >= this.tetromino.z+S){
              return;
            }
            
         
             if(isPositive){
               for (let j = N - 1 ; j >= 0; j--) {
                 for (let k = 0 ; k < N; k++) {                
                    for (let i = 0; i < N; i++) {              
                       let z = this.tetromino.z + j;
                       let y = this.tetromino.y + k;
                       let x = this.tetromino.x + i;
                         if(this.tetromino.show[j][k][i]!= 0  && this.tablero[z+1][y][x]!= 0 && this.tetromino.show[j][k][i]!= 10  && this.tablero[z+1][y][x]!= 10){                           
                           if(j == N - 1){
                             return;
                           }else if(this.tetromino.show[j+1][k][i] == 0 || this.tetromino.show[j+1][k][i] == 10){
                             return;
                           }              
                         }                     
                    }
                 }
               }
            }
            
            else{
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                    for (let i = 0; i < N; i++) {              
                       let z = this.tetromino.z + j;
                       let y = this.tetromino.y + k;
                       let x = this.tetromino.x + i;
                       if(this.tetromino.show[j][k][i]!= 0  && this.tablero[z-1][y][x]!= 0 && this.tetromino.show[j][k][i]!= 10  && this.tablero[z-1][y][x]!= 10){
                              if(j == 0){
                                   return;
                              }else if(this.tetromino.show[j-1][k][i] == 0 || this.tetromino.show[j-1][k][i] == 10){
                                   return;
                              }              
                         }                     
                    }
                 }
               }                                  
            }         
            
            this.limpiarShadow();
            
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      if(this.tetromino.show[k][j][i] != 0 && this.tetromino.show[k][j][i] != 10){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = 0;}
                  }
                }
              }
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      if(isPositive){
                        if(this.tetromino.z+k+1 <= 10 && this.tetromino.show[k][j][i]!= 0 && this.tetromino.show[k][j][i]!= 10){this.tablero[this.tetromino.z+k+1][this.tetromino.y+j][this.tetromino.x+i] = this.tetromino.show[k][j][i];}
                          
                      }else{
                        if(this.tetromino.z+k-1 >= 0 && this.tetromino.show[k][j][i]!= 0 && this.tetromino.show[k][j][i]!= 10){this.tablero[this.tetromino.z+k-1][this.tetromino.y+j][this.tetromino.x+i] = this.tetromino.show[k][j][i];}
                          
                      }  
                  }
                }
              }
               this.tetromino.z = isPositive ? this.tetromino.z+1: this.tetromino.z-1;
               this.shadowTablero();
        }
        
        
        
        
   TetrominoTraslationX(isPositive){ //mover el tetromino en el tablero en el eje X
            const N = this.tetromino.show.length;    
            const S = this.tetromino.espacioLadoX(isPositive);
            if(isPositive && 10 <= this.tetromino.x+N-S){
              return;
            }
            if(!isPositive && 0 >= this.tetromino.x+S){
              return;
            }
            
            
            
             if(isPositive){               
                 for (let k = 0 ; k < N; k++) {  
                  for (let j = 0 ; j < N; j++) {
                    for (let i = 0; i < N; i++) {              
                       let z = this.tetromino.z + j;
                       let y = this.tetromino.y + k;
                       let x = this.tetromino.x + i;
                         if(this.tetromino.show[j][k][i]!= 0  && this.tablero[z][y][x+1]!= 0 && this.tetromino.show[j][k][i]!= 10  && this.tablero[z][y][x+1]!= 10){                           
                           if(i == N - 1){
                             return;
                           }else if(this.tetromino.show[j][k][i+1] == 0 || this.tetromino.show[j][k][i+1] == 10){
                             return;
                           }              
                         }                     
                    }
                 }
               }
            }
            
            else{
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                    for (let i = 0; i < N; i++) {              
                       let z = this.tetromino.z + j;
                       let y = this.tetromino.y + k;
                       let x = this.tetromino.x + i;
                       if(this.tetromino.show[j][k][i]!= 0  && this.tablero[z][y][x-1]!= 0 && this.tetromino.show[j][k][i]!= 10  && this.tablero[z][y][x-1]!= 10){
                              if(i == 0){
                                   return;
                              }else if(this.tetromino.show[j][k][i-1] == 0 || this.tetromino.show[j][k][i-1] == 10){
                                   return;
                              }              
                         }                     
                    }
                 }
               }                                  
            } 
            this.limpiarShadow();
     
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                     if(this.tetromino.show[k][j][i] != 0 && this.tetromino.show[k][j][i] != 10){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = 0;}
                      
                  }
                }
              }
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      if(isPositive){
                          if(this.tetromino.x+i+1 <= 10 && this.tetromino.show[k][j][i]!= 0 && this.tetromino.show[k][j][i]!= 10){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i+1] = this.tetromino.show[k][j][i];}
                      }else {
                         if(this.tetromino.x+i-1 <= 10 && this.tetromino.show[k][j][i]!= 0 && this.tetromino.show[k][j][i]!= 10){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i-1] = this.tetromino.show[k][j][i];}
                      }                  
                  }
                }
              }
               this.tetromino.x = isPositive ? this.tetromino.x+1: this.tetromino.x-1;
               this.shadowTablero();
        }
        
        
        
    velocidadCaida(){ //metodo que maneja la logica de la velocidad de caiga, según el nivel
         clearInterval(this.interval);
         this.interval = setInterval(() => {
           //console.log("qu pasa");
            this.play();
            redraw();
        }, 1000/this.level); 
    }  
    
    
    TetrominoRotar(eje,clockwise) { // logica para rotar en cualquiera de los 3 ejes, XYZ
    
            const N = this.tetromino.show.length;
            const temp = this.tetromino.show;
            this.limpiarShadow();
            if(eje == 1){
                 this.tetromino.TetrominoesRotationZ(clockwise);
            }
            if(eje == 2){
                 this.tetromino.TetrominoesRotationY(clockwise);
            }
            if(eje == 3){
                 this.tetromino.TetrominoesRotationX(clockwise);
            }
            
        
        
            for (let k = 0; k < N; k++) { // blucle que mira si la rotacion se hace dentro del tablero
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                    if((this.tetromino.z+k  < 0 || this.tetromino.x+i  < 0 ||  this.tetromino.z+k  >= 10 || this.tetromino.x+i >= 10 || this.tetromino.y + j <= 0) && this.tetromino.show[k][j][i] != 0){
                        if(eje == 1){
                               this.tetromino.TetrominoesRotationZ(!clockwise);
                          }
                          if(eje == 2){
                               this.tetromino.TetrominoesRotationY(!clockwise);
                          }
                          if(eje == 3){
                               this.tetromino.TetrominoesRotationX(!clockwise);
                          } 
                      this.shadowTablero();
                      return;
                    }
                  }
                }
              } 
              
              
              
               for (let k = 0; k < N; k++) {
                            for (let j = 0; j < N; j++) {
                              for (let i = 0; i < N; i++) {
                                 if(temp[k][j][i] != 0){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = 0 ;}   
                              }
                            }
                          }
          
              
              
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                    if(this.tetromino.z+k > 0 &&  this.tetromino.x+i > 0 && this.tetromino.z+k < 10 &&  this.tetromino.x+i < 10 && this.tetromino.y+j > 0 && this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i]!= 0 &&  this.tetromino.show[k][j][i] != 0){
                        if(eje == 1){
                               this.tetromino.TetrominoesRotationZ(!clockwise);
                          }
                          if(eje == 2){
                               this.tetromino.TetrominoesRotationY(!clockwise);
                          }
                          if(eje == 3){
                               this.tetromino.TetrominoesRotationX(!clockwise);
                          }
                          
                          for (let k = 0; k < N; k++) {
                            for (let j = 0; j < N; j++) {
                              for (let i = 0; i < N; i++) {
                                 if(temp[k][j][i] != 0){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = temp[k][j][i];}   
                              }
                            }
                          }
                     // this.shadowTablero();
                      return;
                    }
                  }
                }
              } 
              
           
         
            // console.log("enter");
            for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                    if( this.tetromino.show[k][j][i] != 0  && this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] == 0){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = this.tetromino.show[k][j][i];}
                      
                  }
                }
              }  
              
           this.shadowTablero();
           }
       
     
       borrarFilasColumnas() { //logica para borrar las lineas completadas; el score se multiplica por un valor de 2**(numero de filas completadas);
        let rowCounter = 0;
        let band = false;
        for (let y = 0; y < this.filas; y++) {
            let isComplete = true;
            for (let z = 0; z < this.profundidad; z++) {
                for (let x = 0; x < this.columnas; x++) {
                    if (this.tablero[z][y][x] == 0) {
                        isComplete = false;
                        break;
                    }
                }
                if (!isComplete) break;
            }

            if (isComplete) {
                // borrar la capa actual
                for (let z = 0; z < this.profundidad; z++) {
                    for (let x = 0; x < this.columnas; x++) {
                        this.tablero[z][y][x] = 0;
                    }
                }

                // Mover las capas superiores
                for (let layer = y; layer < this.filas - 1; layer++) {
                    for (let z = 0; z < this.profundidad; z++) {
                        for (let x = 0; x < this.columnas; x++) {
                            this.tablero[z][layer][x] = this.tablero[z][layer + 1][x];
                        }
                    }
                }

                // limpiar la capa superior
                for (let z = 0; z < this.profundidad; z++) {
                    for (let x = 0; x < this.columnas; x++) {
                        this.tablero[z][this.filas - 1][x] = 0;
                    }
                }
            }
            if(isComplete){
              rowCounter = rowCounter+1;
              band = true;  
            }
                      
        }
        
        if(band){
          this.completeLines = this.completeLines + rowCounter;
          this.score = this.score+25*(2**rowCounter-1);
        }
        
    }
    
    nivelTablero(){ // metodo que define el valor del nivel según el score
      if(this.score >= 50){
        this.level = Math.floor(this.score/25);
      }    
  }
}
