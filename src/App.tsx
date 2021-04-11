import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from './Pages/About/About';
import StudySet from './Pages/StudySet/StudySet';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp'
import './App.css';

interface AppContextInterface {
  baseUrl: string;
  appInfo: object | null;
  setAppInfo: React.Dispatch<React.SetStateAction<AppInfo | null>>;
}

export const AppCtx = createContext<AppContextInterface | null>(null);
type AppInfo = {
  token: string | null,
  uid: string | null,
  client: string | null
}

function App(): JSX.Element {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null)
  const appCtx: AppContextInterface = {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://?',
    appInfo,
    setAppInfo
  };
  const handleClick = async () => {
    const res = await fetch(`${appCtx.baseUrl}/home`);
    console.log(res);
    const data = await res.json();
    console.log(data);
  };
  useEffect(() => {
    const info = localStorage.getItem('appInfo')
    if (info) {
      const obj = JSON.parse(info);
      setAppInfo({ token: obj.accessToken, uid: obj.uid, client: obj.client })
    } else {
      console.log('NOT LOGGED IN')
    }
  }, []);

  useEffect(() => {
    console.log(appInfo, '🌈');
  }, [appInfo]);
  return (
    <AppCtx.Provider value={appCtx}>
      <Router>
        <div className="App">
          <button onClick={handleClick}>Click me</button>
          <Link to="/about">About</Link>
          <Link to="/study-set">Study Set</Link>
          <Link to="/login">Login</Link>
          <Link to="/sign-up">Sign Up</Link>
          <a href="/" onClick={()=>localStorage.clear()}>Sign Out</a>
        </div>
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
      </Router>
    </AppCtx.Provider>
  );
}

export default App;
