//import React from 'react'
import { useState } from 'react'
import NoteContext from './Notecontext'
import propTypes from "prop-types"

export default function Notestate(props) {
  let host="http://localhost:3000"
  let notesdef=[]
  let [notes,setNotes]=useState(notesdef);
  //route get notes
  let getNotes=async ()=>{
    let response=await fetch(`${host}/api/notes/fetchNotes`,{
    method:"GET",
    headers:{
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWQ4NGRhMDBjMjJiNjRmMWNiOWQyOCIsImlhdCI6MTcxNzQwODIzMX0.LWrEKvdb2H1bevTIq8p1TKfsWzVRx4UK7K9Cws6N4uo"
    }
    })
    let notestemp=await response.json();
    console.log(notestemp);
    notesdef=notestemp;
    setNotes(notesdef);
  }
  //route:1 :add notes 
  async function addNotes(title,descreption,tag) {
    const note={title,descreption,tag};
    //const data=;
    let response=await fetch(`${host}/api/notes/createNotes`,{
      method:"POST",
      headers:{
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWQ4NGRhMDBjMjJiNjRmMWNiOWQyOCIsImlhdCI6MTcxNzQwODIzMX0.LWrEKvdb2H1bevTIq8p1TKfsWzVRx4UK7K9Cws6N4uo",
        "Content-Type": "application/json"
      },
      body:JSON.stringify(note)
      })
    let result=await response.json();
    //console.log(result);
    //frontend
    notesdef=JSON.parse(JSON.stringify(notes));
    notesdef.unshift(result)
    //console.log(notesdef);
    setNotes(notesdef);
    return
  }
  //route 2: delete notes
  async function deleteNotes(id) {
    let response=await fetch(`${host}/api/notes/deleteNotes/${id}`,{
      method:"DELETE",
      headers:{
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWQ4NGRhMDBjMjJiNjRmMWNiOWQyOCIsImlhdCI6MTcxNzQwODIzMX0.LWrEKvdb2H1bevTIq8p1TKfsWzVRx4UK7K9Cws6N4uo",
        "Content-Type": "application/json"
      },
      
      })
    let result=await response.json();
    console.log(result);
    notesdef=JSON.parse(JSON.stringify(notes));
    notesdef=notesdef.filter((note)=>{return note._id!=id})
    setNotes(notesdef);
  }
  //route 3: edit notes
  async function editNotes(note) {
    
    let response=await fetch(`${host}/api/notes/updateNotes`,{
      method:"PUT",
      headers:{
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NWQ4NGRhMDBjMjJiNjRmMWNiOWQyOCIsImlhdCI6MTcxNzQwODIzMX0.LWrEKvdb2H1bevTIq8p1TKfsWzVRx4UK7K9Cws6N4uo",
        "Content-Type": "application/json"
      },
      body:JSON.stringify(note)
      
      })
    let result= await response.json();
    console.log(result)
    notesdef=JSON.parse(JSON.stringify(notes));
    
  }


  return (
    <NoteContext.Provider value={{notes,addNotes,deleteNotes,editNotes,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}
Notestate.propTypes={
  children:propTypes.element
}