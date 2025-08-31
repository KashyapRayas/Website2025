import React from 'react';

const ProjectBigText = ({ text }) => {

    const containerStyle = {
        width: "100%",
        height: "max-content",
        padding: "30px",
        boxSizing: "border-box",
        borderRadius: "9px",
        backgroundColor: "var(--off-white)",
        display: "flex",
        justifyContent: "center"
    };

    const textStyle = {
        width: "100%",
        fontSize: "36px",
        fontWeight: "600",
        color: "var(--off-black)",
        margin: "0",
        textWrap: "wrap"
    }

    return (
        <div style={containerStyle}>
            <h1 style={textStyle}>{text}</h1>
        </div>
    );
};

export default ProjectBigText;
