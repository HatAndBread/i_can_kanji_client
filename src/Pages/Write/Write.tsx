import { useEffect, useRef } from 'react';
import P5 from 'p5';

const Write = (): JSX.Element => {
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sketch = (p) => {
      let lastX = null;
      let lastY = null;
      console.log(p);
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
    new P5(sketch, canvasRef.current);
  }, []);
  return (
    <div>
      Writing practice page!
      <div ref={canvasRef}></div>
    </div>
  );
};

export default Write;
