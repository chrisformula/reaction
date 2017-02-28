import bunyan from "bunyan";
import { Logs } from "/lib/collections";
import { Reaction } from "/server/api";

const level = "INFO";

class BunyanMongo {}


BunyanMongo.prototype.write = Meteor.bindEnvironment((logData) => {
  const avalog = { logType: "avalara", shopId: Reaction.getShopId(), data: logData };
  Logs.insert(avalog);
});

const streams = [
  {
    type: "raw",
    stream: new BunyanMongo()
  }
];


const Avalogger = bunyan.createLogger({
  level,
  name: "Avalara",
  streams
});

export default Avalogger;