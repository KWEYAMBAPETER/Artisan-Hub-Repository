import { useState } from "react";
import {
  Button,
  TextInput,
  Textarea,
  NumberInput,
  Select,
  Stack,
  Title,
  Container,
  FileInput,
  MultiSelect,
  Notification,
  Paper,
} from "@mantine/core";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/useAuth.js";
import ArtistLayout from "@/layouts/ArtistLayout.jsx";
import { API_URL, BEARER } from "@/constants.js";
import SlidingNotification from "@/components/SlidingNotification.jsx";

const AddArtwork = () => {
  const { user, authToken } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    category: "Paintings",
    artStatus: "available",
    deliveryOption: "pickup",
    location: "",
    images: [],
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Handle image uploads
      let imageIds = [];
      if (form.images.length > 0) {
        const data = new FormData();
        form.images.forEach((file) => data.append("files", file));
        console.log(data);
        const uploadRes = await axios.post(`${API_URL}/upload`, data, {
          headers: { Authorization: `${BEARER} ${authToken}` },
        });
        imageIds = uploadRes.data.map((img) => img.id);
      }

      await axios.post(
        `${API_URL}/art-works`,
        {
          data: {
            title: form.title,
            description: form.description,
            price: form.price,
            category: form.category,
            artStatus: form.artStatus,
            deliveryOption: form.deliveryOption,
            location: form.location,
            artist: user.id,
            images: imageIds,
          },
        },
        {
          headers: { Authorization: `${BEARER} ${authToken}` },
        }
      );

      setStatus({ type: "success", message: "Artwork successfully added!" });
      setForm({
        title: "",
        description: "",
        price: 0,
        category: "Paintings",
        artStatus: "available",
        deliveryOption: "pickup",
        location: "",
        images: [],
      });
      // setTimeout(() => navigate("/artists/add-artwork"), 1500);
    } catch (err) {
      console.error("Error submitting artwork: ", err);
      setStatus({
        type: "error",
        message: `Failed to add artwork. Please try again!. Context: 
        ${err}`,
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

      <Container size="sm">
        <Title order={2} mb="lg">
          Add New ArtWork
        </Title>

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
              label="Artwork images"
              description="Upload one or more artwork images"
              placeholder="Choose artwork images ..."
              multiple
              value={form.images}
              onChange={(val) => setForm({ ...form, images: val })}
              accept="image/*"
              required
            />
            <Button type="submit" loading={submitting} style={{ backgroundColor: "#D97706" }}>
              Submit Artwork
            </Button>
          </Stack>
        </form>
      </Container>
    </ArtistLayout>
  );
};

export default AddArtwork;
