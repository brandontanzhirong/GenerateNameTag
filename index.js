const PptxGenJS = require("pptxgenjs");
const fs = require('fs');
const readline = require('readline');

function readFileSplitLine(textFile) {
  const contents = fs.readFileSync(textFile, 'utf8');
  let data = contents.split("\n");
  return data;
}

function splitEachData(data) {
  let arr = [];
  for (i = 0; i < data.length; i++) {
    let splittedData = data[i].trim().split('\t');
    arr.push(splittedData);
  }
  return arr;
}

function createPptx(data, pptxName) {

  let pptx1 = new PptxGenJS();

  // Define new layout for the Presentation
  pptx1.defineLayout({ name: 'A5', width: 3.346456693, height: 2.165354331 });

  // Set presentation to use new layout
  pptx1.layout = 'A5'

  // Add the slide with background and texts one by one
  for (i = 0; i < data.length; i++) {
    let slide = pptx1.addSlide();

    //w: value in inches, h: value in inches
    slide.addImage({ path: 'bg.png', x: 0, y: 0, w: 3.346456693, h: 2.165354331 });

    console.log(data[i]);

    const name = data[i][0],
      passportNo = data[i][1];

    //format some text
    let text = 'Name\t: ' + name +
      '\n\n\nPassport No.\t: ' + passportNo +
      '\n\nRegistration No.	:\n\nProgramme	:  \n\nFaculty	: ';
    slide.addText(text, { x: 0.09842519685, y: 1.2, w: 2.9, fontFace: 'Arial', fontSize: 6, color: '000000', bold: true });
  }

  pptx1.writeFile(pptxName);
  console.log('Done');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your data file name: ', (answer) => {
  let data = readFileSplitLine(answer);
  console.log(data.length);
  data = splitEachData(data);
  rl.question('Enter your pptx file name: ', (answer) => {
    createPptx(data, answer);
    rl.close();
  });
});





