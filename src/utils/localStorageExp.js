const setItemExp = (key, value, ttl) => {
	const exp = Date.now() + ttl;
	const item = { value, exp };
	localStorage.setItem(key, JSON.stringify(item));
};

const getItemExp = (key) => {
	const itemStr = localStorage.getItem(key);
	if (!itemStr) {
		return null;
	}

	const item = JSON.parse(itemStr);
	const now = Date.now();
	if (now > item.exp) {
		localStorage.removeItem(key);
		return null;
	}
	return item.value;
};

const removeItemExp = (key) => {
	localStorage.removeItem(key);
};

const localStorageExp = {
	setItemExp,
	getItemExp,
	removeItemExp
};

export default localStorageExp;
