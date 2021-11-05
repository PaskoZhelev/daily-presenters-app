import './App.css';
import MainPage from "./components/mainPage.js"
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
      <main>
        <Switch>
        <Route path="/" component={MainPage} exact />
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
