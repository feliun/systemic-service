import Confabulous from 'confabulous';

const { loaders } = Confabulous;

export default () => {
  const start = (cb) => {
    new Confabulous()
    .add(() => loaders.require({ path: './config/default.json', watch: true }))
    .add(() => loaders.require({ path: `./config/${process.env.NODE_ENV}.json`, watch: true }))
    .add(() => loaders.args())
    .end(cb);
  };

  const stop = (cb) => { cb(); };

  return { start, stop };
};
