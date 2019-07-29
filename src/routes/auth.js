import AdminController from "../controllers/admin";
import AuthController from "../controllers/auth";

export default ({ express, AdminModel, jwt, bcrypt }) => {
	const authController = AuthController({ jwt });
	const adminController = AdminController({
		AdminModel,
		bcrypt,
		authController
    });
	const router = express.Router();

	router.post("/signup", adminController.adminSignup);

    router.post("/login", adminController.adminLogin);
    
	return router;
};
