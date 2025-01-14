import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
// For Voiture
import Voitures from "./pages/Voitures";
import NouvelleVoitures from "./VoitureComponents/NouvelleVoitures";
import EditPage from "./VoitureComponents/EditPage";
import InfoPage from "./VoitureComponents/InfoPage";
// For location
import Location from "./pages/Location";
import NouvelleLocation from "./LocationComponents/NouvelleLocation";
import LocationEdit from "./LocationComponents/LocationEdit";
import DetailLocation from "./LocationComponents/DetailLocation";
// For authentification 
import Singup from "./authentification/SingUp/SingUp";
import Login from "./authentification/Login/Login";

import PrivateRoutes from "./PrivateRoutes";





function App() {
  
  return (
    <>
     
      <BrowserRouter>
        <Routes>

        <Route  path="register" element= {<Singup/>}/>
        <Route  path="login" element= {<Login/>}/>

        
        

           <Route element={<PrivateRoutes/>}>

           <Route path="/" element={<Layout />} />
            <Route index element={<Voitures />} />
            <Route path="location" element={<Location />}  exact/>
            <Route path="NouvelleVoitures" element={<NouvelleVoitures />} />
            <Route path="Voitures" element={<Voitures />} />
            <Route path="Editpage/:id" element={<EditPage />} />
            <Route path="locationedit/:id" element={<LocationEdit />} />
            <Route path="info/:id" element={<InfoPage />} />
            <Route  path="NouvelleLocation" element= {<NouvelleLocation/>}/>
            <Route  path="DetailLocation/:id" element= {<DetailLocation/>}/>
    
           </Route>



        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App; 
