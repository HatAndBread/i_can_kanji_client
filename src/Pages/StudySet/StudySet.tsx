import { useState, useEffect, useContext } from 'react';
import { AppCtx } from '../../App';
import NewWordForm from './NewWordForm';
import Image from '../../Components/Image';
import './StudySet.css';
import addIcon from '../../Assets/add.png'

const StudySet = (): JSX.Element => {
  const ctx = useContext(AppCtx);
  const [newWords, setNewWords] = useState([{ kanji: '', yomikata: '', romaji: '', definition: '' }])
  const addNewWord = () => {
    newWords.push({ kanji: '', yomikata: '', romaji: '', definition: '' })
    setNewWords(newWords.map((newWord) => newWord))
  }
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
      <div>I am a study set!</div>
      {newWords.map((el, index) => (
        <NewWordForm key={index} index={index} newWords={newWords} setNewWords={setNewWords} garbageClick={garbageClick}/>
      ))}
      <Image src={addIcon} alt="+" className="addIcon" isButton={true} onClick={addNewWord}/>
    </div>
  );
};
export default StudySet;
