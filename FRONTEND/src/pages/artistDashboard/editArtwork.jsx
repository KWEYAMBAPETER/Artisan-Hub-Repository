import { useState, useEffect } from "react";
import {
  Container,
  Stack,
  TextInput,
  Title,
  Group,
  Image,
  Textarea,
  Select,
  NumberInput,
  FileInput,
  Button,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../auth/useAuth";
import { IconArrowLeft } from "@tabler/icons-react";
import ArtistLayout from "../../layouts/ArtistLayout";
import SlidingNotification from "../../components/SlidingNotification";
import { API_URL, BEARER, BACKEND_URL } from "../../constants";

function EditArtWork() {
  const { id } = useParams();
  const { user, authToken } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
    artStatus: "available",
    deliveryOption: "",
    location: "",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [existingImages, setExistingImages] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchArtWork = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/art-works/${id}?populate=images,artist`,
          {
            headers: { Authorization: `${BEARER} ${authToken}` },
          }
        );
        const data = res.data.data.attributes;

        if (data.artist?.data?.id !== user.id) {
          setStatus({
            type: "error",
            message: "Unauthorized access. You cannot edit this artwork.",
          });
          return;
        }

        setForm({
          title: data.title || "",
          description: data.description || "",
          price: Number(data.price) || 0,
          category: data.category || "",
          artStatus: data.artStatus || "available",
          deliveryOption: data.deliveryOption || "",
          location: data.location || "",
          images: [], // allow only fresh uploads
        });

        setExistingImages(data.images?.data || []);
      } catch (err) {
        console.error("Failed to load artwork: ", err);
        setStatus({
          type: "error",
          message: `Could not load artWork details. Reference: ${err}`,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtWork();
  }, [id, authToken, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      let imageIds = [];
      if (form.images.length > 0) {
        const data = new FormData();
        form.images.forEach((file) => data.append("files", file));
        // console.log("Data: ", data);
        const uploadRes = await axios.post(`${API_URL}/upload`, data, {
          headers: { Authorization: `${BEARER} ${authToken}` },
        });
        // console.log("Upload Res: ", uploadRes);
        imageIds = uploadRes.data.map((img) => img.id);
      }

      await axios.put(
        `${API_URL}/art-works/${id}`,
        {
          data: {
            title: form.title,
            description: form.description,
            price: form.price,
            category: form.category,
            artStatus: form.artStatus,
            deliveryOption: form.deliveryOption,
            Location: form.location,
            artist: user.id,
            ...(imageIds.length > 0 && { images: imageIds }),
          },
        },
        {
          headers: { Authorization: `${BEARER} ${authToken}` },
        }
      );

      setStatus({ type: "success", message: "Artwork updated successfully!" });
      setTimeout(() => navigate("/artists"), 1500);
    } catch (err) {
      console.error("Error updating artwork: ", err);
      setStatus({
        type: "error",
        message: "Failed to update artwork. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ArtistLayout>
      {status.message && (
        <SlidingNotification type={status.type} message={status.message} />
      )}

      <Container>
        <Group position="apart" mb="lg">
          <Button
            variant="light"
            color="#D97706"
            leftSection={<IconArrowLeft size={16} />}
            onClick={() => navigate(`/artists/view-artwork/${id}`)}
          >
            Back to Artwork
          </Button>

          <Title order={2}>Edit ArtWork</Title>
        </Group>
        {/* <Title order={2} mb="lg">
          Edit ArtWork
        </Title> */}

        {existingImages.length > 0 && (
          <Stack mb="md">
            <Text c="dimmed" size="sm">
              Existing Images:{" "}
            </Text>
            <Carousel withIndicators height={350}>
              {existingImages.map((img) => (
                <Carousel.Slide key={img.id}>
                  <Image
                    src={`${BACKEND_URL}${img.attributes.url}`}
                    alt="art-preview"
                    style={{
                      width: "100%",
                      height: "150%",
                      objectFit: "fit",
                      borderRadius: "8px",
                    }}
                  />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Stack>
        )}
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              required
            />
            <NumberInput
              label="Price"
              value={form.price}
              onChange={(val) => setForm({ ...form, price: val })}
              required
            />
            <Select
              label="Category"
              value={form.category}
              onChange={(val) => setForm({ ...form, category: val })}
              data={["Paintings", "Digital Art", "Woodwork", "Sculptures", "Photography"]}
              required
            />
            <Select
              label="Status"
              value={form.artStatus}
              onChange={(val) => setForm({ ...form, artStatus: val })}
              data={["available", "pending", "sold"]}
              required
            />
            <Select
              label="Delivery Option"
              value={form.deliveryOption}
              onChange={(val) => setForm({ ...form, deliveryOption: val })}
              data={["pickup only", "pickup and delivery"]}
              required
            />
            <TextInput
              label="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
            <FileInput
              label="Replace Images (optional)"
              description="Upload one or more images"
              placeholder="Upload to replace existing"
              multiple
              value={form.images}
              onChange={(val) => setForm({ ...form, images: val })}
              accept="image/*"
            />

            <Button
              type="submit"
              loading={submitting}
              style={{ backgroundColor: "#D97706" }}
            >
              Update Artwork
            </Button>
          </Stack>
        </form>
      </Container>
    </ArtistLayout>
  );
}

export default EditArtWork;
