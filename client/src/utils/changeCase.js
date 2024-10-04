import * as changeCase from "change-case";

// Standalone functions
export const toCamelCase = (str) => changeCase.camelCase(str);
export const toCapitalCase = (str) => changeCase.capitalCase(str);
export const toConstantCase = (str) => changeCase.constantCase(str);
export const toDotCase = (str) => changeCase.dotCase(str);
export const toKebabCase = (str) => changeCase.kebabCase(str);
export const toNoCase = (str) => changeCase.noCase(str);
export const toPascalCase = (str) => changeCase.pascalCase(str);
export const toPascalSnakeCase = (str) => changeCase.pascalSnakeCase(str);
export const toPathCase = (str) => changeCase.pathCase(str);
export const toSentenceCase = (str) => changeCase.sentenceCase(str);
export const toSnakeCase = (str) => changeCase.snakeCase(str);
export const toTrainCase = (str) => changeCase.trainCase(str);

// Add methods to String prototype safely
if (!String.prototype.toCamelCase) {
	String.prototype.toCamelCase = function () {
		return changeCase.camelCase(this.toString());
	};
}

if (!String.prototype.toCapitalCase) {
	String.prototype.toCapitalCase = function () {
		return changeCase.capitalCase(this.toString());
	};
}

if (!String.prototype.toConstantCase) {
	String.prototype.toConstantCase = function () {
		return changeCase.constantCase(this.toString());
	};
}

if (!String.prototype.toDotCase) {
	String.prototype.toDotCase = function () {
		return changeCase.dotCase(this.toString());
	};
}

if (!String.prototype.toKebabCase) {
	String.prototype.toKebabCase = function () {
		return changeCase.kebabCase(this.toString());
	};
}

if (!String.prototype.toNoCase) {
	String.prototype.toNoCase = function () {
		return changeCase.noCase(this.toString());
	};
}

if (!String.prototype.toPascalCase) {
	String.prototype.toPascalCase = function () {
		return changeCase.pascalCase(this.toString());
	};
}

if (!String.prototype.toPascalSnakeCase) {
	String.prototype.toPascalSnakeCase = function () {
		return changeCase.pascalSnakeCase(this.toString());
	};
}

if (!String.prototype.toPathCase) {
	String.prototype.toPathCase = function () {
		return changeCase.pathCase(this.toString());
	};
}

if (!String.prototype.toSentenceCase) {
	String.prototype.toSentenceCase = function () {
		return changeCase.sentenceCase(this.toString());
	};
}

if (!String.prototype.toSnakeCase) {
	String.prototype.toSnakeCase = function () {
		return changeCase.snakeCase(this.toString());
	};
}

if (!String.prototype.toTrainCase) {
	String.prototype.toTrainCase = function () {
		return changeCase.trainCase(this.toString());
	};
}
