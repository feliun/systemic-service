const setup = (system, infra) => {
  system
  .add('transports', infra.transports)
  .add('logger', infra.prepper()).dependsOn('config', 'pkg', 'transports');
};

module.exports = setup;
