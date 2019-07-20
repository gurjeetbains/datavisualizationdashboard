const user,password,server,DB;
let config={
  databaseConfig: {//database Configurations
      user: user,//Your username
      password: password,// Your password
      server: server,//Your server name
      database: DB,//Your Database
      connectionTimeout: 300000,
      requestTimeout: 300000,
      pool: {
        idleTimeoutMillis: 300000,
        max: 100
    }
  }
};

module.exports = config;
