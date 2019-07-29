export default ({ Sequelize, dotenv }) => {
	dotenv.config();

	const sequelize = new Sequelize(process.env.DATABASE_URL, {
		logging: false
    });
    
    return sequelize;
};
