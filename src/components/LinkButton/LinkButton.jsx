import React from "react";
import styles from "./LinkButton.module.css";

const LinkButton = ({ isActive = false, linkName, linkTo, lenis }) => {
	const handleClick = () => {
		if(lenis) {
            lenis.scrollTo(linkTo, {duration: 2})
        }
	};

	// Build the className string conditionally
	const buttonClassName = `${styles.navLink} ${isActive ? styles.active : ""}`;

	return (
		// Use the combined className string
		<button className={buttonClassName.trim()} onClick={handleClick}>
			<span className={styles.bracket}>{"<"}</span>
			{linkName}
			<span className={styles.bracket}>{"/>"}</span>
		</button>
	);
};

export default LinkButton;
