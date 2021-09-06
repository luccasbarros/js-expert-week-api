import { logger } from "./logger";

export default class Routes {
  io;
  constructor() {}

  setSocketInstance(io) {
    this.io = io;
  }

  async defaultRoute(request, response) {
    response.end("hello world");
  }

  async options(request, response) {
    response.writeHead(204);
    response.end("hello world");
  }

  async post(request, response) {
    logger.info("ae");
    response.end();
  }

  async get(request, response) {
    logger.info("ae");
    response.end();
  }

  handler(request, response) {
    response.end("hello world");
  }
}
