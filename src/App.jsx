import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Register from './Component/Register';
import Login from './Component/Login';
import Home from './Component/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
