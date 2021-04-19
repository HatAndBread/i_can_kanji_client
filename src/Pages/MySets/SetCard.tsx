import { useContext } from 'react';
import { AppCtx } from '../../App';
import Image from '../../Components/Image';
import MiniWordCard from './MiniWordCard';
import garbageIcon from '../../Assets/garbage.png';
import editIcon from '../../Assets/pencil.png';
import makeHttpRequest from '../../helpers/makeHttpRequest';

const SetCard = ({ num }: { num: number }): JSX.Element => {
  const ctx = useContext(AppCtx);
  const studySet = ctx?.currentUser?.study_sets[num];
  console.log(studySet, 'Study Set');

  return (
    <div className="SetCard">
      <div className="set-card-title">
        <strong>{studySet?.name} </strong>({studySet?.words.length} word{studySet?.words.length === 1 ? '' : 's'}
        {''})
      </div>
      <div className="set-card-main-content">
        <div className="set-description">
          <div className="mini-word-cards-container">
            {studySet?.words.map((word, index) => (
              <MiniWordCard kanji={word.kanji} yomikata={word.yomikata} key={index} />
            ))}
          </div>
        </div>
        <div className="delete-edit-buttons">
          <Image
            src={garbageIcon}
            alt="Delete"
            className="delete-study-set-button"
            isButton={true}
            onClick={(): void => {
              ctx?.setWarnMessage(`Are you sure you want to delete ${studySet?.name}?`);
              ctx?.setOpenModal('warn');
              ctx?.setModalCallback(() => () => {
                makeHttpRequest({
                  method: 'DELETE',
                  ctx,
                  path: `/study_sets/${studySet?.id}`,
                  updateUser: true
                }).then((result) => {
                  result.success
                    ? ctx?.setPopUpMessage('Successfully deleted!')
                    : ctx.setPopUpMessage('Error deleting study set');
                });
              });
            }}
          />
          <Image
            src={editIcon}
            alt="edit"
            className="edit-set-button"
            isButton={true}
            onClick={() => console.log('Edit button clicked!')}
          />
        </div>
      </div>
    </div>
  );
};

export default SetCard;
