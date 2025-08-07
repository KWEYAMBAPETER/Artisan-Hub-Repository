import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Container,
  Title,
  Group,
  Notification,
  Box,
  Stack,
  Text,
} from "@mantine/core";
import heroImage from "../assets/dig-art-1.jpg";
import { useForm, hasLength, isEmail, isNotEmpty } from "@mantine/form";
import Navbar from "../components/Navbar.jsx";
import { API_URL } from "../constants.js";
import axios from "axios";

function ContactPage() {
  // const [formData, setFormData] = useState({
  //     name: '',
  //     email: '',
  //     subject: '',
  //     message: ''
  // })

  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
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
    try {
      // console.log("Submitting values ...", values);
      await axios.post(`${API_URL}/contact-messages`, {
        data: values,
      });
      setSuccess(true);
      form.reset();
      setTimeout(() => setSuccess(null), 5000);
    } catch (error) {
      setSuccess(false);
      setTimeout(() => setSuccess(null), 5000);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />

      <Box style={{ paddingTop: "50px" }}>
        <Stack
          className="contact-hero"
          spacing="sm"
          mt="xl"
          align="center"
          ta="center"
          styling={{ position: "fixed" }}
        >
          <Title order={2} c="white">
            Leave a Comment
          </Title>
          <Text size="md" c="white">
            Have an inquiry or suggestion? Send us a message, we'd love to hear
            from you
          </Text>
        </Stack>
        <Container size="md" py="xl" mt="xl">
          {/* {success !== null && (
        <Notification
          color={success ? "teal" : "red"}
          title={success ? "Success" : "Error"}
          mb="md"
          withCloseButton
          onClose={() => setSuccess(null)}
        >
          {success
            ? "Your message has been sent!"
            : "Something went wrong. Please try again later."}
        </Notification>
      )} */}

          {success === true && (
            <Notification color="teal" title="Success" mb="md">
              Your message has been sent!
            </Notification>
          )}
          {success === false && (
            <Notification color="red" title="Error" mb="md">
              Something went wrong. Try again later.
            </Notification>
          )}

          <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              mb="sm"
              withAsterisk
              key={form.key("name")}
              {...form.getInputProps("name")}
            />

            <TextInput
              label="Email"
              placeholder="Enter your email"
              mb="sm"
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
              <Button type="submit" loading={isLoading}>
                Send Message
              </Button>
            </Group>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default ContactPage;
