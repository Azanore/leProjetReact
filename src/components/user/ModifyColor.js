import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeColor } from "../../redux/actions";

function ModifyColor() {
  const dispatch = useDispatch();
  const [newColor, setNewColor] = useState("");
  const [realColor, setRealColor] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (newColor) {
      dispatch(changeColor(newColor, userData.id))
        .then(() => {
          setSuccess(`Succès ! La couleur '${realColor}' a été appliquée !`);
        })
        .catch(() => {
          setError("Erreur lors de la mise à jour de la couleur.");
        });
    } else {
      setError("Veuillez choisir une couleur.");
    }
  };

  const colors = [
    { id: "dark", fr: "Noir" },
    { id: "secondary", fr: "Gris" },
    { id: "primary", fr: "Bleu" },
    { id: "success", fr: "Vert" },
    { id: "danger", fr: "Rouge" },
    { id: "info", fr: "Bleu clair" },
  ];

  return (
    <div className="container py-5">
      <h2 className="text-center ">Changer la couleur de l'interface</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="card border-0 ">
              <div className="card-body p-4">
                <div className="row g-3 mb-4">
                  {colors.map((color) => (
                    <div key={color.id} className="col-12 col-sm-6">
                      <div
                        className={`p-3 text-center rounded-3 ${
                          newColor === color.id
                            ? `bg-${color.id} text-white`
                            : `border bg-light border-${color.id}`
                        }`}
                        onClick={() => {
                          setNewColor(color.id);
                          setRealColor(color.fr);
                          setError("");
                          setSuccess("");
                        }}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className="rounded-circle mb-2"
                          style={{
                            width: "24px",
                            height: "24px",
                            backgroundColor: `var(--bs-${color.id})`,
                          }}
                        ></div>
                        <span
                          className={`d-block fs-6 ${
                            newColor === color.id ? "fw-semibold" : ""
                          }`}
                        >
                          {color.fr}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className={`btn btn-${userData.couleur}`}
                  >
                    Appliquer la couleur
                  </button>
                </div>
                {error && (
                  <div className="alert alert-danger mt-3 mb-0" role="alert">
                    {error}
                  </div>
                )}
                {success && (
                  <div
                    className={`alert alert-${userData.couleur} mt-3 mb-0`}
                    role="alert"
                  >
                    {success}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifyColor;
