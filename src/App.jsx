import './App.css'
import './bootstrap.min.css'
import Auth from './pages/Auth'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/dash' element={<Dashboard />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
