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
      .fold(
        (v) => {
          const items = v ? v.map((item) => {
            return {
              id: item.id,
              state: item.state,
              title: item.title,
            };
          }) : []
          return {
            items: items,
          };
        },
        (e) => {
          return {
            items: []
          };
        }
      );

    console.log(r);
  }
}
