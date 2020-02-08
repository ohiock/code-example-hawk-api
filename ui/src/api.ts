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

export const getAllHawks = (options: GetAllHawksOptions): Promise<Hawk[]> => {
  const requestParams = [];

  !!options.filter && requestParams.push(`filter=${options.filter}`);
  !!options.pageSize && requestParams.push(`pageSize=${options.pageSize}`);
  !!options.pageToken && requestParams.push(`pageToken=${options.pageToken}`);
  !!options.sortField && requestParams.push(`sortField=${options.sortField}`);
  !!options.sortDir && requestParams.push(`sortDir=${options.sortDir}`);

  const paramsJoined = requestParams.join("&");

  return fetch(`${apiRoot}/list?${paramsJoined}`).then(response => {
    return response.json().then((data: { hawks: Hawk[] }) => {
      return data.hawks;
    });
  });
};

export const saveHawk = (hawk: Hawk): Promise<Hawk> => {
  return fetch(apiRoot, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hawk)
  }).then(response => {
    return response.json().then((data: { hawk: Hawk }) => {
      return data.hawk;
    });
  });
};

export const updateHawk = (hawk: Hawk): Promise<Hawk> => {
  return fetch(`${apiRoot}/${hawk.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hawk)
  }).then(response => {
    return response.json().then((data: { hawk: Hawk }) => {
      return data.hawk;
    });
  });
};

export const deleteHawk = (hawkId: number): Promise<void> => {
  return fetch(`${apiRoot}/${hawkId}`, {
    method: "DELETE"
  }).then(() => {
    return Promise.resolve();
  });
};
