// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import axios from "axios";

import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Stack,
  Group,
  Divider,
} from "@mantine/core";

import { IconUser, IconLock, IconBrandGoogle } from "@tabler/icons-react";
import SlidingNotification from "../assets/Components/SlidingNotification";

function Login() {
  const { login, user } = useAuth();
  const [form, setForm] = useState({ identifier: "", password: "" });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus({});
    setLoading(true);

    if (!form.identifier || !form.password) {
      setErrors({
        identifier: !form.identifier ? "Email is required" : "",
        password: !form.password ? "Password is required" : "",
      });

      setLoading(false);
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/local`, form);
      login(res.data.jwt, res.data.user);
      setShowSuccess(true);
      // navigate('/dashboard', { replace: true });

      // console.log(user.role?.name);
      // if (user.role?.name === "Artist") {
      //   navigate("/artists", { replace: true });
      // } else if (user.role?.name === "Buyer") {
      //   navigate("/buyer-dashboard", { replace: true });
      // } else {
      //   navigate("/");
      // }
    } catch (err) {
      const msg = err.response?.data?.error?.message || "Login failed";
      setStatus({ type: "error", message: msg });

      if (msg.includes("identifier")) {
        setErrors({ identifier: "Invalid email or username" });
      }

      if (msg.includes("password")) {
        setErrors({ password: "Incorrect password" });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user.role?.name);
      if (user.role?.name === "Artist") {
        // navigate("/artist-dashboard");
        setTimeout(() => {
          navigate("/artist"); // or buyer-dashboard
        }, 5000);
      } else if (user.role?.name === "Buyer") {
        // navigate("/buyer-dashboard");
        setTimeout(() => {
          navigate("/buyer"); // or buyer-dashboard
        }, 5000);
      } else {
        // navigate("/");
        setTimeout(() => {
          navigate("/"); // or buyer-dashboard
        }, 5000);
      }
    }
  }, [user, navigate]);

  return (
    <Container size={420} my={40}>
      <Title align="center" fw={700}>
        Welcome to ArtisanHub 👋
      </Title>
      <Text c="dimmed" size="sm" align="center" mt={5}>
        Don’t have an account yet?{" "}
        <a href="/signup" style={{ color: "#1c7ed6", textDecoration: "none" }}>
          Create one
        </a>
      </Text>

      {showSuccess && <SlidingNotification message="Login successful!" />}

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={handleSubmit}>
          <Stack>
            {status.message && (
              <Text
                c={status.type === "error" ? "red" : "green"}
                size="sm"
                mb="sm"
              >
                {status.message}
              </Text>
            )}

            <TextInput
              label="Email"
              placeholder="Enter email"
              icon={<IconUser size={18} />}
              required
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              error={errors.identifier}
            />
            <PasswordInput
              label="Password"
              placeholder="Enter password"
              icon={<IconLock size={18} />}
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              error={errors.password}
            />
          </Stack>

          <Group position="apart" mt="md">
            <a href="#" size="sm" style={{ fontSize: 14 }}>
              Forgot password?
            </a>
          </Group>

          <Button fullWidth mt="xl" type="submit" loading={loading}>
            Login
          </Button>

          <Divider my="lg" label="or continue with" labelPosition="center" />

          {/* Social login placeholder (Google) */}
          <Button
            fullWidth
            variant="default"
            color="gray"
            onClick={() => alert("Google login coming soon")}
          >
            <IconBrandGoogle size={20} />
            Sign in with Google
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;
