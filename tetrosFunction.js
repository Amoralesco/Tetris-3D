
  class  tetrominoTemporal {
     constructor(x,y,z){
     this.show = this.generarTetrominoTemporal();
     this.x = x;
     this.y = y;
     this.z = z;
     }
     
       generarTetrominoTemporal() { //elegir aleatoriamente el siguiente tetromino
         const tetrominosDisponibles = [Tcuadrado, Tlinea, TetroT, TetroZizquierda, TetroZderecha, TetroLderecha, TetroLizquierda];
         const tetrominoAleatorio = tetrominosDisponibles[Math.floor(Math.random() * tetrominosDisponibles.length)];
         return tetrominoAleatorio;
      } 
      
      espacioLadoY(){
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
        
        espacioLadoX(isPositive){
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
      
      
      TetrominoesRotationX(isClockwise) {//rotar en el eje x
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



  class Tablero {
    constructor(profundidad, filas, columnas) {
      this.profundidad = profundidad;
      this.filas = filas;
      this.columnas = columnas;
      this.tablero = this.inicializarTablero();
      this.tetromino = new tetrominoTemporal(3,20,3);
      this.fall= true;
    }
    
    inicializarTablero() {
      let tablero = [];
      for (let k = 0; k < this.profundidad; k++) {
        let capa = [];
        for (let i = 0; i < this.filas; i++) {
          let fila = [];
          for (let j = 0; j < this.columnas; j++) {
            if(k != 0){
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
    
    
     imprimirTablero() {
      for (let k = 0; k < this.profundidad; k++) {
        console.log("Capa " + k + ":");
        for (let i = 0; i < this.filas; i++) {
          console.log(this.tablero[k][i].join(" "));
        }
        console.log("\n");
      }
    }
    
    play(){
      this.actualizarTablero();
       if(!this.fall){
        this.tetromino.show = this.tetromino.generarTetrominoTemporal();
        this.ingresarTetromino();
        this.borrarFilasColumnas();
        this.fall = true; 
      }        
    }
    
    
    
   
   ingresarTetromino(){
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
   }
   
   actualizarTablero() {
    const N = this.tetromino.show.length;
    const S = this.tetromino.espacioLadoY();
    //console.log("S",S,this.tetromino.y,this.tetromino.y + S)
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
               if(this.tetromino.show[j][k][i]!= 0  && this.tablero[z][y - 1][x]!= 0){
                 if(k == 0){
                   console.log(y-1);
                   this.fall = false;
                   return;
                 }else if(this.tetromino.show[j][k-1][i] == 0){
                   console.log(y-1);
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
                if (this.tetromino.show[k][j][i] !=0 ) {
                    this.tablero[z][y][x] = 0;
                }
            }
        }
    }
    

    // Update the tetromino position
    for (let k = 0; k < N; k++) {
        for (let j = 0; j < N; j++) {
            for (let i = 0; i < N; i++) {
                let z = this.tetromino.z + k;
                let y = this.tetromino.y + j - 1;
                let x = this.tetromino.x + i;
                  if(this.tetromino.show[k][j][i] !=0 ){
                    this.tablero[z][y][x] = this.tetromino.show[k][j][i];
                  }
                    
                
            }
        }
    }

        this.tetromino.y--;
        //this.imprimirTablero();
 
}

   
      TetrominoTraslationZ(isPositive){

            const N = this.tetromino.show.length;    
            const S = this.tetromino.espacioLadoZ(isPositive);
            const A = this.tetromino.espacioLadoX(true);
            const B = this.tetromino.espacioLadoX(false);
            console.log(this.tetromino.z,N,S,this.tetromino.z+N-S ,  this.tetromino.z+S)
            if(isPositive && 10 <= this.tetromino.z+N-S){
              return;
            }
            if(!isPositive && 0 >= this.tetromino.z+S){
              return;
            }
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      if(this.tetromino.show[k][j][i] != 0){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = 0;}
                  }
                }
              }
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      if(isPositive){
                        if(this.tetromino.z+k+1 <= 10 && this.tetromino.show[k][j][i]!= 0){this.tablero[this.tetromino.z+k+1][this.tetromino.y+j][this.tetromino.x+i] = this.tetromino.show[k][j][i];}
                          
                      }else{
                        if(this.tetromino.z+k-1 >= 0 && this.tetromino.show[k][j][i]!= 0 ){this.tablero[this.tetromino.z+k-1][this.tetromino.y+j][this.tetromino.x+i] = this.tetromino.show[k][j][i];}
                          
                      }  
                  }
                }
              }
               this.tetromino.z = isPositive ? this.tetromino.z+1: this.tetromino.z-1;
        }
        
        
   TetrominoTraslationX(isPositive){

            const N = this.tetromino.show.length;    
            const S = this.tetromino.espacioLadoX(isPositive);
            const A = this.tetromino.espacioLadoZ(true);
            const B = this.tetromino.espacioLadoZ(false);
            console.log(this.tetromino.x, N,S,this.tetromino.x+N-S ,  this.tetromino.x+S)
            if(isPositive && 10 <= this.tetromino.x+N-S){
              return;
            }
            if(!isPositive && 0 >= this.tetromino.x+S){
              return;
            }
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                     if(this.tetromino.show[k][j][i] != 0){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = 0;}
                      
                  }
                }
              }
              for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      if(isPositive){
                          if(this.tetromino.x+i+1 <= 10 && this.tetromino.show[k][j][i]!= 0){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i+1] = this.tetromino.show[k][j][i];}
                      }else {
                         if(this.tetromino.x+i-1 <= 10 && this.tetromino.show[k][j][i]!= 0){this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i-1] = this.tetromino.show[k][j][i];}
                      }                  
                  }
                }
              }
               this.tetromino.x = isPositive ? this.tetromino.x+1: this.tetromino.x-1;
        }
        
    TetrominoRotar(eje,clockwise) {
    
            const N = this.tetromino.show.length;
            if(eje == 1){
                 this.tetromino.TetrominoesRotationZ(clockwise);
            }
            if(eje == 2){
                 this.tetromino.TetrominoesRotationY(clockwise);
            }
            if(eje == 3){
                 this.tetromino.TetrominoesRotationX(clockwise);
            }
            
            
            for (let k = 0; k < N; k++) {
                for (let j = 0; j < N; j++) {
                  for (let i = 0; i < N; i++) {
                      this.tablero[this.tetromino.z+k][this.tetromino.y+j][this.tetromino.x+i] = this.tetromino.show[k][j][i];
                  }
                }
              }
    
       }
       
       borrarFilasColumnas() {
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
                // Clear the complete layer
                for (let z = 0; z < this.profundidad; z++) {
                    for (let x = 0; x < this.columnas; x++) {
                        this.tablero[z][y][x] = 0;
                    }
                }

                // Move layers above down
                for (let layer = y; layer < this.filas - 1; layer++) {
                    for (let z = 0; z < this.profundidad; z++) {
                        for (let x = 0; x < this.columnas; x++) {
                            this.tablero[z][layer][x] = this.tablero[z][layer + 1][x];
                        }
                    }
                }

                // Clear the top layer
                for (let z = 0; z < this.profundidad; z++) {
                    for (let x = 0; x < this.columnas; x++) {
                        this.tablero[z][this.filas - 1][x] = 0;
                    }
                }
            }
        }
    }

}
