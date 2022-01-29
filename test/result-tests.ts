import {Resultt} from '../src/result';

describe('Result test', () => {
    interface UnitTestingResponse {
        data: string
    }

    /**
     * Sample logic class for unit testing
     */
    class UnitTestingService {
      /**
       * @param {string} value
       * @return {UnitTestingResponse}
       */
      execute(value: string): UnitTestingResponse {
        return {data: value};
      }
    }

    /**
     * Default error genrating logic for unit testing.
     */
    class UnitTestingErrorService {
      /**
       * @param {string} _value
       */
      execute(_value: string): UnitTestingResponse {
        throw new Error('Application failed on unit testing.');
      }
    }

    it('should call lambda on sucessed', () => {
      const result: Resultt<UnitTestingResponse> =
      Resultt.runCatching<UnitTestingResponse>(() => {
        return new UnitTestingService().execute('unittest');
      })
          .onSuccess((v) => {
            console.log(`response => ${v}`);
          });

      expect(result.getOrThrow()).toEqual({data: 'unittest'});
    });

    it('should handle error', () => {
      let error: string;
      const result: Resultt<UnitTestingResponse> =
      Resultt.runCatching<UnitTestingResponse>(() => {
        return new UnitTestingErrorService().execute('unittest');
      })
          .onFailure((it: Error) => {
            console.log(this);
            error = it.message;
          });

      expect(result.isFailure()).toBe(true);
      expect(error).toBe('Application failed on unit testing.');
    });

    it('can instantiate Result directly', () => {
      const res = new UnitTestingService().execute('unittest');
      const result = new Resultt(res);

      expect(result.getOrThrow()).toEqual({data: 'unittest'});
    });

    it('should fold with successing executing service class', () => {
      const count: number = Resultt.runCatching(() => {
        return new UnitTestingService().execute('unittest');
      })
          .fold(
              (data: UnitTestingResponse) => {
                console.log(data);
                return data.data.length;
              },
              (it: Error) => {
                console.log(it);
                return 0;
              },
          );

      expect(count).toBe(8);
    });

    it('should fold with successing executing error service class', () => {
      const count: number = Resultt.runCatching(() => {
        return new UnitTestingErrorService().execute('unittest');
      })
          .fold(
              (data: UnitTestingResponse) => {
                console.log(data);
                return data.data.length;
              },
              (it: Error) => {
                console.log(it);
                return 0;
              },
          );

      expect(count).toBe(0);
    });

    it('should map result to another result on failure', () => {
      Resultt.runCatching(() => {
        return new UnitTestingErrorService().execute('unittest');
      })
          .map((res: UnitTestingResponse) => {
            return res.data.length;
          })
          .onFailure((it: Error) => {
            // assert that the message thrown in the error
            expect(it.message).toBe('Application failed on unit testing.');
          });
    });

    it('should map result to another result on success', () => {
      Resultt.runCatching(() => {
        return new UnitTestingService().execute('unittest');
      })
          .map((res: UnitTestingResponse) => {
            return res.data.length;
          })
          .onSuccess((it: number) => {
            expect(it).toBe(8);
          });
    });

    it('should get value successfully', () => {
      const r: UnitTestingResponse = Resultt.runCatching(() => {
        return new UnitTestingService().execute('unittest');
      })
          .getOrElse((it: Error) => {
            console.log(it);
            return {
              data: 'NONE',
            };
          });
      expect(r.data).toBe('unittest');
    });

    it('should get value by failure action', () => {
      const r: UnitTestingResponse = Resultt.runCatching(() => {
        return new UnitTestingErrorService().execute('unittest');
      })
          .getOrElse((it: Error) => {
            console.log(it);
            return {
              data: 'default',
            };
          });
      expect(r.data).toBe('default');
    });
});
