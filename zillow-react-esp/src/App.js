import React, { useState, useContext, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// store
import AuthContext from './store/auth-context';
import firebase from './util/firebase';

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

  // local db
  const [items, setItems] = useState(property_DB);
  
  // firebase DB
  const [properties, setProperties] = useState();

  useEffect(() => {
    const propRef = firebase.database().ref('property');
    propRef.on('value', (snapshot) => {
      const property = snapshot.val();
      const propertyList = [];

      for (let id in property) {
        propertyList.push({id, ...property[id]});
      }

      setProperties(propertyList);
    })
  }, [])

  const addNewLocationHandler= (item) => {
    setItems(prevItem => {
      return [...prevItem, item]
    });
  };

  const removeNewLocationHandler = (removeItem) => {
    let filteredArray = items.filter((item) => item.id !== removeItem);

    setItems(filteredArray);

    const propertyRef = firebase.database().ref('property').child(removeItem);
    propertyRef.remove();
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
            <Compra listProperties={properties} removeItem={removeNewLocationHandler}/>
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
