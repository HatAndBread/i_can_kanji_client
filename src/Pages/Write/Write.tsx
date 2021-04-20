import { useEffect, useRef, useState } from 'react';
import keshiPath from '../../Assets/keshi.png';
import Image from '../../Components/Image';

let lastX: null | number = null;
let lastY: null | number = null;

const Write = (): JSX.Element => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null | undefined>();
  const [currX, setCurrX] = useState<null | number>(null);
  const [currY, setCurrY] = useState<null | number>(null);
  const [pointerDown, setPointerDown] = useState(false);
  const [rect, setRect] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const newCtx = canvasRef.current?.getContext('2d');
    setCanvasCtx(newCtx);
    if (newCtx) {
      newCtx.fillStyle = '#ffffff';
      newCtx.fillRect(0, 0, width, height);
      setRect({ x: canvasRef.current?.getBoundingClientRect().x, y: canvasRef.current?.getBoundingClientRect().y });
    }
  }, [height, width]);

  useEffect(() => {
    if (canvasCtx) {
      if (lastX && lastY && currX && currY) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(lastX, lastY);
        canvasCtx.lineTo(currX, currY);
        lastX = currX;
        lastY = currY;
      } else if (currX && currY) {
        canvasCtx.moveTo(currX - Math.floor(Math.random() * 2), currY - Math.floor(Math.random() * 2));
        canvasCtx.lineTo(currX, currY);
        lastX = currX;
        lastY = currY;
      }
      canvasCtx.stroke();
    }
  }, [currX, currY, canvasCtx]);

  return (
    <div>
      Writing practice page!
      <Image src={keshiPath} alt="clear" className="keshi" isButton={true} onClick={() => {}} />
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onPointerMove={(e) => {
          if (pointerDown) {
            setCurrX(e.clientX - rect.x);
            setCurrY(e.clientY - rect.y);
          }
        }}
        onPointerDown={() => setPointerDown(true)}
        onPointerUp={() => {
          lastY = null;
          lastX = null;
          setPointerDown(false);
        }}
      />
    </div>
  );
};

export default Write;
