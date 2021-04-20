import { useEffect, useRef, useState } from 'react';
import keshiPath from '../../Assets/keshi.png';
import Image from '../../Components/Image';

const Write = (): JSX.Element => {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null | undefined>();
  const [lastX, setLastX] = useState<null | number>(null);
  const [lastY, setLastY] = useState<null | number>(null);
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
