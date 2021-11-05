import './App.css';
import MainPage from "./components/mainPage.js"
import { Route, Switch } from 'react-router-dom';
import PresentersPage from './components/presentersPage';

function App() {
  return (
      <main>
        <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/project" component={PresentersPage} />
        <Route component={Error} />
        </Switch>
      </main>
  );
}

const Error = () => (
  <div className="App">
        <header className="App-header">
          <p>
            Oops! Page not found!
          </p>
        </header>
      </div>
)

export default App;
