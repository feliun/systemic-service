import _ from 'lodash';
import prepper from 'prepper';

const { handlers } = prepper;

const init = (options = {}) => {
  const start = (dependencies, cb) => {
    const transport = options.transport !== undefined ? options.transport : _.get(dependencies.transports, dependencies.config.transport);
    const pkg = dependencies.pkg || { name: 'unknown' };

    const logger = new prepper.Logger([
      new handlers.Merge({ service: { name: pkg.name, env: process.env.NODE_ENV } }),
    ]).on('message', (event) => {
      if (transport) transport(event);
    });

    cb(null, logger);
  };

  return { start };
};

module.exports = init;

