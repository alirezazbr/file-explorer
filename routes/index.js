module.exports = (app) => {
  app.use('/', (req, res) => {
    res.render('index', { title: 'Hickman' });
  });
};
