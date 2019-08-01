export default({ ChildrenModel }) => {
    
    const addChild = async (req, res) => {
		try {
			const { name, gender, dateOfArrival, dateOfBirth, takenForm, broughtBy, phoneOfEscort } = req.body;
			
			const child = await ChildrenModel.create({
				name,
                gender, 
                dateOfArrival, 
                dateOfBirth, 
                takenForm, 
                broughtBy, 
                phoneOfEscort
			});
			const validChild = {
				id: child.id,
				name: child.name,
				gender: child.gender,
                dateOfArrival: child.dateOfArrival,
                dateOfBirth: child.dateOfBirth,
                takenForm: child.takenForm,
                broughtBy: child.broughtBy,
                phoneOfEscort: child.phoneOfEscort
			};
			// const token = authController.signAdminToken(validAdmin);
			return res.status(201).json({
				status: "success",
				message: "Child Registered",
				// token: `Bearer ${token}`,
				child: validChild
			});
		} catch (err) {
			return res.status(500).json({
				status: "error",
                message: err.message,
                stack: err.stack
			});
		}
    };
    
    const getChildren = async (req, res) => {
		try {
			const child = await ChildrenModel.findAll();
			if (!child) {
				throw new Error("No more children in the database!");
			}
			const validChild = {
				child
			};
			// const token = authController.signAdminToken(validAdmin);
			return res.status(200).json({
				status: "success",
				message: "Children Found!",
				// token: `Bearer ${token}`,
				child: validChild
			});
		} catch (err) {
			return res.status(500).json({
				status: "error",
				message: err.message,
				stack: err.stack
			});
		}
    };
    
    const getSingleChild = async(req, res) => {
        try {
            const { id } = req.params;
            if(id === "") {
                throw new Error('Put a proper Child');
            }
			const child = await ChildrenModel.findOne({ where: { id } });
			if (!child) {
				throw new Error("Child does not exist");
			}
			const validChild = {
				id: child.id,
				name: child.name,
				gender: child.gender,
                dateOfArrival: child.dateOfArrival,
                dateOfBirth: child.dateOfBirth,
                takenForm: child.takenForm,
                broughtBy: child.broughtBy,
                phoneOfEscort: child.phoneOfEscort
			};
			// const token = authController.signAdminToken(validAdmin);
			return res.status(200).json({
				status: "success",
				message: "Single details of child Found!",
				// token: `Bearer ${token}`,
				child: validChild
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
        addChild,
        getChildren,
        getSingleChild
    };
};