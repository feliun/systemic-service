import requireAll from 'require-all';

module.exports = requireAll({
  dirname: __dirname,
  map: (name) =>
        name.replace(/[_-]([a-z])/g, (m, c) =>
            c.toUpperCase()
        ),
});
