import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

import router from "./routes/router.js";

const app = express();

// Leer datos de un formulario
app.use(express.json()); // Analiza las solicitudes entrantes con cargas JSON
app.use(express.urlencoded({ extended: true }));

// Subir archivos al servidor
app.use(fileUpload());

// Habilitar y configurar CORS
app.use(cors());

// const whitelist = ["http://localhost:3000", "http://192.168.100.4:3000"];
// const corsOptions = {
// 	origin: function (origin, callback) {
// 		if (whitelist.indexOf(origin) !== -1) callback(null, true);
// 		else callback(new Error("Not allowed by CORS"));
// 	},
// };

// app.use("/", cors(corsOptions), router);
app.use("/", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log("Servidor funcionando en el puerto: ", PORT);
});
