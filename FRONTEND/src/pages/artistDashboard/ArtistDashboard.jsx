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
  Select,
  Pagination,
  Paper,
  SimpleGrid,
} from "@mantine/core";
import { useAuth } from "../../auth/useAuth";
import { API_URL, BACKEND_URL, BEARER } from "../../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ArtistLayout from "../../layouts/ArtistLayout";

function ArtistDashboard() {
  const { user, authToken } = useAuth();
  const [artWorks, setArtWorks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterArtStatus, setFilterArtStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const filteredArtworks = artWorks.filter((item) => {
    const statusMatch = filterArtStatus === "all" || item.attributes.artStatus === filterArtStatus;
    const categoryMatch = filterCategory === "all" || item.attributes.category === filterCategory;
    return statusMatch && categoryMatch;
  });

  const paginated = filteredArtworks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchArtWorks = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/art-works?filters[artist][id][$eq]=${user.id}&populate=images`,
          {
            headers: {
              Authorization: `${BEARER} ${authToken}`,
            },
          }
        );
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

  const metrics = [
    {
      label: "Total Artworks",
      value: artWorks.length,
      color: "blue",
    },
    {
      label: "Sold",
      value: artWorks.filter((a) => a.attributes.artStatus === "sold").length,
      color: "red",
    },
    {
      label: "Available",
      value: artWorks.filter((a) => a.attributes.artStatus === "available").length,
      color: "green",
    },
    {
      label: "Pending",
      value: artWorks.filter((a) => a.attributes.artStatus === "pending").length,
      color: "gray",
    },
  ]


  return (
    <ArtistLayout>
      <Container size="xl">
        <Title order={2} mb="md">
          My Artworks
        </Title>

        {/* Dashboard metrics */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mb="xl">
            {metrics.map((metric, index) => (
              <Paper
                  key={index}
                  shadow="xs"
                  p="lg"
                  radius="md"
                  withBorder
                  style={{ backgroundColor: `var(--mantine-color-${metric.color}-0)` }}>
                  <Text size="lg" fw={600}>{metric.label}</Text>
                  <Text size="xl" fw={700}>{metric.value}</Text>
              </Paper>
            ))}
        </SimpleGrid>

        {/* Filters */}

        <Group mb="md" grow>
            <Select 
              label="Filter by status"
              value={filterArtStatus}
              onChange={setFilterArtStatus}
              data={["all", "available", "sold", "pending"]} />
            <Select 
              label="Filter by category"
              value={filterCategory}
              onChange={setFilterCategory}
              data={["all", "Paintings", "Digital Art", "Woodwork", "Sculptures"]} />
        </Group>

        {isLoading ? (
          <Loader />
        ) : filteredArtworks.length === 0 ? (
          <Text>No artworks match your filters. Start by adding your first one or use the correct filter!</Text>
        ) : (

        <>
          <Grid>
            {paginated.map((artWork) => {
              const img = `${BACKEND_URL}${artWork.attributes.images?.data[0]?.attributes?.url}`;
              const status = artWork.attributes.artStatus;

              return (
                <Grid.Col span={4} key={artWork.id}>
                  <Card shadow="sm" p="lg" radius="md" withBorder
                    style={{
                      height: 350,
                      display: 'flex',
                      flexDirection: 'column',
                      // justifyContent: 'flex-start'
                    }}>
                    {img && (
                      <Card.Section style={{ flex: '0 0 130px', overflow: 'hidden' }}>
                        <Image
                          src={img}
                          height={130}
                          alt={artWork.attributes.title}
                          withPlaceholder
                          style={{ objectFit: 'fit', width: "100%", transition: "transform 0.3s ease", }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </Card.Section>
                    )}

                    <Group justify="space-between" mt="sm" mb="sm" wrap="nowrap">
                      <Text fw={600} size="lg" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{artWork.attributes.title}</Text>
                      <Badge color={getStatusColor(status)}>{status}</Badge>
                    </Group>
                    <Group>
                        <Text c="dimmed" size="md">UGX {artWork.attributes.price}</Text>
                        <Text c="dimmed" size="sm" lineClamp={2}>{artWork.attributes.description}</Text>
                    </Group>
                    <Button variant="light" fullWidth mt="md" radius="md" onClick={() => navigate(`/artists/edit-artwork/${artWork.id}`)}>
                        Edit
                    </Button>

                    {/* <Stack spacing={6} mt="sm" style={{ flex: 1 }}>
                      <Group justify="space-between">
                        <Text fw={600}>{artWork.attributes.title}</Text>
                        <Badge color={getStatusColor(status)}>{status}</Badge>
                      </Group>

                      <Text c="dimmed" size="sm">
                        UGX {artWork.attributes.price}
                      </Text>

                      <Text c="dimmed" size="xs" lineClamp={2}>
                        {artWork.attributes.description}
                      </Text>

                      <Button
                        variant="light"
                        fullWidth
                        mt="auto"
                        radius="md"
                        onClick={() => navigate(`/artists/edit-artwork/${artWork.id}`)}
                      >
                        Edit
                      </Button>
                    </Stack> */}

                  </Card>
                </Grid.Col>
              );
            })}
          </Grid>

          <Group position="center" mt="lg">
            <Pagination 
              total={Math.ceil(filteredArtworks.length / itemsPerPage)}
              page={currentPage}
              onChange={setCurrentPage} />
          </Group>
        </>
        )}
      </Container>
    </ArtistLayout>
  );
}

export default ArtistDashboard;
