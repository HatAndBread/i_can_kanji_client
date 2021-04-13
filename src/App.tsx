import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ModalContainer from './Components/Modal/ModalContainer';
import About from './Pages/About/About';
import StudySet from './Pages/StudySet/StudySet';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp'
import './App.css';

interface AppContextInterface {
  baseUrl: string;
  loginInfo: object | null;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setWarnMessage: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
  modalCallback: () => void;
  setModalCallback: React.Dispatch<React.SetStateAction<(() => void)>>;
  getHeader: () => {};
  isLoggedIn: () => boolean;
}

export const AppCtx = createContext<AppContextInterface | null>(null);
type LoginInfo = {
  accessToken: string,
  uid: string,
  client: string,
}

function App(): JSX.Element {
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null);
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [warnMessage, setWarnMessage] = useState<string>('')
  const cb = () => {};
  const [modalCallback, setModalCallback] = useState<() => void>(() => cb)
  const getHeader = (): {
    'Content-Type': string,
    uid?: string,
    client?: string,
    'access-token'?: string
  } => {
    if (loginInfo) {
      return {
        'Content-Type': 'application/json',
        'access-token': loginInfo.accessToken,
        uid: loginInfo.uid,
        client: loginInfo.client
      };
    }
    return { 'Content-Type': 'application/json' };
  }

  const appCtx: AppContextInterface = {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://?',
    loginInfo,
    setLoginInfo,
    setErrorMessage,
    setOpenModal,
    getHeader,
    setWarnMessage,
    modalCallback,
    setModalCallback,
    isLoggedIn: () => (loginInfo ? true : false)
  };
  const handleClick = async () => {
    const options = {
      method: 'get',
      headers: getHeader()
    }

    const res = await fetch(`${appCtx.baseUrl}/home`, options);
    console.log(res);
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    const info = localStorage.getItem('loginInfo')
    if (info) {
      const obj = JSON.parse(info);
      setLoginInfo({ accessToken: obj.accessToken, uid: obj.uid, client: obj.client })
    } else {
      console.log('NOT LOGGED IN')
    }
  }, []);

  useEffect(() => {
    console.log(loginInfo, '🌈');
  }, [loginInfo]);
  return (
    <AppCtx.Provider value={appCtx}>
      <Router>
        <div className="App">
          <button onClick={handleClick}>Click me</button>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/study-set">Study Set</Link>
          {appCtx.isLoggedIn() ? (
            <a href="/" onClick={() => localStorage.clear()}>
              Sign Out
            </a>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
          <ModalContainer openModal={openModal} errorMessage={errorMessage} warnMessage={warnMessage} />
          <Switch>
            <Route path="/about" exact>
              <About />
            </Route>
            <Route path="/study-set" exact>
              <StudySet />
            </Route>
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/sign-up" exact>
              <SignUp />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppCtx.Provider>
  );
}

export default App;
