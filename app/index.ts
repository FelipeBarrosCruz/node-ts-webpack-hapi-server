'use strict';

export class Router
{
  constructor(Injector: Object) {
    return this;
  }

  getInstances(): Array<Object> {
    return [{
      method: 'GET',
      path: '/',
      config: {
        tags: ['api'],
        description: 'Retrieves the user details',
        notes: 'Returns a 200 with the user details',
        handler: (request, reply) => {
          return reply('Ola mundo');
        }
      }
    }];
  }
}