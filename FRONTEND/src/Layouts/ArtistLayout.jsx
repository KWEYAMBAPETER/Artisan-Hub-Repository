import {
  AppShell,
  Burger,
  NavLink,
  Title,
  Group,
  Text,
  Avatar,
  useMantineTheme,
} from "@mantine/core";
import { IconPaint, IconPlus } from "@tabler/icons-react";
import PaletteIcon from "@mui/icons-material/Palette"
import BrushIcon from "@mui/icons-material/Brush";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from "@mui/icons-material/Edit";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import LogoutButton from "../components/LogoutButton";
import { BACKEND_URL } from "../constants";

function ArtistLayout({ children }) {
  const theme = useMantineTheme();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // const [opened, handlers] = useDisclosure(false);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const navLinks = [
    { label: "My Artworks", icon: <BrushIcon fontSize="small" />, to: "/artists" },
    { label: "Add Artwork", icon: <AddCircleIcon fontSize="small" />, to: "/artists/add-artwork" },
    { label: "Update Profile", icon: <EditIcon fontSize="small" />, to: "/artists/profile" },
    { label: "Contact Us", icon: <MailOutlineIcon fontSize="small" />, to: "/artists/contact" },
  ];

  const profileImageUrl = user?.profile_photo?.url ? `${BACKEND_URL}${user.profile_photo.url}` : null;
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();

  return (
    <AppShell
      padding="md"
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      header={{ height: 60, fixed: true }}
      footer={{ height: 40, fixed: true }}
      styles={{
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
        },
      }}
    >
      {/* <AppShell.Header p="xs">
        <Group position="apart" align="center" style={{ height: "100%" }}>
          <Group align="center">
            <Burger
              opened={opened}
              onClick={handlers.toggle}
              size="sm"
              color={theme.colors.gray[6]}
              hiddenFrom="sm"
            />
            <Group align="center" spacing="xs">
              <Title order={4} align="center">
                ArtisanHub 
                <Text c="dimmed">for Artists</Text>
                </Title>
            </Group>
          </Group>
          <Text c="dimmed" size="sm">
            {user?.username || "Guest"}
          </Text>
        </Group>
      </AppShell.Header> */}
      <AppShell.Header>
        <Group h="100%" px="md" align="center" style={{ flex: 1 }}>
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <Group align="center" spacing="xs">
            <PaletteIcon sx={{ color: ['#D97706'], fontSize: 50 }}/>
            <Title order={4} align="center">
              ArtisanHub
              <Text variant="subtle" align="left" size="xs" style={{ color: "#D97706" }}>
                for Artists
              </Text>
            </Title>
          </Group>
          <Group style={{ marginLeft: "auto" }}>
            <Text size="md" fw={600} style={{ marginLeft: "auto", display: "flex,", gap: "5px" }}>
            Welcome, <span style={{ color: "#D97706"}}>{ (fullName) ? fullName : `Guest` }</span>
          </Text>
          {profileImageUrl && <Avatar src={profileImageUrl} alt="Profile" radius="xl" size="md" />}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="xs">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            label={link.label}
            leftSection={link.icon}
            active={location.pathname === link.to}
            onClick={() => {
              navigate(link.to);
            }}
            style={{ marginBottom: theme.spacing.sm,
              // backgroundColor: location.pathname === link.to ? '#D97706' : undefined,
              // color: location.pathname === link.to ? 'white' : undefined,
              borderRadius: 4,
             }}
             variant={location.pathname === link.to ? 'light' : 'subtle'}
             color={location.pathname === link.to ? 'orange' : undefined}
          />
        ))}
        <Group position="center" mt="auto">
          <LogoutButton />
        </Group>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>

      <AppShell.Footer p="xs">
        <Text size="xs" align="center" style={{ flex: 1 }}>
          ArtisanHub © {new Date().getFullYear()}
        </Text>
      </AppShell.Footer>
    </AppShell>
  );
}

export default ArtistLayout;
