'use client';

import React from 'react';

const CultivateDemo = () => {
  return (
    <div
      style={{
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <video
        controls
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '600px',
        }}
      >
        <source src="/cultivate-quick-demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CultivateDemo;
