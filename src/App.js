import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import {AuthRoute} from "./components/AuthComponent";
import Article from "./pages/Article";
import Home from "./pages/Home";
import Publish from "./pages/Publish";

function App() {
  return (<BrowserRouter>
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

  </BrowserRouter>);
}

export default App;
