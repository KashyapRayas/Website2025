import styles from "./LinkButton.module.css";

const LinkButtonFooter = ({ linkName, linkTo = "", lenis, onClick, offset=false}) => {
	const handleClick = () => {
		// Handle lenis scroll if linkTo is provided
		if(lenis && linkTo !== "https://2022.kashyaprayas.com" && linkTo !=="") {
            lenis.scrollTo(linkTo, {duration: 2, offset: offset? -60 : 0})
        }

        if(linkTo === "https://2022.kashyaprayas.com") {
            window.open(linkTo, "_blank");
        }
        // Call the onClick callback if provided
		if (onClick) {
			onClick();
		}
	};
	return (
		// Use the combined className string
		<button className={styles.navLinkFooter} onClick={handleClick}>
			<span className={styles.bracket}>{"<"}</span>
			{linkName}
			<span className={styles.bracket}>{"/>"}</span>
		</button>
	);
};

export default LinkButtonFooter;
