export default ({ Sequelize, db }) => {
	const Children = db.define("children", {
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false
		},
		gender: {
			type: Sequelize.STRING,
			allowNull: false
        },
        dateOfArrival: {
			type: Sequelize.STRING,
			allowNull: false
        },
        dateOfBirth: {
			type: Sequelize.STRING,
			allowNull: false
        },
        takenForm: {
			type: Sequelize.STRING,
			allowNull: false
        },
        broughtBy: {
            type: Sequelize.STRING,
			allowNull: false
        },
		phoneOfEscort: {
			type: Sequelize.STRING,
			allowNull: false
        },
	});

	return Children;
};
