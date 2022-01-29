/* eslint-disable require-jsdoc */
import {Resultt} from '../src';

interface Response {
    data: string
}

class MainService {
  execute(): Response {
    throw new Error('Error on class MainService');
  }
}

const main = () => {
  Resultt.runCatching(() => {
    return new MainService().execute();
  }).onFailure((it) => {
    console.log(it.name);
  });

  const result2 = Resultt.runCatching(() => {
    return new MainService().execute();
  }).fold(
      () => {
        return {
          data: 'DEFAULT',
        };
      },
      () => {
        console.log('Failed');
        return {
          data: 'FAILED',
        };
      },
  );

  console.log(result2.data);
};

main();
