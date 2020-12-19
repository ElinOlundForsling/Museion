import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import CardTransform from './CardTransform';

const getGradientNum = () => {
  return Math.round(Math.random() * 22);
};

function Card(props) {
  const { id, margin, width, borderWidth, dialogBorderWidth, content } = props;
  const gradientId = useMemo(() => getGradientNum(), []);

  return (
    <CardTransform
      node={{ id, gradientId }}
      borderWidth={dialogBorderWidth}
      cardBorderWidth={borderWidth}>
      <div style={{ margin: `${margin}px` }}>
        <motion.div
          className={`card g-${gradientId}`}
          id={id}
          style={{
            width: `${width - margin * 2}px`,
            '--card-box-shadow': `0 0 0 2px rgba(182, 182, 182, 0), inset 0 0 0 ${borderWidth}px white, 0px 0px 2px 0px rgba(0, 0, 0, 0.2)`,
            '--card-box-shadow-hover': `inset 0 0 0 ${borderWidth}px white, 0px 0px 4px 0px rgba(0, 0, 0, 0.2)`,
            '--card-box-shadow-ghost': `0 0 0 2px rgba(182, 182, 182, 0), inset 0 0 0 ${borderWidth}px white, 0px 0px 22px 0px rgba(255, 127, 80, 0.33)`,
          }}
          whileHover={{ scale: 1.006 }}
          whileTap={{
            scale: 0.98,
          }}
          {...props.draggableItem}>
          <motion.article>{content}</motion.article>
        </motion.div>
      </div>
    </CardTransform>
  );
}

export default Card;
