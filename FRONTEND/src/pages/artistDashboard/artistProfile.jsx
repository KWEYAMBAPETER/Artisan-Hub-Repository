import { useState, useEffect } from "react"
import {
    Container,
    Title,
    TextInput,
    Textarea,
    Button,
    Group,
    Stack,
    Image,
    FileInput,
    Loader,
} from "@mantine/core";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { API_URL, BEARER, BACKEND_URL } from "../../constants";
import ArtistLayout from "../../layouts/ArtistLayout";
import SlidingNotification from "../../components/SlidingNotification";


function ArtistProfile () {

    const { user, authToken } = useAuth();
    const [ profile, setProfile ] = useState({
        username: "",
        email: "",
        profile_photo: [],
        bio: "",
        firstName: "",
        lastName: "",
    });
    const [isLoading, setIsLoading ] = useState(true);
    const [status, setStatus] = useState({ type: "", message: ""})
    const [updating, setUpdating] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user.id) return;

        const fetchProfile = async () => {
            // console.log(`User ID: ${user.id}`)
            setStatus({ type: "", message: "" })
            try {
                const res = await axios.get(`${API_URL}/users/me?populate=profile_photo`, {
                    headers: { Authorization: `${BEARER} ${authToken}`}
                });
                // console.log(res);
                const data = res.data;
                setProfile({
                    username: data.username || "",
                    email: data.email || "",
                    profile_photo: data.profile_photo || [],
                    bio: data.bio || "",
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                });
                if (res.data.profile_photo?.url) {
                    setPreviewImage(`${BACKEND_URL}${res.data.profile_photo.url}`);
                }
            } catch (err) {
                console.error("Failed to fetch user profile", err)
                setStatus({ type: "error", message: "Failed to fetch user profile" });
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfile();
    }, [user, authToken])

    const handleFileChange = (uploadedFile) => {
        setFile(uploadedFile);
        setPreviewImage(URL.createObjectURL(uploadedFile));
    }

    const handleSubmit = async () => {
        setUpdating(true);
        try {
            let imageId = profile.profile_photo?.id || null;
            if (file) {
                const formData = new FormData();
                formData.append("files", file);
                const uploadRes = await axios.post(`${API_URL}/upload`, formData, {
                    headers: {
                        Authorization: `${BEARER} ${authToken}`,
                    }
                });
                console.log("Upload res: ", uploadRes)
                imageId = uploadRes.data[0].id;
            }

            await axios.put(`${API_URL}/users/${user.id}`, {
                username: profile.username,
                email: profile.email,
                profile_photo: imageId,
                bio: profile.bio,
                firstName: profile.firstName,
                lastName: profile.lastName,
            }, {
                headers: { Authorization: `${BEARER} ${authToken}` },
            })

            setStatus({ type: "success", message: "Profile updated successfully!" })
            // setTimeout(() => navigate("/artists"), 1500);
        } catch (err) {
            console.error("Update failed", err);
            setStatus({ type: "error", message: "Profile update failed"})
        } finally {
            setUpdating(false)
        }
    }
    
    return (
        <ArtistLayout>

            { isLoading && <Loader /> }
            <Container size="sm">
                 {status.message && (
                        <SlidingNotification type={status.type} message={status.message} />
                      )}
                <Title order={2} mb="lg">Edit Your Profile</Title>

                <Stack spacing="md">
                    {previewImage && 
                        <Image src={previewImage} width={100} h={350} radius="xl" alt="Profile preview" />}

                    <FileInput 
                        label="Profile Picture" 
                        placeholder="Upload image" 
                        onChange={handleFileChange} />

                    <TextInput 
                        label="Username"
                        value={profile.username}
                        readOnly
                        onChange={(e) => setProfile({ ...profile, username: e.target.value})} />

                    <TextInput 
                        label="Email"
                        value={profile.email}
                        readOnly
                        onChange={(e) => setProfile({ ...profile, email: e.target.value})} />

                    <Group style={{ width: "100%" }}>
                        <TextInput 
                        label="First Name"
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value})} />

                        <TextInput 
                        label="Last Name"
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value})} />
                    </Group>
                    
                    <Textarea 
                        label="Bio"
                        minRows={3}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value})} />

                    <Group position="right">
                        <Button loading={updating} onClick={handleSubmit} style={{ backgroundColor: "#D97706" }}>Save Changes</Button>
                    </Group>
                </Stack>
            </Container>
        </ArtistLayout>
    )
}


export default ArtistProfile