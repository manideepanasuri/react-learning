import propTypes from "prop-types"

export default function Nav(props) {
  
  //function to toggle button  
  function handleToogle() {
    props.toggle()
  }  

  return (
    <div>
      <nav className={`navbar-${props.mode} p-3 flex items-center justify-between`}> 
        <h1 className="font-semibold text-2xl">Text Utils</h1>
        <div className="flex justify-center items-center">
          <button className={`toggle-${props.mode} transition w-12 h-7  rounded-full p-0 duration-500 relative `} onClick={handleToogle}>
            <div className={`w-5 h-5 bg-white absolute toggle-div-${props.mode} duration-500  rounded-full `}></div>
          </button>
          <p onClick={handleToogle} className="cursor-pointer mx-2">Enable {(props.mode==="light")?"Dark":"Light"} Mode</p>
        </div>
      </nav>
    </div>
  )
}

Nav.propTypes={
  mode:propTypes.string,
  toggle:propTypes.func
}
Nav.defaultProps={
  mode:"light",
  toggle:()=>{}
}