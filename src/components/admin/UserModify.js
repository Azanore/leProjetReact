import { useEffect, useLayoutEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";

function UserModify({ userId, fetchData, setSelectedUserId }) {
  const [formData, setFormData] = useState(null);
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState();
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    // Focus the "Nom" input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [userId]);

  useEffect(() => {
    // Fetch user data
    axios
      .get(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`)
      .then((userResponse) => {
        setFormData(userResponse.data);
        setIsAdmin(userResponse.data.admin);

        // Fetch country and currency data (single API call)
        axios
          .get("https://restcountries.com/v3.1/all")
          .then((countryResponse) => {
            const countryNames = countryResponse.data.map(
              (country) => country.name.common
            );
            setCountries(countryNames);

            const currencyData = Array.from(
              new Map(
                countryResponse.data
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
            setLoading(false);
          })
          .catch((error) => {
            console.error(
              "Erreur lors du chargement des données des pays et devises :",
              error
            );
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error(
          "Erreur lors du chargement des données utilisateur :",
          error
        );
        setLoading(false);
      });
  }, [userId]);

  const handleIdentifiants = (ev) => {
    const { name, value, type, checked } = ev.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    dispatch(updateUser(userId, formData, userData.id))
      .then(() => {
        fetchData(); // Refresh user list
        setSelectedUserId(null); // Hide the form
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      });
  };

  if (!formData || loading) {
    return null;
  }

  return (
    <div className="pt-5">
      <h2 className="mb-4 text-center">Éditer l'utilisateur</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 pe-3">
        <div>
          <label htmlFor="nom" className="form-label">
            Nom
          </label>
          <input
            className="form-control"
            onInput={handleIdentifiants}
            name="nom"
            id="nom"
            placeholder="Nom"
            value={formData.nom || ""}
            ref={inputRef} // Ref applied here
          />
        </div>
        <div>
          <label htmlFor="prenom" className="form-label">
            Prénom
          </label>
          <input
            className="form-control"
            onInput={handleIdentifiants}
            name="prenom"
            id="prenom"
            placeholder="Prénom"
            value={formData.prenom || ""}
          />
        </div>
        <div>
          <label htmlFor="age" className="form-label">
            Âge
          </label>
          <input
            className="form-control"
            onInput={handleIdentifiants}
            name="age"
            id="age"
            type="number"
            placeholder="Âge"
            value={formData.age || ""}
          />
        </div>
        <div>
          <label htmlFor="pseudo" className="form-label">
            Pseudo
          </label>
          <input
            className="form-control"
            onInput={handleIdentifiants}
            name="pseudo"
            id="pseudo"
            placeholder="Pseudo"
            value={formData.pseudo || ""}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            onInput={handleIdentifiants}
            name="email"
            id="email"
            placeholder="Email"
            value={formData.email || ""}
          />
        </div>
        <div>
          <label htmlFor="Devise" className="form-label">
            Devise
          </label>
          <select
            className="form-select"
            onChange={handleIdentifiants}
            name="Devise"
            id="Devise"
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
        <div>
          <label htmlFor="Pays" className="form-label">
            Pays
          </label>
          <select
            className="form-select"
            onChange={handleIdentifiants}
            name="Pays"
            id="Pays"
            value={formData.Pays || ""}
          >
            <option value="">Sélectionner un pays</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="couleur" className="form-label">
            Couleur
          </label>
          <select
            className="form-select"
            onChange={handleIdentifiants}
            name="couleur"
            id="couleur"
            value={formData.couleur || ""}
          >
            <option value="primary">Bleu</option>
            <option value="secondary">Gris</option>
            <option value="success">Vert</option>
            <option value="danger">Rouge</option>
            <option value="warning">Ambre</option>
            <option value="info">Bleu clair</option>
          </select>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            name="admin"
            id="adminCheckbox"
            disabled={isAdmin}
            checked={formData.admin || false}
            onChange={handleIdentifiants}
            className={`form-check-input bg-${userData.couleur} border-${userData.couleur}`}
          />
          <label className="form-check-label" htmlFor="adminCheckbox">
            Admin
          </label>
        </div>

        <button type="submit" className={`btn btn-${userData.couleur}`}>
          Modifier
        </button>
      </form>
    </div>
  );
}

export default UserModify;
