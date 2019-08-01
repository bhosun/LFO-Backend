import '@babel/polyfill';
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";
import Sequelize from "sequelize";
import bcrypt from "bcrypt";
import listEndpoints from "express-list-endpoints";
import initializeDbConnection from "./util/db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { debugLogger, prettyStringify } from "./util/logger/index";

//Models
import admins from "./models/admins";
import children from './models/children';
import visitors from './models/visitor';

//Routes
import authRouter from "./routes/auth";
import donateRoutes from './routes/donate';
import childrenRoutes from './routes/children';
import visitorRoutes from './routes/visitor';

const URL_PREFIX = "/api/v1";
const PORT = 7000;

const db = initializeDbConnection({ Sequelize, dotenv });

// Connect to Database
db.sync()
	.then(() => {
		console.log("DB Connection has been established");
		app.listen(PORT);
		console.log("App Running on PORT", PORT);
	})
	.catch(err => {
		console.error("Failed To connect to Database", err);
	});

const adminModel = admins({
	Sequelize,
	db
});

const childrenModel = children({
	Sequelize,
	db
});

const visitorModel = visitors({
	Sequelize,
	db
});

const app = express();
app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

// Enable CORS
app.use((req, res, next) => {
	debugLogger(`Request body: ${prettyStringify(req.body)}`);
	debugLogger(`Request params: ${prettyStringify(req.params)}`);
	debugLogger(`Request headers: ${prettyStringify(req.headers)}`);
	res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization"
	);
	res.header(
		"Access-Control-Request-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, X-Access-Token, Authorization"
	);
	next();
});

// Landing Page
app.get(`${URL_PREFIX}/`, (req, res) => {
	res.status(200).json({
		status: "Success",
		message: "Welcome to the living foundation Orphanage Home"
	});
});

// Contact Page
app.get(`${URL_PREFIX}/contact`, (req, res) => {
	res.status(200).json({
		status: "success",
		message: "welcome to the contact page get other details of the Orpahange here!!"
	});
});

// Donations Page
app.use(
	`${URL_PREFIX}/donate`,
	donateRoutes({ express })
);

// Children Page
app.use(
	`${URL_PREFIX}/children`,
	childrenRoutes({ express, ChildrenModel: childrenModel })
);

// Visitors Page
app.use(
	`${URL_PREFIX}/visitors`,
	visitorRoutes({ express, VisitorModel: visitorModel })
);

// Authentication Route
app.use(
	`${URL_PREFIX}/auth`,
	authRouter({ express, AdminModel: adminModel, jwt, bcrypt })
);

// General Endpoints
app.use(`${URL_PREFIX}/endpoints`, (req, res) =>
	res.status(200).json(listEndpoints(app))
);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	res.status(404).json({
		error: ["Path does not exist"],
		status: 404,
		message: "This route doesn't exist for you!"
	});
	next();
});

export default app;
