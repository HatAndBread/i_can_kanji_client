
import Image from '../../Components/Image'
import hasKey from '../../helpers/hasKey';
import garbageIcon from '../../Assets/garbage.png';

type Props = {
  index: number;
  garbageClick: (index: number) => void;
  newWords: {
    kanji: string;
    yomikata: string;
    romaji: string;
    definition: string;
  }[];
  setNewWords: React.Dispatch<
    React.SetStateAction<
      {
        kanji: string;
        yomikata: string;
        romaji: string;
        definition: string;
      }[]
    >
  >;
};

const NewWordForm = ({ index, newWords, setNewWords, garbageClick }: Props): JSX.Element => {
  const wordData = newWords[index];
  const handleChange = (e: React.FormEvent<HTMLFormElement>):void => {
     const target = e.target as HTMLInputElement
     if (hasKey(wordData, target.name)) {
     wordData[target.name] = target.value;
     setNewWords(newWords.map((newWord)=>newWord))
     }
  };
    return (
      <form className="NewWordForm" onSubmit={(e) => e.preventDefault()} onChange={handleChange} autoComplete="off">
        <div className="garbage-container">
          <p className="card-index">{index + 1}</p>
          <h3>{newWords[index].kanji.length ? newWords[index].kanji : 'New Word'}</h3>
          <Image
            src={garbageIcon}
            alt={'Delete'}
            isButton={true}
            className={'garbage-button'}
            onClick={() => {
              garbageClick(index);
            }}
          />
        </div>
        <div className="new-word-inputs">
          <div className="input-container">
            <label htmlFor="kanji" className="kanji-label">
              Kanji:
            </label>
            <input
              type="text"
              name="kanji"
              id="kanji"
              defaultValue={wordData.kanji}
              placeholder={!index ? '漢字' : ''}
            />
          </div>
          <div className="input-container">
            <label htmlFor="yomikata" className="kanji-label">
              Yomikata:
            </label>
            <input
              type="text"
              name="yomikata"
              id="yomikata"
              defaultValue={wordData.yomikata}
              placeholder={!index ? 'かんじ' : ''}
            />
          </div>
          <div className="input-container">
            <label htmlFor="definition" className="kanji-label">
              Definition:
            </label>
            <input
              type="text"
              name="definition"
              id="definition"
              defaultValue={wordData.definition}
              placeholder={!index ? 'Kanji' : ''}
            />
          </div>
        </div>
      </form>
    );
}

export default NewWordForm;