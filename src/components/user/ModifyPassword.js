import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../redux/actions";

function ModifyPassword() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const userData = useSelector((state) => state.auth.userData);

  const handleChange = (ev) => {
    setPasswords({ ...passwords, [ev.target.name]: ev.target.value });
    setErrors((prev) => ({ ...prev, [ev.target.name]: "" }));
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (passwords.currentPassword !== userData.MotDePasse) {
      tempErrors.currentPassword = "L'ancien mot de passe est incorrect.";
      isValid = false;
    }

    if (passwords.newPassword.length < 8) {
      tempErrors.newPassword =
        "Le mot de passe doit contenir au moins 8 caractères.";
      isValid = false;
    } else if (!/[A-Z]/.test(passwords.newPassword)) {
      tempErrors.newPassword = "Le mot de passe doit contenir une majuscule.";
      isValid = false;
    } else if (!/[a-z]/.test(passwords.newPassword)) {
      tempErrors.newPassword = "Le mot de passe doit contenir une minuscule.";
      isValid = false;
    } else if (!/\d/.test(passwords.newPassword)) {
      tempErrors.newPassword = "Le mot de passe doit contenir un chiffre.";
      isValid = false;
    } else if (!/[@$!%*?&]/.test(passwords.newPassword)) {
      tempErrors.newPassword =
        "Le mot de passe doit contenir un caractère spécial.";
      isValid = false;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      tempErrors.confirmPassword =
        "Les nouveaux mots de passe ne correspondent pas.";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const navigate = useNavigate();
  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (!validateForm()) {
      return;
    }

    dispatch(changePassword(userData.id, passwords.newPassword))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error during password change:", error);
      });
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Changer votre mot de passe</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-5">
          <div className="card border-0">
            <div className="card-body px-0 py-0">
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div className="form-floating">
                  <input
                    onInput={handleChange}
                    name="currentPassword"
                    placeholder="Mot de passe actuel"
                    type="password"
                    value={passwords.currentPassword}
                    className={`form-control border border-light-subtle shadow-sm bg bg-light ${
                      errors.currentPassword ? "is-invalid" : ""
                    }`}
                    id="currentPassword"
                  />
                  <label htmlFor="currentPassword">Mot de passe actuel</label>
                  {errors.currentPassword && (
                    <div className="invalid-feedback">
                      {errors.currentPassword}
                    </div>
                  )}
                </div>

                <div className="form-floating">
                  <input
                    onInput={handleChange}
                    name="newPassword"
                    placeholder="Nouveau mot de passe"
                    type="password"
                    value={passwords.newPassword}
                    className={`form-control border border-light-subtle shadow-sm bg bg-light ${
                      errors.newPassword ? "is-invalid" : ""
                    }`}
                    id="newPassword"
                  />
                  <label htmlFor="newPassword">Nouveau mot de passe</label>
                  {errors.newPassword && (
                    <div className="invalid-feedback">{errors.newPassword}</div>
                  )}
                </div>

                <div className="form-floating">
                  <input
                    onInput={handleChange}
                    name="confirmPassword"
                    placeholder="Confirmer le nouveau mot de passe"
                    type="password"
                    value={passwords.confirmPassword}
                    className={`form-control border border-light-subtle shadow-sm bg bg-light ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    id="confirmPassword"
                  />
                  <label htmlFor="confirmPassword">
                    Confirmer le nouveau mot de passe
                  </label>
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="d-grid mt-2">
                  <button
                    type="submit"
                    className={`btn btn-${userData.couleur}`}
                  >
                    Modifier le mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModifyPassword;
