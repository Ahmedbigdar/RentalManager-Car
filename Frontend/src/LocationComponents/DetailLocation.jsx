import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const DetailLocation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [location, setLocation] = useState({
    dateDepart: "",
    dateFin: "",
    nom: "",
    prenom: "",
    cin: "",
    numeroTelephone: "",
    adresse: "",
    voiture: "",
    prixTotal: "",
    etat: "",
  });
  useEffect(() => {
    const getlocation = async () => {
      try {
        const location = await axios.get(
          `https://rental-manager-car.vercel.app/Location/${id}`
        );
        setLocation(location.data);
      } catch (error) {
        console.log(`we have an error in fetching ${error}`);
      }
    };
    getlocation();
  }, [id]);

  // start location
  const handleStartLocation = async (id) => {
    await axios
      .put(`https://rental-manager-car.vercel.app/Location/demarrer/${id}`, location)
      .then((res) =>
        toast.success("Lcation started", { position: "top-center" })
      );
    navigate("/Location");
  };

  // end Location
  const handleEndLocation = async (id) => {
    await axios
      .put(`http://localhost:3000/Location/termine/${id}`, location)
      .then((res) =>
        toast.success("Lcation Ended", { position: "top-center" })
      );
    navigate("/Location");
  };

  //   delete location

  const handleDelete = async () => {
    await axios
      .delete(`https://rental-manager-car.vercel.app/Location/${id}`, location)
      .then((res) =>
        toast.success(res.data.message, { position: "top-center" })
      );

    setLocation(location);
    navigate("/Location");
  };
  return (
    <div style={{ marginLeft: "16rem", marginTop: "-52rem" }}>
      <div className="d-flex">
        <h1>Detail Location :</h1>{" "}
        <div style={{ fontSize: "37px", fontWeight: "400" }}>
          {location.nom} {location.prenom}
        </div>
      </div>

      <div style={{ background: "#dee2e6", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "end" }}>
          {location.etat === "Nouvelle" && (
            <button
              className="btn btn-info me-2"
              onClick={(e) => {
                e.preventDefault();
                handleStartLocation(location._id);
              }}
            >
              Démarrer la location
            </button>
          )}

          {location.etat === "en Cours" && (
            <button
              className="btn btn-success me-2"
              onClick={(e) => {
                e.preventDefault();
                handleEndLocation(location._id);
              }}
            >
              Terminer la location
            </button>
          )}

          <button
            className="btn btn-warning me-2"
            onClick={() => navigate(`/locationedit/${id}`)}
          >
            Editer
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      </div>

      <div className="d-flex">
        {/* Voiture informations */}
        <div className="mt-3 p-2">
          <div
            className="d-block border p-2"
            style={{ width: "20rem", borderRadius: "8px" }}
          >
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              Voiture :{" "}
            </div>
            <div>{location.voiture.nom}</div>
          </div>

          <div
            className="d-block border p-2"
            style={{ width: "20rem", borderRadius: "8px" }}
          >
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              Immatricule:{" "}
            </div>
            <div>{location.voiture.immatricule}</div>
          </div>

          <div
            className="d-block border p-2"
            style={{ width: "20rem", borderRadius: "8px" }}
          >
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              année Immatricule:{" "}
            </div>
            <div>{location.voiture.anneedimmatricule}</div>
          </div>

          <div
            className="d-block border p-2"
            style={{ width: "20rem", borderRadius: "8px" }}
          >
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              kilométrage{" "}
            </div>
            <div>{location.voiture.kilometrage} KM</div>
          </div>

          <div className="d-block border p-2" style={{ width: "20rem" }}>
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              Tarif Journaliser:{" "}
            </div>
            <div>{location.voiture.prix} MAD/JOUR</div>
          </div>
        </div>

        {/* information client */}

        <div className="mt-3 p-2">
          <div
            className="d-block border p-2"
            style={{ width: "20rem", borderRadius: "8px" }}
          >
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              Nom & Prénom :{" "}
            </div>
            <div>
              {location.nom} {location.prenom}
            </div>
          </div>

          <div
            className="d-block border p-2"
            style={{ width: "20rem", borderRadius: "8px" }}
          >
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              CIN:{" "}
            </div>
            <div>{location.cin}</div>
          </div>

          <div
            className="d-block border p-2"
            style={{ width: "20rem", borderRadius: "8px" }}
          >
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              N° Téléphone{" "}
            </div>
            <div>{location.numeroTelephone} </div>
          </div>

          <div className="d-block border p-2" style={{ width: "20rem" }}>
            <div style={{ fontWeight: "500", paddingBottom: "10px" }}>
              {" "}
              Adress Postale:{" "}
            </div>
            <div>{location.adresse} </div>
          </div>
        </div>

        {/* etat */}
        <div className="mt-3 p-2">
          <div>
            {location.etat === "Nouvelle" && (
              <button
                className="btn btn-primary"
                style={{ border: "none", borderRadius: "15px" }}
              >
                {location.etat}
              </button>
            )}

            {location.etat === "en Cours" && (
              <button
                className="btn btn-warning"
                style={{ border: "none", borderRadius: "15px" }}
              >
                {location.etat}
              </button>
            )}

            {location.etat === "Termine" && (
              <button
                className="btn btn-success"
                style={{ border: "none", borderRadius: "15px" }}
              >
                {location.etat}
              </button>
            )}
          </div>
          <div>
            <label htmlFor="">date Depart </label>
            <input
              type="date"
              value={location.dateDepart}
              readOnly
              className="form-control"
            />
          </div>
          <div>
            <label htmlFor="">date Fin </label>
            <input
              type="date"
              value={location.dateFin}
              readOnly
              className="form-control"
            />
          </div>
          <span style={{ fontSize: "4rem" }}>
            {Number(location.prixTotal).toFixed(2)}{" "}
          </span>{" "}
          <span>MAD</span>
        </div>
      </div>
    </div>
  );
};

export default DetailLocation;
