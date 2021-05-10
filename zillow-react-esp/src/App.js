import { Route, Switch, Redirect } from 'react-router-dom';

// css
import './css/App.css';

// pages
import Welcome from './pages/Welcome';
import Compra from './pages/Compra';
import Vender from './pages/Vender';

// components
import Header from './components/Header';

function App() {
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
            <Compra />
          </Route>
          <Route path='/vender'>
            <Vender />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default App;
