import Systemic from 'systemic';
import Confabulous from 'confabulous';
import runner from 'systemic-service-runner';
import prepper from 'prepper';

const { loaders } = Confabulous;

let logger;
let system;

const setupLogger = () => {
  logger = new prepper.Logger().on('message', (event) => {
      // TODO: Replace with your logger of choice
    console.log(event.level.toUpperCase(), event.message);
  });
};

const loadConfig = () => new Promise((resolve, reject) => {
  new Confabulous()
      .add(() => loaders.require({ path: './config/default.json', watch: true }))
      .add(() => loaders.require({ path: `./config/${process.env.NODE_ENV}.json`, watch: true }))
      .add(() => loaders.args())
      .end((err, config) => {
        if (err) return reject(err);
        resolve(config);
      });
});

export const init = () => {
  setupLogger();
  loadConfig()
    .then((config) => {
      system = new Systemic().add('config', config);
      runner(system).start((err, components) => {
        if (err) throw err;
        logger.info(`Service has started: ${JSON.stringify(components)}`);
      });
    })
    .catch((e) => {
      logger.error('Start error: ', e.toString());
      system.stop((stopErr) => {
        if (stopErr) logger.error('Stop error: ', stopErr.toString());
      });
    });
};
