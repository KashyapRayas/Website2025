import styles from "./LinkButton.module.css";

const LinkButton = ({ isActive = false, linkName, linkTo = "", lenis, onClick, size="small", offset=false}) => {
	const handleClick = () => {
		// Handle lenis scroll if linkTo is provided
		if(lenis && linkTo !== "") {
            lenis.scrollTo(linkTo, {duration: 2, offset: offset? -60 : 0})
        }

        // Call the onClick callback if provided
		if (onClick) {
			onClick();
		}
	};

	// Build the className string conditionally
	const buttonClassName = `${styles.navLink} ${size === "large" ? styles.large : ""} ${isActive ? styles.active : ""}`;

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
