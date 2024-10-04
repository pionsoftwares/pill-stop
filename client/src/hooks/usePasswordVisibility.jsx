import { useState } from "react";

const usePasswordVisibility = () => {
	const [visibility, setVisibility] = useState({});

	const toggleVisibility = (fieldName) => {
		setVisibility((prevVisibility) => ({
			...prevVisibility,
			[fieldName]: !prevVisibility[fieldName],
		}));
	};

	const resetVisibility = () => {
		setVisibility({});
	};

	return { visibility, toggleVisibility, resetVisibility };
};

export default usePasswordVisibility;
