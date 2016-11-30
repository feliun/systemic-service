import _ from 'lodash';
import onHeaders from 'on-headers';
import prepper from 'prepper';

const { handlers } = prepper;

const init = () => {
  const start = ({ app }, cb) => {
    app.use((req, res, next) => {
      const logger = req.app.locals.logger.child({ handlers: [
        new handlers.Tracer({ tracer: req.get('x-request-id') }),
        new handlers.Merge(_.pick(req, ['url', 'method', 'headers', 'params']), { key: 'request' }),
      ] });

      onHeaders(res, () => {
        const response = { response: { statusCode: res.statusCode, headers: res.headers } };
        if (res.statusCode < 400) logger.debug(req.url, response);
        else if (res.statusCode < 500) logger.warn(req.url, response);
        else logger.error(req.url, response);

        if (req.get('x-request-id')) res.set('x-request-id', req.get('x-request-id'));
      });

      res.locals.logger = logger;

      next();
    });
    cb();
  };

  return { start };
};

module.exports = init;
