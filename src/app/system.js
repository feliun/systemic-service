import Systemic from 'systemic';
import runner from 'systemic-service-runner';
import loadConfig from './loadConfig';
import loadLogger from './loadLogger';

const system = new Systemic()
        .add('config', loadConfig())
        .add('logger', loadLogger());

export default system;

export const init = () => {
  runner(system).start((err, components) => {
    if (err) throw err;
    const { logger } = components;
    logger.info(`Service has started: ${JSON.stringify(Object.keys(components))}`);
  });
};

// TODO add cluster
