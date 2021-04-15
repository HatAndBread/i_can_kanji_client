import { useState } from 'react';

type Props = {
  kanji: string;
  yomikata: string;
  definition?: string;
};
const MiniWordCard = ({ kanji, yomikata, definition }: Props): JSX.Element => {
  const [showKanji, setShowKanji] = useState(true);
  return (
    <div className="MiniWordCard" onClick={() => (showKanji ? setShowKanji(false) : setShowKanji(true))}>
      {showKanji ? <strong>{kanji}</strong> : <strong>{yomikata}</strong>}
    </div>
  );
};

export default MiniWordCard;
