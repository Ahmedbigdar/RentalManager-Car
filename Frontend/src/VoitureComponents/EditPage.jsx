import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import "../index.css";
import { toast } from "react-hot-toast";

const EditPage = () => {
  const [Car, setCar] = useState({
    nom: "",
    immatricule: "",
    anneedimmatricule: "",
    kilometrage: "",
    prix: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  // Validation function
  const validateFields = () => {
    const errors = {};
    if (!Car.immatricule.match(/^\d{4}-[A-Z]-\d{2}$/)) {
      errors.immatricule = "Respectez le format suivant: 1234-A-65";
    }
    if (Car.nom.trim() === "") {
      errors.nom = "Le champ Nom est obligatoire";
    }
    if (Car.kilometrage < 0 || Car.kilometrage === "") {
      errors.kilometrage = "Entrez un kilométrage valide";
    }
    if (Car.prix <= 0 || isNaN(Car.prix)) {
      errors.prix = "Entrez un prix valide";
    }
    if(Car.anneedimmatricule > new Date().getFullYear() || Car.anneedimmatricule < 1  || Car.anneedimmatricule === ""){
      errors.anneedimmatricule = "Entrez un Valide année"
    }
    return errors;
  };






  useEffect(()=> {
    axios.get(`http://localhost:3000/Voiture/${id}`).then((res)=>{
        setCar(res.data)
    }).catch((error) => console.log(error))
}, [id])





  const handleSubmitData = async (e) => {
    e.preventDefault();

    // Validate fields
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      // Reset validation errors
      setValidationErrors({});
      // Edit  Car
      await axios.put(`http://localhost:3000/Voiture/${id}`, Car).then(res => toast.success("Car Updated Seccessefully", { position: "top-center" }));
      setCar({
        nom: "",
        immatricule: "",
        anneedimmatricule: "",
        kilometrage: "",
        prix: "",
      });

      navigate("/");
    }
    catch (error) {
      console.error(error);
      toast.error("You have Some errors Please check again");
    }
  };

  return (
    <div style={{ marginLeft: "16rem", marginTop: "-50rem" }}>
      <h1>Edit Voiture</h1>
      <form onSubmit={handleSubmitData}>
        <div className="mb-3">
          <label htmlFor="Nom" className="form-label">
            Nom
          </label>
          <input
            type="text"
            className={`form-control ${
              validationErrors.nom ? "border-danger" : ""
            }`}
            id="Nom"
            placeholder="Saisir le nom de la voiture"
            style={{ width: "500px" }}
            value={Car.nom}
            onChange={(e) => setCar({ ...Car, nom: e.target.value })}
          />
          {validationErrors.nom && (
            <div className="text-danger">{validationErrors.nom}</div>
          )}
        </div>

        <div className="immatricule d-flex">
          <div className="mb-3">
            <label htmlFor="Immatricule" className="form-label">
              Immatricule
            </label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.immatricule ? "border-danger" : ""
              }`}
              id="Immatricule"
              placeholder="1234-A-65"
              style={{ width: "500px" }}
              value={Car.immatricule}
              onChange={(e) => setCar({ ...Car, immatricule: e.target.value })}
            />
            {validationErrors.immatricule && (
              <div className="text-danger">{validationErrors.immatricule}</div>
            )}
            <sub className="text-secondary">
              Respectez le format suivant: 1234-X-12
            </sub>
          </div>

          <div className="mb-3" style={{ marginLeft: "10px" }}>
            <label htmlFor="Annéedimmatricule" className="form-label">
              Année d'immatricule
            </label>
            <input
              type="text"
              className={`form-control ${
                validationErrors.anneedimmatricule ? "border-danger" : ""
              }`}
              id="Annéedimmatricule"
              placeholder="Saisir l'année de l'immatricule"
              style={{ width: "500px" }}
              value={Car.anneedimmatricule}
              onChange={(e) =>
                setCar({ ...Car, anneedimmatricule: e.target.value })
              }
            />
            {validationErrors.anneedimmatricule && <div className="text-danger"> {validationErrors.anneedimmatricule}</div>}
          </div>
        </div>

        <div className="d-flex">
          <div className="mb-3">
            <label htmlFor="Kilométrage" className="form-label">
              Kilométrage
            </label>
            <input
              type="number"
              className={`form-control ${
                validationErrors.kilometrage ? "border-danger" : ""
              }`}
              id="Kilométrage"
              placeholder="Saisir la distance en KM"
              style={{ width: "500px" }}
              value={Car.kilometrage}
              onChange={(e) =>
                setCar({ ...Car, kilometrage: e.target.value })
              }
            />
            {validationErrors.kilometrage && (
              <div className="text-danger">{validationErrors.kilometrage}</div>
            )}
            <sub className="text-secondary">
              Le kilométrage de tableau de bord de la voiture
            </sub>
          </div>

          <div className="mb-3" style={{ marginLeft: "10px" }}>
            <label htmlFor="Coùtdelocation" className="form-label">
              Coût de location / Jour
            </label>
            <input
              type="number"
              className={`form-control ${
                validationErrors.prix ? "border-danger" : ""
              }`}
              id="Coùtdelocation"
              placeholder="Saisir le prix en MAD"
              style={{ width: "500px" }}
              value={Car.prix}
              onChange={(e) => setCar({ ...Car, prix: e.target.value })}
            />
            {validationErrors.prix && (
              <div className="text-danger">{validationErrors.prix}</div>
            )}
          </div>
        </div>

        <div className="col-12">
          <button
            className="btn btn-primary"
            type="submit"
            style={{ background: "#7749F8", color: "white" }}
          >
            Ajouter
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
