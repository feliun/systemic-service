import Systemic from 'systemic';
import runner from 'systemic-service-runner';
import express from 'systemic-express';
import optional from 'optional';
import EventEmitter from 'events';
import path from 'path';
import routes from './routes';
import infra from '../infra';
import pkg from '../../package';

const manifest = optional(path.join(process.cwd(), 'manifest.json')) || {};

const { server, app, defaultMiddleware } = express;

const system = new Systemic()
                .add('config', infra.confabulous(), { scoped: true })
                .add('pkg', pkg)
                .add('emitter', new EventEmitter())
                .add('manifest', manifest)
                .add('transports', infra.transports)
                .add('logger', infra.prepper()).dependsOn('config', 'pkg', 'transports')
                .add('app', app()).dependsOn('config')
                .add('routes', routes()).dependsOn('app', 'logger')
                .add('middleware.default', defaultMiddleware()).dependsOn('routes', 'app')
                .add('server', server()).dependsOn('config', 'app', 'middleware.default');

export default system;

export const init = () => {
  runner(system).start((err, components) => {
    if (err) throw err;
    const { logger } = components;
    logger.info(`Service has started: ${JSON.stringify(Object.keys(components))}`);
  });
};
