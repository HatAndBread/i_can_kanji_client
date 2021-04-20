import { useEffect, useRef, useState } from 'react';
import keshiPath from '../../Assets/keshi.png';
import Image from '../../Components/Image';

const Write = (): JSX.Element => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [lastX, setLastX] = useState<null | number>(null);
  const [lastY, setLastY] = useState<null | number>(null);
  const [pointerDown, setPointerDown] = useState(false);
  const [rect, setRect] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d');
    if (canvasContext) {
      canvasContext.fillStyle = '#ffffff';
      canvasContext.fillRect(0, 0, width, height);
      setRect({ x: canvasRef.current?.getBoundingClientRect().x, y: canvasRef.current?.getBoundingClientRect().y });
    }
  }, [height, width]);

  useEffect(() => {
    console.log(rect);
  }, [rect]);

  return (
    <div>
      Writing practice page!
      <Image src={keshiPath} alt="clear" className="keshi" isButton={true} onClick={() => {}} />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onPointerMove={(e) => {
          if (pointerDown) console.log(e.clientX - rect.x, e.clientY - rect.y);
        }}
        onPointerDown={() => setPointerDown(true)}
        onPointerUp={() => {
          setLastX(null);
          setLastY(null);
          setPointerDown(false);
        }}
      />
    </div>
  );
};

export default Write;
