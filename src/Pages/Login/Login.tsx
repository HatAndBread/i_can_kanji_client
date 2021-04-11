import Form from '../../Components/Form/Form';

const Login = (): JSX.Element => {
    return (
      <div className="Login">
        <Form title="Login" url="/auth/sign_in" method="POST"/>
      </div>
    );
}

export default Login;