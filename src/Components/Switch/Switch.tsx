import './Switch.css';

type Props = {
    toggleState: boolean;
    setToggleState: React.Dispatch<React.SetStateAction<boolean>>;
    label?: string;
}

const Switch = ({ toggleState, setToggleState, label }: Props) => {


  return (
      <div style={{ display: 'flex', alignItems: 'center'}}>
          {label && <label htmlFor="react-switch-checkbox">{label} </label>}
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={(e) => {
          toggleState ? setToggleState(false) : setToggleState(true);
        }}
      />
      <label className="react-switch-label" htmlFor={`react-switch-new`}>
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Switch;