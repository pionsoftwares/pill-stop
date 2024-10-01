import * as yup from "yup";
import appConfig from "../config.jsx";

const isRequired = " is required.";

export const loginSchema = yup.object().shape({
	[appConfig.formFields.username.toLowerCase()]: yup
		.string()
		.required(appConfig.formFields.username.toCapitalCase() + isRequired),
	[appConfig.formFields.password.toLowerCase()]: yup
		.string()
		.required(appConfig.formFields.password.toCapitalCase() + isRequired),
});
