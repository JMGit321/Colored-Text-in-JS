const fs = require("fs");
const { createCanvas } = require("canvas");
const elsa = require('./elsa.json')

const colors = {
  correct: 'green',
  incorrect: 'red',
  warning: 'yellow',
}

const width = 420;
const height = 660;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext("2d");

const fontSize = 16;
const textHeight = fontSize * 1.1;
const textTop = textHeight * 2.2;

ctx.font = `normal ${fontSize}px san-serif`;
ctx.textBaseline = "top";

for (let i = 0; i < elsa.speakers[0].utterances[0].result.words.length; i++) {
  ctx.fillStyle = colors[elsa.speakers[0].utterances[0].result.words[i].decision]
  ctx.fillText(elsa.speakers[0].utterances[0].result.words[i].text, 8, (textTop * i / 1.5) + 8);
}

ctx.globalCompositeOperation = "destination-over";
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1000, 1000);

const buffer = canvas.toBuffer("image/png");
fs.writeFileSync("output.png", buffer);
