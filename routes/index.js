const accountRouter = require('./account');
const cartRouter = require('./cart');
const orderRouter = require('./order');
const productRouter = require('./products');
const userRouter = require('./user');

module.exports = (app, passport) => {
  accountRouter(app);
  cartRouter(app);
  orderRouter(app);
  productRouter(app);
  userRouter(app, passport);
};
