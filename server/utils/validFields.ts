export interface isValidData {
  (query: string): boolean;
  (query: object): boolean;
}

export interface hasRequiredFields {
  (query: URLSearchParams): string;
  (query: object): string;
}

export const isValidData = (query: string | object) => {
  if (typeof query === "string") {
    return query ? true : false;
  }

  return Object.keys(query)?.length > 0 ? true : false;
};

export const hasRequiredFields = (query: URLSearchParams | object) => {
  const requiredKeys = ["client", "timestamps", "page_name", "event", "target"];
  let missKey = [];

  if (query instanceof URLSearchParams) {
    missKey = requiredKeys.filter((key) => !query.get(key));
    return missKey?.join(",");
  }

  missKey = requiredKeys.filter((key) => !Object.keys(query).includes(key));
  return missKey?.join(",");
};
