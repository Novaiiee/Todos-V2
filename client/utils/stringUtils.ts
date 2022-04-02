export const firstCharToUpper = (str: string) => str[0].toUpperCase() + str.substring(1, str.length);

export const trim = (str: string, length: number) => {
	const list = str.split(" ");
	const trimmed = list.map((str, i) => {
		if (i > length) return "";
		return str;
	});

	return trimmed.join(" ").trim();
};
