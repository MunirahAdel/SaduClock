let timeParts = ['Hours', 'Minutes', 'Seconds'];
let parts = [24, 60, 60]; // Time increments

let startX = -1000; // Start of the line
let endX; // End of the line (adjusted in setup)
let numLines = 300; // Number of lines
let lineSpacing = 10; // Space between lines
let noiseOffset = 0; // Used for Perlin noise variation


let w = 200; // Height for each time unit (now a “row”)
let margin = 30; // Margin from left and right
let h;
let lineWidth;
let w_, half_w, offset_y;


// Object storing separate parameters for each blob
let blobParams = {
  Hours: {
    size: 110,
    noiseScale: 0.3,
    deformation: 0.5,
    color: [255], 
  },
  Minutes: {
    size: 90,
    noiseScale: 0.4,
    deformation: 0.3,
    color: [255], 
  },
  Seconds: {
    size: 70,
    noiseScale: 0.5,
    deformation: 0.8,
    color: [255], 
  }
};

// Object storing separate parameters for each grid
let gridParams = {
  Hours: {
    strokeWeight: 2.5,
    alpha: 80,
    squiggleIntensity: 0.05,
    density: 24, // Number of grid lines
  },
  Minutes: {
    strokeWeight: 1,
    alpha: 60,
    squiggleIntensity: 0.08,
    density: 60,
  },
  Seconds: {
    strokeWeight: 0.5,
    alpha: 40,
    squiggleIntensity: 0.1,
    density: 60,
  }
};
// ____________________________________________

function setup() {
  createCanvas(windowWidth, windowHeight);
  endX = width + 200;
  
  h = width - 2 * margin;  
  lineWidth = h / 50; 
  w_ = w * timeParts.length;
  half_w = h * 0.5; 
  offset_y = (timeParts.length * w) * 0.5; 
  
  
}
// ____________________________________________
function draw() {
  background(0, 25); 

  translate(width / 2, 0);

  drawIndividualGrids(); 
  drawHorizontalSeparators(); 

  // Draw vertical waves at specific hour positions
  drawVerticalWaves();
drawVerticalWavesTwo()
  noStroke();

  let d = new Date();
  let wagt = [d.getHours(), d.getMinutes(), d.getSeconds()];

  for (let i = 0; i < wagt.length; i++) {
    let t = wagt[i] / (parts[i] - 1);
    let x = lerp(-half_w + margin, half_w - margin, t); 
    let y = height / 2 - offset_y + i * w + w / 2; 

    let timeKey = timeParts[i];
    let params = blobParams[timeKey];

    drawOrganicShape(x, y, params);

    if (i === 0) {
      drawWaves(x + 10, y, 0.5, 300, 10, 1, [255]);  
    } else if (i === 1) {
      drawWaves(x + 10, y, 1.2, 100, 1.5, 2, [255]); 
    } else {
      drawWaves(x + 10, y, 0.8, 200, 0.75, 4, [255]); 
    }
  }
  
  
  for (let i = 0; i < numLines; i++) {
    let yOffset = i * lineSpacing; // Each line spaced out

    beginShape();
    
    stroke(255);
    strokeWeight(0.1);
    
    for (let x = startX; x <= endX; x += 5) { // Step size controls smoothness
      let noiseValue = noise(x * 0.005, i * 0.2, frameCount * 0.01); // Vary noise per line
      let y = yOffset + map(noiseValue, 0, 1, -10, 10); // Wavy effect

      vertex(x, y);
    }

    endShape();
  }
}
// ____________________________________________
// ─── Draw Time Labels Separately ─────────────────────────────
function drawTimeLabels(x, y, timeValue, timeKey) {
  textAlign(CENTER, CENTER);
  textSize(10);
  fill(255); // White text
  noStroke();

  let labelOffset = 20; // Distance of number above the grid
  text(nf(timeValue, 2), x, y - labelOffset);
}

// ─── Draw working hours ────────────────────
function drawVerticalWaves() {
  let hourPositions = [7, 15]; // Specific hour points
  let waveAmplitude = 2;  // Adjust wave height
  let waveFrequency = 0.05; // Adjust oscillation speed
  let waveSpeed = 0.05; // Adjust animation speed
// Compute x positions
  let x1 = lerp(-half_w + margin, half_w - margin, hourPositions[0] / (parts[0] - 1));
  let x2 = lerp(-half_w + margin, half_w - margin, hourPositions[1] / (parts[0] - 1));

  // Draw a semi-transparent fill between these lines
  noStroke();
  fill(255, 5);  // White fill with transparency
  rect(x1, 0, x2 - x1, height); // Fills the area between the lines
  
  for (let i = 0; i < hourPositions.length; i++) {
let hourT = hourPositions[i] / (parts[0] - 1);
    let x = lerp(-half_w + margin, half_w - margin, hourT);

    stroke(255, 150);
    strokeWeight(1);
    noFill();

    beginShape();
    for (let y = 0; y < height; y += 10) {
      let waveOffset = sin(y * waveFrequency + frameCount * waveSpeed) * waveAmplitude;
      vertex(x + waveOffset, y);
    }
    endShape();
  }
}


