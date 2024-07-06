import React, { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
const navigate = useNavigate();

  const handleLogin = async () => {

    if (username === '' || password === '') {
      setErrorMessage("Username and password is required");
      setShowMessage(true); 
    } 
    
    else {
      const response = await login(username, password);
      
      if(response) {
       navigate('/inventory');
      }

      else {
        setErrorMessage('Invalid Username or password');
        
      }

      setShowMessage(true);
    }

  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-r from-gray-200 to-gray-800 p-5 flex justify-center items-center">
        <div className="border border-gray-300 rgba(192, 192, 192, 0.5) rounded m-5 p-5 w-[400px] h-[300px]">
          <div className="text-3xl text-center text-gray-700 hover:bg-blue-700 font-serif p-4">LOGIN</div>

          { 
          showMessage && (
            <div className={"m-2 text-center bg-red-200 text-red-700"}>
              { errorMessage }
            </div>
          )}

          <div className="flex gap-8 m-5">
            <div className="text-xl text-gray-700 font-serif">Username:</div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded border border-grey-700" type="text" />
          </div>

          <div className="flex gap-8 m-5"> <div className="text-xl text-gray-700 font-serif">Password:</div>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-grey-700" type="password" />
          </div>

          <div className="flex justify-end">
            <button onClick={handleLogin} className="bg-grey-700 text-black p-3  hover:bg-blue-200 font-serif hover:text-white"  >LOGIN</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
