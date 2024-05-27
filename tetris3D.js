//to do
//representar tetrominos en una matriz // DONE
//logica de rotaciones de los tetrominos //DONE
//representar el tablero con una matriz// DONE
//generar un tetromino en la matriz y mostrarlo en pantalla// DONE
//caida del tetromino// DONE
//logica de colisiones de los tetrominos horizontal // DONE
//logica de colisiones de los tetrominos vertical  // DONE
//logica de filas cubiertas // DONE 
//rotaciones de la camara con el mouse //DONE
//logica de velocidad de caida de la ficha // DONE 
//renderizado de las fichas y del tablero // DONE  
//caida rapida de los tetrominos //DONE 
//logica de puntaje // DONE 

//opcionales 
//musica de fondo // DONE
//fondo multicolor // DONE 

let x=0;
let y=0;
let z=0;

function setup() {
  createCanvas(windowWidth * 0.999, windowHeight * 0.999, WEBGL);
   axisCanvas = createGraphics(150, 150, WEBGL);
  

  desk = new Tablero(10, 24, 10);
  desk.ingresarTetromino();
  cam = createCamera();
  cam.setPosition(-20*blockSize , -1200, 5*blockSize);
  cam.lookAt(5*blockSize,-12*blockSize,5*blockSize);
  desk.velocidadCaida();

}

function draw() {
 
  background(128);
  axes();  
  drawTablero(x,y,z, desk.tablero);
  drawBorde(0, 0, 0, desk.tablero);
  orbitControl(1,1,0);
  

}

function keyPressed() {
  if (key === 'x' || key === 'X') {
     desk.TetrominoRotar(3,true);
     drawTablero(x,y,z, desk.tablero);
     redraw();
  }
  if (key === 'y' || key === 'Y') {
     desk.TetrominoRotar(2,true);
     drawTablero(x,y,z, desk.tablero);
     redraw();
  }
  if (key === 'z' || key === 'Z') {
     desk.TetrominoRotar(1,true);
     drawTablero(x,y,z, desk.tablero);
      
     redraw();
  }
  if (key === ' ' || key === ' ') {
        
    while(desk.fall){
      desk.actualizarTablero();
    }
    desk.play();   
     redraw();
  }
  if (key === 'w' || key === 'W') { 
     desk.TetrominoTraslationX(true);
     
     redraw();
     drawTablero(x,y,z, desk.tablero);
  }
  if (key === 's' || key === 'S') {
     desk.TetrominoTraslationX(false);
     redraw();
     drawTablero(x,y,z, desk.tablero);
  }
  if (key === 'a' || key === 'A') {
     desk.TetrominoTraslationZ(false);
     
     redraw();
     drawTablero(x,y,z, desk.tablero);
  }
  if (key === 'd' || key === 'D') {
     desk.TetrominoTraslationZ(true);
     drawTablero(x,y,z, desk.tablero);
     redraw();
  }

}


function restartGame() {
  hideLostCard(); 
  desk = new Tablero(10, 24, 10);
  desk.ingresarTetromino();
  desk.velocidadCaida();
  updateInfoCard();
  redraw();
}

function preload() {
  mySound = loadSound('tetris.mp3'); 
}


function playSound() {
  if (mySound.isLoaded() && !mySound.isPlaying()) {
    let velocidad = desk.level;
    mySound.rate(velocidad);
    mySound.setVolume(volumenMusica); 
    mySound.loop(); 
    mySound.play();
  }
}



function updateInfoCard() {
  document.getElementById('score').innerText = desk.score;
  document.getElementById('level').innerText = desk.level;
  document.getElementById('lines').innerText = desk.completeLines;
}

function windowResized() {
  resizeCanvas(windowWidth*0.999, windowHeight*0.999);
}
