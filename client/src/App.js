import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router } from '@reach/router';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Game from './components/Game';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <Container>
        <Header/>
        <Router>
          <Game path="/:token" />
          <Login path="/" />
        </Router>
      </Container>
    </div>
  );
}

export default App;
