const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");
const authRouter = require("./auth.route");

const routes = [
    {
        path: "/users",
        route: userRoute
    },
    {
      path: "/auth",
      route: authRouter
    }
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
