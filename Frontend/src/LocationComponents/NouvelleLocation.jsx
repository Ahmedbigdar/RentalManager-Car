import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const NouvelleLocation = () => {
  const [Voitures, setVoitures] = useState([]);
  const [substraction, setSubstraction] = useState(null);
  const [location , setLocation] = useState({
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
  })

  const  navigate = useNavigate()

  const [disponible , setDisponible] = useState(false)



  useEffect(() => {
    const getVoitures = async () => {
      try {
        const Voiture = await axios.get("https://rental-manager-car.vercel.app/Voiture");
        setVoitures(Voiture.data);
      } catch (error) {
        console.log(`we have an error in fetching ${error}`);
      }
    };
    getVoitures();
  }, []);

  useEffect(() => {
    if (location.dateDepart && location.dateFin) {
      const depart = new Date(location.dateDepart);
      const fin = new Date(location.dateFin);

      const subDates = fin - depart;
      const day = subDates / (1000 * 60 * 60 * 24);
      if(day > 0)
      return setSubstraction(day);
    setSubstraction(null)
    }
  }, [location.dateDepart, location.dateFin]);


  // Valider les information 

const [error , setError] = useState({});


const ValidationData = ()=>{
  const Validation = {}

if(location.dateDepart >= location.dateFin){
  Validation.dateDepart = `datedepart should be less than ${location.dateFin}`
  Validation.dateFin = `datefin should be greater than ${location.dateDepart}`
}
if(location.nom === ""){
  Validation.nom= "le Nom est obligatoire"
}
if(location.prenom === ""){
  Validation.prenom= "le Prenom est obligatoire"
}
if(!location.cin.match(/^[A-Z]{1,2}\d{1,8}$/)){
  Validation.cin = "respecter le format de cin"
}
if(location.numeroTelephone === ""){
  Validation.numeroTelephone = "Le champ de Numero de telephone est obligatoire"
}
if(location.adresse === ""){
  Validation.adresse = "l'adress est obligatoire"
}
return Validation;
}

  const handlechangestatus = async(e) => {
    e.preventDefault()
    const Validation = ValidationData();
    if (Object.keys(Validation).length > 0) {
      setError(Validation);
      return;
    }
        try {
          setError({});

          await axios.post("https://rental-manager-car.vercel.app/Location", location).then(res => toast.success(res.data.message, {position:"top-center"}))
        } catch (error) {
          console.log(`error in fetching  ${error}`)
        }
        navigate("/location")
  };



  const handelcheck = async()=>{
    try {
      const {data} = await axios.post('https://rental-manager-car.vercel.app/Location/check', {voiture : location.voiture, dateDepart : location.dateDepart, dateFin : location.dateFin})
      if(data.disponible){
        setDisponible(true)
      }
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div style={{ marginLeft: "16rem", marginTop: "-50rem" }}>
      <h1>Nouvelle Location</h1>

      <form onSubmit={handlechangestatus}>
        <div
          className="Dates-and-Voitures"
          style={{
            display: "flex",
            backgroundColor: "#efefe4",
            width: "50vw",
            padding: "1rem",
            borderRadius: "7px",
          }}
        >
          <div className ="mb-3">
            <label htmlFor="datedeDepart" className="form-label">
              Date de départ
            </label>
            <input
              type="date"
              className={`form-control  ${error.dateDepart ? "border-danger" : ""}`}
              id="datedeDepart"
              style={{ width: "300px", marginRight: "7px" }}
              value={location.dateDepart}
              onChange={(e) => setLocation({...location, dateDepart : e.target.value})}
            />
            {error.dateDepart && <span className="text-danger">{error.dateDepart}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="datedefin" className="form-label">
              Date de fin
            </label>
            <input
              type="date"
              className={`form-control  ${error.dateFin ? "border-danger" : ""}`}
              id="datedefin"
              style={{ width: "300px", marginRight: "7px" }}
              value={location.dateFin}
              onChange={(e) => setLocation({...location, dateFin : e.target.value})}
            />
            {error.dateFin && <span className="text-danger">{error.dateFin}</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="voiture" className="form-label">
              Voiture
            </label>
            <select
              className="form-select"
              style={{ width: "300px" }}
              value={location.voiture}
              onChange={(e) => setLocation({...location, voiture:e.target.value})}
              onClick={handelcheck}
            >
              <option>immatricule</option>
              {Voitures.map((voiture) => (
                <option key={voiture._id} value={voiture._id}>{voiture.immatricule}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="nom-prenom d-flex p-2">
          <div className="mb-3 mt-4" style={{ width: "20vw", marginRight: "1rem" }}>
            <label htmlFor="Nom" className="form-label">
              Nom
            </label>
            <input
              type="text"
              className={`form-control  ${error.nom ? "border-danger" : ""}`}
              id="nom"
              placeholder="Saisir ke nom"
              value={location.nom}
              onChange={(e) => setLocation({...location, nom:e.target.value})}
            />
            {error.nom && <span className="text-danger">{error.nom}</span>}
          </div>

          <div className="mb-3 mt-4" style={{ width: "20vw" }}>
            <label htmlFor="Prénom" className="form-label">
              Prénom
            </label>
            <input
              type="text"
              className={`form-control  ${error.prenom ? "border-danger" : ""}`}
              id="Prénom"
              placeholder="Saisir le prénom"
              value={location.prenom}
              onChange={(e) => setLocation({...location, prenom:e.target.value})}
            />
            {error.prenom && <span className="text-danger">{error.prenom}</span>}
          </div>
        </div>

        <div className="cin-telephpne d-flex p-2">
          <div className="mb-3 mt-4" style={{ width: "20vw", marginRight: "1rem" }}>
            <label htmlFor="CIN" className="form-label">
              CIN
            </label>
            <input
              type="text"
              className={`form-control  ${error.cin ? "border-danger" : ""}`}
              id="CIN"
              placeholder="Saisir le Cin "
              value={location.cin}
              onChange={(e) => setLocation({...location, cin:e.target.value})}
            />
            {error.cin && <span className="text-danger">{error.cin}</span>}
          </div>

          <div className="mb-3 mt-4" style={{ width: "20vw" }}>
            <label htmlFor="Téléphone" className="form-label">
              N° Téléphone
            </label>
            <input
              type="text"
              className={`form-control  ${error.numeroTelephone ? "border-danger" : ""}`}
              id="Téléphone"
              placeholder="Saisir le N° Téléphone "
              value={location.numeroTelephone}
              onChange={(e) => setLocation({...location, numeroTelephone:e.target.value})}
            />
             {error.numeroTelephone && <span className="text-danger">{error.numeroTelephone}</span>}
          </div>


        
        </div>

        <div className="form-floating" style={{ width: "20vw" }}>
            <input className="form-control" value={location.adresse} onChange={(e) => setLocation({...location, adresse: e.target.value})}/>
        </div>

        { disponible && (
          <button
          className="btn btn-primary"
          type="submit"
          style={{ background: "#7749F8", color: "white", marginTop:"30px" }}
        >
          Ajouter
        </button>
        )}
      </form>

      <div
        className="info"
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "start",
          marginTop: "-500px",
          position:"fixed",
          marginLeft:"60vw"
        }}
      >
        {Voitures.map((vr) => {
          if (vr._id === location.voiture) {
            return (
              <div key={vr._id} style={{ margin: "20px" }}>
                <div className="d-flex m-4">
                  <h1>{vr.nom}</h1>
                  { !disponible ? vr.nom && (
                    <button
                    type="button"
                    className="btn btn-warning text-light m-3"
                  >
                    En location
                  </button>
                  ) : (
                    <button
                    type="button"
                    className="btn btn-success m-3"
                  >
                    disponible
                  </button>
                  )}
                </div>

                <div
                  className="p-2"
                  style={{ border: "1px solid gray", borderRadius: "6px" }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    immatricule
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    {vr.immatricule}
                  </p>
                </div>
                <div
                  className="p-2"
                  style={{ border: "1px solid gray", borderRadius: "6px" }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Année immatriculation
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    {vr.anneedimmatricule}
                  </p>
                </div>
                <div
                  className="border-1 p-2"
                  style={{ border: "1px solid gray", borderRadius: "6px " }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Kilometrage
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    {vr.kilometrage} KM
                  </p>
                </div>
                <div
                  className="border-1 p-2"
                  style={{ border: "1px solid gray", borderRadius: "6px " }}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    Tarif Journalier
                  </p>
                  <p style={{ display: "flex", justifyContent: "center" }}>
                    {vr.prix} MAD/jour
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "50px", fontWeight: "bold" }}>
                    {location.prixTotal = Number(substraction * vr.prix).toFixed(2)} <span style={{fontSize:"20px"}}>MAD</span>
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default NouvelleLocation;
