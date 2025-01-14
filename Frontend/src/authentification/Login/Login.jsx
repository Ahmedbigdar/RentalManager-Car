import React, { useState } from "react";
import "./Login.css"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Login = () => {


const [email, setEmail] = useState('')
const [password, setPassword] = useState('')



const navigate = useNavigate()

const handlesubmit = async(e) =>{
    e.preventDefault();
    try {

       const response = await axios.post("https://rental-manager-car.vercel.app/user/Login", {email,password})
       localStorage.setItem("token", response.data.token)
        navigate("/Location")

      } catch (error) {
        toast.error("email or password incorrect" , {position:"top-center"})
      }
}


const Gotoregister = (e) =>{
  e.preventDefault()
  navigate("/register")
}


  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Mon Agence</h1>
        <h2>Location Voitures</h2>
        <form onSubmit={handlesubmit}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Saisir votre email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Saisir votre mot de passe"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link onClick={Gotoregister}>I don't Have acount</Link>
          <button type="submit" className="login-button">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
