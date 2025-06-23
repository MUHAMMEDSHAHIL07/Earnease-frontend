import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register/student" />} />
        <Route path="/register/student" element={<Register />} />
        <Route path="/register/employer" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
