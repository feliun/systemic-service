import _ from 'lodash';
import expect from 'expect.js';
import system from '../src/app/system';

describe('Example test', () => {
  let components = [];

  before((done) => {
    system.start((err, ctx) => {
      if (err) return done(err);
      components = _.keys(ctx);
      done();
    });
  });

  after((done) => {
    system.stop(done);
  });

  it('should initialise all components', () => {
    const expectedComponents = ['config', 'logger'];
    const comparison = _.differenceWith(expectedComponents, components, _.isEqual);
    expect(comparison).to.eql([]);
  });
});
