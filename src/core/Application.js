'use strict';
/**
 *  @File : Application
 *  @Autor : FelipeBarros<felipe.barros.pt@gmail.com>
 *  @Description : Application Instance for start HapiServer
 *  @Version : 1.0 [2016-09-17]
 *
*/

const Application = (onStart, onFinish) => {
  const Hapi          = require('hapi');
  const Server        = new Hapi.Server();
  const AppLoader     = require('./AppLoader');
  const Configuration = onStart(AppLoader);

  Server.connection({
    host: Configuration.Host,
    port: Configuration.Port
  });

  Server.route(Configuration.Router.getInstances());
  
  return onFinish(Server);
};

module.exports = Application;