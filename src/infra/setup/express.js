import express from 'systemic-express';
import optional from 'optional';
import path from 'path';
import routes from '../../app/routes';

const manifest = optional(path.join(process.cwd(), 'manifest.json')) || {};
const { server, app, defaultMiddleware } = express;

const setup = (system, infra) => {
  system
  .add('app', app()).dependsOn('config', 'logger')
  .add('manifest', manifest)
  .add('middleware.logger', infra.middleware.prepper()).dependsOn('app')
  .add('routes', routes()).dependsOn('config', 'logger', 'app')
  .add('middleware.meta', infra.middleware.meta()).dependsOn('middleware.logger', 'app', 'manifest')
  .add('middleware.default', defaultMiddleware({ })).dependsOn('config', 'logger', 'app')
  .add('server', server()).dependsOn('config', 'logger', 'app', 'routes', 'middleware.meta');
};

module.exports = setup;
