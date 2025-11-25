import React, { memo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';

const ProjectImage = ({ src, alt, caption = "" }) => {
  const [open, setOpen] = useState(false);

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

  const imgWrapperStyle = {
    width: "100%",
    aspectRatio: "16 / 9",
    height: "auto",
    borderRadius: "6px",
    backgroundColor: "var(--light-off-teal)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden", // IMPORTANT: This keeps the zoom inside the rounded corners
    cursor: "pointer",
  };

  const imgStyle = {
    width: "100%",
    aspectRatio: "16 / 9",
    height: "auto",
    objectFit: "cover",
    display: "block",
    // Removed borderRadius here because the wrapper handles it
  };

  const captionStyle = {
    fontWeight: "500",
    fontSize: "14px",
    color: "var(--off-black-06)",
    width: "100%",
    textAlign: "center",
    margin: 0
  };

  return (
    <div style={containerStyle}>
      {/* We use a style tag here to handle the hover state easily */}
      <style>
        {`
          .project-image {
            transition: transform 0.3s ease-in-out;
          }

          /* When hovering the wrapper, scale the image inside */
          .project-image-wrapper:hover .project-image {
            transform: scale(1.02) !important;
          }

          .yarl__button:hover {
            background-color: var(--light-off-teal) !important;
            transition: all 0.2s ease !important;
          }
        `}
      </style>

      <div
        style={imgWrapperStyle}
        className="project-image-wrapper"
        onClick={() => setOpen(true)}
      >
        <img
          src={src}
          alt={alt}
          style={imgStyle}
          className="project-image"
          loading='lazy'
          decoding='async'
        />
      </div>

      {caption !== "" && <h3 style={captionStyle}>{caption}</h3>}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
        plugins={[Zoom]}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
        }}
        zoom={{
          maxZoomPixelRatio: 3,
        }}
        styles={{
          container: { backgroundColor: "var(--off-white)" },
          button: {
            backgroundColor: "var(--off-white)",
            color: "var(--dark-green)",
            filter: "none",
            borderRadius: "6px",
            border: "1px solid var(--off-teal)",
            margin: "0px 6px"
          },
          slide: {
            padding: "18px"
          }
        }}
      />
    </div>
  );
};

export default memo(ProjectImage);
