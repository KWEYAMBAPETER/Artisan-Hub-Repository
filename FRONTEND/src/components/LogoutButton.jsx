import { Button } from "@mantine/core";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { IconLogout } from "@tabler/icons-react";

function LogoutButton () {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login')
    }


    return (
        <Button leftIcon={<IconLogout size={16} />} variant="light" color="red" onClick={handleLogout} fullWidth>
            Logout
        </Button>
    )
}

export default LogoutButton;