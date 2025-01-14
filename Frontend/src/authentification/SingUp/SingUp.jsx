import React, { useState } from "react";
import "./SingUp.css"; 
// import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {


 

const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const navigate = useNavigate()

const handlesubmit = async(e) =>{
    e.preventDefault();
    try {

        await axios.post("https://rental-manager-car.vercel.app/user/register", {name,email,password})
        navigate("/login")

      } catch (error) {
        console.log(`error in fetching  ${error}`)
      }

}
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h1>Mon Agence</h1>
        <h2>Location Voitures</h2>
        <form onSubmit={handlesubmit}>


        <label>userName</label>
          <input
            type="text"
            placeholder="Saisir votre Nome"
            className="signup-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Saisir votre email"
            className="signup-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Mot de passe</label>
          <input
            type="password"
            placeholder="Saisir votre mot de passe"
            className="signup-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-button">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
