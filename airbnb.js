var api = require('./api'),
    models = require('./models');

module.exports = {
  search: api.search,
  Hosting: models.Hosting
};
