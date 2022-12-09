import './App.css';
import { Route, Routes,unstable_HistoryRouter as HistoryRouter} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import {AuthRoute} from "./components/AuthComponent";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import {history} from "./utils";

function App() {
  return (<HistoryRouter history={history}>
    <div className="App">
      <Routes>
        <Route path='/*' element={<AuthRoute><Layout/></AuthRoute>}>
          <Route index element={<Home/>}/>
          <Route path='article' element={<Article/>}/>
          <Route path='publish' element={<Publish/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>

  </HistoryRouter>);
}

export default App;
