import { useState } from "react"

export default function Mani() {
  const [text,setText]=useState("");
  const [copyText,setCopyText]=useState("Copy Text");
  const [desCopyText,setDesCopyText]=useState("opacity-0");

  //funcion to handlle change in form
  function handleChange(event) {
    setText(event.target.value)
  }

  //function to uppercase entire text
  function toUpperCase() {
    setText(text.toUpperCase());
  }

  //function to Captalize text
  function capitalize() {
    let textDup='';
    for(let i=0;i<text.length;i++){
      if(text[i]==="\n"){
        textDup+=' ';
      }
      else{
        textDup+=text[i];
      }
     
      
    }
    console.log(textDup)
    setText(textDup);
    console.log(text);
    
    let arr=textDup.split(" ");
    console.log(arr);
    arr=arr.filter((word)=>{return word.length>0});
    arr=arr.map((word)=>{
      word=word.toLocaleLowerCase();
      
      word=word[0].toUpperCase()+word.slice(1);
      
      return word;
    })
    console.log(arr);
    setText(arr.join(" "));
    
  }

  //function  to  remove extra Spaces
  function rmExtraSpaces() {
    let arr=text.split(" ");
    //console.log(arr);
    arr=arr.filter((word)=>{return word.length>0});
    //console.log(arr);
    setText(arr.join(" "));
  }
  
  //function to handle word Count
  function wordCount() {
    let arr=text.split(" ");
    //console.log(arr);
    arr=arr.filter((word)=>{return word.length>0});
    return arr.length;
  }

  //function to copy text
  function copyTextFn() {
    navigator.clipboard.writeText(text);
    let tex=document.getElementById('text-area');
    tex.select();  

    setCopyText("Text Copied");
    setDesCopyText("");
    setTimeout(() => {
      setCopyText("Copy Text");
      setDesCopyText("opacity-0");
    }, 2000);
  }

  //function to descopy text on hover
  function desCopyTextEnter() {
    setDesCopyText("");
  }
  function desCopyTextLeave() {
    setDesCopyText("opacity-0");
  }



  return (
    <>
      <div className="flex items-center justify-center m-3">
        <h2 className="text-2xl font-semibold text-gray-600">
          Enter your text here
        </h2>
      </div>
      <div className="flex items-center justify-center mt-4">
        <div>
          <textarea className="w-[60vw] h-[60vh] p-2 border-gray-500 border-2 rounded-sm" id="text-area" value={text} onChange={handleChange} placeholder="Enter text here" ></textarea>
          <p className="text-sm text-gray-500">Word-Count: {wordCount()} <br/> Characters: {text.length}</p>
        </div>
      </div>
      <div className="flex items-center flex-wrap justify-center">
        <button className="btn m-3" onClick={toUpperCase}>To Uppercase</button>
        <button className="btn m-3" onClick={capitalize}>Captalize</button>
        <button className="btn m-3" onClick={rmExtraSpaces}>Remove Extra Spaces</button>
        <button className="btn m-3 relative" onMouseEnter={desCopyTextEnter} onMouseLeave={desCopyTextLeave} onClick={copyTextFn}>Copy Text<p className={"absolute top-0 text-nowrap -translate-y-10 left-1/2 -translate-x-1/2 text-gray-900 pointer-events-none bg-slate-400 p-1 rounded-md duration-300 "+desCopyText}>{copyText}</p></button>
      </div>
    </>
  )
}
