import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import ModalContainer from './Components/Modal/ModalContainer';
import About from './Pages/About/About';
import StudySet from './Pages/StudySet/StudySet';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import MySets from './Pages/MySets/MySets';
import PopUp from './Components/PopUp/PopUp';
import './App.css';

export interface AppContextInterface {
  currentUser: CurrentUser | null;
  baseUrl: string;
  loginInfo: object | null;
  initializeUserData: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
  setLoginInfo: React.Dispatch<React.SetStateAction<LoginInfo | null>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  setWarnMessage: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<string | null>>;
  setPopUpMessage: React.Dispatch<React.SetStateAction<string>>;
  modalCallback: () => void;
  setModalCallback: React.Dispatch<React.SetStateAction<() => void>>;
  getHeader: () => {};
  isLoggedIn: () => boolean;
}

export const AppCtx = createContext<AppContextInterface | null>(null);
type LoginInfo = {
  accessToken: string;
  uid: string;
  client: string;
};

export type CurrentUser = {
  study_sets: { name: string; words: { kanji: string; yomikata: string; definition: string }[] }[];
  name: string;
};

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null); // has user's study sets. No loginInfo means signed out
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [warnMessage, setWarnMessage] = useState<string>('');
  const [popUpMessage, setPopUpMessage] = useState<string>('');
  const [modalCallback, setModalCallback] = useState<() => void>(() => () => {});
  const getHeader = (): {
    'Content-Type': string;
    uid?: string;
    client?: string;
    'access-token'?: string;
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
  };

  const initializeUserData = () => {
    const info = localStorage.getItem('loginInfo');
    if (info) {
      const obj = JSON.parse(info);
      setLoginInfo({ accessToken: obj.accessToken, uid: obj.uid, client: obj.client });
      const user = localStorage.getItem('currentUser');
      console.log(typeof user);
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    } else {
      localStorage.clear();
    }
  };

  useEffect(() => {
    initializeUserData();
  }, []);
  const appCtx: AppContextInterface = {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://?',
    currentUser,
    setCurrentUser,
    loginInfo,
    setLoginInfo,
    initializeUserData,
    setErrorMessage,
    setOpenModal,
    getHeader,
    setWarnMessage,
    modalCallback,
    setModalCallback,
    setPopUpMessage,
    isLoggedIn: () => (loginInfo ? true : false)
  };

  return (
    <AppCtx.Provider value={appCtx}>
      <Router>
        <div className="App">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/study-set">Study Set</Link>
          <Link to="/my-sets">My Study Sets</Link>
          {appCtx.isLoggedIn() ? (
            <a
              href="/"
              onClick={() => {
                localStorage.clear();
                setCurrentUser(null);
              }}
            >
              Sign Out
            </a>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
          <ModalContainer openModal={openModal} errorMessage={errorMessage} warnMessage={warnMessage} />
          <PopUp message={popUpMessage} />
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
            <Route path="/my-sets" exact>
              <MySets />
            </Route>
          </Switch>
        </div>
      </Router>
    </AppCtx.Provider>
  );
}

export default App;
