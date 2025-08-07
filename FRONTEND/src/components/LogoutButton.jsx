import { Button } from "@mantine/core";
import { useAuth } from "../auth/useAuth.js";
import { useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";

function LogoutButton () {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/')
    }


    return (
        <Button variant="filled" color="red" onClick={handleLogout} fullWidth>
            <IconLogout size={16} style={{ marginRight: "10px" }}/>
            Logout
        </Button>
    )
}

export default LogoutButton;