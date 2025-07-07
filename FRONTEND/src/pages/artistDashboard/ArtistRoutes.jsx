import { Routes, Route } from "react-router-dom";
import ArtistDashboard from "./artistDashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddArtwork from "./addArtwork";
import EditArtWork from "./editArtwork";
import ArtWorkDetail from "./artworkDetail";


function ArtistRoutes () {

    return (
    <ProtectedRoute allowedRoles={["Artist"]}>
    <Routes>
        <Route index element= {<ArtistDashboard />} />
        <Route path="/add-artwork" element= {<AddArtwork />} />
        <Route path="/edit-artwork/:id" element= {<EditArtWork />} />
        <Route path="/view-artwork/:id" element={<ArtWorkDetail />} />
    </Routes>
    </ProtectedRoute>
    )

}


export default ArtistRoutes;