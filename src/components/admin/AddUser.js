import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Formulaire() {
  const userData = useSelector((state) => state.auth.userData);

  const [formData, setFormData] = useState({
    admin: false,
    nom: "",
    prenom: "",
    age: "",
    pseudo: "",
    email: "",
    MotDePasse: "",
    Devise: "",
    Pays: "",
    couleur: "",
  });

  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("");
  const [errors, setErrors] = useState({
    MotDePasse: "",
    confirmationMotDePasse: "",
    general: "",
  });
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [messageSucces, setMessageSucces] = useState(""); // Nouvelle variable d'état pour le message de succès

  useEffect(() => {
    // Fetch country and currency data (single API call)
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        const countryNames = response.data.map(
          (country) => country.name.common
        );
        setCountries(countryNames);

        const currencyData = Array.from(
          new Map(
            response.data
              .map((country) => {
                if (country.currencies) {
                  const currency = Object.values(country.currencies)[0];
                  return [currency.name, currency.symbol];
                }
                return null;
              })
              .filter((currency) => currency !== null)
          )
        );
        setCurrencies(currencyData);
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des données des pays et devises :",
          error
        );
      });
  }, []);

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    const champsRequis = [
      "nom",
      "prenom",
      "age",
      "pseudo",
      "email",
      "MotDePasse",
      "Devise",
      "Pays",
      "couleur",
    ];
    const champsVides = champsRequis.filter(
      (field) => !formData[field]?.trim()
    );

    if (champsVides.length > 0) {
      newErrors.general = "Tous les champs sont obligatoires";
      isValid = false;
    }

    if (!formData.MotDePasse || formData.MotDePasse.length < 8) {
      newErrors.MotDePasse =
        "Le mot de passe doit contenir au moins 8 caractères";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.MotDePasse)) {
      newErrors.MotDePasse = "Le mot de passe doit contenir une majuscule";
      isValid = false;
    } else if (!/[a-z]/.test(formData.MotDePasse)) {
      newErrors.MotDePasse = "Le mot de passe doit contenir une minuscule";
      isValid = false;
    } else if (!/\d/.test(formData.MotDePasse)) {
      newErrors.MotDePasse = "Le mot de passe doit contenir un chiffre";
      isValid = false;
    } else if (!/[@$!%*?&]/.test(formData.MotDePasse)) {
      newErrors.MotDePasse =
        "Le mot de passe doit contenir un caractère spécial";
      isValid = false;
    }

    if (formData.MotDePasse !== confirmationMotDePasse) {
      newErrors.confirmationMotDePasse =
        "Les mots de passe ne correspondent pas";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleConfiMdp = (ev) => {
    setConfirmationMotDePasse(ev.target.value);
    setErrors((prev) => ({ ...prev, confirmationMotDePasse: "", general: "" }));
  };

  const handleIdentifiants = (ev) => {
    const { name, value, type, checked } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    setMessageSucces("");
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      return;
    }

    axios
      .post("https://675afd529ce247eb19354af3.mockapi.io/users", formData)
      .then(() => {
        // Réinitialisation des champs
        setFormData({
          admin: false,
          nom: "",
          prenom: "",
          age: "",
          pseudo: "",
          email: "",
          MotDePasse: "",
          Devise: "",
          Pays: "",
          couleur: "",
        });
        setConfirmationMotDePasse("");
        setMessageSucces("Compte créé avec succès !"); // Message de succès
      })
      .catch(() => {
        setErrors((prev) => ({
          ...prev,
          general: "Erreur lors de la création du compte. Veuillez réessayer.",
        }));
      });
  };

  return (
    <div className="px-3 pt-5">
      <form
        onSubmit={handleSubmit}
        className="d-flex pb-3 flex-column gap-3 col-8"
      >
        <h2 className="mb-4">Ajouter un nouveau compte</h2>
        <div className="row">
          <div className="col-6">
            <input
              onInput={handleIdentifiants}
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <input
              onInput={handleIdentifiants}
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              onInput={handleIdentifiants}
              name="age"
              type="number"
              placeholder="Âge"
              value={formData.age}
              className="form-control"
            />
          </div>
          <div className="col-6">
            <input
              onInput={handleIdentifiants}
              name="pseudo"
              placeholder="Pseudo"
              value={formData.pseudo}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              onInput={handleIdentifiants}
              name="MotDePasse"
              placeholder="Mot de passe"
              value={formData.MotDePasse}
              type="password"
              className="form-control"
            />
            {errors.MotDePasse && (
              <div className="text-danger">{errors.MotDePasse}</div>
            )}
          </div>
          <div className="col-6">
            <input
              onInput={handleConfiMdp}
              name="ConfiMotDePasse"
              placeholder="Confirmer le nouveau mot de passe"
              value={confirmationMotDePasse}
              type="password"
              className="form-control"
            />
            {errors.confirmationMotDePasse && (
              <div className="text-danger">{errors.confirmationMotDePasse}</div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              onInput={handleIdentifiants}
              name="email"
              placeholder="Email"
              value={formData.email}
              className="form-control"
            />
          </div>

          <div className="col-6">
            <select
              className="form-select"
              onChange={handleIdentifiants}
              name="Devise"
              value={formData.Devise || ""}
            >
              <option value="" disabled>
                Sélectionner une devise
              </option>
              {currencies.map(([name, symbol], index) => (
                <option key={index} value={name}>
                  {name} ({symbol})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <select
              className="form-select"
              onChange={handleIdentifiants}
              name="Pays"
              value={formData.Pays || ""}
            >
              <option value="" disabled>
                Sélectionner un pays
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6">
            <select
              className="form-select"
              onChange={handleIdentifiants}
              name="couleur"
              value={formData.couleur || ""}
            >
              <option value="" disabled>
                Sélectionner une couleur
              </option>
              <option value="primary">Bleu</option>
              <option value="secondary">Gris</option>
              <option value="success">Vert</option>
              <option value="danger">Rouge</option>
              <option value="warning">Ambre</option>
              <option value="info">Bleu clair</option>
            </select>
          </div>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            name="admin"
            id="adminCheckbox"
            checked={formData.admin || false}
            onChange={handleIdentifiants}
            className={`form-check-input bg-${userData.couleur} border-${userData.couleur}`}
          />
          <label className="form-check-label" htmlFor="adminCheckbox">
            Admin
          </label>
        </div>
        {errors.general && (
          <div className="alert mb-0 alert-danger text-center" role="alert">
            {errors.general}
          </div>
        )}
        {messageSucces && (
          <div
            className="alert mb-0 alert-success text-center mt-3"
            role="alert"
          >
            {messageSucces}
          </div>
        )}
        <button type="submit" className={`btn btn-${userData.couleur}`}>
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default Formulaire;
