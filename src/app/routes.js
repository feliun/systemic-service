import onHeaders from 'on-headers';

export default () => {
  const start = ({ app, logger }, cb) => {
    const logRequest = (req, res, next) => {
      onHeaders(res, () => {
        const response = { response: { statusCode: res.statusCode } };
        if (res.statusCode < 400) logger.info(req.url, response);
        else if (res.statusCode < 500) logger.warn(req.url, response);
        else logger.error(req.url, response);
      });
      next();
    };

    app.get('/status', logRequest, (req, res) => res.json({ ok: true }));

    cb();
  };

  const stop = (cb) => { cb(); };

  return { start, stop };
};
