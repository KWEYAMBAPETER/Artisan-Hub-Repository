import { Button } from "@mantine/core";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

function LogoutButton () {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login')
    }


    return (
        <Button variant="light" color="red" onClick={handleLogout}>
            Logout
        </Button>
    )
}

export default LogoutButton;