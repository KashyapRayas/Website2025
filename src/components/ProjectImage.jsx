import React from "react";

const ProjectImage = ({ src, alt }) => {
  const containerStyle = {
    width: "100%",
    padding: "30px",
    boxSizing: "border-box",
    borderRadius: "9px",
    backgroundColor: "var(--off-white)",
    display: "flex",
    justifyContent: "center"
  };

  const imgStyle = {
    width: "100%",        // responsive
    maxWidth: "600px",    // cap at 600px
    aspectRatio: "4 / 3", // maintain 4:3 ratio
    height: "auto",       // let browser calculate height
    borderRadius: "6px",
    backgroundColor: "var(--light-off-teal)",
    objectFit: "cover"    // ensures image fills the box
  };

  return (
    <div style={containerStyle}>
      <img src={src} alt={alt} style={imgStyle} />
    </div>
  );
};

export default ProjectImage;
