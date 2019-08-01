import DonateControl from '../controllers/donate';

export default({ express }) => {
    const donateControl = DonateControl();
    const router = express.Router();

    router.get("/", (req, res) => {
        res.status(200).json({
            status: "success",
            message: "Welcome to the donate page feel free to drop a million naira!!"
        });
    });

    router.post("/", donateControl.getDetails);

    return router;
};