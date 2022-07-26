import * as fs from "node:fs";

export const getTree = (req, res) => {
	const path = req.originalUrl.slice(1);
	let content = [];

	if (!fs.existsSync(path))
		return res.json({
			message: "Folder doesn't exist",
		});

	fs.readdir(path, { withFileTypes: "true" }, (error, files) => {
		if (error) console.log(error);

		files.forEach((file) => {
			content.push({
				path: "/" + path + "/" + file.name,
				isFile: file.isFile(),
			});
		});

		res.json(content);
	});
};

export const createFolder = (req, res) => {
	const path = req.body.path.slice(1);

	if (fs.existsSync(path))
		return res.json({
			message: "Folder already exist",
		});

	fs.mkdir(path, (error) => {
		if (error) console.log(error);

		return res.json({
			message: "Folder added successfully",
		});
	});
};

export const uploadFiles = (req, res) => {
	if (!req.files) {
		return res.status(400).send("No files were uploaded.");
	}

	const path = req.body.path.slice(1) + "/";
	const files = req.files.file;

	if (!fs.existsSync(path))
		return res.json({
			message: "Folder doesn't exist",
		});

	const name = path + files.name;

	if (fs.existsSync(name))
		return res.json({
			message: "File already exist",
		});

	const ext = name.split(".").filter(Boolean).slice(1).join(".");

	const invalidExtensions = ["exe", "sh", "bin", "bat", "js"];

	if (invalidExtensions.includes(ext)) return;
	files.mv(name, (error) => {
		if (error) console.log(error);
	});

	return res.json({
		message: "File(s) upload",
	});
};

export const downloadFiles = (req, res) => {
	const name = req.params.id;
	const path = req.params[0] + "/" + name;

	try {
		res.download(path, name, (error) => {
			if (error) console.log(error);
			else {
				console.log(`Downloaded file: ${name}`);
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export const renameFile = (req, res) => {
	const name = req.params.id;
	const path = req.params[0] + "/" + name;

	const newName = req.body.newName;
	const newPath = req.params[0] + "/" + newName;

	console.log(req.body);

	if (fs.existsSync(newPath))
		return res.json({
			message: "File already exist",
		});

	fs.rename(path, newPath, (error) => {
		if (error) console.log(error);
		else
			res.json({
				message: "Renamed file",
			});
	});
};

export const deleteFile = (req, res) => {
	const name = req.params.id;
	const path = req.params[0] + "/" + name;

	if (fs.existsSync(path)) {
		fs.rm(path, { recursive: true }, (error) => {
			if (error) console.log(error);
			else
				res.json({
					message: "Deleted file",
				});
		});
	}
};
