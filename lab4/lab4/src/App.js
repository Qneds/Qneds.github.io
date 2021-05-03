import './App.css';
import {
  BrowserRouter as Router, NavLink
} from "react-router-dom";

import Main from './components/Main.js';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <main>

        <nav>
          <div className="btn-div-frame space-app buttons-page-div">
          <NavLink to="/" exact className="btn border-btn btn-select space-app center-btn">Lista studentów</NavLink>
          <NavLink to="/newStudent" exact className="btn border-btn btn-select space-app center-btn">Dodaj nowego studenta</NavLink>
          <NavLink to="/groups" exact className="btn border-btn btn-select space-app center-btn">Lista grup</NavLink>
          <NavLink to="/newGroup" exact className="btn border-btn btn-select space-app center-btn">Dodaj nową grupę</NavLink>
          </div>
        </nav>

        <Main />

      </main>
    </Router>
  );
}

export default App;
