import { Routes, Route, Navigate } from 'react-router-dom'
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { Layout } from './components/layout/index'
import { AuthGuard } from './components/auth-guard'
import { setSessionUser } from './redux/slices/auth';
import { useDispatch } from 'react-redux';

export const ApiRoutes = () => {
  const dispatch = useDispatch();
  // do the first thing on starting app
  dispatch(setSessionUser());

  return <Routes>
    <Route path='/' >
      <Route path='login' element={<Login />} />
      <Route path='/' element={<AuthGuard><Layout /></AuthGuard>}>
        <Route path='home' element={<Home />} />
        <Route path='*' element={<Navigate to="home" replace={true} />}></Route>
      </Route>
    </Route>
  </Routes>
}