const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");

const routes = [
    {
        path: "/users",
        route: userRoute
    }
];

routes.map((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
