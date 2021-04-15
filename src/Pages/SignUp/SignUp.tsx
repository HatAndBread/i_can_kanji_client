import { useContext } from 'react';
import { AppCtx } from '../../App';
import Form from '../../Components/Form/Form';
import { Redirect } from 'react-router-dom';

const SignUp = (): JSX.Element => {
  return !useContext(AppCtx)?.isLoggedIn() ? (
    <div className="SignUp">
      <Form title="Sign Up" url="/auth" method={'POST'} />
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default SignUp;
