import { useState, useEffect, useContext, useRef } from 'react';
import { AppCtx, IStudySet } from '../../App';
import NewWordForm from './NewWordForm';
import Image from '../../Components/Image';
import './StudySet.css';
import addIcon from '../../Assets/add.png';
import Switch from '../../Components/Switch/Switch';
import makeHttpRequest from '../../helpers/makeHttpRequest';

const StudySet = ({ setBeingEdited }: { setBeingEdited?: IStudySet | null }): JSX.Element => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const ctx = useContext(AppCtx);
  const [newWords, setNewWords] = useState([{ kanji: '', yomikata: '', romaji: '', definition: '' }]);
  const [title, setTitle] = useState<string>('');
  const [publicAvailable, setPublicAvailable] = useState<boolean>(false);

  const addNewWord = () => {
    newWords.push({ kanji: '', yomikata: '', romaji: '', definition: '' });
    setNewWords(newWords.map((newWord) => newWord));
  };
  useEffect(() => {
    bottomRef?.current && bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [newWords.length, bottomRef]);
  const garbageClick = (index: number): void => {
    ctx?.setWarnMessage('Are you sure you want to delete this item?');
    ctx?.setOpenModal('warn');
    const callback = () => {
      newWords.splice(index, 1);
      console.log(newWords, '🌈');
      setNewWords(newWords.map((word) => word));
    };
    ctx?.setModalCallback(() => callback);
  };
  const submit = () => {
    ctx &&
      makeHttpRequest({
        method: 'POST',
        path: '/study_sets',
        updateUser: true,
        ctx,
        body: { words: newWords, public: publicAvailable, name: title }
      }).then((res) => {
        if (res.success) {
          ctx?.setPopUpMessage('Successfully saved!');
        } else {
          if (res.data.errors) {
            ctx?.setErrorMessage(res.data.errors.join('. '));
          } else if (
            res.data.exception &&
            res.data.exception ===
              `#<ActiveRecord::RecordInvalid: Validation failed: Name That name has already been usedf.text_area :attribute>`
          ) {
            ctx?.setErrorMessage('That name has already been used. Please select a different name.');
          } else {
            ctx?.setErrorMessage('Study set was unable to save. Please try again later.');
          }
          ctx?.setOpenModal('error');
        }
      });
  };

  const submitSet = () => {
    console.log(title, newWords, publicAvailable);
    const allItemsAreFilled = newWords.every(
      (word) => word.kanji.length && word.yomikata.length && word.definition.length
    );
    if (!title.length) {
      ctx?.setErrorMessage('Please add a title to your study set.');
      ctx?.setOpenModal('error');
    } else if (!allItemsAreFilled) {
      ctx?.setErrorMessage('Please fill in all required fields.');
      ctx?.setOpenModal('error');
    } else {
      submit();
    }
  };

  return (
    <div className="StudySet">
      <div className="study-set-settings">
        <div className="title-input">
          <label htmlFor="set-title">Title:</label>
          <input
            type="text"
            id="set-title"
            name="set-title"
            autoComplete="off"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <Switch toggleState={publicAvailable} setToggleState={setPublicAvailable} label="Public: " />
        <button className="save-set-btn" onClick={submitSet}>
          Save Study Set
        </button>
      </div>
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
