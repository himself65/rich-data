type Cast<A, B> = A extends B ? A : B;

type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type Narrow<T> = Cast<T, [] | (T extends Primitive ? T : never) | ({
  [K in keyof T]: Narrow<T[K]>
})>;
