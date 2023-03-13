export interface Repo<T> {
  exists(uuid: string): Promise<boolean>;
  save(t: T): Promise<T | null>;
}
