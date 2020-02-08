const apiRoot = "http://localhost:8000/api/hawk";

export interface Hawk {
  [key: string]: any;
  id: number;
  name: string;
  gender: string;
  size: string;
  wingspanBegin: string;
  wingspanEnd: string;
  weightBegin: string;
  weightEnd: string;
  lengthBegin: string;
  lengthEnd: string;
  colorDescription: string;
  behaviorDescription: string;
  habitatDescription: string;
  pictureUrl: string;
}

interface GetAllHawksOptions {
  filter?: string;
  pageSize?: string;
  pageToken?: string;
  sortField?: string;
  sortDir?: string;
}

export const getAllHawks = async (
  options: GetAllHawksOptions
): Promise<Hawk[]> => {
  const requestParams = [];

  !!options.filter && requestParams.push(`filter=${options.filter}`);
  !!options.pageSize && requestParams.push(`pageSize=${options.pageSize}`);
  !!options.pageToken && requestParams.push(`pageToken=${options.pageToken}`);
  !!options.sortField && requestParams.push(`sortField=${options.sortField}`);
  !!options.sortDir && requestParams.push(`sortDir=${options.sortDir}`);

  const paramsJoined = requestParams.join("&");

  const response = await fetch(`${apiRoot}/list?${paramsJoined}`);
  const data: { hawks: Hawk[] } = await response.json();

  return data.hawks;
};

export const saveHawk = async (hawk: Hawk): Promise<Hawk> => {
  const response = await fetch(apiRoot, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hawk)
  });

  const data: { hawk: Hawk } = await response.json();

  return data.hawk;
};

export const updateHawk = async (hawk: Hawk): Promise<Hawk> => {
  const response = await fetch(`${apiRoot}/${hawk.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hawk)
  });
  const data: { hawk: Hawk } = await response.json();

  return data.hawk;
};

export const deleteHawk = async (hawkId: number): Promise<void> => {
  await fetch(`${apiRoot}/${hawkId}`, {
    method: "DELETE"
  });

  return Promise.resolve();
};
