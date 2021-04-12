import ErrorModal from './ErrorModal';
import WarnModal from './WarnModal'

type Props = {
    openModal: string | null;
    errorMessage: string;
    warnMessage: string;
}

const ModalContainer = ({ openModal, errorMessage, warnMessage }: Props): JSX.Element => {

    const getCurrentModal = (): JSX.Element | null => {
        switch (openModal) {
          case null:
            return null;
          case 'error':
            return <ErrorModal errorMessage={errorMessage} />;
          case 'warn':
                return <WarnModal warnMessage={warnMessage}/>;
          default:
            return null;
        }
}
    return (
        <div className="ModalContainer">
            {getCurrentModal()}
        </div>
    )
}

export default ModalContainer;