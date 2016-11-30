const init = () => {
  const start = ({ app, manifest }, cb) => {
    app.get('/meta/manifest', (req, res) => {
      res.json(manifest);
    });
    cb();
  };

  return { start };
};

module.exports = init;
