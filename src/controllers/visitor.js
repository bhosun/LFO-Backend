export default({ VisitorModel }) => {
    
    const addVisitor = async (req, res) => {
		try {
            const { fullName, email, phone, date, description } = req.body;

			const visitor = await VisitorModel.create({
                fullName, 
                email, 
                phone, 
                date,
                description
			});
			const validVisitor = {
				id: visitor.id,
				fullName: visitor.name,
                email: visitor.email,
                phone: visitor.phone,
                date: visitor.date,
                description: visitor.description
			};
			// const token = authController.signAdminToken(validAdmin);
			return res.status(201).json({
				status: "success",
				message: "Visitor visit/details Registered",
				// token: `Bearer ${token}`,
				visitor: validVisitor
			});
		} catch (err) {
			return res.status(500).json({
				status: "error",
                message: err.message,
                stack: err.stack
			});
		}
    };
    
    const getVisitor = async (req, res) => {
		try {
			const visitor = await VisitorModel.findAll();
			if (!visitor) {
				throw new Error("No visitors and their details!");
			}
			const validVisitor = {
				visitor
			};
			// const token = authController.signAdminToken(validAdmin);
			return res.status(200).json({
				status: "success",
				message: "Children Found!",
				// token: `Bearer ${token}`,
				visitors: validVisitor
			});
		} catch (err) {
			return res.status(500).json({
				status: "error",
				message: err.message,
				stack: err.stack
			});
		}
    };
    
    const getSingleVisitor = async(req, res) => {
        try {
            const { id } = req.params;
            if(id === "") {
                throw new Error('Put a proper Child');
            }
			const visitor = await VisitorModel.findOne({ where: { id } });
			if (!visitor) {
				throw new Error("Visior does not exist");
			}
			const validVisitor = {
				id: visitor.id,
				fullName: visitor.name,
                email: visitor.email,
                phone: visitor.phone,
                date: visitor.date,
                description: visitor.description
			};
			// const token = authController.signAdminToken(validAdmin);
			return res.status(200).json({
				status: "success",
				message: "Single details of child Found!",
				// token: `Bearer ${token}`,
				visitor: validVisitor
			});
		} catch (err) {
			return res.status(500).json({
				status: "error",
				message: err.message,
				stack: err.stack
			});
		}
    };

    return {
        addVisitor,
        getVisitor,
        getSingleVisitor
    };
};