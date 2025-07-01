import { useEffect, useState } from "react";
import {
  Text,
  NavLink,
  Image,
  Badge,
  Button,
  Card,
  Grid,
  Container,
  Loader,
  Group,
  Title,
  Stack,
} from "@mantine/core";
import { useAuth } from "../../auth/useAuth";
import { API_URL, BACKEND_URL, BEARER } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArtistLayout from "../../layouts/ArtistLayout";

function ArtistDashboard() {
  const { user, authToken, logout } = useAuth();
  const [artWorks, setArtWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtWorks = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/art-works?filter[artist][id][$eq]=${user.id}&populate=images`,
          {
            headers: {
              Authorization: `${BEARER} ${authToken}`,
            },
          }
        );
        console.log(res.data.data);

        setArtWorks(res.data.data);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      console.log("Fetching ...");
      fetchArtWorks();
    }
  }, [user, authToken]);

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

  return (
    <ArtistLayout>
      <Container size="xl">
        <Title order={2} mb="md">
          My Artworks
        </Title>
        {isLoading ? (
          <Loader />
        ) : artWorks.length === 0 ? (
          <Text>No artworks yet. Start by adding your first one!</Text>
        ) : (
          <Grid>
            {artWorks.map((artWork) => {
              const img = `${BACKEND_URL}${artWork.attributes.images?.data[0]?.attributes?.url}`;
              const status = artWork.attributes.artStatus;
              console.log(status)

              return (
                <Grid.Col span={4} key={artWork.id}>
                  <Card shadow="sm" p="lg" radius="md" withBorder>
                    {img && (
                      <Card.Section height="20%">
                        <Image
                          src={img}
                          height={160}
                          alt={artWork.attributes.title}
                          withPlaceholder
                        />
                      </Card.Section>
                    )}

                    <Group justify="space-between" mt="md" mb="xs">
                      <Text fw={600}>{artWork.attributes.title}</Text>
                      <Badge color={getStatusColor(status)}>{status}</Badge>
                    </Group>
                    <Group>
                        <Text c="dimmed" size="md">UGX {artWork.attributes.price}</Text>
                        <Text c="dimmed" size="sm">{artWork.attributes.description}</Text>
                    </Group>
                    <Button variant="light" fullWidth mt="md" radius="md" onClick={() => navigate(`/artists/edit-artwork/${artWork.id}`)}>
                        Edit
                    </Button>
                    {/* <Stack spacing="xs" mt="md">
                                            <Text fw={600}>{artWork.attributes.title}</Text>
                                            <Text c="dimmed">${artWork.attributes.price}</Text>
                                            <Badge color={getStatusColor(status)}>{status}</Badge>
                                            <Group position="right">
                                                <Button size="xs" variant="light" onClick={() => navigate(`/edit-artWork/${artWork.id}`)}>
                                                    Edit
                                                </Button>
                                            </Group>
                                        </Stack> */}
                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>
        )}
      </Container>
    </ArtistLayout>
  );
}

export default ArtistDashboard;
