import { useContext } from 'react';
import {AppCtx} from '../../App'
import Modal from './Modal';
type Props = {
    errorMessage: string;
}
const ErrorModal = ({ errorMessage }: Props): JSX.Element => {
    const ctx = useContext(AppCtx);
    const modalContent = (
      <div className="ErrorModal">
            <p>{errorMessage}</p>{' '}
            <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <button onClick={()=>ctx?.setOpenModal(null)}>OK</button>
            </div>
      </div>
    );
    return (<Modal modalContent={modalContent}></Modal>)
}

export default ErrorModal;