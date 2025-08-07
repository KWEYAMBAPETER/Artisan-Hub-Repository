import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Badge,
  Grid,
  Group,
  Stack,
  Image,
  Loader,
  Button,
  Divider,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { IconArrowLeft } from "@tabler/icons-react";
import { API_URL, BACKEND_URL } from "@/constants.js";
import ShopLayout from "@/layouts/ShopLayout.jsx";
import SlidingNotification from "@/components/SlidingNotification.jsx";

function ShopDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchArtWork = async () => {
      try {
        const res = await axios.get(`${API_URL}/art-works/${id}?populate=*`);
        setArtwork(res.data.data);
      } catch (err) {
        console.error("Error loading artwork: ", err);
        setStatus({ type: "error", message: "Could not load artwork." });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtWork();
  }, [id]);

  if (!artwork) {
    return (
      <ShopLayout>
        <Container size="md" className="mt-24">
          <Text color="red" align="center">
            {status.message || "Artwork not found."}
          </Text>
        </Container>
      </ShopLayout>
    );
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find((item) => item.id === artwork.id);

    if (!exists) {
      cart.push({
        id: artwork.id,
        title: artwork.attributes.title,
        price: artwork.attributes.price,
        thumbnail:
          artwork.attributes.images?.data?.[0]?.attributes?.url &&
          `${BACKEND_URL}${artwork.attributes.images.data[0].attributes.url}`,
      });
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    console.log("Successfully added to cart!");
    navigate("/cart");
  };

  const { attributes } = artwork;
  const images = attributes.images?.data || [];

  return (
    <ShopLayout>
      {status.message && (
        <SlidingNotification type={status.type} message={status.message} />
      )}
      <Container size="lg" className="mt-28 pb-16">
        {isLoading && (
          <div className="flex justify-center mt-24">
            <Loader size="xl" type="dots" color="#D97706" />
          </div>
        )}

        <div className="mb-6">
            <Link
                to="/shop"
                className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium text-sm">
                <IconArrowLeft size={16} className="mr-1"/>
                Back to Shop
            </Link>
        </div>

        <Grid gutter="xl">
          {/* Image Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <div className="w-full">
              {images.length > 0 ? (
                <Carousel
                  withIndicators
                  h={400}
                  slideSize="100%"
                  slideGap="md"
                  loop
                  className="border border-gray-200 rounded-md"
                >
                  {images.map((img) => (
                    <Carousel.Slide key={img.id}>
                      <Image
                        src={`${BACKEND_URL}${img.attributes.url}`}
                        alt={attributes.title}
                        radius="md"
                        fit="contain"
                        h="400"
                      />
                    </Carousel.Slide>
                  ))}
                </Carousel>
              ) : (
                <div className="bg-gray-200 h-64 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
            </div>
          </Grid.Col>

          {/* Info section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack spacing="xs">
              {/* Title & Category */}
              <Group justify="space-between" wrap="nowrap">
                <Title order={2} className="text-amber-800">
                  {attributes.title}
                </Title>
                <Badge color="yellow" variant="light" size="md">
                  {attributes.category}
                </Badge>
              </Group>

              {/* Price */}
              <Text size="xl" fw={700} className="text-amber-700 mt-2 mb-4">
                UGX {parseInt(attributes.price).toLocaleString()}
              </Text>

              {/* Pickup / delivery option */}
              <Text size="sm" color="gray">
                <strong>Delivery Method:</strong>{" "}
                <span className="capitalize">
                  {attributes.deliveryOption?.replace(/_/g, " ") || "N/A"}
                </span>
              </Text>

              {/* Location */}
              {attributes.location && (
                <Text size="sm" color="gray" mb="xs">
                  Artist Location: {attributes.location}
                </Text>
              )}

              {/* Description */}
              <Divider my="md" />
              <Text size="md" className="leading-relaxed mb-6">
                {attributes.description}
              </Text>

              {/* Add to Cart */}
              <Button
                mt="lg"
                fullWidth
                color="#D97706"
                size="md"
                radius="md"
                onClick={handleAddToCart}
                disabled={attributes.artStatus !== "available"}
              >
                {attributes.artStatus === "available"
                  ? "Add to Cart"
                  : "Not Available"}
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    </ShopLayout>
  );
}

export default ShopDetailPage;
