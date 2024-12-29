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
    // Dispatch the action and handle the success/error locally
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
    { id: "primary", fr: "Bleu" },
    { id: "secondary", fr: "Gris" },
    { id: "success", fr: "Vert" },
    { id: "danger", fr: "Rouge" },
    { id: "warning", fr: "Ambre" },
    { id: "info", fr: "Bleu clair" },
  ];

  const colorPairs = [];
  for (let i = 0; i < colors.length; i += 2) {
    colorPairs.push(colors.slice(i, i + 2));
  }

  return (
    <div className=" col-4 ms-3 py-5">
      <div className=" justify-content-center">
        <div>
          <form onSubmit={handleSubmit}>
            <h2 className=" mb-4">Changer la couleur de l'interface</h2>
            <div className="mb-5">
              {colorPairs.map((pair, index) => (
                <div key={index} className="row g-4 mb-4">
                  {pair.map((color) => (
                    <div key={color.id} className="col-12 col-sm-6">
                      <div
                        className={` ${
                          newColor === color.id
                            ? `bg-${color.id} rounded-start-4 rounded-end-2 text-white`
                            : ""
                        }`}
                      >
                        <div className="d-flex align-items-center gap-4">
                          <button
                            type="button"
                            onClick={() => {
                              setNewColor(color.id);
                              setRealColor(color.fr);
                              error !== "" && setError("");
                              setSuccess("");
                            }}
                            className={`btn ${
                              newColor === color.id
                                ? "border-5 border-white "
                                : "border"
                            }`}
                            style={{
                              width: "36px",
                              height: "36px",
                              backgroundColor:
                                color.id === "transparent"
                                  ? "transparent"
                                  : `var(--bs-${color.id})`,
                              minWidth: "36px",
                            }}
                            aria-label={`Sélectionner la couleur ${color.fr}`}
                          />
                          <span
                            className={`fs-5  ${
                              newColor === color.id ? "fw-semibold" : ""
                            }`}
                          >
                            {color.fr}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="d-grid my-3">
              <button type="submit" className={`btn btn-${userData.couleur}`}>
                Appliquer la couleur
              </button>
            </div>
            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className={`alert alert-${userData.couleur}`} role="alert">
                {success}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModifyColor;
