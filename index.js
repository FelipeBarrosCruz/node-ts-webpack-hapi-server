'use strict';
/**
 *  @File : index.js
 *  @Autor : FelipeBarros<felipe.barros.pt@gmail.com>
 *  @Description : Entry point for Application
 *  @Version : 1.0 [2016-09-17]
 *
*/

const ENV = process.env.NODE_ENV 
          = process.env.NODE_ENV 
          || 'development';

const Application = require('./src/core/Application');

const onStart = (AppLoader) => {
  const Import = require(`./dist/app.js`);
  const Config = require(`./env/${ENV}.js`);

  return {
    Router: new Import.Router(AppLoader),
    Host:   Config.Host,
    Port:   Config.Port
  };
};

const onFinish = (Server) => {
  Server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server Running at: %s', Server.info.uri);
  });

  return Server;
}

module.exports = Application(onStart, onFinish);