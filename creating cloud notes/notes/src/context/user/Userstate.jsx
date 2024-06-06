import { useState } from 'react'
import UserContext from './Usercontext'

export default function Userstate(props) {
  const [auth,setAuth]=useState(false);
  const [token,setToken]=useState(null);
  return (
    <UserContext.Provider value={{}}>
      {props.children}
    </UserContext.Provider>
  )
}
