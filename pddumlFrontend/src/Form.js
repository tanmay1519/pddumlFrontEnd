import React, { Component }  from 'react';
import axios from 'axios';
import { useState } from 'react';
import './Nav.css'
import { decode } from 'jpeg-js';
// import { Alert } from 'react-alert'
function Form(){

  const[plant,setPlant]= useState(" ");
  const [imgfile,setImgfile]= useState([]);
  const [selectedFile,setselectedFile]=useState(null);
  const [result,setResult] = useState("")
  const[plantname,setPlantname]= useState(" ");
  const [cnnimg,setImgCNN]=useState("")
 const  onFileChange = name => {
  setResult("")

  console.log(imgfile.length)
  const file = name.target.files[0];
setPlant(URL.createObjectURL(name.target.files[0]))
  // Create a new FileReader object to read the file as an array buffer
  const reader = new FileReader();
  
  // Set up an event listener for when the file has finished loading
  reader.addEventListener('load', (event) => {
    // Get the array buffer from the loaded file data
    const arrayBuffer = event.target.result;
  
    // Decode the JPEG image data and get the pixel values
    const imageData = decode(new Uint8Array(arrayBuffer), { useTArray: true });
    // setImgCNN(imageData);
  var temp=[];
  var cnntemp = [];
    // Loop over the pixels in the image data and read their values
    for (let y = 0; y < imageData.height; y++) {
      var line = [];
      for (let x = 0; x < imageData.width; x++) {
        const index = (y * imageData.width + x) * 4;
        const red = imageData.data[index];
        const green = imageData.data[index + 1];
        const blue = imageData.data[index + 2];
        const alpha = imageData.data[index + 3];
      
        temp.push(blue);
        line.push([red,green,blue])
     
  
        // Do something with the pixel data here
        // console.log(`Pixel at (${x}, ${y}): (${red}, ${green}, ${blue}, ${alpha})`);
      }
      cnntemp.push(line);
    }
    setImgfile(temp)
    setImgCNN(cnntemp)
  });
  
  // Start reading the file as an array buffer
  reader.readAsArrayBuffer(file);
}
  
  
 const  onFileUpload = () => {
// console.log(imgfile,imgfile.length)
axios.post("http://127.0.0.1:8000/gettomoato/",{imagefile:imgfile,plantname:plantname,CNNImg:cnnimg})
.then(data=>{
  // if (data.data.status==="success"){
    console.log(data.data)
    alert("Plant - "+data.data.plantname+"\nDisease - "+data.data.disease+"\nConfidence - "+data.data.confidence+"\n"+data.data.comments)
    // alert("The "+plantname+" Plant is " + data.data.result)
    // setResult("The "+plantname+" Plant is " + data.data.result)
    // setImgfile([])
  // }
})

    // Create an object of formData
    // const formData = new FormData();
   
    // // Update the formData object
    // formData.append(
    //   "myFile",
    // selectedFile,
    //   selectedFile.name
    // );
  
    // console.log(selectedFile)
    // Details of the uploaded file
//     let output = "";
// for (const [key, value] of formData) {
//   // output += `${key}: ${value}\n`;
//   console.log(value)
// }
//    console.log(output)
    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };
    return(<div className="App">
       <div className="Form">
<div className="box">
     <h3>{result}</h3>
     <img height={250} width={250} src={plant}/>

     </div>
<div className= "box">

      <p>
        <strong>Upload Image of leaf:              </strong>
      <input type="file" name="imagefile" id="imgfile" onChange={(name)=>onFileChange(name)} required /></p>
      {/* <p><strong>Select Plant:                      </strong>
      
      <select name="plantname" id="plantname" onChange={(name)=>setPlantname(name.target.value)} required>
      <option value="">Select Plant Name</option>
        <option value="tomato">Tomato</option>
        <option value="bellpepper">Papper Bell </option>
        <option value="potato">Potato</option>
      </select></p> */}
      <p><button className='btn' value="Submit" 
      onClick={()=>{onFileUpload()}}>Submit</button></p>

      <p><button className='btn'  value="Reset" >Reset</button></p>

      </div>
    </div>
  </div>
    );
}
export default Form;