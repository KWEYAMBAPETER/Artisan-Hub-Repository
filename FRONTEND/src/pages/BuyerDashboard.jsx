import React, { useState, useEffect } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Container,
  Grid,
  Card,
  Image,
  Text,
  Badge,
  Group,
  Button,
  ActionIcon,
  Skeleton,
  Alert,
  TextInput,
  Select,
  Title,
  useMantineTheme,
  MediaQuery,
  Burger
} from '@mantine/core';
import { IconShoppingCart, IconTrash, IconSearch, IconFilter, IconAlertCircle } from '@tabler/icons-react';

function BuyerDashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [artPieces, setArtPieces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtPieces = async () => {
    try {
      setLoading(true);
      // the viable API link here
      const response = await fetch('https://our-api-endpoint/artworks');
      
      if (!response.ok) throw new Error('Failed to fetch artworks');
      
      const data = await response.json();
      setArtPieces(data);
    } catch (err) {
      setError(err.message);
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtPieces();
  }, []);

  const categories = ['All', ...new Set(artPieces.map(item => item.category))];

  const filteredArtPieces = artPieces.filter(piece => {
    const matchesSearch = piece.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         piece.artist.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || piece.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (artPiece) => {
    setCart([...cart, artPiece]);
  };

  const removeFromCart = (artPieceId) => {
    setCart(cart.filter(item => item.id !== artPieceId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  if (error) {
    return (
      <Container py="xl">
        <Alert 
          icon={<IconAlertCircle size={18} />} 
          title="Couldn't load artworks" 
          color="red"
          withCloseButton
          onClose={() => setError(null)}
        >
          {error} - <Button variant="subtle" onClick={fetchArtPieces}>Try again</Button>
        </Alert>
      </Container>
    );
  }

  return (
    <AppShell
      navbar={
        <Navbar 
          p="md" 
          hiddenBreakpoint="sm" 
          hidden={!opened} 
          width={{ sm: 300 }}
        >
          <Navbar.Section>
            <Text size="lg" weight={600} mb="md">Your Cart ({cart.length})</Text>
            {cart.length === 0 ? (
              <Text color="dimmed">Your cart is empty</Text>
            ) : (
              <>
                {cart.map(item => (
                  <Group key={item.id} mb="sm" position="apart">
                    <div>
                      <Text size="sm" weight={500}>{item.title}</Text>
                      <Text size="xs" color="dimmed">${item.price.toFixed(2)}</Text>
                    </div>
                    <ActionIcon color="red" onClick={() => removeFromCart(item.id)}>
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                ))}
                <Text mt="md" weight={600}>Total: ${cartTotal.toFixed(2)}</Text>
                <Button fullWidth mt="md" disabled={cart.length === 0}>
                  Proceed to Checkout
                </Button>
              </>
            )}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Title order={4}>Art Marketplace</Title>

            <Group ml="auto" spacing="xs">
              <Badge 
                leftSection={<IconShoppingCart size={14} style={{ marginRight: 5 }} />}
                variant="filled"
                size="lg"
              >
                {cart.length}
              </Badge>
            </Group>
          </div>
        </Header>
      }
    >
      <Container size="xl" py="md">
        <Group position="apart" mb="xl">
          <Title order={2}>Available Artworks</Title>
          <Group>
            <TextInput
              placeholder="Search artworks..."
              icon={<IconSearch size={16} />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 250 }}
            />
            <Select
              placeholder="Filter by category"
              icon={<IconFilter size={16} />}
              data={categories}
              value={categoryFilter}
              onChange={setCategoryFilter}
              clearable
              style={{ width: 200 }}
            />
          </Group>
        </Group>

        {loading ? (
          <Grid>
            {[...Array(8)].map((_, i) => (
              <Grid.Col key={i} xs={12} sm={6} md={4} lg={3}>
                <Card withBorder radius="md">
                  <Card.Section>
                    <Skeleton height={200} />
                  </Card.Section>
                  <Card.Section p="md">
                    <Skeleton height={24} width="70%" mb="xs" />
                    <Skeleton height={16} width="50%" mb="sm" />
                    <Skeleton height={16} width="90%" />
                    <Skeleton height={16} width="80%" mt={4} />
                    <Group mt="md" position="apart">
                      <Skeleton height={24} width="30%" />
                      <Skeleton height={36} width="40%" radius="md" />
                    </Group>
                  </Card.Section>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : filteredArtPieces.length === 0 ? (
          <Alert title="No artworks found">
            Try adjusting your search or filters
          </Alert>
        ) : (
          <Grid>
            {filteredArtPieces.map((artPiece) => (
              <Grid.Col key={artPiece.id} xs={12} sm={6} md={4} lg={3}>
                <Card withBorder radius="md" shadow="sm">
                  <Card.Section>
                    <Image
                      src={artPiece.image}
                      alt={artPiece.title}
                      height={200}
                      withPlaceholder
                    />
                  </Card.Section>

                  <Card.Section p="md">
                    <Group position="apart" mb="xs">
                      <Text weight={600} lineClamp={1}>{artPiece.title}</Text>
                      <Badge>{artPiece.category}</Badge>
                    </Group>
                    <Text size="sm" color="dimmed" mb="sm">
                      by {artPiece.artist}
                    </Text>
                    <Text size="sm" lineClamp={2} mb="md">
                      {artPiece.description}
                    </Text>

                    <Group position="apart">
                      <Text weight={700}>${artPiece.price.toFixed(2)}</Text>
                      <Button 
                        size="sm"
                        onClick={() => addToCart(artPiece)}
                        disabled={cart.some(item => item.id === artPiece.id)}
                      >
                        {cart.some(item => item.id === artPiece.id) ? 'Added' : 'Add to cart'}
                      </Button>
                    </Group>
                  </Card.Section>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        )}
      </Container>
    </AppShell>
  );
}

export default BuyerDashboard;