import VisitorController from '../controllers/visitor';

export default({ express, VisitorModel }) => {
    const visitorController = VisitorController({ VisitorModel });
    const router = express.Router();

    router.get("/", (req, res) => {
        res.status(200).json({
            status: "successs",
            message: "Welcome to the visitor Page kindly fill in your details"
        });
    });
    router.post("/", visitorController.addVisitor);
    router.get("/all", visitorController.getVisitor)
    router.get("/:id", visitorController.getSingleVisitor);

    return router;
};