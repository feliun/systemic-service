import chalk from 'chalk';
import hogan from 'hogan.js';
import _ from 'lodash';

const response = hogan.compile('{{{displayTracer}}} {{{displayLevel}}} {{{request.method}}} {{{response.statusCode}}} {{{request.url}}}');
const error = hogan.compile('{{{displayTracer}}} {{{displayLevel}}} {{{message}}} {{{code}}}\n{{{error.stack}}} {{{details}}}');
const info = hogan.compile('{{{displayTracer}}} {{{displayLevel}}} {{{message}}} {{{details}}}');

const colours = {
  debug: chalk.gray,
  info: chalk.white,
  warn: chalk.yellow,
  error: chalk.red,
  default: chalk.white,
};

const init = (event) => {
  const details = _.pick([], event);
  const data = _.merge(event, {
    displayTracer: _.has(event, 'tracer') ? _.padEnd(event.tracer.substr(0, 16), 16) : _.padEnd('', 16, '-'),
    displayLevel: event.level.toUpperCase(),
    details: _.keys(details).length ? `\n ${JSON.stringify(details, null, 2)}` : '',
  });
  const colour = colours[event.level] || colours.default;
  const log = console[event.level] || console.info; // eslint-disable-line no-console
  if (_.has(event, 'response.statusCode')) log(colour(response.render(data)));
  else if (_.has(event, 'error.message')) log(colour(error.render(data)));
  else log(colour(info.render(data)));
};

module.exports = init;
