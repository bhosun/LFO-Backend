export default ({ jwt }) => {
	const signAdminToken = admin => {
		return jwt.sign(
			{
				admin
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h"
			}
		);
	};

	const verifyToken = async (req, res, next) => {
		let token = req.headers["x-access-token"] || req.headers.authorization; // Express headers are auto converted to lowercase

		if (!token) {
			return (
				res,
				status(400).json({
					status: "error",
					message: "No Auth Token Provided"
				})
			);
		}

		token = token.slice(7, token.length);

		try {
			const decoded = await jwt.verify(token, process.env.JWT_SECRET);
			req.admin = decoded.admin;
			return next();
		} catch (error) {
			return res.status(401).json({
				status: "error",
				message: "Token is not valid"
			});
		}
	};

	return {
		signAdminToken,
		verifyToken
	};
};
