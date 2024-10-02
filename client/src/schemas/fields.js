import * as yup from "yup";
import appConfig from "../config.jsx";
import { toCapitalCase } from "../utils/changeCase"; // Import the utility function
import moment from "moment";

const isRequired = " is required.";
const invalidFormat = " is not valid.";
const invalidDate = " must be a valid date.";

export const loginSchema = yup.object().shape({
	[appConfig.formFields.username.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.username) + isRequired),
	[appConfig.formFields.password.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.password) + isRequired),
});

export const accountSchema = yup.object().shape({
	[appConfig.formFields.firstName.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.firstName) + isRequired),

	[appConfig.formFields.middleName.toLowerCase()]: yup.string(),
	[appConfig.formFields.lastName.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.lastName) + isRequired),

	[appConfig.formFields.birthdate.toLowerCase()]: yup
		.string()
		.test(
			"valid-date",
			toCapitalCase(appConfig.formFields.birthdate) + invalidDate,
			(value) => moment(value, "MM/DD/YYYY", true).isValid() // Validate date format and value
		)
		.required(toCapitalCase(appConfig.formFields.birthdate) + isRequired),

	[appConfig.formFields.studentNumber.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.studentNumber) + isRequired),

	[appConfig.formFields.department.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.department) + isRequired),

	[appConfig.formFields.medicalHistory.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.medicalHistory) + isRequired),

	[appConfig.formFields.allergies.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.allergies) + isRequired),

	[appConfig.formFields.emergencyContact.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.emergencyContact) + isRequired),

	[appConfig.formFields.relationship.toLowerCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.relationship) + isRequired),

	[appConfig.formFields.contactNumber.toLowerCase()]: yup
		.string()
		.matches(/^\d{10}$/, toCapitalCase(appConfig.formFields.contactNumber) + invalidFormat)
		.required(toCapitalCase(appConfig.formFields.contactNumber) + isRequired),
});
