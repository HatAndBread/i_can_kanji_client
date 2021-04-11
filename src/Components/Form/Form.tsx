
import { useContext, useState } from 'react';
import {AppCtx} from '../../App'
import './Form.css';
type Props = {
  title?: string
  url: string;
  method: string;
}

const Form = ({ title, url, method }: Props): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const ctx = useContext(AppCtx);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await fetch(ctx?.baseUrl + url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    const accessToken = res.headers.get('access-token');
    const client = res.headers.get('client')
    const uid = res.headers.get('uid');
    console.log(`%c${accessToken},${client},${uid}`, 'color: pink;')
    const data = await res.json();
    console.log(data)
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