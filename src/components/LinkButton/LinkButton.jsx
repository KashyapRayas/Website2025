import styles from "./LinkButton.module.css";
import { useButtonSounds } from "../../hooks/useButtonSounds";

const LinkButton = ({ isActive = false, linkName, linkTo = "", lenis, onClick, size="small", offset=false}) => {
	const { playHover, playClick } = useButtonSounds();

	let duration = 2
	if(linkName === "ABOUT" && size==="small") duration = 3
	else if(linkName === "CONTACT" && size==="small") duration = 4

	const handleClick = () => {
		playClick();
		// Handle lenis scroll if linkTo is provided
		if(lenis && linkTo !== "") {
            lenis.scrollTo(linkTo, {duration: duration, offset: offset? -60 : 0})
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
		<button className={buttonClassName.trim()} onClick={handleClick} onMouseEnter={playHover}>
			<span className={styles.bracket}>{"<"}</span>
			{linkName}
			<span className={styles.bracket}>{"/>"}</span>
		</button>
	);
};

export default LinkButton;
