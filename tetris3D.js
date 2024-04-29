//to do
//representar tetrominos en una matriz // DONE
//logica de rotaciones de los tetrominos
//representar el tablero con una matriz// DONE
//logica de colisiones de los tetrominos
//logica de filas cubiertas
//rotaciones de la camara con el mouse 
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
let z = 0;

function setup() {
  createCanvas(windowWidth*0.99, windowHeight*0.99,WEBGL);
  generarTetrominoTemporal();
}

function draw() {
  background(fontColorR--%255,fontColorG++%255,fontColorB++%255);
  axes();
  drawTetromino(x%255,y++%255,z, tetrominoTemporal);
  //drawTetromino(0, 0, Tableroview);
  orbitControl();
   
}

function keyPressed() {
  if (key === 'x' || key === 'X') {
    tetrominoTemporal = TetrominoesRotationX(tetrominoTemporal, true);
    redraw();
  }
  if (key === 'y' || key === 'Y') {
   tetrominoTemporal = TetrominoesRotationY(tetrominoTemporal, true);
    redraw();
  }
  if (key === 'z' || key === 'Z') {
   tetrominoTemporal = TetrominoesRotationZ(tetrominoTemporal, true);
    redraw();
  }
}



function windowResized() {
  resizeCanvas(windowWidth*0.99, windowHeight*0.99);
}
