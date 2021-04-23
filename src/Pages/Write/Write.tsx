import { useEffect, useRef, useState, useContext } from 'react';
import { AppCtx, IStudySet } from '../../App';
import keshiPath from '../../Assets/keshi.png';
import Image from '../../Components/Image';
import './Write.css';

let lastX: null | number = null;
let lastY: null | number = null;

const Write = (): JSX.Element => {
  const ctx = useContext(AppCtx);
  const [studySet, setStudySet] = useState<IStudySet | null>(null);
  const [currentWord, setCurrentWord] = useState<null | { kanji: string; yomikata: string; definition: string }>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(300);
  const [showAnswer, setShowAnswer] = useState(false);
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D | null | undefined>();
  const [currX, setCurrX] = useState<null | number>(null);
  const [currY, setCurrY] = useState<null | number>(null);
  const [pointerDown, setPointerDown] = useState(false);
  const [rect, setRect] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const updateRect = () => {
      setRect({ x: canvasRef.current?.getBoundingClientRect().x, y: canvasRef.current?.getBoundingClientRect().y });
    };
    window.addEventListener('resize', updateRect);

    return () => {
      window.removeEventListener('resize', updateRect);
    };
  }, []);

  useEffect(() => {
    const newCtx = canvasRef.current?.getContext('2d');
    setCanvasCtx(newCtx);
    if (newCtx) {
      newCtx.fillStyle = 'white';
      newCtx.fillRect(0, 0, width, height);
      setRect({ x: canvasRef.current?.getBoundingClientRect().x, y: canvasRef.current?.getBoundingClientRect().y });
    }
  }, [height, width]);

  useEffect(() => {
    if (canvasCtx && currX && currY) {
      if (lastX && lastY && currX && currY) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(lastX, lastY);
      } else if (currX && currY) {
        canvasCtx.moveTo(currX - Math.floor(Math.random() * 2), currY - Math.floor(Math.random() * 2));
      }
      canvasCtx.lineTo(currX, currY);
      lastX = currX;
      lastY = currY;
      canvasCtx.stroke();
    }
  }, [currX, currY, canvasCtx]);

  const erase = () => {
    if (canvasCtx) canvasCtx.fillStyle = 'white';
    canvasCtx?.fillRect(0, 0, width, height);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (ctx?.currentUser?.study_sets.length) {
      for (let i = 0; i < ctx?.currentUser?.study_sets.length; i++) {
        if (ctx?.currentUser?.study_sets[i].name === e.target.value) {
          setStudySet(ctx.currentUser.study_sets[i]);
        }
      }
    }
  };
  useEffect(() => {
    console.log(rect);
  }, [rect]);

  return (
    <div className="Write">
      <div className="top-tools-container">
        <Image src={keshiPath} alt="clear" className="keshi" isButton={true} onClick={erase} />
        <select onChange={handleSelectChange}>
          {ctx?.currentUser?.study_sets.map((studySet) => (
            <option key={studySet.id}>{studySet.name}</option>
          ))}
        </select>
      </div>
      <canvas
        className="main-canvas"
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
      <button
        onClick={() => {
          if (studySet?.words) {
            const ranNum = Math.floor(Math.random() * studySet?.words.length);
            const word = studySet?.words[ranNum];
            setCurrentWord({ kanji: word.kanji, yomikata: word.yomikata, definition: word.definition });
          }
        }}
      >
        New Word
      </button>
      <button onClick={() => setShowAnswer(true)}>Check Answer</button>
      <div className="question-display">{currentWord?.yomikata}</div>
      {showAnswer && <div className="answer-display">{currentWord?.kanji}</div>}
    </div>
  );
};

export default Write;
