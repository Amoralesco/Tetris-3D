function axes(){
  push();
  stroke(255,0,0);
  line(0,0,0,100,0,0); 
  stroke(0,0,0);
  line(0,0,0,-100,0,0); 
  stroke(0,255,0);
  line(0,0,0,0,100,0); 
  stroke(0,0,0);
  line(0,0,0,0,-100,0); 
  stroke(0,0,255);
  line(0,0,0,0,0,100);
  stroke(0,0,0);
  line(0,0,0,0,0,-100);
  pop();
}


function drawTetromino(x, y, z, tetromino) {
  push();
  for (let k = 0; k < tetromino.length; k++) {
    for (let i = 0; i < tetromino[k].length; i++) {
      for (let j = 0; j < tetromino[k][i].length; j++) {
        if (tetromino[k][i][j] != 0) {
          let posX = x + j * blockSize;
          let posY = y + i * blockSize;
          let posZ = z + k * blockSize;
          push();
          translate(posX, posY, posZ); // Mover al lugar
          fill(255, 0, 0); // Color del bloque
          stroke(230, 0, 0); // Color del borde
          strokeWeight(2); // Grosor del borde
          box(blockSize); // Dibujar un bloque
          pop();
        }
      }
    }
  }
  pop();
}
