import React ,{useState} from 'react';
import {API_Path} from '../../utils/APIPath';

const Register = ({showLoginHandler}) => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

const handleSubmit = async(e)=>{
  e.preventDefault();
  try {
    const response = await fetch(`${API_Path}/vendor/register`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({username, email, password}) 
    })
    const data = await response.json();
    if(response.ok){
      console.log(data);
      setUsername("");
      setEmail("");
      setPassword("");
      alert("Vendor register succesfully");
      showLoginHandler();

    }
  } catch (error) {
    console.error("Registration failed", error);
    alert("Registration failed");
  }
}




  return (
    <div className="registerSection">
        <form className='authform' onSubmit={handleSubmit}>
            <h1> Vendor Register</h1>
            <label>Name</label>
            <input type="text" name='username' value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter your Name ,ex: John'/><br />
            <label>Email</label>
            <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email, ex: johnn@gmail.com'/><br />
            <label>Password</label>
            <input type="text" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password ex: John@123'/><br />
            <div className="btnsubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register