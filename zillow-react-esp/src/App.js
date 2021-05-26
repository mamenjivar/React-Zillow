import React, { useState, useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// store
import AuthContext from './store/auth-context';

// css
import './css/App.css';

// pages
import Welcome from './pages/Welcome';
import Compra from './pages/Compra';
import Vender from './pages/Vender';
import AuthPage from './pages/AuthPage';

// components
import Header from './components/Header';

// local DB
import property_DB from './util/property_DB';


function App() {
  const authCtx = useContext(AuthContext);

  const [items, setItems] = useState(property_DB);

  const addNewLocationHandler= (item) => {
    setItems(prevItem => {
      return [...prevItem, item]
    });
  };

  const removeNewLocationHandler = (removeItem) => {
    let filteredArray = items.filter((item) => item.id !== removeItem);

    setItems(filteredArray);
  }

  return (
    <div>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/Welcome' />
          </Route>
          <Route path='/welcome'>
            <Welcome />
          </Route>
          <Route path='/compra'>
            <Compra listProperties={items} removeItem={removeNewLocationHandler}/>
          </Route>
          <Route path='/vender'>
            <Vender addNewLocation={addNewLocationHandler}/>
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
