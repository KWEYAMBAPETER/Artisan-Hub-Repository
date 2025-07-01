// src/components/SlidingNotification.jsx
import { useEffect, useState } from "react";
import { Transition, Paper, Text, Title } from "@mantine/core";

export default function SlidingNotification({
  type,
  message,
  duration = 3000,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), duration);
      return () => clearTimeout(timeout);
    }
  }, [duration]);

  const bgColor = type === "error" ? "#ffe3e3" : "#d3f9d";
  const color = type === "error" ? "red" : "green";
  const title = type === "error" ? "Error" : "Success"

  return (
    // <Transition
    //   mounted={visible}
    //   transition="slide-up"
    //   duration={300}
    //   timingFunction="ease"
    // >
    //   {(styles) => (
    //     <Paper
    //       shadow="md"
    //       p="md"
    //       radius="md"
    //       style={{
    //         position: 'fixed',
    //         top: 20,
    //         right: 20,
    //         zIndex: 1000,
    //         ...styles,
    //       }}
    //       withBorder
    //       bg={color === 'green' ? 'teal.1' : 'red.1'}
    //     >
    //       <Text c={color}>{message}</Text>
    //     </Paper>
    //   )}
    // </Transition>

    <Transition
      mounted={visible}
      transition="slide-down"
      duration={300}
      timingFunction="ease"
    >
      {(styles) => (
        <Paper
          withBorder
          shadow="md"
          p="md"
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            zIndex: 9999,
            backgroundColor: bgColor,
            ...styles,
          }}
        >
          <Title order={5} c={color}>
            {title}
          </Title>
          <div>{message}</div>
        </Paper>
      )}
    </Transition>
  );
}
