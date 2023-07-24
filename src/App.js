import {BrowserRouter, Routes, Route} from "react-router-dom"
import {io} from "socket.io-client"
import Home from './pages/Home';
import { BACK_END_URL } from "./config";

const ws = io(BACK_END_URL, {
  path: "/websocket",  
});

function App() {
  return (
    <BrowserRouter>    
      <Routes>
      <Route path="/" element={<Home socket={ws}/>}></Route>
      </Routes>    
    </BrowserRouter>
  );
}

export default App;
