import Systemic from 'systemic';
import runner from 'systemic-service-runner';
import express from 'systemic-express';
import optional from 'optional';
import EventEmitter from 'events';
import path from 'path';
import routes from './infra/routes';
import infra from './infra';
import pkg from '../package';

const manifest = optional(path.join(process.cwd(), 'manifest.json')) || {};

const { server, app, defaultMiddleware } = express;

const system = new Systemic()
                .add('pkg', pkg)
                .add('emitter', new EventEmitter())
                .add('config', infra.confabulous(), { scoped: true })

                .add('transports', infra.transports)
                .add('logger', infra.prepper()).dependsOn('config', 'pkg', 'transports')

                .add('app', app()).dependsOn('config', 'logger')
                .add('manifest', manifest)
                .add('middleware.logger', infra.middleware.prepper()).dependsOn('app')
                .add('routes', routes()).dependsOn('config', 'logger', 'app')
                .add('middleware.meta', infra.middleware.meta()).dependsOn('middleware.logger', 'app', 'manifest')
                .add('middleware.default', defaultMiddleware({ })).dependsOn('config', 'logger', 'app')
                .add('server', server()).dependsOn('config', 'logger', 'app', 'routes', 'middleware.meta');

export default system;

export const init = () => {
  runner(system).start((err, components) => {
    if (err) throw err;
    const { logger } = components;
    logger.info(`Service has started: ${JSON.stringify(Object.keys(components))}`);
  });
};
