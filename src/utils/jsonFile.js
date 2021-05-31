import fs from 'fs';

const jsonFile = {
	write: (filePath, obj) => {
		const isJSONFile = filePath.toLowerCase().slice(-4) === '.json';
		if (!isJSONFile) {
			throw new Error('Only JSON file is supported!');
		}

		const data = JSON.stringify(obj);
		fs.writeFile(filePath, data, 'utf-8', (err) => {
			if (err) {
				throw err;
			}
		});
	},

	writeSync: (filePath, obj) => {
		const isJSONFile = filePath.toLowerCase().slice(-4) === '.json';
		if (!isJSONFile) {
			throw new Error('Only JSON file is supported!');
		}

		return new Promise((resolve, reject) => {
			const data = JSON.stringify(obj);
			fs.writeFile(filePath, data, 'utf-8', (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},

	readSync: (filePath) => {
		const isJSONFile = filePath.toLowerCase().slice(-4) === '.json';
		if (!isJSONFile) {
			throw new Error('Only JSON file is supported!');
		}

		return new Promise((resolve, reject) => {
			fs.readFile(filePath, 'utf-8', (err, data) => {
				if (err) {
					reject(err);
				} else {
					const obj = JSON.parse(data);
					resolve(obj);
				}
			});
		});
	}
};

export default jsonFile;
