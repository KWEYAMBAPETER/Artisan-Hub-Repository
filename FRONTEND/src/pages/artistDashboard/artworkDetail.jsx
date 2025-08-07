import { useState, useEffect } from "react";
import {
  Container,
  Loader,
  Title,
  Text,
  Image,
  Badge,
  Button,
  Group,
  Stack,
  Modal,
  Grid,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { IconTrash, IconArrowLeft } from "@tabler/icons-react";
import { useAuth } from "@/auth/useAuth";
import { API_URL, BEARER, BACKEND_URL } from "@/constants.js";
import ArtistLayout from "@/layouts/ArtistLayout.jsx";
import SlidingNotification from "@/components/SlidingNotification.jsx";

function ArtWorkDetail() {
  const { authToken } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtWork] = useState(null);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [opened, setOpened] = useState(false);


  useEffect(() => {
    if (!id || !authToken) return;

    const fetchArtWork = async () => {
      setStatus({ type: "", message: "" });
      try {
        const res = await axios.get(
          `${API_URL}/art-works/${id}?populate=images`,
          {
            headers: { Authorization: `${BEARER} ${authToken}` },
          }
        );

        setArtWork(res.data.data.attributes);

      } catch (err) {
        console.error("Failed to fetch requested artwork: ", err);
        setStatus({
          type: "error",
          message: `Could not fetch the requested art: Ref: ${err} `,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtWork();
  }, [id, authToken]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "available":
        return "green";
      case "sold":
        return "red";
      case "pending":
        return "yellow";
      default:
        return "gray";
    }
  };


  const handleDelete = async () => {
      setDeleting(true);
      setStatus({ type: "", message: ""})
      try {
        await axios.delete(`${API_URL}/art-works/${id}`, {
          headers: { Authorization: `${BEARER} ${authToken}`},
        });
        navigate("/artists")
      } catch(error) {
        console.error("Delete failed", error);
        setStatus({ type: "error", message: `Delete failed: ${error}`})
      } finally {
        setDeleting(false);
        setOpened(false);
      }
  }

  
  return (
    <ArtistLayout>
      {status.message && (
        <SlidingNotification type={status.type} message={status.message} />
      )}

      { (!artwork || typeof artwork !== 'object') ? (

          <Text>Artwork not found!</Text>
      ) : (

      <Container size="md">
        { isLoading && <Loader /> }
        <Group position="apart" mb="lg">
          <Button
            variant="light"
            color="#D97706"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate(`/artists`)}
          >Back to Dashboard</Button>
            <Title order={2} p="sm">{artwork.title}</Title>
        </Group>

        <Grid gutter="lg" align="flex-start">
          <Grid.Col span={{ base: 12, md: 8 }}>
            {artwork.images.data?.length > 0 && (
              <Carousel withIndicators height={400} mb="md">
                {artwork.images.data.map((img) => (
                  <Carousel.Slide key={img.id}>
                      <Image 
                        src={`${BACKEND_URL}${img.attributes.url}`}
                        h={400}
                        fit="contain"
                        radius="md"
                        alt="Artwork image" />
                  </Carousel.Slide>
                ))}
              </Carousel>
            )}
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack spacing="sm">
                  <Group>
                      <Badge fullWidth size="xl">{artwork.category}</Badge>
                      <Badge color="blue" size="xl" variant="light" fullWidth>UGX {parseInt(artwork.price).toLocaleString()}</Badge>
                      <Badge color={getStatusColor(artwork.artStatus)} variant="light" size="xl" fullWidth>{artwork.artStatus}</Badge>
                  </Group>

                  <Text p="md" size="lg">{artwork.description}</Text>

                  <Group>
                    <Badge color="gray" variant="outline">Delivery options: {artwork.deliveryOption}</Badge>
                    <Badge color="gray" variant="outline">Stock: {artwork.stock}</Badge>
                    
                  </Group>

                  <Group grow>
                      <Button style={{ backgroundColor: "#D97706" }} onClick={() => navigate(`/artists/edit-artwork/${id}`)}>Edit</Button>
                      <Button color="red" loading={deleting} onClick={() => setOpened(true)}>Delete</Button>
                  </Group>
              </Stack>
          </Grid.Col>
        </Grid>

        <Modal opened={opened} onClose={() => setOpened(false)} title="Confirm Deletion" centered>
            <Text mb="md">Are you sure you want to delete this artwork?</Text>
            <Group position="apart">
              <Button variant="outline" onClick={() => setOpened(false)} color="#D97706">Cancel</Button>
              <Button color="red" onClick={handleDelete} loading={deleting}>
                <IconTrash size={18} style={{ marginRight: "5px" }}/>
                Confirm
                </Button>
            </Group>
        </Modal>
      </Container>

      ) }
    </ArtistLayout>
  );
}

export default ArtWorkDetail;
