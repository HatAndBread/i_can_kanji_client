import { useContext } from 'react';
import { AppCtx } from '../../App';
import Modal from './Modal';

type Props = {
    warnMessage: string;
}

const WarnModal = ({ warnMessage}: Props): JSX.Element => {
    const ctx = useContext(AppCtx);
    const okClick = () => {
      typeof ctx?.modalCallback === 'function' && ctx?.modalCallback();
        const newCallback = ()=>{}
        ctx?.setModalCallback(() => newCallback)
        ctx?.setOpenModal(null)
    }
    const modalContent = (
      <div className="WarnModal">
        <p>{warnMessage}</p>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
                <button style={{ width: '80px' }} onClick={okClick}>OK</button>
                <button style={{ width: '80px' }} onClick={() => { ctx?.setOpenModal(null)}}>CANCEL</button>
        </div>
      </div>
    );
    return <Modal modalContent={modalContent}/>
}

export default WarnModal;