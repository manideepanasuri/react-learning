import { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash ,faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import NoteContext from '../context/notes/Notecontext';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
//import {PropTypes} from "react"

export default function Card(props) {
  let {deleteNotes}=useContext(NoteContext);
  function handleClick() {
    deleteNotes(props.note._id);
  }
  return (
    <div className='bg-gray-300 p-2 rounded-md '>
      <div className='flex items-center justify-between'>
        <h3 className='font-semibold inline-block text-lg text-wrap'>{props.note.title}</h3>
        <div className='flex flex-nowrap m-1'>
          <FontAwesomeIcon className='m-1 cursor-pointer' onClick={handleClick} icon={faTrash}/>
          <Link to="/notes" state={props.note}><FontAwesomeIcon className='m-1 cursor-pointer' icon={faPenToSquare} /></Link>
        </div>
      </div>
      <p>{props.note.descreption}</p>
    </div>
  )
}


