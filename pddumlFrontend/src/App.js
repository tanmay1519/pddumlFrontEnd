import React, { Component }  from 'react';
import { useState } from 'react';
import './App.css';
import Camera from './Camera';
import Form from './Form';


function App() {
  const [textToggle, textToggleState] = useState(true)
  return (
    <div className="App">
       <div className="Tog">
       <button className='btnHead' onClick={ () => textToggleState(!textToggle) }>Upload or Capture</button>
       </div>
       {
 textToggle ?
 <Form />

 :
<div className="Cam"><Camera /> </div>
}
    
    
    </div>
  );
}

export default App;
