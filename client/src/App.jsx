import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Transction from './pages/Transction';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="/transaction" element={<Transction />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
