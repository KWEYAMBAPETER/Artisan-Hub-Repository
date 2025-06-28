// src/components/SlidingNotification.jsx
import { useEffect, useState } from 'react';
import { Transition, Paper, Text } from '@mantine/core';

export default function SlidingNotification({ message, color = 'green', duration = 4000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  return (
    <Transition
      mounted={visible}
      transition="slide-up"
      duration={300}
      timingFunction="ease"
    >
      {(styles) => (
        <Paper
          shadow="md"
          p="md"
          radius="md"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            ...styles,
          }}
          withBorder
          bg={color === 'green' ? 'teal.1' : 'red.1'}
        >
          <Text c={color}>{message}</Text>
        </Paper>
      )}
    </Transition>
  );
}