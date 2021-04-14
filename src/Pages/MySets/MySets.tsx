import { useContext } from 'react';
import { AppCtx } from '../../App';
import SetCard from './SetCard';
import './MySets.css';
import StudySet from '../StudySet/StudySet';

const MySets = (): JSX.Element => {
  const ctx = useContext(AppCtx);

  console.log(ctx?.currentUser?.study_sets);
  return (
    <div>
      <div>
        {ctx?.currentUser?.study_sets?.map((studySet, index) => (
          <SetCard key={studySet.name} num={index} />
        ))}
      </div>
    </div>
  );
};

export default MySets;
