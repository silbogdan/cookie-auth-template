import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
      {/* <Login></Login>
      <Register></Register> */}
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
