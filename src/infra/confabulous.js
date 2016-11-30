import Confabulous from 'confabulous';

const { loaders } = Confabulous;

const init = () => {
  const start = (cb) => {
    new Confabulous()
        .add(() => loaders.require({ path: './config/default.json', watch: true }))
        .add(() => loaders.require({ path: `./config/${process.env.NODE_ENV}.json`, watch: true }))
        .add(() => loaders.args())
        .on('loaded', config => cb(null, config))
        .on('error', cb)
        .end();
  };

  return { start };
};

module.exports = init;
