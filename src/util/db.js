// require('dotenv').config()

export default ({ Sequelize, dotenv }) => {
	// require('dotenv').config();

	const sequelize = new Sequelize('lfo', 'postgres', 'bosunbosun71', {
		host: 'localhost',
		dialect: 'postgres',
		logging: false
    });
    
    return sequelize;
};
