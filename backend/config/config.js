module.exports = {
  development: {
    database: "sequelize_project_development",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    database: "sequelize_project_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    database: "sequelize_project_production",
    host: "127.0.0.1",
    dialect: "postgres",
  },
};
