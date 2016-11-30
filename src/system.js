import Systemic from 'systemic';
import runner from 'systemic-service-runner';
import _ from 'lodash';
import infra from './infra';
import setup from './infra/setup';

const components = ['basics', 'logging', 'express'];

const system = new Systemic();
_.forEach(components, (component) => {
  setup[component](system, infra);
});

export default system;

export const init = () => {
  runner(system).start((err, sysComponents) => {
    if (err) throw err;
    const { logger } = sysComponents;
    logger.info(`Service has started: ${JSON.stringify(Object.keys(sysComponents))}`);
  });
};
