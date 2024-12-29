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

    // Dispatch the Thunk action to handle the password change and get the promise
    dispatch(changePassword(userData.id, passwords.newPassword))
      .then(() => {
        // Navigate after the password change and logout are complete
        navigate("/");
      })
      .catch((error) => {
        // Handle any errors during the password change process
        console.error("Error during password change:", error);
      });
  };

  return (
    <div className="px-3 pt-5">
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3 col-4">
        <h2 className="mb-4">Changer votre mot de passe</h2>
        <div>
          <input
            onInput={handleChange}
            name="currentPassword"
            placeholder="Mot de passe actuel"
            type="password"
            value={passwords.currentPassword}
            className={`form-control ${
              errors.currentPassword ? "is-invalid" : ""
            }`}
          />
          {errors.currentPassword && (
            <div className="invalid-feedback">{errors.currentPassword}</div>
          )}
        </div>

        <div>
          <input
            onInput={handleChange}
            name="newPassword"
            placeholder="Nouveau mot de passe"
            type="password"
            value={passwords.newPassword}
            className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
          />
          {errors.newPassword && (
            <div className="invalid-feedback">{errors.newPassword}</div>
          )}
        </div>

        <div>
          <input
            onInput={handleChange}
            name="confirmPassword"
            placeholder="Confirmer le nouveau mot de passe"
            type="password"
            value={passwords.confirmPassword}
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" className={`btn btn-${userData.couleur}`}>
          Soumettre
        </button>
      </form>
    </div>
  );
}

export default ModifyPassword;
