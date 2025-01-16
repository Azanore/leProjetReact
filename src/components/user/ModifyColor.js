import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeColor } from "../../redux/actions";

function ModifyColor() {
  const dispatch = useDispatch();
  const [newColor, setNewColor] = useState("");
  const [message, setMessage] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const handleColorChange = (colorId, colorName) => {
    setNewColor(colorId);
    setMessage(""); // Reset message

    // Appliquer immédiatement la couleur
    dispatch(changeColor(colorId, userData.id))
      .then(() => {
        setMessage({
          text: `Succès ! La couleur '${colorName}' a été appliquée !`,
          colorId: colorId,
        });
      })
      .catch(() => {
        setMessage({
          text: "Erreur lors de la mise à jour de la couleur.",
          colorId: "danger",
        });
      });
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
      <h2 className="text-center mb-4">Changer la couleur de l'interface</h2>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="row">
            {colors.map((color) => (
              <div
                key={color.id}
                className="col-6 col-md-4 align-items-center mb-3"
              >
                <div
                  className={`bg-${color.id} rounded-circle mb-2`}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    border: newColor === color.id ? "3px solid white" : "none",
                  }}
                ></div>
                <button
                  className={`btn btn-${color.id} w-100 text-white ${
                    newColor === color.id ? "active" : ""
                  }`}
                  onClick={() => handleColorChange(color.id, color.fr)}
                >
                  {color.fr}
                </button>
              </div>
            ))}
          </div>

          {message && (
            <div
              className={`alert alert-${message.colorId} text-center`}
              role="alert"
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModifyColor;
