import './App.css'
import Navbar from './Components/Navbar'; import Login from "./Pages/Registration/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BookForm from "./Pages/Books/Book";
import User from "./Pages/Users/User";
import LendBooks from "./Pages/Lendings/LendBooks";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/kitap-işlemleri" element={<BookForm />} />
        <Route path="/kullanici-işlemleri" element={<User />} />
        <Route path="/ödünç-işlemleri" element={<LendBooks />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};



export default App;