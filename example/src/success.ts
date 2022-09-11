import { App } from "./app";
import { DefaultGetPriceService } from "./service/get-price-service";

const main = async () => {
  const app = new App(new DefaultGetPriceService());
  await app.execute();
};

main();
