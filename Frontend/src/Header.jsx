import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
const Navigate = useNavigate()
  const handellogout = () =>{
    localStorage.removeItem("token")
    Navigate("/login")
  }
  return (
    <div className="d-flex justify-content-between"    style={{
      backgroundColor: " rgb(248, 249, 250)",
      padding: "20px",
      height: "80px",
    }}>
      <h4
     
      >
        RentalManger
      </h4>


    <div className="d-flex">
      <h3 style={{marginRight:"19px"}}>Bonjour Admin</h3>
   

      <button className='btn btn-primary ' style={{fontWeight:"bold", border:"none", borderRadius:"15px"}}  onClick={handellogout}> Déconnexion</button>
    </div>

    </div>
  );
};

export default Header;