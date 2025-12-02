import axios from "axios";
import type { Person } from "../../types/Person";

const URL: string = "http://localhost:8060/api/personnes";

export const getAllPersons = async (): Promise<Person[]> => {
  const resp = await axios.get<Person[]>(URL);
  return resp.data;
};

export const getPersonById = async (id: number): Promise<Person> => {
  const resp = await axios.get<Person>(`${URL}/${id}`);
  return resp.data;
};

export const createPerson = async (p: Omit<Person, "id">): Promise<void> => {
  await axios.post(URL, p);
};

//baqi mabdltch fl formulaire
export const updatePersonById = async (
  id: number,
  p: Omit<Person, "id">
): Promise<void> => {
  await axios.put(`${URL}/update/${id}`, p);
};

//la meme chose aussi hna
export const deletePerson = async (id: number): Promise<void> => {
  await axios.delete(`${URL}/${id}`);
};
