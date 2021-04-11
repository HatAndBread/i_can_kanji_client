import { useContext } from 'react';
import { AppCtx } from '../../App';
import Image from '../Image';
import closer from '../../Assets/cancel.png'
import './Modal.css';

type Props = {
    modalContent: JSX.Element
}

const Modal = ({ modalContent }: Props): JSX.Element => {
    const ctx = useContext(AppCtx);
    return (
        <div className="Modal">
            <div className="ModalBox">
                <Image src={closer} alt={'X'} className="closer" onClick={()=>{ctx?.setOpenModal(null)}}/>
                {modalContent}
            </div>
        </div>
    )
}

export default Modal;