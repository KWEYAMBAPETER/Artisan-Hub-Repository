import { Routes, Route } from "react-router-dom";
import ArtistDashboard from "./artistDashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddArtwork from "./addArtwork";
import EditArtWork from "./editArtwork";


function ArtistRoutes () {

    return (
    <ProtectedRoute allowedRoles={["Artist"]}>
    <Routes>
        <Route path="*" element= {<ArtistDashboard />} />
        <Route path="/add-artwork" element= {<AddArtwork />} />
        <Route path="/edit-artwork/:id" element= {<EditArtWork />} />
    </Routes>
    </ProtectedRoute>
    )

}


export default ArtistRoutes;