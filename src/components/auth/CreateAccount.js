import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Formulaire() {
  const navigate = useNavigate();
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
    age: "",
  });
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);

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
    if (formData.age < 10) {
      newErrors.age = "Vous devez être agé de 10 ans au minimum";
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
    setErrors((prev) => ({ ...prev, [name]: "", general: "", age: "" }));
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Vérifier si le pseudo existe déjà dans l'API
    axios
      .get("https://675afd529ce247eb19354af3.mockapi.io/users")
      .then((response) => {
        // Vérification si le pseudo existe déjà dans la réponse
        const userWithPseudo = response.data.find(
          (user) => user.pseudo === formData.pseudo
        );

        if (userWithPseudo) {
          // Si un utilisateur avec ce pseudo existe déjà
          setErrors((prev) => ({
            ...prev,
            general: "Le pseudo existe déjà. Veuillez en choisir un autre.",
          }));
          return;
        }

        // Si le pseudo est unique, soumettre le formulaire
        axios
          .post("https://675afd529ce247eb19354af3.mockapi.io/users", formData)
          .then(() => navigate("/"))
          .catch(() => {
            setErrors((prev) => ({
              ...prev,
              general:
                "Erreur lors de la création du compte. Veuillez réessayer.",
            }));
          });
      })
      .catch((error) => {
        console.error("Erreur lors de la vérification du pseudo :", error);
        setErrors((prev) => ({
          ...prev,
          general:
            "Erreur lors de la vérification du pseudo. Veuillez réessayer.",
        }));
      });
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="col-md-10 col-lg-8 mx-auto shadow-lg p-4 pt-5 my-4 rounded-3 d-flex flex-column gap-3"
      >
        {/* Logo and Heading */}
        <div className="text-center mb-4">
          <img
            src="/logo.svg"
            alt="Logo"
            className="mb-3 rounded shadow"
            style={{ width: "120px", height: "auto" }}
          />
          <h2>Créer un compte</h2>
        </div>

        {/* Nom et Prénom */}
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control bg-light border-0 shadow-sm"
                id="nom"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onInput={handleIdentifiants}
              />
              <label htmlFor="nom">Nom</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control bg-light border-0 shadow-sm"
                id="prenom"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onInput={handleIdentifiants}
              />
              <label htmlFor="prenom">Prénom</label>
            </div>
          </div>
        </div>

        {/* Âge et Pseudo */}
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="number"
                className="form-control bg-light border-0 shadow-sm"
                id="age"
                name="age"
                placeholder="Âge"
                value={formData.age}
                onInput={handleIdentifiants}
              />
              <label htmlFor="age">Âge</label>
              {errors.age && <div className="text-danger">{errors.age}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="text"
                className="form-control bg-light border-0 shadow-sm"
                id="pseudo"
                name="pseudo"
                placeholder="Pseudo"
                value={formData.pseudo}
                onInput={handleIdentifiants}
              />
              <label htmlFor="pseudo">Pseudo</label>
            </div>
          </div>
        </div>

        {/* Email et Mot de Passe */}
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="password"
                className="form-control bg-light border-0 shadow-sm"
                id="MotDePasse"
                name="MotDePasse"
                placeholder="Mot de passe"
                value={formData.MotDePasse}
                onInput={handleIdentifiants}
              />
              <label htmlFor="MotDePasse">Mot de passe</label>
              {errors.MotDePasse && (
                <div className="text-danger">{errors.MotDePasse}</div>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <input
                type="password"
                className="form-control bg-light border-0 shadow-sm"
                id="confirmationMotDePasse"
                name="confirmationMotDePasse"
                placeholder="Confirmer le mot de passe"
                value={confirmationMotDePasse}
                onInput={handleConfiMdp}
              />
              <label htmlFor="confirmationMotDePasse">
                Confirmer le mot de passe
              </label>
              {errors.confirmationMotDePasse && (
                <div className="text-danger">
                  {errors.confirmationMotDePasse}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Confirmation du mot de passe */}

        <div className="form-floating">
          <input
            type="email"
            className="form-control bg-light border-0 shadow-sm"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onInput={handleIdentifiants}
          />
          <label htmlFor="email">Email</label>
        </div>

        {/* Devise et Pays */}
        <div className="row g-3">
          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select bg-light border-0 shadow-sm"
                id="Devise"
                name="Devise"
                value={formData.Devise || ""}
                onChange={handleIdentifiants}
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
              <label htmlFor="Devise">Devise</label>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-floating">
              <select
                className="form-select bg-light border-0 shadow-sm"
                id="Pays"
                name="Pays"
                value={formData.Pays || ""}
                onChange={handleIdentifiants}
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
              <label htmlFor="Pays">Pays</label>
            </div>
          </div>
        </div>

        {/* Couleur */}
        <div className="form-floating">
          <select
            className="form-select bg-light border-0 shadow-sm"
            id="couleur"
            name="couleur"
            value={formData.couleur || ""}
            onChange={handleIdentifiants}
          >
            <option value="" disabled>
              Sélectionner une couleur
            </option>
            <option value="primary">Bleu</option>
            <option value="secondary">Gris</option>
            <option value="success">Vert</option>
            <option value="danger">Rouge</option>
            <option value="dark">Noir</option>
            <option value="info">Bleu clair</option>
          </select>
          <label htmlFor="couleur">Couleur préférée</label>
        </div>

        {errors.general && (
          <div className="alert alert-danger text-center" role="alert">
            {errors.general}
          </div>
        )}
        {/* Submit Button and Error Message */}
        <button type="submit" className="btn btn-primary">
          S'inscrire
        </button>

        <div className="text-center">
          Vous avez déjà un compte ? <Link to="/">Se connecter</Link>
        </div>
      </form>
    </div>
  );
}

export default Formulaire;
