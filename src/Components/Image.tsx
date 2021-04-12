import { useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className: string;
  onClick?: ()=> void;
  isButton?: boolean;
}

const Image = ({ src, alt, className, onClick, isButton }: Props): JSX.Element => {
    const [error, setError] = useState(false);
    if (error) {
        return (
          <div
            className={className}
            onClick={onClick ? onClick : undefined}
            style={isButton ? { cursor: 'pointer', fontSize: '48px' } : { fontSize: '48px' }}
          >
            {alt}
          </div>
        );
    } else {
        return (
          <img
            src={src}
            onError={() => setError(true)}
            alt="You will never see this"
            className={className}
            onClick={onClick ? onClick : undefined}
            style={isButton ? {cursor: 'pointer'} : {}}
          ></img>
        );
    }
}
export default Image;
