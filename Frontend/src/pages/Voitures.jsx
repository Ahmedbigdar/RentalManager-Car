import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Voitures = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await axios.get("https://rental-manager-car.vercel.app/Voiture");
        setCars(res.data);

      } catch (error) {
        console.log("Error in fetching data", error);
      }
    };

    fetchCars();
  }, []);

  // Delete Voiture
  const handleDelete = async (id) => {
    const updatedCars = cars.filter((car) => car._id !== id);
    try {
      const res = await axios.delete(`https://rental-manager-car.vercel.app/Voiture/${id}`);
      toast.success(res.data.message, { position: "top-center" });
      setCars(updatedCars);
    } catch (error) {
      console.log("Error deleting car:", error);
    }
  };

  return (
    <div style={{ marginLeft: "16rem", marginTop: "-52rem" }}>
      <div
        className="headerOfTable d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <h1 style={{ marginLeft: "-23px" }}>List Voitures</h1>
        <button
          style={{
            background: "#7749F8",
            color: "white",
            padding: ".5rem",
            border: "none",
            marginRight: "26px",
            width: "10rem",
            height: "3rem",
          }}
        >
          <Link
            to="/NouvelleVoitures"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Nouvelle Voiture
          </Link>
        </button>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Nom Voiture
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Immatricule
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Année imm
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Kilométrage
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Prix/jour
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Etat aujourd'hui
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <th scope="row">{car.nom}</th>
              <td>{car.immatricule}</td>
              <td>{car.anneedimmatricule}</td>
              <td className="d-flex justify-content-evenly">
                <span>{car.kilometrage}</span>
                <span>KM</span>
              </td>
              <td>
                <span className="p-4">{Number(car.prix).toFixed(2)}</span>
                <span>MAD/jour</span>
              </td>
              <td>

      {car.location.some((locat) => locat.etat === "en Cours") ? (
             <button
             className="btn btn-warning text-light"
             style={{
               fontWeight: "bold",
               border: "none",
               borderRadius: "15px",
             }}
           >
             en Location
           </button>
      ) : (
        <button
        className="btn btn-success"
        style={{
          fontWeight: "bold",
          border: "none",
          borderRadius: "15px",
        }}
      >
        Disponible
      </button>
 )}
              </td>
              <td style={{ display: "flex", justifyContent: "space-between" }}>
                <button
                  type="button"
                  className="text-info border border-0 bg-white"
                >
                  <Link to={`/info/` + car._id}>
                    <i
                      className="fa-solid fa-eye"
                      style={{ fontSize: "25px" }}
                    ></i>
                  </Link>
                </button>
                <button
                  type="button"
                  className="text-warning border border-0 bg-white"
                >
                  <Link to={`/Editpage/` + car._id} style={{ color: "orange" }}>
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ fontSize: "25px" }}
                    ></i>
                  </Link>
                </button>
                <button
                  type="button"
                  className="text-danger border border-0 bg-white"
                  onClick={() => handleDelete(car._id)}
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ fontSize: "25px" }}
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Voitures;
