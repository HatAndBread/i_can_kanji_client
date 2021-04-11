import { useState } from 'react';

type Props = {
    src: string;
    alt: string;
    className: string;
    onClick?: any;
}

const Image = ({ src, alt, className, onClick }: Props): JSX.Element => {
    const [error, setError] = useState(false);
    if (error) {
        return <div className={className} onClick={onClick ? onClick : undefined}>{alt}</div>;
    } else {
        return (
          <img
            src={src}
            onError={() => setError(true)}
            alt="You will never see this"
            className={className}
            onClick={onClick ? onClick : undefined}
          ></img>
        );
    }
}
export default Image;
