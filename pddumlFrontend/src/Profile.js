import React, { useState } from 'react'
import axios from 'axios';
import Webcam from 'react-webcam'
const WebcamComponent = () => <Webcam />
const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: 'user',
}
const Profile = () => {
  const [picture, setPicture] = useState('')
  const [plant,setPlant]= useState(" ");
  const webcamRef = React.useRef(null)
  const capture = React.useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot()
    setPicture(pictureSrc)
  })
  return (
    <div>

      <h2 className="mb-5 text-center">
         Capture Photo of Leaf
      </h2>
      <div>
        {picture === '' ? (
          <Webcam
            audio={false}
            height={400}
            ref={webcamRef}
            width={400}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
        ) : (
          <img src={picture} alt=''/>
        )}
      </div>
      <div>
        {picture !=='' ? (
          <button
            onClick={(e) => {
              e.preventDefault()
              setPicture()
            }}
            className="btn btn-primary"
          >
            Retake
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault()
              capture()
            }}
            className="btn btn-danger"
          >
            Capture
          </button>
        )}
      </div><div>
      <p><strong>Select Plant:                      </strong>
      
      <select name="plant" id="plant" onChange={(name)=>setPlant(name.target.value)} required>
        <option value="">Tomato</option>
        <option value="">Papper Bell </option>
        <option value="">Potato</option>
      </select></p> 
      <p><input type="submit" value="Submit" 
      onClick={()=>{axios.post("http://127.0.0.1:8000/test/",{data:0}).then(data=>console.log(data.data))}}/></p>

<p><input type="reset" value="Reset" /></p>
     </div>
    </div>
  )
}
export default Profile