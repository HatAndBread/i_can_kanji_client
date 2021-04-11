import Form from '../../Components/Form/Form';

const SignUp = (): JSX.Element => {
    return (
        <div className="SignUp">
            <Form title="Sign Up" url="/auth" method={'POST'}/>
        </div>)
}

export default SignUp;