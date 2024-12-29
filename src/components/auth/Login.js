import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => Boolean(state.auth.userData));

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [identifiants, setIdentifiants] = useState({
    pseudo: "",
    MotDePasse: "",
  });
  const [tentativesAuth, setTentativesAuth] = useState(0);
  const [erreurs, setErreurs] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State pour afficher/masquer le mot de passe

  const handleIdentifiants = (ev) => {
    const { name, value } = ev.target;
    setIdentifiants((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErreurs(""); // Reset errors when input changes
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
        className="col-md-4 mx-auto shadow-lg p-4 pt-5 my-4 rounded-3"
      >
        <h2 className="text-center mb-4">Se connecter</h2>
        <div className="mb-3">
          <input
            onInput={handleIdentifiants}
            name="pseudo"
            placeholder="Pseudo"
            value={identifiants.pseudo}
            className="form-control"
          />
        </div>
        <div className="mb-3 position-relative">
          <input
            onInput={handleIdentifiants}
            name="MotDePasse"
            placeholder="Mot de passe"
            type={showPassword ? "text" : "password"} // Toggle le type de l'input
            value={identifiants.MotDePasse}
            className="form-control"
          />
          <button
            type="button"
            className="position-absolute top-50 end-0 translate-middle-y btn btn-link text-dark"
            onClick={() => setShowPassword(!showPassword)} // Toggle l'affichage du mot de passe
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={tentativesAuth >= 3}
          >
            Se Connecter
          </button>
        </div>
        {erreurs && <div className="text-danger mb-3">{erreurs}</div>}
        <div className="mt-3 text-center">
          Pas de compte ? <Link to="/register">En créer un !</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
