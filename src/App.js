
import './App.css';
import React from 'react'
import Sidebar from './Components/SideBar/Sidebar';
import Chat from './Components/Chat/Chat'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Components/Login/Login';
import { useStateValue } from './StateProvider';

function App() {
    
   const [{ user }, dispatch] = useStateValue();
   
  return (
    <div className="app">
    {!user ? (
      <Login/>
    ): (
      <div className="app__body">
      <Router>
         <Sidebar />
      <Switch>
      <Route path="/rooms/:roomId" component={Chat}/>
      <Router path="/" >
          <Chat/>
      </Router>
      </Switch>
      </Router>
      </div>
    )}

    </div>
  );
}

export default App;
