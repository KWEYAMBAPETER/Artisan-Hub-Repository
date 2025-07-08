import { Routes, Route } from "react-router-dom";
import ArtistDashboard from "./artistDashboard";
import ProtectedRoute from "../../components/ProtectedRoute";
import AddArtwork from "./addArtwork";
import EditArtWork from "./editArtwork";
import ArtWorkDetail from "./artworkDetail";
import ArtistProfile from "./artistProfile";
import ArtistContactPage from "./contactPage";


function ArtistRoutes () {

    return (
    <ProtectedRoute allowedRoles={["Artist"]}>
    <Routes>
        <Route index element= {<ArtistDashboard />} />
        <Route path="/add-artwork" element= {<AddArtwork />} />
        <Route path="/edit-artwork/:id" element= {<EditArtWork />} />
        <Route path="/view-artwork/:id" element={<ArtWorkDetail />} />
        <Route path="/profile" element={<ArtistProfile />} />
        <Route path="/contact" element={<ArtistContactPage />} />

    </Routes>
    </ProtectedRoute>
    )

}


export default ArtistRoutes;