// ─── Draw sunrise and sunset ────────────────────
function drawVerticalWavesTwo() {
  let hourPositions = [6, 18]; // Specific hour points
  let waveAmplitude = 2;  // Adjust wave height
  let waveFrequency = 0.05; // Adjust oscillation speed
  let waveSpeed = 0.05; // Adjust animation speed
// Compute x positions
  let x1 = lerp(-half_w + margin, half_w - margin, hourPositions[0] / (parts[0] - 1));
  let x2 = lerp(-half_w + margin, half_w - margin, hourPositions[1] / (parts[0] - 1));

  // Draw a semi-transparent fill between these lines
  noStroke();
  fill(255, 5);  // White fill with transparency
  rect(x1, 0, x2 - x1, height); // Fills the area between the lines
  
  for (let i = 0; i < hourPositions.length; i++) {
let hourT = hourPositions[i] / (parts[0] - 1);
    let x = lerp(-half_w + margin, half_w - margin, hourT);

    stroke(255, 150);
    strokeWeight(1);
    noFill();

    beginShape();
    for (let y = 0; y < height; y += 10) {
      let waveOffset = sin(y * waveFrequency + frameCount * waveSpeed) * waveAmplitude;
      vertex(x + waveOffset, y);
    }
    endShape();
  }
}

// ─── Draw an Organic Shape with Custom Parameters ─────────────────────────────
function drawOrganicShape(x, y, params) {
  push();
  translate(x, y);
  noStroke();
  fill(...params.color); 

  beginShape();
  for (let a = 0; a < TWO_PI; a += 0.1) {
    let r = params.size * 0.1 + noise(
      cos(a) * params.noiseScale, 
      sin(a) * params.noiseScale, 
      frameCount * params.deformation * 0.1
    ) * params.size;
    
    let xOffset = r * cos(a) / 7;
    let yOffset = r * sin(a) * 1.5;
    vertex(xOffset, yOffset);
  }
  endShape(CLOSE);
  pop();
}

// ─── Draw Horizontal Grid Lines with Custom Parameters ─────────────────────────
function drawIndividualGrids() {
  for (let i = 0; i < timeParts.length; i++) {
    let y = height / 2 - offset_y + i * w + w / 2;
    let timeKey = timeParts[i];
    let params = gridParams[timeKey];

    stroke(255, params.alpha);
    strokeWeight(params.strokeWeight);
    noFill();

    for (let j = 0; j < params.density; j++) {
      let x = map(j, 0, params.density - 1, -half_w + margin, half_w - margin );

      beginShape();
       noFill();
      stroke(255);
      for (let yOffset = -w / 3; yOffset <= w / 3; yOffset += 100) {
        fill(255);
        ellipse(x, y + yOffset / 2, 6, 20);
        let wave = sin(yOffset * params.squiggleIntensity + x * 0.05 + frameCount * 0.02) * 5; 
        vertex(x + wave, y + yOffset);
      }
      endShape();
  // Add small red dots for minutes
      if (timeKey === "Minutes") {
        fill(255, 0, 0);
        noStroke();
        ellipse(x, y - 60, 10, 5);
      }
// Add small red dots for minutes #2
      if (timeKey === "Minutes") {
        fill(255, 0, 0);
        noStroke();
        ellipse(x, y +140, 10, 5);
      }
      
      //   if (timeKey === "Minutes") {
      //   fill(255, 0, 0);
      //   noStroke();
      //   ellipse(x, y-50, 10, 5);
      // }
      
        if (timeKey === "Minutes") {
        fill(255, 0, 0);
        noStroke();
        ellipse(x, y-210, 10, 5);
      }
      
      // Add Time Labels
      drawTimeLabels(x, y + 80, j, timeKey);
    }
  }
}
// ─── Draw Horizontal Separators ───────────────────────────────────────────────
function drawHorizontalSeparators() {
  for (let i = 0; i < timeParts.length - 1; i++) {
    let y = height / 2 - offset_y + (i + 1) * w;
    let strokeW = 1;
    strokeWeight(strokeW);

    beginShape();
    for (let xOffset = -half_w; xOffset <= half_w; xOffset += 10) {
      let frequency = 0.01, amplitude = 3;
      if (i === 1) amplitude = 2;
      let curve = sin(xOffset * frequency + i * 0.2 + frameCount * frequency) * amplitude;
      vertex(xOffset, y + curve);
    }
    endShape();
  }
  
}

// ─── Draw the Wave Effect ─────────────────────────────────────────────────────
function drawWaves(offsetX, offsetY, waveSpeed, noiseScale, strokeWeightFactor, numLines, col) {
  let speedFactor = 2.5; // Increase for faster movement

  for (let i = 0; i < numLines; i++) {
    strokeWeight(map(i, 0, numLines - 1, 0.25, strokeWeightFactor));
    stroke(255);

    for (let y = 0; y < height; y++) {
      let x = map(noise(i + (y + offsetY) / 150, frameCount / (300 / speedFactor)), 0, 3, -half_w / 12, half_w / 3);
      point(x + offsetX, y);
    }
  }
}
