//to do
//representar tetrominos en una matriz // DONE
//logica de rotaciones de los tetrominos //DONE
//representar el tablero con una matriz// DONE
//generar un tetromino en la matriz y mostrarlo en pantalla// DONE
//caida del tetromino// DONE
//logica de colisiones de los tetrominos horizontal
//logica de colisiones de los tetrominos vertical
//logica de filas cubiertas
//rotaciones de la camara con el mouse //DONE
//logica de velocidad de caida de la ficha
//renderizado de las fichas y del tablero
//caida rapida de los tetrominos
//logica de puntaje

//opcionales 
//menu de inicio
//musica de fondo
//pantallas de fondo
//menu de configuraciones
//fondo multicolor

let x=0;
let y=0;
let z=0;

function setup() {
  createCanvas(windowWidth * 0.999, windowHeight * 0.999, WEBGL);
  desk = new Tablero(10, 24, 10);
  desk.ingresarTetromino();
  cam = createCamera();
  cam.setPosition(1200, -1500, 0);
  cam.lookAt(5*blockSize,-12*blockSize,5*blockSize);
  
  // Intervalo para la caída automática de las fichas
  intervaloCaida = setInterval(() => {
    desk.play();
    redraw();
  }, 1000); // Ajusta la velocidad de caída aquí
}

function draw() {
  
  background(128);
  axes();
  drawTablero(x,y,z, desk.tablero);
  drawBorde(0, 0, 0, desk.tablero);
  //console.log("Y+:", desk.tetromino.spaceY);
  //console.log("X+:",desk.tetromino.espacioLadoX(true));
  //console.log("Z+:",desk.tetromino.espacioLadoZ(true));
  //console.log("X-:",desk.tetromino.espacioLadoX(false));
  //console.log("Z-:",desk.tetromino.espacioLadoZ(false));
   //console.log(desk.tetromino.y);
  orbitControl(1,1,0);
  
  
   
}

function keyPressed() {
  if (key === 'x' || key === 'X') {
     desk.TetrominoRotar(1,true);
     drawTablero(x,y,z, desk.tablero);
     redraw();
  }
  if (key === 'y' || key === 'Y') {
     desk.TetrominoRotar(2,true);
     drawTablero(x,y,z, desk.tablero);
     redraw();
  }
  if (key === 'z' || key === 'Z') {
     desk.TetrominoRotar(3,true);
     drawTablero(x,y,z, desk.tablero);
     
     redraw();
  }
  if (key === ' ' || key === ' ') {
     desk.actualizarTablero();
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


function windowResized() {
  resizeCanvas(windowWidth*0.999, windowHeight*0.999);
}
