//import React from 'react'
import { useContext } from "react"
import NoteContext from "../context/notes/Notecontext"
import Card from "./Card";

export default function ViewNotes() {
  let {notes}=useContext(NoteContext);
  console.log(notes)
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 ">
      {notes.map((note)=>{return <Card key={note.id} note={note}/>})}
    </div>
  )
}
