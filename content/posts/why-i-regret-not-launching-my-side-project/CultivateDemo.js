import React from 'react';

import cultivateDemoSrc from './demo/cultivate-quick-demo.mp4';

const CultivateDemo = () => {
  return (
    <div
      style={{
        maxWidth: '100%', // Limits the width to the container's boundaries
        margin: '0 auto', // Centres the video within the blog layout
      }}
    >
      <video
        controls
        style={{
          width: '100%', // Ensures the video is responsive
          height: 'auto', // Maintains the aspect ratio
          maxHeight: '600px', // Optional: restrict max height for readability
        }}
      >
        <source src={cultivateDemoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default CultivateDemo;
