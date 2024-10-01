// utils/changeCase.js
import * as changeCase from "change-case";

// Add custom methods to String prototype
String.prototype.toCamelCase = function () {
	return changeCase.camelCase(this.toString());
};

String.prototype.toCapitalCase = function () {
	return changeCase.capitalCase(this.toString());
};

String.prototype.toConstantCase = function () {
	return changeCase.constantCase(this.toString());
};

String.prototype.toDotCase = function () {
	return changeCase.dotCase(this.toString());
};

String.prototype.toKebabCase = function () {
	return changeCase.kebabCase(this.toString());
};

String.prototype.toNoCase = function () {
	return changeCase.noCase(this.toString());
};

String.prototype.toPascalCase = function () {
	return changeCase.pascalCase(this.toString());
};

String.prototype.toPascalSnakeCase = function () {
	return changeCase.pascalSnakeCase(this.toString());
};

String.prototype.toPathCase = function () {
	return changeCase.pathCase(this.toString());
};

String.prototype.toSentenceCase = function () {
	return changeCase.sentenceCase(this.toString());
};

String.prototype.toSnakeCase = function () {
	return changeCase.snakeCase(this.toString());
};

String.prototype.toTrainCase = function () {
	return changeCase.trainCase(this.toString());
};

// Add any other methods as necessary
