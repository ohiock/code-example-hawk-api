const apiRoot = "http://localhost:8000/api/hawk";

export interface Hawk {
  [key: string]: any;
  id: number;
  name: string;
  size: string;
  gender: string;
}

export const getAllHawks = (): Promise<Hawk[]> => {
  return fetch(`${apiRoot}/list`).then(response => {
    return response.json().then((data: { hawks: Hawk[] }) => {
      return data.hawks;
    });
  });
};
