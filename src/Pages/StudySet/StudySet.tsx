import { useState, useEffect, useContext, useRef } from 'react';
import { AppCtx } from '../../App';
import NewWordForm from './NewWordForm';
import Image from '../../Components/Image';
import './StudySet.css';
import addIcon from '../../Assets/add.png'

const StudySet = (): JSX.Element => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const ctx = useContext(AppCtx);
  const [newWords, setNewWords] = useState([{ kanji: '', yomikata: '', romaji: '', definition: '' }])
  const addNewWord = () => {
    newWords.push({ kanji: '', yomikata: '', romaji: '', definition: '' })
    setNewWords(newWords.map((newWord) => newWord))
  }
  useEffect(() => {
    bottomRef?.current && bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [newWords.length, bottomRef])
  const garbageClick = (index: number): void => {
    ctx?.setWarnMessage('Are you sure you want to delete this item?');
    ctx?.setOpenModal('warn');
    const callback = () => {
      newWords.splice(index, 1);
      setNewWords(newWords.map((word) => word));
    }
    ctx?.setModalCallback(() => callback)
  };

  return (
    <div className="StudySet">
      {newWords.map((el, index) => (
        <NewWordForm
          key={index}
          index={index}
          newWords={newWords}
          setNewWords={setNewWords}
          garbageClick={garbageClick}
        />
      ))}
      <Image src={addIcon} alt="+" className="add-icon" isButton={true} onClick={addNewWord} />
      <div ref={bottomRef}></div>
    </div>
  );
};
export default StudySet;
