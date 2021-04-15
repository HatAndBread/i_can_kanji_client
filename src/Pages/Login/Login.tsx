import { useContext } from 'react';
import { AppCtx } from '../../App';
import Form from '../../Components/Form/Form';
import { Redirect } from 'react-router-dom';

const Login = (): JSX.Element => {
  return !useContext(AppCtx)?.isLoggedIn() ? (
    <div className="Login">
      <Form title="Login" url="/auth/sign_in" method="POST" />
    </div>
  ) : (
    <Redirect to="/" />
  );
};

export default Login;
