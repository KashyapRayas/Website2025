import React, { memo } from 'react';

const ProjectImage = ({ src, alt }) => {
  const containerStyle = {
    width: "100%",
    padding: "30px",
    boxSizing: "border-box",
    borderRadius: "9px",
    backgroundColor: "var(--off-white)",
    display: "flex",
    justifyContent: "start"
  };

  const imgStyle = {
    width: "100%",
    // maxWidth: "800px",
    aspectRatio: "4 / 3",
    height: "auto",
    borderRadius: "6px",
    backgroundColor: "var(--light-off-teal)",
    objectFit: "cover"
  };

  return (
    <div style={containerStyle}>
      <img src={src} alt={alt} style={imgStyle} loading='lazy' decoding='async'/>
    </div>
  );
};

export default memo(ProjectImage);
