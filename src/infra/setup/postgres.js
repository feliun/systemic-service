import postgres from 'systemic-pg';

const setup = (system) => {
  system
  .add('postgres', postgres()).dependsOn('config', 'logger');
};

module.exports = setup;
