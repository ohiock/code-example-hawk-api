const apiRoot = "http://localhost:8000/api/hawk";

export interface Hawk {
  [key: string]: any;
  name: string;
  size: string;
  gender: string;
  lengthFrom: string;
  lengthTo: string;
  wingspanFrom: string;
  wingspanTo: string;
  weightFrom: string;
  weightTo: string;
  url: string;
  color: string;
  behavior: string;
  habitat: string;
}

export const getAllHawks = (): Promise<Hawk[]> => {
  return fetch(`${apiRoot}/list`).then(response => {
    return response.json().then((data: { hawks: Hawk[] }) => {
      return data.hawks;
    });
  });
};
