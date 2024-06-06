import {useState} from 'react'
import AlertContext from './Alertcontex'


export default function Alertstate(props) {
  const [show,setShow]=useState(false);
  const [msg,setMsg]=useState("");
  const [success,setSuccess]=useState("success");
  function showAlert(message,state) {
    setMsg(message);
    setSuccess(state);
    setShow(true);
    setTimeout(() => {
      setShow(false);
      setMsg("");
      setSuccess("success");
      
    }, 1000);
  }
  function closeAlert() {
    setShow(false);
    setMsg("");
    setSuccess("success");
  }
  return (
    <AlertContext.Provider value={{show,msg,success,showAlert,closeAlert}}>
      {props.childern}
    </AlertContext.Provider>
  )
}
