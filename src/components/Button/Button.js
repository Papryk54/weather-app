import styles from "./Button.module.scss";
import clsx from "clsx";
import PropTypes from "prop-types";

const Button = ({ className, children, onClickAction, type }) => {
	return (
		<button className={clsx(styles.button, className)} onClick={onClickAction} type={type}>
			{children}
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	onClickAction: PropTypes.func,
};

export default Button;
