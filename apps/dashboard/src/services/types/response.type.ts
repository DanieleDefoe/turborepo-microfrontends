export interface IResponse<T, E = Record<string, any>> {
  code: number;
  data: T;
  extra: E;
  message: string;
  success: boolean;
}

export interface IPaginationRequestQuery {
  page?: number;
  pageSize?: number;
}

export type IRequestQuery<T extends Record<string, any>> = {
  page?: number;
  pageSize?: number;
} & {
  [K in keyof T]?: T[K];
};
