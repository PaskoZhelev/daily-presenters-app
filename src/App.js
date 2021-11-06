import MainPage from "./components/mainPage.js"
import { Route, Switch } from 'react-router-dom';
import PresentersPage from './components/presentersPage';
import PeoplePage from "./components/peoplePage.js";

function App() {
  return (
      <main>
        <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/project/:projectName" component={PresentersPage} />
        <Route path="/people/:projectName" component={PeoplePage} />
        <Route component={Error} />
        </Switch>
      </main>
  );
}

const Error = () => (
  <div className="App">
        <header className="App-header">
          <h2>
            <strong>Oops! Page not found!</strong>
          </h2>
        </header>
      </div>
)

export default App;
