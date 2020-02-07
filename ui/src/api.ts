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

export const getAllHawks = (): Promise<Hawk[]> => {
  return fetch(`${apiRoot}/list`).then(response => {
    return response.json().then((data: { hawks: Hawk[] }) => {
      return data.hawks;
    });
  });
};

export const saveHawk = (hawk: Hawk): Promise<void> => {
  return fetch(apiRoot, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(hawk)
  }).then(() => {
    return Promise.resolve();
  });
};
