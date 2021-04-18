import { useEffect, useRef } from 'react';
import P5 from 'p5';

const Write = (): JSX.Element => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sketch = (p) => {
    console.log(p);
    p.setup = () => {
      p.createCanvas(300, 200);
    };
    p.draw = () => {
      p.background('orangered');
      p.ellipse(150, 100, 100, 100);
    };
  };
  useEffect(() => {
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
