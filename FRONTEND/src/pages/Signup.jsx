import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Container,
  Stack,
  Group,
  SegmentedControl,
  Divider,
  Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/useAuth";
import {
  IconUserPlus,
  IconLock,
  IconMail,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { API_URL } from "../constants";
import SlidingNotification from "../components/SlidingNotification";

function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState("Buyer");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({});
    setLoading(true);

    //Validate form and throw exceptions
    const missing = {};
    if (!form.username) missing.username = "Username required";
    if (!form.email) missing.email = "Email required";
    if (!form.password) missing.password = "Password required";
    if (!role) missing.role = "Select a role";

    if (Object.keys(missing).length > 0) {
      setErrors(missing);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/local/register`, {
        ...form,
        role,
      });

      login(res.data.jwt, res.data.user);
      setShowSuccess(true);

      //   navigate("/contact", { replace: true });

      if (res.data.user.role?.name === "Artist") {
        // navigate("/artist-dashboard");
        setTimeout(() => {
          navigate("/artists/profile");
        }, 5000);
      } else if (res.data.user.role?.name === "Buyer") {
        // navigate("/buyer-dashboard");
        setTimeout(() => {
          navigate("/buyer");
        }, 5000);
      } else {
        // navigate("/");
        setTimeout(() => {
          navigate("/"); 
        }, 5000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.error?.message ||
        "Account could not be created. Please try again later";
      setStatus({ type: "error", message: msg });

      if (msg.includes("username")) {
        setErrors({ username: "Invalid user name " });
      }

      if (msg.includes("email")) {
        setErrors({ email: "Invalid email " });
      }
      if (msg.includes("password")) {
        setErrors({ password: "Invalid password" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={500} my={40}>
      <Title align="center" fw={700}>
        Create your ArtisanHub Account
      </Title>

      {showSuccess && (
        <SlidingNotification message="Account created successfully!" />
      )}
      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <SegmentedControl
          fullWidth
          value={role}
          onChange={setRole}
          data={[
            { label: "Sign up as Artist", value: "Artist" },
            { label: "Sign up as Buyer", value: "Buyer" },
          ]}
        />

        {status.message && (
          <Text c={status.type === "error" ? "red" : "green"} size="sm" mb="sm">
            {status.message}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <Stack mt="xl">
            <TextInput
              label="Username"
              placeholder="Enter your username"
              icon={<IconUserPlus size={18} />}
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              error={errors.username}
            />
            <TextInput
              label="Email"
              placeholder="Enter your email"
              icon={<IconMail size={18} />}
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              error={errors.email}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              icon={<IconLock size={18} />}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
          </Stack>

          <Button fullWidth mt="xl" type="submit" color="#D97706" loading={loading}>
            Create {role} Account
          </Button>

          <Divider my="lg" label="or continue with" labelPosition="center" />

          <Button
            fullWidth
            variant="default"
            color="gray"
            onClick={() => alert("Google sign up coming soon")}
          >
            <IconBrandGoogle size={20} mx="xl" />
            Sign up with Google
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Signup;
