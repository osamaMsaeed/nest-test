import { OrderDirection } from '../request/paginated.request';

type GetPaginationOptionsArgs = {
  page?: number;
  limit?: number;
};

export function GetPaginationOptions(
  options: GetPaginationOptionsArgs,
): { skip: number; take: number } | {} {
  const databaseOptions = {
    skip: 0,
    take: 1000,
  };

  if (options.limit) {
    if (options.limit === -1) {
      return {};
    }
    databaseOptions.take = options.limit;
  }

  if (options.page) {
    databaseOptions.skip = databaseOptions.take * Math.max(options.page - 1, 0);
  }

  return databaseOptions;
}

type GetOrderOptionsArgs = {
  column?: string;
  direction?: OrderDirection;
};

export function GetOrderOptions(options: GetOrderOptionsArgs) {
  let databaseOptions: any = {
    id: 'desc',
  };

  if (options.column && options.direction) {
    databaseOptions = {
      [options.column]: options.direction.toLowerCase(),
    };
  } else if (options.column) {
    databaseOptions = {
      [options.column]: 'asc',
    };
  }

  return databaseOptions;
}
