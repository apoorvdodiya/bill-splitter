import { useDispatch } from "react-redux"
import { logout } from "../../redux/slices/auth"

export const Header = () => {
  const dispatch = useDispatch();

  return <>
    Header <button onClick={() => dispatch(logout())}>Logout</button>
  </>
}