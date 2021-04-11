import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from './Pages/About/About';
import StudySet from './Pages/StudySet/StudySet';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp'
import './App.css';

interface AppContextInterface {
  baseUrl: string;
}

export const AppCtx = createContext<AppContextInterface | null>(null);


function App(): JSX.Element {
  const appCtx: AppContextInterface = {
    baseUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://?'
  };
  const handleClick = async () => {
    const res = await fetch(`${appCtx.baseUrl}/home`);
    console.log(res);
    const data = await res.json();
    console.log(data);
  };
  return (
    <AppCtx.Provider value={appCtx}>
      <Router>
        <div className="App">
          <button onClick={handleClick}>Click me</button>
          <Link to="/about">About</Link>
          <Link to="/study-set">Study Set</Link>
          <Link to="/login">Login</Link>
          <Link to="/sign-up">Sign Up</Link>
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
