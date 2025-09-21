import React, { memo } from 'react';

const ProjectImage = ({ src, alt, caption="" }) => {
  const containerStyle = {
    width: "100%",
    padding: "30px",
    boxSizing: "border-box",
    borderRadius: "9px",
    backgroundColor: "var(--off-white)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "12px"
  };

  const imgStyle = {
    width: "100%",
    // maxWidth: "800px",
    aspectRatio: "16 / 9",
    height: "auto",
    borderRadius: "6px",
    backgroundColor: "var(--light-off-teal)",
    objectFit: "cover"
  };

  const captionStyle = {
    fontWeight: "500",
    fontSize: "14px",
    color: "var(--off-black-06)",
    width: "100%",
    textAlign: "center",
    textWrap: "wrap",
    margin: 0
  };

  return (
    <div style={containerStyle}>
        <img src={src} alt={alt} style={imgStyle} loading='lazy' decoding='async'/>
        {caption !== "" && <h3 style={captionStyle}>{caption}</h3>}
    </div>
  );
};

export default memo(ProjectImage);
