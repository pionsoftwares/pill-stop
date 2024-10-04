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
	[appConfig.formFields.firstName.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.firstName) + isRequired),

	[appConfig.formFields.middleName.toCamelCase()]: yup.string(),
	[appConfig.formFields.lastName.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.lastName) + isRequired),

	[appConfig.formFields.birthdate.toCamelCase()]: yup
		.string()
		.test(
			"valid-date",
			toCapitalCase(appConfig.formFields.birthdate) + invalidDate,
			(value) => moment(value, "MM/DD/YYYY", true).isValid() // Validate date format and value
		)
		.required(toCapitalCase(appConfig.formFields.birthdate) + isRequired),

	[appConfig.formFields.studentNumber.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.studentNumber) + isRequired),

	[appConfig.formFields.department.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.department) + isRequired),

	[appConfig.formFields.medicalHistory.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.medicalHistory) + isRequired),

	[appConfig.formFields.allergies.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.allergies) + isRequired),

	[appConfig.formFields.emergencyContact.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.emergencyContact) + isRequired),

	[appConfig.formFields.relationship.toCamelCase()]: yup
		.string()
		.required(toCapitalCase(appConfig.formFields.relationship) + isRequired),

	[appConfig.formFields.contactNumber.toCamelCase()]: yup
		.string()
		.matches(
			/^(09\d{9}|(\+639)\d{9})$/,
			toCapitalCase(appConfig.formFields.contactNumber) + invalidFormat // Custom error message for invalid format
		)
		.required(toCapitalCase(appConfig.formFields.contactNumber) + isRequired),
});
