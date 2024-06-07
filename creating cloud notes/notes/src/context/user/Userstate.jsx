import { useContext, useEffect, useState } from 'react'
import UserContext from './Usercontext'
import AlertContext from '../alert/Alertcontex';
import { useNavigate } from 'react-router-dom';

export default function Userstate(props) {
  const [auth,setAuth]=useState(false);
  const [token,setToken]=useState(null);
  const [user,setUser]=useState(null);
  const {showAlert}=useContext(AlertContext);
  let host="http://localhost:3000"
  
  useEffect(()=>{
    if(auth){
      getUser()
    }
    
  },[auth,token])
  
  //signup
  async function signUp(name,email,password) {
    console.log("hi")
    let response=await fetch(`${host}/api/auth/createUser`,{
      method:"POST",
      headers:{
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",        
        "Content-Type": "application/json"
      },
      body:JSON.stringify({name,email,password})
      })
    let result=await response.json();
    console.log(result)
    if(!result.success){
      showAlert(result.err,"error")
      setAuth(false);
      setToken(null);
      setUser(null);
      return {success:false,err:result.err}}
    setAuth(true);
    setToken(result.token);
    console.log(result.token);
    //console.log(token);
    window.localStorage.setItem("auth-token",result.token);
    getUser(result.token);
     //sets user details  
     return {success:true,tok:result.token}; 
  }
  //login
  async function logIn(email,password){
    let response=await fetch(`${host}/api/auth/login`,{
      method:"POST",
      headers:{
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email,password})
      })
    let result=await response.json();
    if(!result.success){
      showAlert(result.err,"error")
      setAuth(false);
      setToken(null);
      setUser(null);
      return {success:false,err:result.err}}
      console.log(result.token)
    setAuth(true);
    setToken(result.token);
    //console.log(token)
    localStorage.setItem("auth-token",token);
    return {success:true,tok:result.token}; //sets user details 
  }
  //get user details
  async function getUser(){
    //console.log(token)
    let response=await fetch(`${host}/api/auth/getUser`,{
      method:"POST",
      headers:{
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        
        "Content-Type": "application/json",
        "auth-token":token
      }
      })
    let result=await response.json();
    console.log(result);
    if(!result.success){
      showAlert(result.err,"error")
      setAuth(false);
      setToken(null);
      setUser(null);
      return }
    setUser(result.user);
  }
  //check for auth storage in local storage
  async function checkLocal(tok) {
    //console.log("token::::",tok)
    if(!tok){
      setAuth(false);
      setToken(null);
      setUser(null);
      return false}
    setAuth(true);
    setToken(tok);
    return {success:true,tok};
  }
  //logout
  async function logOut() {
    setAuth(false);
    setToken(null);
    setUser(null);
  }

  return (
    <UserContext.Provider value={{auth,token,user,signUp,logIn,getUser,checkLocal,logOut}}>
      {props.children}
    </UserContext.Provider>
  )
}
