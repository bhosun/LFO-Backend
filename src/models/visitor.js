export default ({ Sequelize, db }) => {
	const Visitor = db.define("visitor", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		fullName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		phone: {
			type: Sequelize.STRING,
			allowNull: false
        },
        date: {
			type: Sequelize.STRING,
			allowNull: false
		},
		description: {
            type: Sequelize.STRING,
			allowNull: false
        }
	});

	return Visitor;
};
