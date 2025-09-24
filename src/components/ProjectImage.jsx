import React, { memo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
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

  const imgStyle = {
    width: "100%",
    aspectRatio: "16 / 9",
    height: "auto",
    borderRadius: "6px",
    backgroundColor: "var(--light-off-teal)",
    objectFit: "cover",
    cursor: "pointer"
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
        <style>
        {`
          .yarl__button:hover {
            background-color: var(--light-off-teal) !important;
            transition: all 0.2s ease !important;
          }
        `}
        </style>
        <img
            src={src}
            alt={alt}
            style={imgStyle}
            loading='lazy'
            decoding='async'
            onClick={() => setOpen(true)}
        />
        {caption !== "" && <h3 style={captionStyle}>{caption}</h3>}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[{ src }]}
        render={{
            buttonPrev: () => null,
            buttonNext: () => null,
        }}
        styles={{
            container: { backgroundColor: "var(--off-white)" },
            button : {
                backgroundColor: "var(--off-white)",
                color: "var(--dark-green)",
                filter: "none",
                borderRadius: "6px",
                border: "2px solid var(--off-teal)"
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
