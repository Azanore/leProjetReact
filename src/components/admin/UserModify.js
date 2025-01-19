import { useEffect, useState } from "react";
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

  useEffect(() => {
    axios
      .get(`https://675afd529ce247eb19354af3.mockapi.io/users/${userId}`)
      .then((userResponse) => {
        setFormData(userResponse.data);
        setIsAdmin(userResponse.data.admin);

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
        fetchData();
        setSelectedUserId(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
      });
  };

  if (!formData || loading) {
    return null;
  }

  return (
    <div
      className=" py-5"
      style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <div className="card border-0 h-100">
        <div className="card-body pt-0 px-3 px-lg-0 pe-lg-2">
          <h2 className="card-title text-center mb-4">Éditer l'utilisateur</h2>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <div className="form-floating">
              <input
                className="form-control bg  border border-light-subtle shadow-sm"
                onInput={handleIdentifiants}
                name="nom"
                id="nom"
                placeholder="Nom"
                value={formData.nom || ""}
              />
              <label htmlFor="nom">Nom</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control bg  border border-light-subtle shadow-sm"
                onInput={handleIdentifiants}
                name="prenom"
                id="prenom"
                placeholder="Prénom"
                value={formData.prenom || ""}
              />
              <label htmlFor="prenom">Prénom</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control bg  border border-light-subtle shadow-sm"
                onInput={handleIdentifiants}
                name="age"
                id="age"
                type="number"
                placeholder="Âge"
                value={formData.age || ""}
              />
              <label htmlFor="age">Âge</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control bg  border border-light-subtle shadow-sm"
                onInput={handleIdentifiants}
                name="pseudo"
                id="pseudo"
                placeholder="Pseudo"
                value={formData.pseudo || ""}
              />
              <label htmlFor="pseudo">Pseudo</label>
            </div>

            <div className="form-floating">
              <input
                className="form-control bg  border border-light-subtle shadow-sm"
                onInput={handleIdentifiants}
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email || ""}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select bg  border border-light-subtle shadow-sm"
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
              <label htmlFor="Devise">Devise</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select bg  border border-light-subtle shadow-sm"
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
              <label htmlFor="Pays">Pays</label>
            </div>

            <div className="form-floating">
              <select
                className="form-select bg  border border-light-subtle shadow-sm"
                onChange={handleIdentifiants}
                name="couleur"
                id="couleur"
                value={formData.couleur || ""}
              >
                <option value="primary">Bleu</option>
                <option value="secondary">Gris</option>
                <option value="success">Vert</option>
                <option value="danger">Rouge</option>
                <option value="dark">Noir</option>
                <option value="info">Bleu clair</option>
              </select>
              <label htmlFor="couleur">Couleur</label>
            </div>

            <div className="form-check ms-1">
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

            <div className="d-grid mt-2">
              <button type="submit" className={`btn btn-${userData.couleur}`}>
                Modifier
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserModify;
