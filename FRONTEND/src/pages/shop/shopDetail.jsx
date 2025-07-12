import { useState, useEffect } from "react";
import { Container, Title, Text, Badge, Group, Image, Loader, Button, Divider  } from "@mantine/core"
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { API_URL, BACKEND_URL } from "../../constants";
import ShopLayout from "../../layouts/ShopLayout";
import SlidingNotification from "../../components/SlidingNotification";

function ShopDetailPage () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artwork, setArtwork] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [status, setStatus] = useState({ type: "", message: "" })

    useEffect(() => {
        const fetchArtWork = async () => {
            try {
                const res = await axios.get(`${API_URL}/art-works/${id}?populate=*`)
                setArtwork(res.data.data);
            } catch (err) {
                console.error("Error loading artwork: ", err);
                setStatus({ type: "error", message: "Could not load artwork." })
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtWork();
    }, [id])

    if (!artwork) {
        return (
            <ShopLayout>
                <Container size="md" className="mt-24">
                    <Text color="red" align="center">
                        {status.message || "Artwork not found." }
                    </Text>
                </Container>
            </ShopLayout>
        )
    }

    console.log("Artwork: ", artwork)
    const { attributes } = artwork;
    console.log("Attributes: ", attributes)
    const images = attributes.images?.data || [];
    console.log("Images: ", images)

    return (
        <ShopLayout>
            {status.message && (
                <SlidingNotification type={status.type} message={status.message} />
            )}
            <Container size="lg" className="mt-24 pb-16">
            {isLoading && (
                <div className="flex justify-center mt-24">
                <Loader size="xl" type="dots" color="#D97706" />
            </div>
            )}

            <div className="w-full max-h-[400px] mb-6">
                {images.length > 0 ? (
                    <Image 
                        src={`${BACKEND_URL}${images[0].attributes.url}`}
                        alt={attributes.title}
                        radius="md"
                        fit="contain"
                        h="400" />
                ) : (
                    <div className="bg-bray-200 h-64 flx items-center justify-center text-gray-500">
                        No image
                    </div>
                )}
            </div>

            {/* Title & Category */}
            <Group justify="space-between">
                <Title order={2} className="text-amber-800">
                    {attributes.title}
                </Title>
                <Badge color="yellow" variant="light" size="lg">
                    {attributes.category}
                </Badge>
            </Group>

            {/* Price */}
            <Text size="xl" fw={700} className="text-amber-700 mt-2 mb-4">
                UGX {parseInt(attributes.price).toLocaleString()}
            </Text>

            {/* Pickup / delivery option */}
            <Text size="sm" color="gray" mb="xs">
                Delivery Method:{" "}
                <strong className="capitalize">
                    {attributes.deliveryOption?.replace(/_/g, " ") || "N/A"}
                </strong>
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
               fullWidth
               color="#D97706"
               size="md"
               onClick={() => {}}
               disabled={attributes.artStatus !== 'available'}>

                {attributes.artStatus === "available"
                    ? "Add to Cart"
                    : "Not Available" }
            </Button>
            </Container>
        </ShopLayout>
    )
}


export default ShopDetailPage;