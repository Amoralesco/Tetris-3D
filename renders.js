let blockSize = 50;
let fontColorR = 0;
let fontColorG = 0;
let fontColorB = 0;

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


function drawTablero(x, y, z, tablero) {
  let xcolor = 0;
  push();

  for (let k = 0; k < tablero.length; k++) {
    for (let i = 0; i < tablero[k].length; i++) {
      for (let j = 0; j < tablero[k][i].length; j++) {
        if (tablero[k][i][j] != 0) {
          let posX = x + j * blockSize;
          let posY = 24 - (y + i * blockSize);
          let posZ = z + k * blockSize;
          push();
          translate(posX, posY, posZ); // Mover al lugar
          fill(xcolor++%255, 128, 128); // Color del bloque
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

function drawBorde(x, y, z, tablero) {
  push();
  stroke(128, 128, 0, 128); // Color del borde con transparencia (128 sobre 255)
  strokeWeight(2); // Grosor del borde
  noFill(); // No rellenar los bordes

  const profundidad = tablero.length;
  const filas = tablero[0].length;
  const columnas = tablero[0][0].length;

  for (let k = 0; k < profundidad; k++) {
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        // Verificar si la posición es un borde
        if (
          k === 0 || k === profundidad - 1 ||  // Bordes en profundidad
          i === 0 || i === filas - 1 ||        // Bordes en filas
          j === 0 || j === columnas - 1        // Bordes en columnas
        ) {
          let posX = x + j * blockSize;
          let posY = 24 - (y + i * blockSize);
          let posZ = z + k * blockSize;
          push();
          translate(posX, posY, posZ);
          box(blockSize); // Dibujar el borde de un bloque
          pop();
        }
      }
    }
  }
  pop();
}
