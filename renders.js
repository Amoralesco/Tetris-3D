let blockSize = 50; // tamaño de las figuras 
const axisLength = 100; // Longitud de los ejes
const axisThickness = 2; // Grosor de los ejes


const colors = {
  10: [128, 128, 128],
  1: [255, 0, 0],    // Rojo para Tcuadrado
  2: [0, 255, 0],    // Verde para Tlinea
  3: [0, 0, 255],    // Azul para TetroT
  4: [255, 255, 0],  // Amarillo para TetroZizquierda
  5: [255, 165, 0],  // Naranja para TetroZderecha
  6: [128, 0, 128],  // Púrpura para TetroLderecha
  7: [0, 255, 255]   // Cian para TetroLizquierda
};

function darkenColor(color) {
  const factor = 0.7; 
  return color.map(c => c * factor);
}

function lightenColor(color) {
  const factor = 1.2;
  return color.map(c => Math.min(255, c * factor));
}

function axes() {
  push();
  translate(-blockSize / 2, 3 * blockSize / 4, -blockSize / 2); 
  strokeWeight(12); 
  stroke(255, 0, 0);
  line(0, 0, 0, axisLength, 0, 0); // Eje X positivo (rojo)
  stroke(0, 255, 0);
  line(0, 0, 0, 0, -axisLength, 0); // Eje Y negativo (verde)
  stroke(0, 0, 255);
  line(0, 0, 0, 0, 0, axisLength); // Eje Z positivo (azul)
  pop();
}

function drawTablero(x, y, z, tablero) { // dibujar el tablero
  push();
  for (let k = 0; k < tablero.length; k++) {
    for (let i = 0; i < tablero[k].length; i++) {
      for (let j = 0; j < tablero[k][i].length; j++) {
        if (tablero[k][i][j] != 0) {
          let posX = x + j * blockSize;
          let posY = 24 - (y + i * blockSize);
          let posZ = z + k * blockSize;
          let color = colors[tablero[k][i][j]]; 
          let darkColor = darkenColor(color); 
          push();
          translate(posX, posY, posZ); 
          fill(color[0], color[1], color[2]); 
          stroke(darkColor[0], darkColor[1], darkColor[2]); 
          strokeWeight(1); 
          box(blockSize); 
          pop();
        }
      }
    }
  }
  pop();
}

function drawBorde(x, y, z, tablero) { //dibujar la base del tablero
  push();
  const lightBaseColor = lightenColor([135, 206, 235]); 
  fill(lightBaseColor[0], lightBaseColor[1], lightBaseColor[2]); 

  const profundidad = tablero.length;
  const columnas = tablero[0][0].length;
  for (let k = 0; k < profundidad; k++) {
    for (let j = 0; j < columnas; j++) {
      let posX = x + j * blockSize;
      let posY = 24 - y + blockSize; 
      let posZ = z + k * blockSize;
      push();
      translate(posX, posY, posZ);
      box(blockSize);
      pop();
    }
  }
  pop();
}
