import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../index.css";
import { useNavigate } from "react-router-dom";

const InfoPage = () => {
  const [Car, setCar] = useState({
    nom: "",
    immatricule: "",
    anneedimmatricule: "",
    kilometrage: "",
    prix: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`https://rental-manager-car.vercel.app/Voiture/${id}`)
      .then((res) => {
        setCar(res.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  console.log(Car._id)



  //  Delete Voiture

  const handleDelete = async () => {
    await axios
      .delete(`https://rental-manager-car.vercel.app/Voiture/${id}`)
      .then((res) =>
        toast.success(res.data.message, { position: "top-center" })
      );
      navigate("/")
  };


const [locations, setLocations] = useState([{
  dateDepart : "",
  dateFin : "",
  nom:"",
  prenom:"",
  cin:"",
  numeroTelephone:"",
  adresse:"",
  voiture:"",
  prixTotal:"",
  etat:"",
}])

console.log(locations)

const CArLocations = locations.filter((location) => location.voiture && location.voiture._id === id)

  useEffect(() =>{
    const fetchlocationdata = async () => {
      try {
        const res = await axios.get('https://rental-manager-car.vercel.app/Location')
      setLocations(res.data)
      } catch (error) {
        console.log(`Error in fetching ${error}`)
      }
    };
    fetchlocationdata();
  }, [])

  return (
    <div style={{
        marginLeft: "16rem",
        marginTop: "-50rem",
       
      }}>
      <div
       style={{ display: "flex",
        justifyContent: "space-between",}}
      >
        <h1>Détails Voiture : {Car.nom}</h1>

        <div style={{marginRight:"3rem"}}>
          <button
            type="button"
            className="btn btn-warning"
            style={{ marginRight: "1rem" }}
          >
            <Link to={`/Editpage/` + Car._id} style={{textDecoration:"none", color:"white"}}>Editer</Link>
          </button>
          <button type="button" className="btn btn-danger" onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      </div>



      <div className="Details Car" style={{background:"#b2b2b2", padding:"2rem", display:"flex", justifyContent:"space-around", marginRight:"3rem"}}>
        <div className="immatricule px-5 bg-light text-center" style={{width:"18%", borderRadius:"7px", height:"5rem", paddingTop:"7px"}} >
            <span  style={{fontWeight:"bold"}}>immatricule</span>
            <p style={{fontWeight:"400", fontSize:"1.2rem", color:"#ABB5BE"}}>{Car.immatricule}</p>
        </div>

        <div className="immatricule px-5 bg-light text-center" style={{width:"18%", borderRadius:"7px", height:"5rem", paddingTop:"7px"}} >
            <span style={{fontWeight:"bold"}}>Année immatriculation</span>
            <p style={{fontWeight:"400", fontSize:"1.2rem", color:"#ABB5BE"}}>{Car.anneedimmatricule}</p>
        </div>

        <div className="immatricule px-5 bg-light text-center" style={{width:"18%", borderRadius:"7px", height:"5rem", paddingTop:"7px"}} >
            <span style={{fontWeight:"bold"}}>kilometrage</span>
            <p style={{fontWeight:"400", fontSize:"1.2rem", color:"#ABB5BE"}}>{Car.kilometrage} KM</p>
        </div>

        <div className="immatricule px-5 bg-light text-center" style={{width:"18%", borderRadius:"7px", height:"5rem", paddingTop:"7px"}} >
            <span style={{fontWeight:"bold"}}>Coùt de location /Jour</span>
            <p style={{fontWeight:"400", fontSize:"1.2rem", color:"#ABB5BE"}}>{Car.prix} DH </p>
        </div>
      </div>

      <h1 className="mt-2">Historique</h1>

      <table className="table table-bordered ">
        <thead>
          <tr>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Date début
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Date Fin
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Client
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Prix
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Etat
            </th>
          </tr>
        </thead>
        <tbody>
     
       {CArLocations.map((location) => (
          <tr>
          <td>{location.dateDepart}</td>
          <td>{location.dateFin}</td>
          <td>{location.nom + " " +location.prenom}</td>
          <td>{location.prixTotal} MAD</td>
          <td>
          {location.etat === "Nouvelle" && (
                <button className="btn btn-primary" style={{border:"none",borderRadius:'15px'}}>{location.etat}</button>
            )}

{location.etat === "en Cours" && (
                <button className="btn btn-warning" style={{border:"none",borderRadius:'15px'}}>{location.etat}</button>
            )}

{location.etat === "Termine" && (
                <button className="btn btn-success" style={{border:"none",borderRadius:'15px'}}>{location.etat}</button>
            )}
          </td>
          </tr>
        ))}
      
        

        </tbody>
        </table>
    </div>
  );
};

export default InfoPage;
