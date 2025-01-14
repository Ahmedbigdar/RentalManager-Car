import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const Location = () => {

const [locations , setLocations] = useState([])

  // get data from DB 
  useEffect(() =>{
    const fetchlocationdata = async () => {
      try {
        const res = await axios.get('http://localhost:3000/Location')
      setLocations(res.data)
      } catch (error) {
        console.log(`Error in fetching ${error}`)
      }
    };
    fetchlocationdata();
  }, [])


  //  Delete Location 
  const handleDelete = async (id) => {
    const Location = locations.filter((location) => location._id !== id);
    await axios
      .delete(`http://localhost:3000/Location/${id}`, Location)
      .then((res) =>
        toast.success(res.data.message, { position: "top-center" })
      );
    setLocations(Location);
  };
  return (
    <div style={{ marginLeft: "16rem", marginTop: "-52rem" }}>

      <div
        className="headerOfTable d-flex"
        style={{ justifyContent: "space-between" }}
      >
        <h1 style={{ marginLeft: "-23px" }}>List Locations</h1>
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
            to="/NouvelleLocation"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Nouvelle Location
          </Link>
        </button>
      </div>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Date Début
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Date Fin
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Client
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Voiture
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Prix
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Etat
            </th>
            <th scope="col" style={{ background: "#7749F8", color: "white" }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => {
            return (
            <>
              <tr key={location._id}>
                <th scope="row">{location.dateDepart}</th>
                <td>{location.dateFin}</td>
                <td>{location.nom} - {location.prenom}</td>
                <td>
                  <div style={{fontWeight:"bold"}}>{location.voiture.nom}</div>
                  <div className='text-secondary'>{location.voiture.immatricule}</div>
                </td>
                <td className=''>
                  {<span className="">{location.prixTotal}</span>}
                  <span>MAD/jour</span>
                </td>
                <td>
                  {location.etat === "Nouvelle" && (
                    <button className='btn btn-primary p-2' style={{fontWeight:"bold", border:"none", borderRadius:"15px"}}>{location.etat}</button>
                  )}

{location.etat === "en Cours" && (
                    <button className='btn btn-warning p-2' style={{fontWeight:"bold", border:"none", borderRadius:"15px"}}>{location.etat}</button>
                  )}

{location.etat === "Termine" && (
                    <button className='btn btn-success p-2' style={{fontWeight:"bold", border:"none", borderRadius:"15px"}}>{location.etat}</button>
                  )}
                </td>
                <td
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {" "}
                  <button
                    type="button"
                    className="text-info border border-0 bg-white"
                  >
                    {" "}
                    <Link to={`/DetailLocation/` + location._id}>
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
                    <Link
                      to={`/locationedit/` + location._id}
                      style={{ color: "orange" }}
                    >
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ fontSize: "25px" }}
                      ></i>
                    </Link>
                  </button>
                  <button
                    type="button"
                    className="text-danger border border-0 bg-white "
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(location._id)
                    }}
                  >
                    {" "}
                    <i
                      className="fa-solid fa-trash"
                      style={{ fontSize: "25px" }}
                    ></i>
                  </button>
                </td>
              </tr>
            </>
            );
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Location
