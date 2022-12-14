import './App.css';
import {BrowserRouter ,Route,Switch} from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx"
import Detail from './components/Detail/Detail';
import VideogameCreate from './components/VideogameCreate/VideogameCreate';

function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <Switch>
      <Route exact path="/" component={LandingPage}/>
      <Route path="/home" component={Home}/>
      <Route exact path="/videogames/:id" component={Detail}/>
      <Route exact path="/create" component={VideogameCreate}/>
       
      </Switch>
    </div>
    </BrowserRouter>
  );

}

export default App;
