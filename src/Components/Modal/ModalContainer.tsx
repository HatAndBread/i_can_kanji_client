import ErrorModal from './ErrorModal';

type Props = {
    openModal: string | null
    errorMessage: string
}

const ModalContainer = ({ openModal, errorMessage }: Props): JSX.Element => {

    const getCurrentModal = (): JSX.Element | null => {
        switch (openModal) {
            case null: return null;
            case 'error': return <ErrorModal errorMessage={errorMessage}/>
            default: return null;
            }
}
    return (
        <div className="ModalContainer">
            {getCurrentModal()}
        </div>
    )
}

export default ModalContainer;