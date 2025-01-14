import React from 'react'
import { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const LocationEdit = () => {
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
    status:"",
  })
  const [voitures , setVoitures] = useState({});
  const [Substraction,setSubstraction] = useState("");
  console.log(voitures)


  useEffect(()=>{
  const getVoiture = async ()=>{
    const Voiture = await axios.get("https://rental-manager-car.vercel.app/Voiture")
    setVoitures(Voiture.data)
  };
  getVoiture()
  },[])

  const  navigate = useNavigate()
  const {id} = useParams()



  useEffect(() => {
    const getlocation = async () => {
      try {
        const location = await axios.get(`https://rental-manager-car.vercel.app/Location/${id}`);
        setLocation(location.data);
      } catch (error) {
        console.log(`we have an error in fetching ${error}`);
      }
    };
    getlocation();
  }, [id]);



  // Valider les information 

const [error , setError] = useState({});

const ValidationData = () => {
  const Validation = {};

  const depart = new Date(location.dateDepart);
  const fin = new Date(location.dateFin);

  if (isNaN(depart.getTime()) || isNaN(fin.getTime())) {
    Validation.dateDepart = "La date de départ est invalide";
    Validation.dateFin = "La date de fin est invalide";
  } else if (fin < depart) {
    Validation.dateDepart = "La date de départ doit être avant la date de fin";
    Validation.dateFin = "La date de fin doit être après la date de départ";
  }

  if (location.nom.trim() === "") {
    Validation.nom = "Le nom est obligatoire";
  }
  if (location.prenom.trim() === "") {
    Validation.prenom = "Le prénom est obligatoire";
  }
  if (!/^[A-Z]{1,2}\d{1,8}$/.test(location.cin)) {
    Validation.cin = "Respectez le format de CIN";
  }
  if (!/^\d{10}$/.test(location.numeroTelephone)) {
    Validation.numeroTelephone = "Le numéro de téléphone doit contenir 10 chiffres";
  }
  if (location.adresse.trim() === "") {
    Validation.adresse = "L'adresse est obligatoire";
  }

  return Validation;
};


  const handlechangestatus = async(e) => {
    e.preventDefault()
    const Validation = ValidationData();
    if (Object.keys(Validation).length > 0) {
      setError(Validation);
      return;
    }
        try {
          setError({});

          await axios.put(`https://rental-manager-car.vercel.app/Location/${id}`, location).then(res => toast.success("Location bien Modifier", {position:"top-center"}))
        } catch (error) {
          console.log(`error in fetching  ${error}`)
        }
        navigate("/location")
  };


  useEffect(() => {
    if (location.dateDepart && location.dateFin) {
      const depart = new Date(location.dateDepart);
      const fin = new Date(location.dateFin);

      const subDates = fin - depart;
      const day = subDates / (1000 * 60 * 60 * 24);
      if(day > 0)
     return  setSubstraction(day);
    setSubstraction(null)
    }
  }, [location.dateDepart, location.dateFin]);
  





  return (
    <div style={{ marginLeft: "16rem", marginTop: "-52rem" }}>
      <h1>Editer Location</h1>

      <form onSubmit={handlechangestatus}>
        <div
          className="Dates-and-Voitures"
          style={{
            display: "flex",
            backgroundColor: "rgb(153, 153, 255)",
            width: "50vw",
            padding: "1rem",
            borderRadius: "7px",
          }}
        >
          <div className="mb-3">
            <label htmlFor="datedeDepart" className="form-label">
              Date de départ
            </label>
            <input
              type="date"
              class={`form-control  ${error.dateDepart ? "border-danger" : ""}`}
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
              class={`form-control  ${error.dateFin ? "border-danger" : ""}`}
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
              disabled="true"
            >
                <option key={location.voiture._id}>{location.voiture.immatricule}</option>
            </select>
        </div>
        </div>

       

        <div className="nom-prenom d-flex p-2">
          <span style={{fontWeight:"bold"}}>infos du client</span> 
          <div class="mb-3 mt-4" style={{ width: "20vw", marginRight: "1rem", marginLeft:"-7rem"}}>
            <label for="Nom" class="form-label">
              Nom
            </label>
            <input
              type="text"
              class={`form-control  ${error.nom ? "border-danger" : ""}`}
              id="nom"
              placeholder="Saisir ke nom"
              value={location.nom}
              onChange={(e) => setLocation({...location, nom:e.target.value})}
            />
            {error.nom && <span className="text-danger">{error.nom}</span>}
          </div>

          <div class="mb-3 mt-4" style={{ width: "20vw" }}>
            <label for="Prénom" class="form-label">
              Prénom
            </label>
            <input
              type="text"
              class={`form-control  ${error.prenom ? "border-danger" : ""}`}
              id="Prénom"
              placeholder="Saisir le prénom"
              value={location.prenom}
              onChange={(e) => setLocation({...location, prenom:e.target.value})}
            />
            {error.prenom && <span className="text-danger">{error.prenom}</span>}
          </div>
        </div>

        <div className="cin-telephpne d-flex p-2">
          <div class="mb-3 mt-4" style={{ width: "20vw", marginRight: "1rem" }}>
            <label for="CIN" class="form-label">
              CIN
            </label>
            <input
              type="text"
              class={`form-control  ${error.cin ? "border-danger" : ""}`}
              id="CIN"
              placeholder="Saisir le Cin "
              value={location.cin}
              onChange={(e) => setLocation({...location, cin:e.target.value})}
            />
            {error.cin && <span className="text-danger">{error.cin}</span>}
          </div>

          <div class="mb-3 mt-4" style={{ width: "20vw" }}>
            <label for="Téléphone" class="form-label">
              N° Téléphone
            </label>
            <input
              type="text"
              class={`form-control  ${error.numeroTelephone ? "border-danger" : ""}`}
              id="Téléphone"
              placeholder="Saisir le N° Téléphone "
              value={location.numeroTelephone}
              onChange={(e) => setLocation({...location, numeroTelephone:e.target.value})}
            />
             {error.numeroTelephone && <span className="text-danger">{error.numeroTelephone}</span>}
          </div>


        
        </div>
        <div class="form mb-3 mt-4" style={{ width: "20vw" }}>
          <label>Adresse Postale</label>
         <input class={`form-control  ${error.adresse ? "border-danger" : ""}`}  style={{height:"60px"}} value={location.adresse} onChange={(e) => setLocation({...location, adresse: e.target.value})}/>
         {error.adresse && <span className='text-danger'>{error.adresse}</span>}
</div>

          <button
            className="btn btn-primary"
            type="submit"
            style={{ background: "#7749F8", color: "white", marginTop:"30px" }}
          >
            Mettre a Jour
          </button>
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
        
              <div  style={{ margin: "20px" }}>
                <div className="d-flex m-4">
                  <h1>{location.voiture.nom}</h1>
                  
                    {location.etat === "Nouvelle" || location.etat === "Termine" ? (
                      <button type="button" class="btn btn-success m-3" style={{border:"none",borderRadius:'15px'}}>{location.status = "Disponible"}</button> 
                    ) : <button type="button" class="btn btn-warning m-3" style={{border:"none",borderRadius:'15px'}}>{location.status = "En Location"}</button> }
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
                    {location.voiture.immatricule}
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
                    {location.voiture.anneedimmatricule}
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
                    {location.voiture.kilometrage} KM
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
                    {location.voiture.prix} MAD/jour
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: "50px", fontWeight: "bold" }}>
                    {location.prixTotal = Number(Substraction * location.voiture.prix).toFixed(2)}  <span style={{fontSize:"20px"}}>MAD</span>
                  </p>
                </div>
              </div>
            
    
      </div>
    </div>
  );
}

export default LocationEdit
