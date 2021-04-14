
import { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import {AppCtx} from '../../App'
import './Form.css';
import updateLoginInfo from '../../helpers/updateLoginInfo'

type Props = {
  title?: string
  url: string;
  method: string;
}

const Form = ({ title, url, method }: Props): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirected, setRedirected] = useState(false);
  const ctx = useContext(AppCtx);
  const setErrorMessage = ctx?.setErrorMessage;
  const setOpenModal = ctx?.setOpenModal;
  console.log(ctx?.getHeader())

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch(ctx?.baseUrl + url, {
      method: method,
      headers: ctx?.getHeader(),
      body: JSON.stringify({ email, password })
    });
    updateLoginInfo(res, ctx);
    const data = await res.json();
    console.log(data)
    if (data.errors) {
      console.log(data.errors)
      if (Array.isArray(data.errors)) {
        setErrorMessage && setErrorMessage(data.errors.join('. '))
        setOpenModal && setOpenModal('error')
      } else {
        setErrorMessage && setErrorMessage('Something went wrong. Please try again later.');
        setOpenModal && setOpenModal('error');
      }
    } else {
      setRedirected(true);
    }
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.currentTarget.name === 'email') {
      setEmail(e.currentTarget.value)
    } else if (e.currentTarget.name === 'password') {
      setPassword(e.currentTarget.value)
    }
  };
  return (
    <form className="Form" action={ctx?.baseUrl + url} onSubmit={handleSubmit}>
      {redirected  && <Redirect to="/"/> }
        {title && <h2>{title}</h2>}
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" onChange={handleChange}/>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" onChange={handleChange}/>
        <button type="submit">Submit</button>
    </form>
    );
}

export default Form;