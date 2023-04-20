import React, { Component }  from 'react';
import './Nav.css'
import axios from 'axios';
import { useState } from 'react';
function Feedback_Form(){

  const[plant,setPlant]= useState(" ");
  const [imgfile,setImgfile]= useState(0);

    return(<div className="App">
       <div class="Form">
        
    <strong>Feedback Form for Incorrectly Classified Images</strong>
     <form>
      <p><strong>Upload Incorrectly Classified Image of leaf:              </strong>
     <input type="file" name="imagefile" id="imgfile" onChange={(name)=>setImgfile(name.target.value)} required /></p>
      

      <p><strong>Select Identified Disease:                      </strong>
      
      <select name="plant" id="plant" onChange={(name)=>setPlant(name.target.value)} required>
        <option value="">Tomato Bacterial Spots</option>
        <option value="">Papper Bell Bacterial Spots</option>
        <option value="">Potato Bacterial Spots</option>
        <option value="">Tomato Early Blight</option>
        <option value="">Potato Early Blight</option>
        <option value="">Tomato Late Blight</option>
        <option value="">Potato Late Blight</option>
        <option value="">Tomato Healthy</option>
        <option value="">Papper Bell Healthy </option>
        <option value="">Potato Healthy</option>
      </select></p>
      <p><input type="submit" value="Submit" 
      onClick={()=>{axios.post("http://127.0.0.1:8000/test/",{data:0}).then(data=>console.log(data.data))}}/></p>

      <p><input type="reset" value="Reset" /></p>
     </form>
    
    </div>
  </div>
    );
}
export default Feedback_Form;