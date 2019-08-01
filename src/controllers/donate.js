export default() => {
    const getDetails = async (req, res) => {
        try {
            const { fullName, amount, description } = req.body;
            if (!fullName || ! amount || !description) {
                throw new Error("Kindly fill all the details!");
            } else {
                res.status(200).json({
                    status: "success",
                    message: "Thanks for donating!! we're really grateful"
                });
            }
        } catch (err){
            res.status(500).json({
                status: "error",
                message: err.message
            });
        }
    }
    return {
        getDetails
    };
};