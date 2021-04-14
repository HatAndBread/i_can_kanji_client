import { useContext, useState } from 'react';
import { AppCtx } from '../../App';

const SetCard = ({ num }: { num: number }): JSX.Element => {
  const ctx = useContext(AppCtx);
  if (ctx?.currentUser?.study_sets[num].name) {
  }
  return (
    <div className="SetCard">
      <h3>{ctx?.currentUser?.study_sets[num].name}</h3>
      {ctx?.currentUser?.study_sets[num].words.length}
    </div>
  );
};

export default SetCard;
