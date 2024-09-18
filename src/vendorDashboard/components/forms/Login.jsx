import React, {useState} from 'react';
import {API_Path} from '../../utils/APIPath';

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const loginHandleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_Path}/vendor/login`,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({email, password}) 
      })
      const data = await response.json();
      if(response.ok){
        alert("Login success");
        setEmail("");
        setPassword("");
        localStorage.setItem('loginToken', data.token)
        console.log(data);
        showWelcomeHandler() 
      }
      const vendorId = data.vendorId;
      const vendorResponse = await fetch(`${API_Path}/vendor/single-vendor/${vendorId}`);
      const vendorData = await vendorResponse.json()
      if(vendorResponse.ok && vendorData.Vendor.firm.length >0){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.Vendor.firm[0].firmName;
        console.log(vendorFirmName);
        console.log(vendorData);
        console.log("checkinng for firm Id", vendorFirmId);
        localStorage.setItem('firmId', vendorFirmId);
        localStorage.setItem('vendorFirmName', vendorFirmName);
        window.location.reload();
      }
      window.location.reload();
    
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed");
    }
  }



  return (
    <div className="loginSection">
        <form className='authform' onSubmit={loginHandleSubmit}>
            <h1> Vendor Login</h1>
            <label>Email</label>
            <input type="text" placeholder='Enter your email'  name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/><br />
            <label>Password</label>
            <input password="text" placeholder='Enter your Password'  name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/><br />
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Login