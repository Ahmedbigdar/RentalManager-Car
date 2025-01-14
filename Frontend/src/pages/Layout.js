import { Outlet, NavLink } from "react-router-dom";
import "../index.css";
import Header from "../Header";

const Layout = () => {
  return (
    <div className="Layout">
      <Header/>
      <nav>
        <ul>
          <li style={{ listStyle: "none" }}>
            <NavLink to="/location">Locations</NavLink>
          </li>

          <li style={{ listStyle: "none", marginTop: "3rem" }}>
            <NavLink to="/">Voitures</NavLink>
          </li>
        </ul>
      </nav> 

      
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;


