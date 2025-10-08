
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Festa
 * 
 */
export type Festa = $Result.DefaultSelection<Prisma.$FestaPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Festas
 * const festas = await prisma.festa.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Festas
   * const festas = await prisma.festa.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.festa`: Exposes CRUD operations for the **Festa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Festas
    * const festas = await prisma.festa.findMany()
    * ```
    */
  get festa(): Prisma.FestaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.3
   * Query Engine version: bb420e667c1820a8c05a38023385f6cc7ef8e83a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Festa: 'Festa'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "festa"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Festa: {
        payload: Prisma.$FestaPayload<ExtArgs>
        fields: Prisma.FestaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FestaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FestaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>
          }
          findFirst: {
            args: Prisma.FestaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FestaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>
          }
          findMany: {
            args: Prisma.FestaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>[]
          }
          create: {
            args: Prisma.FestaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>
          }
          createMany: {
            args: Prisma.FestaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FestaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>[]
          }
          delete: {
            args: Prisma.FestaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>
          }
          update: {
            args: Prisma.FestaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>
          }
          deleteMany: {
            args: Prisma.FestaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FestaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FestaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>[]
          }
          upsert: {
            args: Prisma.FestaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FestaPayload>
          }
          aggregate: {
            args: Prisma.FestaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFesta>
          }
          groupBy: {
            args: Prisma.FestaGroupByArgs<ExtArgs>
            result: $Utils.Optional<FestaGroupByOutputType>[]
          }
          count: {
            args: Prisma.FestaCountArgs<ExtArgs>
            result: $Utils.Optional<FestaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    festa?: FestaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Festa
   */

  export type AggregateFesta = {
    _count: FestaCountAggregateOutputType | null
    _avg: FestaAvgAggregateOutputType | null
    _sum: FestaSumAggregateOutputType | null
    _min: FestaMinAggregateOutputType | null
    _max: FestaMaxAggregateOutputType | null
  }

  export type FestaAvgAggregateOutputType = {
    id: number | null
  }

  export type FestaSumAggregateOutputType = {
    id: number | null
  }

  export type FestaMinAggregateOutputType = {
    id: number | null
    nome: string | null
    dataHora: Date | null
    cidade: string | null
    local: string | null
    urlImagemFlyer: string | null
    descricaoCurta: string | null
    linkVendas: string | null
    destaque: boolean | null
  }

  export type FestaMaxAggregateOutputType = {
    id: number | null
    nome: string | null
    dataHora: Date | null
    cidade: string | null
    local: string | null
    urlImagemFlyer: string | null
    descricaoCurta: string | null
    linkVendas: string | null
    destaque: boolean | null
  }

  export type FestaCountAggregateOutputType = {
    id: number
    nome: number
    dataHora: number
    cidade: number
    local: number
    urlImagemFlyer: number
    descricaoCurta: number
    linkVendas: number
    destaque: number
    _all: number
  }


  export type FestaAvgAggregateInputType = {
    id?: true
  }

  export type FestaSumAggregateInputType = {
    id?: true
  }

  export type FestaMinAggregateInputType = {
    id?: true
    nome?: true
    dataHora?: true
    cidade?: true
    local?: true
    urlImagemFlyer?: true
    descricaoCurta?: true
    linkVendas?: true
    destaque?: true
  }

  export type FestaMaxAggregateInputType = {
    id?: true
    nome?: true
    dataHora?: true
    cidade?: true
    local?: true
    urlImagemFlyer?: true
    descricaoCurta?: true
    linkVendas?: true
    destaque?: true
  }

  export type FestaCountAggregateInputType = {
    id?: true
    nome?: true
    dataHora?: true
    cidade?: true
    local?: true
    urlImagemFlyer?: true
    descricaoCurta?: true
    linkVendas?: true
    destaque?: true
    _all?: true
  }

  export type FestaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festa to aggregate.
     */
    where?: FestaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festas to fetch.
     */
    orderBy?: FestaOrderByWithRelationInput | FestaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FestaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Festas
    **/
    _count?: true | FestaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FestaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FestaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FestaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FestaMaxAggregateInputType
  }

  export type GetFestaAggregateType<T extends FestaAggregateArgs> = {
        [P in keyof T & keyof AggregateFesta]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFesta[P]>
      : GetScalarType<T[P], AggregateFesta[P]>
  }




  export type FestaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FestaWhereInput
    orderBy?: FestaOrderByWithAggregationInput | FestaOrderByWithAggregationInput[]
    by: FestaScalarFieldEnum[] | FestaScalarFieldEnum
    having?: FestaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FestaCountAggregateInputType | true
    _avg?: FestaAvgAggregateInputType
    _sum?: FestaSumAggregateInputType
    _min?: FestaMinAggregateInputType
    _max?: FestaMaxAggregateInputType
  }

  export type FestaGroupByOutputType = {
    id: number
    nome: string
    dataHora: Date
    cidade: string
    local: string
    urlImagemFlyer: string
    descricaoCurta: string
    linkVendas: string | null
    destaque: boolean
    _count: FestaCountAggregateOutputType | null
    _avg: FestaAvgAggregateOutputType | null
    _sum: FestaSumAggregateOutputType | null
    _min: FestaMinAggregateOutputType | null
    _max: FestaMaxAggregateOutputType | null
  }

  type GetFestaGroupByPayload<T extends FestaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FestaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FestaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FestaGroupByOutputType[P]>
            : GetScalarType<T[P], FestaGroupByOutputType[P]>
        }
      >
    >


  export type FestaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    dataHora?: boolean
    cidade?: boolean
    local?: boolean
    urlImagemFlyer?: boolean
    descricaoCurta?: boolean
    linkVendas?: boolean
    destaque?: boolean
  }, ExtArgs["result"]["festa"]>

  export type FestaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    dataHora?: boolean
    cidade?: boolean
    local?: boolean
    urlImagemFlyer?: boolean
    descricaoCurta?: boolean
    linkVendas?: boolean
    destaque?: boolean
  }, ExtArgs["result"]["festa"]>

  export type FestaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nome?: boolean
    dataHora?: boolean
    cidade?: boolean
    local?: boolean
    urlImagemFlyer?: boolean
    descricaoCurta?: boolean
    linkVendas?: boolean
    destaque?: boolean
  }, ExtArgs["result"]["festa"]>

  export type FestaSelectScalar = {
    id?: boolean
    nome?: boolean
    dataHora?: boolean
    cidade?: boolean
    local?: boolean
    urlImagemFlyer?: boolean
    descricaoCurta?: boolean
    linkVendas?: boolean
    destaque?: boolean
  }

  export type FestaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nome" | "dataHora" | "cidade" | "local" | "urlImagemFlyer" | "descricaoCurta" | "linkVendas" | "destaque", ExtArgs["result"]["festa"]>

  export type $FestaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Festa"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nome: string
      dataHora: Date
      cidade: string
      local: string
      urlImagemFlyer: string
      descricaoCurta: string
      linkVendas: string | null
      destaque: boolean
    }, ExtArgs["result"]["festa"]>
    composites: {}
  }

  type FestaGetPayload<S extends boolean | null | undefined | FestaDefaultArgs> = $Result.GetResult<Prisma.$FestaPayload, S>

  type FestaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FestaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FestaCountAggregateInputType | true
    }

  export interface FestaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Festa'], meta: { name: 'Festa' } }
    /**
     * Find zero or one Festa that matches the filter.
     * @param {FestaFindUniqueArgs} args - Arguments to find a Festa
     * @example
     * // Get one Festa
     * const festa = await prisma.festa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FestaFindUniqueArgs>(args: SelectSubset<T, FestaFindUniqueArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Festa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FestaFindUniqueOrThrowArgs} args - Arguments to find a Festa
     * @example
     * // Get one Festa
     * const festa = await prisma.festa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FestaFindUniqueOrThrowArgs>(args: SelectSubset<T, FestaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestaFindFirstArgs} args - Arguments to find a Festa
     * @example
     * // Get one Festa
     * const festa = await prisma.festa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FestaFindFirstArgs>(args?: SelectSubset<T, FestaFindFirstArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Festa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestaFindFirstOrThrowArgs} args - Arguments to find a Festa
     * @example
     * // Get one Festa
     * const festa = await prisma.festa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FestaFindFirstOrThrowArgs>(args?: SelectSubset<T, FestaFindFirstOrThrowArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Festas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Festas
     * const festas = await prisma.festa.findMany()
     * 
     * // Get first 10 Festas
     * const festas = await prisma.festa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const festaWithIdOnly = await prisma.festa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FestaFindManyArgs>(args?: SelectSubset<T, FestaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Festa.
     * @param {FestaCreateArgs} args - Arguments to create a Festa.
     * @example
     * // Create one Festa
     * const Festa = await prisma.festa.create({
     *   data: {
     *     // ... data to create a Festa
     *   }
     * })
     * 
     */
    create<T extends FestaCreateArgs>(args: SelectSubset<T, FestaCreateArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Festas.
     * @param {FestaCreateManyArgs} args - Arguments to create many Festas.
     * @example
     * // Create many Festas
     * const festa = await prisma.festa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FestaCreateManyArgs>(args?: SelectSubset<T, FestaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Festas and returns the data saved in the database.
     * @param {FestaCreateManyAndReturnArgs} args - Arguments to create many Festas.
     * @example
     * // Create many Festas
     * const festa = await prisma.festa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Festas and only return the `id`
     * const festaWithIdOnly = await prisma.festa.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FestaCreateManyAndReturnArgs>(args?: SelectSubset<T, FestaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Festa.
     * @param {FestaDeleteArgs} args - Arguments to delete one Festa.
     * @example
     * // Delete one Festa
     * const Festa = await prisma.festa.delete({
     *   where: {
     *     // ... filter to delete one Festa
     *   }
     * })
     * 
     */
    delete<T extends FestaDeleteArgs>(args: SelectSubset<T, FestaDeleteArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Festa.
     * @param {FestaUpdateArgs} args - Arguments to update one Festa.
     * @example
     * // Update one Festa
     * const festa = await prisma.festa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FestaUpdateArgs>(args: SelectSubset<T, FestaUpdateArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Festas.
     * @param {FestaDeleteManyArgs} args - Arguments to filter Festas to delete.
     * @example
     * // Delete a few Festas
     * const { count } = await prisma.festa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FestaDeleteManyArgs>(args?: SelectSubset<T, FestaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Festas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Festas
     * const festa = await prisma.festa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FestaUpdateManyArgs>(args: SelectSubset<T, FestaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Festas and returns the data updated in the database.
     * @param {FestaUpdateManyAndReturnArgs} args - Arguments to update many Festas.
     * @example
     * // Update many Festas
     * const festa = await prisma.festa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Festas and only return the `id`
     * const festaWithIdOnly = await prisma.festa.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FestaUpdateManyAndReturnArgs>(args: SelectSubset<T, FestaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Festa.
     * @param {FestaUpsertArgs} args - Arguments to update or create a Festa.
     * @example
     * // Update or create a Festa
     * const festa = await prisma.festa.upsert({
     *   create: {
     *     // ... data to create a Festa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Festa we want to update
     *   }
     * })
     */
    upsert<T extends FestaUpsertArgs>(args: SelectSubset<T, FestaUpsertArgs<ExtArgs>>): Prisma__FestaClient<$Result.GetResult<Prisma.$FestaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Festas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestaCountArgs} args - Arguments to filter Festas to count.
     * @example
     * // Count the number of Festas
     * const count = await prisma.festa.count({
     *   where: {
     *     // ... the filter for the Festas we want to count
     *   }
     * })
    **/
    count<T extends FestaCountArgs>(
      args?: Subset<T, FestaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FestaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Festa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FestaAggregateArgs>(args: Subset<T, FestaAggregateArgs>): Prisma.PrismaPromise<GetFestaAggregateType<T>>

    /**
     * Group by Festa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FestaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FestaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FestaGroupByArgs['orderBy'] }
        : { orderBy?: FestaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FestaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFestaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Festa model
   */
  readonly fields: FestaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Festa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FestaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Festa model
   */
  interface FestaFieldRefs {
    readonly id: FieldRef<"Festa", 'Int'>
    readonly nome: FieldRef<"Festa", 'String'>
    readonly dataHora: FieldRef<"Festa", 'DateTime'>
    readonly cidade: FieldRef<"Festa", 'String'>
    readonly local: FieldRef<"Festa", 'String'>
    readonly urlImagemFlyer: FieldRef<"Festa", 'String'>
    readonly descricaoCurta: FieldRef<"Festa", 'String'>
    readonly linkVendas: FieldRef<"Festa", 'String'>
    readonly destaque: FieldRef<"Festa", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Festa findUnique
   */
  export type FestaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * Filter, which Festa to fetch.
     */
    where: FestaWhereUniqueInput
  }

  /**
   * Festa findUniqueOrThrow
   */
  export type FestaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * Filter, which Festa to fetch.
     */
    where: FestaWhereUniqueInput
  }

  /**
   * Festa findFirst
   */
  export type FestaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * Filter, which Festa to fetch.
     */
    where?: FestaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festas to fetch.
     */
    orderBy?: FestaOrderByWithRelationInput | FestaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festas.
     */
    cursor?: FestaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festas.
     */
    distinct?: FestaScalarFieldEnum | FestaScalarFieldEnum[]
  }

  /**
   * Festa findFirstOrThrow
   */
  export type FestaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * Filter, which Festa to fetch.
     */
    where?: FestaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festas to fetch.
     */
    orderBy?: FestaOrderByWithRelationInput | FestaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Festas.
     */
    cursor?: FestaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Festas.
     */
    distinct?: FestaScalarFieldEnum | FestaScalarFieldEnum[]
  }

  /**
   * Festa findMany
   */
  export type FestaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * Filter, which Festas to fetch.
     */
    where?: FestaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Festas to fetch.
     */
    orderBy?: FestaOrderByWithRelationInput | FestaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Festas.
     */
    cursor?: FestaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Festas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Festas.
     */
    skip?: number
    distinct?: FestaScalarFieldEnum | FestaScalarFieldEnum[]
  }

  /**
   * Festa create
   */
  export type FestaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * The data needed to create a Festa.
     */
    data: XOR<FestaCreateInput, FestaUncheckedCreateInput>
  }

  /**
   * Festa createMany
   */
  export type FestaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Festas.
     */
    data: FestaCreateManyInput | FestaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Festa createManyAndReturn
   */
  export type FestaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * The data used to create many Festas.
     */
    data: FestaCreateManyInput | FestaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Festa update
   */
  export type FestaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * The data needed to update a Festa.
     */
    data: XOR<FestaUpdateInput, FestaUncheckedUpdateInput>
    /**
     * Choose, which Festa to update.
     */
    where: FestaWhereUniqueInput
  }

  /**
   * Festa updateMany
   */
  export type FestaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Festas.
     */
    data: XOR<FestaUpdateManyMutationInput, FestaUncheckedUpdateManyInput>
    /**
     * Filter which Festas to update
     */
    where?: FestaWhereInput
    /**
     * Limit how many Festas to update.
     */
    limit?: number
  }

  /**
   * Festa updateManyAndReturn
   */
  export type FestaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * The data used to update Festas.
     */
    data: XOR<FestaUpdateManyMutationInput, FestaUncheckedUpdateManyInput>
    /**
     * Filter which Festas to update
     */
    where?: FestaWhereInput
    /**
     * Limit how many Festas to update.
     */
    limit?: number
  }

  /**
   * Festa upsert
   */
  export type FestaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * The filter to search for the Festa to update in case it exists.
     */
    where: FestaWhereUniqueInput
    /**
     * In case the Festa found by the `where` argument doesn't exist, create a new Festa with this data.
     */
    create: XOR<FestaCreateInput, FestaUncheckedCreateInput>
    /**
     * In case the Festa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FestaUpdateInput, FestaUncheckedUpdateInput>
  }

  /**
   * Festa delete
   */
  export type FestaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
    /**
     * Filter which Festa to delete.
     */
    where: FestaWhereUniqueInput
  }

  /**
   * Festa deleteMany
   */
  export type FestaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Festas to delete
     */
    where?: FestaWhereInput
    /**
     * Limit how many Festas to delete.
     */
    limit?: number
  }

  /**
   * Festa without action
   */
  export type FestaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Festa
     */
    select?: FestaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Festa
     */
    omit?: FestaOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const FestaScalarFieldEnum: {
    id: 'id',
    nome: 'nome',
    dataHora: 'dataHora',
    cidade: 'cidade',
    local: 'local',
    urlImagemFlyer: 'urlImagemFlyer',
    descricaoCurta: 'descricaoCurta',
    linkVendas: 'linkVendas',
    destaque: 'destaque'
  };

  export type FestaScalarFieldEnum = (typeof FestaScalarFieldEnum)[keyof typeof FestaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type FestaWhereInput = {
    AND?: FestaWhereInput | FestaWhereInput[]
    OR?: FestaWhereInput[]
    NOT?: FestaWhereInput | FestaWhereInput[]
    id?: IntFilter<"Festa"> | number
    nome?: StringFilter<"Festa"> | string
    dataHora?: DateTimeFilter<"Festa"> | Date | string
    cidade?: StringFilter<"Festa"> | string
    local?: StringFilter<"Festa"> | string
    urlImagemFlyer?: StringFilter<"Festa"> | string
    descricaoCurta?: StringFilter<"Festa"> | string
    linkVendas?: StringNullableFilter<"Festa"> | string | null
    destaque?: BoolFilter<"Festa"> | boolean
  }

  export type FestaOrderByWithRelationInput = {
    id?: SortOrder
    nome?: SortOrder
    dataHora?: SortOrder
    cidade?: SortOrder
    local?: SortOrder
    urlImagemFlyer?: SortOrder
    descricaoCurta?: SortOrder
    linkVendas?: SortOrderInput | SortOrder
    destaque?: SortOrder
  }

  export type FestaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FestaWhereInput | FestaWhereInput[]
    OR?: FestaWhereInput[]
    NOT?: FestaWhereInput | FestaWhereInput[]
    nome?: StringFilter<"Festa"> | string
    dataHora?: DateTimeFilter<"Festa"> | Date | string
    cidade?: StringFilter<"Festa"> | string
    local?: StringFilter<"Festa"> | string
    urlImagemFlyer?: StringFilter<"Festa"> | string
    descricaoCurta?: StringFilter<"Festa"> | string
    linkVendas?: StringNullableFilter<"Festa"> | string | null
    destaque?: BoolFilter<"Festa"> | boolean
  }, "id">

  export type FestaOrderByWithAggregationInput = {
    id?: SortOrder
    nome?: SortOrder
    dataHora?: SortOrder
    cidade?: SortOrder
    local?: SortOrder
    urlImagemFlyer?: SortOrder
    descricaoCurta?: SortOrder
    linkVendas?: SortOrderInput | SortOrder
    destaque?: SortOrder
    _count?: FestaCountOrderByAggregateInput
    _avg?: FestaAvgOrderByAggregateInput
    _max?: FestaMaxOrderByAggregateInput
    _min?: FestaMinOrderByAggregateInput
    _sum?: FestaSumOrderByAggregateInput
  }

  export type FestaScalarWhereWithAggregatesInput = {
    AND?: FestaScalarWhereWithAggregatesInput | FestaScalarWhereWithAggregatesInput[]
    OR?: FestaScalarWhereWithAggregatesInput[]
    NOT?: FestaScalarWhereWithAggregatesInput | FestaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Festa"> | number
    nome?: StringWithAggregatesFilter<"Festa"> | string
    dataHora?: DateTimeWithAggregatesFilter<"Festa"> | Date | string
    cidade?: StringWithAggregatesFilter<"Festa"> | string
    local?: StringWithAggregatesFilter<"Festa"> | string
    urlImagemFlyer?: StringWithAggregatesFilter<"Festa"> | string
    descricaoCurta?: StringWithAggregatesFilter<"Festa"> | string
    linkVendas?: StringNullableWithAggregatesFilter<"Festa"> | string | null
    destaque?: BoolWithAggregatesFilter<"Festa"> | boolean
  }

  export type FestaCreateInput = {
    nome: string
    dataHora: Date | string
    cidade: string
    local: string
    urlImagemFlyer: string
    descricaoCurta: string
    linkVendas?: string | null
    destaque?: boolean
  }

  export type FestaUncheckedCreateInput = {
    id?: number
    nome: string
    dataHora: Date | string
    cidade: string
    local: string
    urlImagemFlyer: string
    descricaoCurta: string
    linkVendas?: string | null
    destaque?: boolean
  }

  export type FestaUpdateInput = {
    nome?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    cidade?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    urlImagemFlyer?: StringFieldUpdateOperationsInput | string
    descricaoCurta?: StringFieldUpdateOperationsInput | string
    linkVendas?: NullableStringFieldUpdateOperationsInput | string | null
    destaque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FestaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    cidade?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    urlImagemFlyer?: StringFieldUpdateOperationsInput | string
    descricaoCurta?: StringFieldUpdateOperationsInput | string
    linkVendas?: NullableStringFieldUpdateOperationsInput | string | null
    destaque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FestaCreateManyInput = {
    id?: number
    nome: string
    dataHora: Date | string
    cidade: string
    local: string
    urlImagemFlyer: string
    descricaoCurta: string
    linkVendas?: string | null
    destaque?: boolean
  }

  export type FestaUpdateManyMutationInput = {
    nome?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    cidade?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    urlImagemFlyer?: StringFieldUpdateOperationsInput | string
    descricaoCurta?: StringFieldUpdateOperationsInput | string
    linkVendas?: NullableStringFieldUpdateOperationsInput | string | null
    destaque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FestaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nome?: StringFieldUpdateOperationsInput | string
    dataHora?: DateTimeFieldUpdateOperationsInput | Date | string
    cidade?: StringFieldUpdateOperationsInput | string
    local?: StringFieldUpdateOperationsInput | string
    urlImagemFlyer?: StringFieldUpdateOperationsInput | string
    descricaoCurta?: StringFieldUpdateOperationsInput | string
    linkVendas?: NullableStringFieldUpdateOperationsInput | string | null
    destaque?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type FestaCountOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    dataHora?: SortOrder
    cidade?: SortOrder
    local?: SortOrder
    urlImagemFlyer?: SortOrder
    descricaoCurta?: SortOrder
    linkVendas?: SortOrder
    destaque?: SortOrder
  }

  export type FestaAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FestaMaxOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    dataHora?: SortOrder
    cidade?: SortOrder
    local?: SortOrder
    urlImagemFlyer?: SortOrder
    descricaoCurta?: SortOrder
    linkVendas?: SortOrder
    destaque?: SortOrder
  }

  export type FestaMinOrderByAggregateInput = {
    id?: SortOrder
    nome?: SortOrder
    dataHora?: SortOrder
    cidade?: SortOrder
    local?: SortOrder
    urlImagemFlyer?: SortOrder
    descricaoCurta?: SortOrder
    linkVendas?: SortOrder
    destaque?: SortOrder
  }

  export type FestaSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}