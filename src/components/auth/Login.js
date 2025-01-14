import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [identifiants, setIdentifiants] = useState({
    pseudo: "",
    MotDePasse: "",
  });
  const [tentativesAuth, setTentativesAuth] = useState(0);
  const [erreurs, setErreurs] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleIdentifiants = (ev) => {
    const { name, value } = ev.target;
    setIdentifiants((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErreurs("");
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (tentativesAuth >= 3) {
      setErreurs("Nombre de tentatives d'authentification dépassé.");
      return;
    }

    if (!identifiants.pseudo || !identifiants.MotDePasse) {
      setErreurs("Veuillez entrer un pseudo et un mot de passe.");
      return;
    }

    dispatch(loginUser(identifiants))
      .then(() => {
        setTentativesAuth(0);
        setErreurs("");
        navigate("/dashboard");
      })
      .catch((error) => {
        const nouvellesTentatives = tentativesAuth + 1;
        setTentativesAuth(nouvellesTentatives);

        if (nouvellesTentatives >= 3) {
          setErreurs("Nombre de tentatives d'authentification dépassé.");
        } else {
          setErreurs(
            `Identifiants incorrects. Il vous reste ${
              3 - nouvellesTentatives
            } tentative(s).`
          );
        }
      });
  };

  return (
    <div className="container mt-5">
      <form
        onSubmit={handleSubmit}
        className="col-12 col-sm-10 col-md-7 col-lg-4 mx-auto shadow-lg p-4 pt-5 my-4 rounded-3"
      >
        <h2 className="text-center mb-4">Se connecter</h2>

        {/* Pseudo */}
        <div className="form-floating mb-3">
          <input
            onInput={handleIdentifiants}
            name="pseudo"
            placeholder="Pseudo"
            value={identifiants.pseudo}
            className="form-control bg-light"
            readOnly={tentativesAuth >= 3}
          />
          <label>Pseudo</label>
        </div>

        {/* Mot de passe */}
        <div className="form-floating mb-3 position-relative">
          <input
            onInput={handleIdentifiants}
            name="MotDePasse"
            placeholder="Mot de passe"
            type={showPassword ? "text" : "password"}
            value={identifiants.MotDePasse}
            className="form-control bg-light"
            readOnly={tentativesAuth >= 3}
          />
          <label>Mot de passe</label>
          <button
            type="button"
            className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-dark"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
        {/* Erreur */}
        {erreurs && (
          <div className="alert alert-danger" role="alert">
            {erreurs}
          </div>
        )}

        {/* Bouton de soumission */}
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={tentativesAuth >= 3}
          >
            Se Connecter
          </button>
        </div>

        {/* Lien vers la page d'inscription */}
        <div className="mt-3 text-center">
          Pas de compte ? <Link to="/register">En créer un !</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
