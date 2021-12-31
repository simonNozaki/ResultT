import {Result} from '../src/result';

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
      const result: Result<UnitTestingResponse, unknown> =
      Result.runCatching(() => {
        return new UnitTestingService().execute('unittest');
      })
          .onSuccess((v) => {
            console.log(`response => ${v}`);
          });

      expect(result.getOrThrow()).toEqual({data: 'unittest'});
    });

    it('should handle error', () => {
      const result: Result<UnitTestingResponse, unknown> =
      Result.runCatching(() => {
        return new UnitTestingErrorService().execute('unittest');
      })
          .onFailure('runtimeexception', (it: Error) => {
            console.log(this);
            throw it;
          });

      expect(result.isFailure()).toBe(true);
      expect(result.errors.size).toBe(1);
      expect(result.errors.get(0)).toBe('runtimeexception');
    });

    it('can instantiate Result directly', () => {
      const res = new UnitTestingService().execute('unittest');
      const result = new Result(res);

      expect(result.getOrThrow()).toEqual({data: 'unittest'});
    });

    it('should fold with successing executing service class', () => {
      const count: number = Result.runCatching(() => {
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
      const count: number = Result.runCatching(() => {
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
      Result.runCatching(() => {
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
      Result.runCatching(() => {
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
      const r: UnitTestingResponse = Result.runCatching(() => {
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
      const r: UnitTestingResponse = Result.runCatching(() => {
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
