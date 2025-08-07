import { Routes, Route } from "react-router-dom";
import ArtistDashboard from "./ArtistDashboard.jsx";
import ProtectedRoute from "../../components/ProtectedRoute.jsx";
import AddArtwork from "./AddArtwork.jsx";
import EditArtWork from "./editArtwork.jsx";
import ArtWorkDetail from "./artworkDetail.jsx";
import ArtistProfile from "./artistProfile.jsx";
import ArtistContactPage from "./contactPage.jsx";


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