import ChildrenControl from '../controllers/children';

export default({ express, ChildrenModel }) => {
    const childrenControl = ChildrenControl({ ChildrenModel });
    const router = express.Router();

    router.get("/", childrenControl.getChildren);
    router.get("/:id", childrenControl.getSingleChild);
    router.post("/", childrenControl.addChild);

    return router;
};