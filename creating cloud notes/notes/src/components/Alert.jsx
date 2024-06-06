import { useContext } from "react"
import AlertContext from "../context/alert/Alertcontex"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"


export default function Alert() {
  const {msg,success,closeAlert}=useContext(AlertContext)
  return (
    <div className={` transition-opacity  w-[90vw] sm:w-[70vw] backdrop-blur-sm md:w-[60vw] ${success} rounded-md  border p-2 flex items-center justify-between `}>
      <div>
        {msg}
      </div>
      <FontAwesomeIcon className="m-3 cursor-pointer" onClick={closeAlert} icon={faXmark}/>
    </div>
  )
}
