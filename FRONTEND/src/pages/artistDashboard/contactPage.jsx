import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Title,
  Group,
  Box,
} from "@mantine/core";
import axios from "axios";
import { useForm, hasLength, isEmail, isNotEmpty } from "@mantine/form";
import { API_URL } from "../../constants.js";
import { useAuth } from "../../auth/useAuth.js";
import ArtistLayout from "../../layouts/ArtistLayout.jsx";
import SlidingNotification from "../../components/SlidingNotification.jsx";

function ArtistContactPage() {
  const { user } = useAuth();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const fullName = `${user?.firstName} ${user?.lastName}`;
  const userEmail = user?.email;

  const form = useForm({
    initialValues: {
      name: fullName || "",
      email: userEmail || "",
      subject: "",
      message: "",
    },

    validate: {
      name: hasLength({ min: 3 }, "Name must have more than 3 characters"),
      email: isEmail("Invalid email"),
      subject: isNotEmpty("Enter the subject of your message"),
      message: isNotEmpty("Please enter your message"),
    },
  });

  const handleSubmit = async (values) => {
    setIsLoading(true);
    setStatus({ type: "", message: "" });
    try {
    //   console.log("Submitting values ...", values);
      await axios.post(`${API_URL}/contact-messages`, {
        data: values,
      });
      setStatus({ type: "success", message: "Message sent successfully!" });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: `There was an error in sending the message: ${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ArtistLayout>
      <Container size="sm">
        {status.message && (
          <SlidingNotification type={status.type} message={status.message} />
        )}

        <Title order={2} mb="lg">
          Leave a Comment
        </Title>

        <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Enter your name"
            mb="sm"
            readOnly
            withAsterisk
            key={form.key("name")}
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Email"
            placeholder="Enter your email"
            mb="sm"
            readOnly
            withAsterisk
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <TextInput
            label="Subject"
            placeholder="Message subject"
            mb="sm"
            withAsterisk
            key={form.key("subject")}
            {...form.getInputProps("subject")}
          />

          <Textarea
            label="Message"
            placeholder="Type your message..."
            mb="md"
            withAsterisk
            minRows={5}
            key={form.key("message")}
            {...form.getInputProps("message")}
          />

          <Group position="right">
            <Button
              type="submit"
              loading={isLoading}
              style={{ color: "#fff", backgroundColor: "#D97706" }}
            >
              Send Message
            </Button>
          </Group>
        </Box>
      </Container>
    </ArtistLayout>
  );
}

export default ArtistContactPage;
