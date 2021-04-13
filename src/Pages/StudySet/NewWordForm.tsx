import Image from '../../Components/Image';
import hasKey from '../../helpers/hasKey';
import garbageIcon from '../../Assets/garbage.png';
import * as wanakana from 'wanakana';

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
  const handleChange = (e: React.FormEvent<HTMLFormElement>): void => {
    const target = e.target as HTMLInputElement;
    if (hasKey(wordData, target.name)) {
      wordData[target.name] = target.value;
      setNewWords(newWords.map((newWord) => newWord));
    }
  };
  console.log(wordData, 'GGGGG')

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
            value={wordData.kanji}
            placeholder={!index ? '猫' : ''}
            onChange={() => {}}
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
            value={wordData.yomikata}
            onChange={() => {}}
            placeholder={!index ? 'ねこ' : ''}
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
            value={wordData.definition}
            onChange={() => {}}
            placeholder={!index ? 'Cat' : ''}
          />
        </div>
      </div>
    </form>
  );
};

export default NewWordForm;
