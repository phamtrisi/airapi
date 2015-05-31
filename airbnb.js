var api = require('./api'),
    models = require('./models');

module.exports = {
  search: api.search,
  info: api.info,
  reviews: api.reviews,
  income: api.income,
  availability: api.availability,
  Hosting: models.Hosting
};
