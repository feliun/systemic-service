import prepper from 'prepper';

export default () => {
  const start = (cb) => {
    const logger = new prepper.Logger().on('message', (event) => {
      // TODO: Replace with your logger of choice
      console.log(event.level.toUpperCase(), event.message);
    });
    cb(null, logger);
  };

  const stop = (cb) => { cb(); };

  return { start, stop };
};
