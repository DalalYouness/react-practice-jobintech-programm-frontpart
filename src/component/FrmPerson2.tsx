import React, { useState, type FormEvent, useEffect } from "react";
import axios from "axios";
import "./style.css"; // IMPORTANT : ajoute ce fichier

interface Person {
  id: number;
  nom: string;
  birthDate: string;
}

const URL: string = "http://localhost:8060/api/personnes";

const FrmPerson2 = () => {
  const [nom, setNom] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [message, setMessage] = useState("");
  const [persons, setPersons] = useState<Person[]>([]);
  const [editID, seteditID] = useState<number | null>(null);

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();

    if (editID == null) {
      try {
        await axios.post(`${URL}/ajouter`, { nom, birthDate });
        setMessage("Ajouté avec succès !");
      } catch (err) {
        setMessage("Erreur lors de l'ajout");
      }
    } else {
      try {
        await axios.put(`${URL}/update`, { id: editID, nom, birthDate });
        setMessage("Modifié avec succès !");
        seteditID(null);
      } catch (err) {
        setMessage("Erreur lors de la modification");
      }
    }

    setNom("");
    setBirthDate("");
    loadPersons();
  };

  const loadPersons = async () => {
    try {
      const resp = await axios.get(URL);
      setPersons(resp.data);
    } catch (err) {
      console.error("Erreur lors du chargement des personnes", err);
    }
  };

  useEffect(() => {
    loadPersons();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette personne ?"))
      return;

    await axios.delete(`${URL}/${id}`);
    loadPersons();
  };

  const handleEdit = async (id: number) => {
    const resp = await axios.get(`${URL}/${id}`);
    const p: Person = resp.data;
    seteditID(p.id);
    setNom(p.nom);
    setBirthDate(p.birthDate);
  };

  const handleAnnuler = () => {
    seteditID(null);
    setNom("");
    setBirthDate("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-card w-50 mx-auto mt-5">
        <div className="mb-3">
          <label className="form-label fw-bold">Nom :</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="form-control form-control-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-bold">Date de naissance :</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="form-control form-control-lg"
            required
          />
        </div>

        <button className="btn btn-primary btn-custom me-2">
          {editID == null ? "Ajouter" : "Modifier"}
        </button>

        {editID && (
          <button
            type="button"
            onClick={handleAnnuler}
            className="btn btn-secondary btn-custom"
          >
            Annuler
          </button>
        )}

        <span className="text-success message-box">{message}</span>
      </form>

      <h2 className="text-center mt-5 text-primary fw-bold">
        La liste des personnes
      </h2>

      <table className="table table-modern w-50 mx-auto text-center mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Date de Naissance</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {persons.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td className="fw-bold">{p.nom}</td>
              <td>{p.birthDate}</td>
              <td>
                <button
                  onClick={() => handleEdit(p.id)}
                  className="btn btn-success btn-custom me-2"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="btn btn-danger btn-custom"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FrmPerson2;
