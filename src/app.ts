import express from "express";

/**
 * Our express application.
 *
 * The reason we're defining it here instead of in the loader
 * is because of tests and dependency injection. With the
 * app being independently initialized with no config, we
 * can have the application itself and the tests configure
 * it separately in whatever way they need.
 */
const app = express();

export default app;
