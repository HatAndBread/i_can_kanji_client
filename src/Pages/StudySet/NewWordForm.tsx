
import Image from '../../Components/Image'
import { useEffect } from 'react';
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
     console.log(target.value, target.name)
     if (hasKey(wordData, target.name)) {
     wordData[target.name] = target.value;
     setNewWords(newWords.map((newWord)=>newWord))
     }
  };
  useEffect(() => {
    console.log(newWords);
  }, [newWords]);
    return (
      <form className="NewWordForm" onSubmit={(e) => e.preventDefault()} onChange={handleChange}>
        <input type="text" name="kanji" id="kanji" defaultValue={wordData.kanji} />
        <input type="text" name="yomikata" id="yomikata" defaultValue={wordData.yomikata} />
        <input type="text" name="definition" id="definition" defaultValue={wordData.definition} />
        <Image src={garbageIcon} alt={'Delete'} isButton={true} className={'garbage-button'} onClick={()=>{garbageClick(index)}} />
      </form>
    );
}

export default NewWordForm;