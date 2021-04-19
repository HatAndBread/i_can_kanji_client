import { useEffect, useRef } from 'react';
import keshiPath from '../../Assets/keshi.png';
import P5 from 'p5';
import Image from '../../Components/Image';

let erase = 0;

const Write = (): JSX.Element => {
  const canvasRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const sketch = (p: P5) => {
      let lastX = null;
      let lastY = null;
      console.log(p);
      p.setup = () => {
        p.createCanvas(300, 200);
        p.background('white');
      };
      p.draw = () => {
        if (erase) {
          erase = 0;
          p.background('white');
        }
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
    const curr = canvasRef?.current;
    return () => {
      if (curr) curr.remove();
    };
  }, []);
  return (
    <div>
      Writing practice page!
      <Image
        src={keshiPath}
        alt="clear"
        className="keshi"
        isButton={true}
        onClick={() => {
          erase = 1;
        }}
      />
      <div ref={canvasRef}></div>
    </div>
  );
};

export default Write;
