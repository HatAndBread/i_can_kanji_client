import P5 from 'p5';

const sketch = (p: P5) => {
  let lastX = null;
  let lastY = null;
  p.setup = () => {
    p.createCanvas(300, 200);
    p.background('white');
  };
  p.draw = () => {
    if (p.mouseIsPressed) {
      if (lastX && lastY) {
        p.line(lastX, lastY, p.mouseX, p.mouseY);
        lastX = p.mouseX;
        lastY = p.mouseY;
      } else {
        lastX = p.mouseX;
        lastY = p.mouseY;
        p.line(p.mouseX, p.mouseY, p.mouseX, p.mouseY);
      }
    }
  };
  p.mouseReleased = () => {
    lastX = null;
    lastY = null;
  };
};

export default sketch;