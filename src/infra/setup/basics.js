import EventEmitter from 'events';
import pkg from '../../../package';

const setup = (system, infra) => {
  system
  .add('pkg', pkg)
  .add('emitter', new EventEmitter())
  .add('config', infra.confabulous(), { scoped: true });
};

module.exports = setup;
