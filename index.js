'use strict';
/**
 *  @File : index.js
 *  @Autor : FelipeBarros<felipe.barros.pt@gmail.com>
 *  @Description : Entry point for Application
 *  @Version : 1.0 [2016-09-17]
 *
*/
const Application = require('./src/Application');

Application((Server) => {
  const Import = require('./dist/app.js');
  return {
    Router: new Import.Router(),
    Host:   'localhost',
    Port:   8000
  };
}, (Server) => {
  Server.start((err) => {
    if (err) {
      throw err;
    }
    console.log('Server Running at: %s', Server.info.uri);
  })
});