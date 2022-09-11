import { runCatching } from '../../src/index';
import { GetItemsService } from './service/get-price-service';

export class App {
  constructor(private getItemervice: GetItemsService){}
  execute() {
    const r = runCatching(() => {
        return this.getItemervice.get();
      })
      .onSuccess((res) => {
        res.forEach((item) => console.log(`Item => ${item}`));
      })
      .onFailure((it) => console.log(`Error caught: ${it}`))
      .getOrThrow();

    console.log(r);
  }
}
