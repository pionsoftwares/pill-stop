export function createTabItem(name, icon, iconOn) {
	return {
		name,
		icon,
		iconOn,
		get section() {
			return this.name.toSnakeCase();
		},
		get to() {
			return `/${this.section}`;
		},
	};
}
