import { useState, useContext, useEffect } from 'react';
import App, { AppCtx } from '../../App';
import './PopUp.css';
import closeIcon from '../../Assets/cancel.png';
import Image from '../Image';

type Props = {
  message: string;
};
const PopUp = ({ message }: Props): JSX.Element => {
  const ctx = useContext(AppCtx);
  const [myStyle, setMyStyle] = useState({});
  useEffect(() => {
    if (message !== '') {
      setMyStyle({ top: 'calc(100vh - 100px)' });
      setTimeout(() => {
        setMyStyle({ top: '100vh' });
        setTimeout(() => {
          ctx?.setPopUpMessage('');
        }, 400);
      }, 1900);
    }
  }, [message, ctx]);
  return (
    <div
      className="PopUp"
      style={myStyle}
      onClick={() => {
        setMyStyle({ top: '100vh' });
        setTimeout(() => {
          ctx?.setPopUpMessage('');
        }, 400);
      }}
    >
      <div style={{ float: 'right' }}>
        <Image src={closeIcon} alt={'X'} className={'pop-up-closer'} isButton={true} />
      </div>
      <div className="popup-message">{message}</div>
    </div>
  );
};

export default PopUp;
