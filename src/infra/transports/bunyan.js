import bunyan from 'bunyan';
import _ from 'lodash';
import { name } from '../../../package.json';

const log = bunyan.createLogger({ name });

const init = (event) => {
  log[event.level](_.omit(['level', 'message'], event), event.message);
};

module.exports = init;
