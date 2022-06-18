import {Resultt, runCatching} from '../src/result';

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
       * Always throw error
       * @param {string} _value
       */
      execute(_value: string): UnitTestingResponse {
        throw new Error('Application failed on unit testing.');
      }
      /**
       * Always throw error
       * @param {string} _value
       */
      run(_value: string): UnitTestingResponse {
        throw new Error('Error occuerd again!');
      }
    }

    it('should call lambda on sucessed', () => {
      const result =
      Resultt.runCatching(() => (new UnitTestingService().execute('unittest')))
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
            // The usage can work, but it's not idealy(Use `getOrElse` instedly)
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

    it('create failure manually', () => {
      const result = Resultt.failure(new Error('Manual Error!'));

      expect(result.isFailure()).toBe(true);
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
      const result: Resultt<number> = Resultt.runCatching(() => {
        return new UnitTestingErrorService().execute('unittest');
      })
          .map((res: UnitTestingResponse) => {
            return res.data.length;
          })
          .onFailure((it: Error) => {
            // assert that the message thrown in the error
            expect(it.message).toBe('Application failed on unit testing.');
          });
      console.log(result);
      expect(result.isFailure()).toBe(true);
      try {
        expect(result.getOrThrow()).toThrowError(new Error());
      } catch (e) {
        console.log('catch!');
      }
    });

    it('should map result to another result on success', () => {
      const result: Resultt<number> = Resultt.runCatching(() => {
        return new UnitTestingService().execute('unittest');
      })
          .map((res: UnitTestingResponse) => {
            return res.data.length;
          })
          .onSuccess((it: number) => {
            return it;
          });
      expect(result.isSuccess()).toBe(true);
      expect(result.getOrThrow()).toBe(8);
    });

    it('should handle error on mapping the result', () => {
      const resultt: Resultt<number> = Resultt.runCatching(() => {
        const res = new UnitTestingService().execute('unittest');
        return res.data.length;
      })
          .mapCatching((res: number) => {
            // dare to throw error for mapCatching
            throw new Error('Given the error happened on mapping ...');
          })
          .onFailure((it: Error) => {
            console.error(it);
          });
      expect(resultt.isFailure()).toBeTruthy();
      // This case is expected to catch error and get value as Failure instance
      expect(resultt.getOrDefault(1)).toBe(1);
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

    it('should get null', () => {
      const r = Resultt.runCatching(() => {
        return new UnitTestingErrorService().execute('unittest');
      });

      expect(r.getOrNull()).toBeNull();
      expect(r.isFailure()).toBeTruthy();
    });

    it('can recover', () => {
      const r = Resultt.runCatching(() => {
        return new UnitTestingErrorService().execute('unittest');
      })
          .recover((e: Error) => ({
            data: 'RECOVERED',
          }))
          .getOrNull();
      expect(r.data).toBe('RECOVERED');
    });

    it('receover and handle error', () => {
      const service = new UnitTestingErrorService();
      const r = Resultt.runCatching(() =>(service.execute('unittest')))
          .recoverCatching((e: Error) => (service.run('try')))
          .onFailure((e: Error) => console.error(e))
          .getOrElse((e: Error) => 'RECOVER CATHED');

      expect(r).toBe('RECOVER CATHED');
    });

    it('filter on succesing and predicate returns false', () => {
      const r = runCatching(() =>
        (new UnitTestingService().execute('unittest')))
          .filter((t) => t.data.length > 10)
          .getOrElse(() => ({data: 'message is under 10'}));
      expect(r.data).toBe('message is under 10');
    });

    it('filter on succesing and predicate returns true', () => {
      const r = runCatching(() =>
        (new UnitTestingService().execute('unittest')))
          .filter((t) => t.data.length > 5)
          .getOrElse(() => ({data: 'message is under 10'}));
      expect(r.data).toBe('unittest');
    });

    it('filter on failed', () => {
      const r = runCatching(() =>
        (new UnitTestingErrorService().execute('unittest')))
          .filter((t) => t.data.length > 10)
          .onFailure((it: Error) => console.error(it))
          .getOrElse(() => ({data: 'message is under 10'}));
      expect(r.data).toBe('message is under 10');
    });
});
