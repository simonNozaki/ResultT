import { App } from "./app";
import { AlwaysErrorGetPriceService } from "./service/get-price-service";

const main = () => {
  const app = new App(new AlwaysErrorGetPriceService());
  app.execute();
};

main();
