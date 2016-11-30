import Systemic from 'systemic';
import runner from 'systemic-service-runner';
import express from 'systemic-express';
import loadConfig from './loadConfig';
import loadLogger from './loadLogger';
import routes from './routes';

const { server, app, defaultMiddleware } = express;

const system = new Systemic()
                .add('config', loadConfig(), { scoped: true })
                .add('logger', loadLogger())
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
