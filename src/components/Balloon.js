// src/components/Balloon.js
import { motion } from 'framer-motion';

const Balloon = ({ color, size, position }) => {
  return (
    <motion.div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        position: 'absolute',
        ...position,
      }}
      animate={{
        y: [position.top, '-100vh'],
        transition: { duration: 10, ease: 'linear' },
      }}
    />
  );
};

export default Balloon;
