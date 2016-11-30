export default () => {
  const start = ({ app, logger }, cb) => {
    app.get('/status', (req, res) => res.json({ ok: true }));
    cb();
  };

  const stop = (cb) => { cb(); };

  return { start, stop };
};
