import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { IRootState } from "../interfaces/api";
import { dummyLogin } from "../redux/actions/auth";
export const Login = () => {
  const isLoggedIn = useSelector<IRootState>(s => s?.auth?.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home', { replace: true })
    }    
  }, [isLoggedIn])

  const  dispatch = useDispatch();
  const data = {
    userName: "React developer",
    password: "123456",
    token: 'eysehdfgsdfjghn...'
  }

  return <>
    <div>Login</div>
    <button onClick={() => dispatch(dummyLogin({ data }))}>
      Let me in!</button>
  </>
}