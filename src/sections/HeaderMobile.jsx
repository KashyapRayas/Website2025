import '../App.css'
import styles from './HeaderMobile.module.css'
import LinkButton from '../components/LinkButton/LinkButton';

const HeaderMobile = ({lenis}) => {
    return (
            <header>
                <div className={"extremes-wrapper-left"}>
                    <div className={"extremes"}></div>
                </div>

                <div className={styles["middle"]}>
                    <LinkButton isActive={true} linkName={"HOME"} linkTo={"#HOME"} lenis={lenis}/>
                    <LinkButton isActive={false} linkName={"MENU"} linkTo={"#"} lenis={lenis}/>
                </div>

                <div className={"extremes-wrapper-right"}>
                    <div className={"extremes"}></div>
                </div>
            </header>
    );
};

export default HeaderMobile;
