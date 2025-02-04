import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeFont } from "../../redux/actions";

function ModifyFont() {
  const dispatch = useDispatch();
  const [newFont, setNewFont] = useState("");
  const [message, setMessage] = useState(""); // Ajout du message
  const userData = useSelector((state) => state.auth.userData);

  const handleFontChange = (font) => {
    setMessage(""); // Reset du message à chaque changement de police

    setNewFont(font.id);

    // Mise à jour de la police
    dispatch(changeFont(font.id, userData.id))
      .then(() => {
        // Affichage du message de succès
        setMessage({
          text: `La police a été changée en : ${font.fr}`,
          colorId: "success",
        });
      })
      .catch(() => {
        // Affichage du message d'erreur en cas de problème
        setMessage({
          text: "Erreur lors du changement de police.",
          colorId: "danger",
        });
      });
  };

  const fonts = [
    {
      id: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fr: "Inter",
    },
    {
      id: "'Roboto', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      fr: "Roboto",
    },
    {
      id: "'Open Sans', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      fr: "Open Sans",
    },
    {
      id: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
      fr: "Montserrat",
    },
    {
      id: "'Poppins', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      fr: "Poppins",
    },
    { id: "'Work Sans', 'Helvetica Neue', Arial, sans-serif", fr: "Work Sans" },
    {
      id: "'Nunito', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      fr: "Nunito",
    },
    {
      id: "'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif",
      fr: "Source Sans Pro",
    },
    { id: "'Lato', 'Helvetica Neue', Arial, sans-serif", fr: "Lato" },
    { id: "'Ubuntu', 'Helvetica Neue', Arial, sans-serif", fr: "Ubuntu" },
    {
      id: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      fr: "IBM Plex Sans",
    },
    { id: "'Mulish', 'Helvetica Neue', Arial, sans-serif", fr: "Mulish" },
    {
      id: "'Playfair Display', Georgia, 'Times New Roman', serif",
      fr: "Playfair Display",
    },
    {
      id: "'Merriweather', Georgia, 'Times New Roman', serif",
      fr: "Merriweather",
    },
    {
      id: "'Crimson Text', Georgia, 'Times New Roman', serif",
      fr: "Crimson Text",
    },
    { id: "'Lora', Georgia, 'Times New Roman', serif", fr: "Lora" },
    { id: "'PT Serif', Georgia, 'Times New Roman', serif", fr: "PT Serif" },
    {
      id: "'IBM Plex Serif', Georgia, 'Times New Roman', serif",
      fr: "IBM Plex Serif",
    },
    { id: "'Oswald', 'Impact', 'Arial Narrow Bold', sans-serif", fr: "Oswald" },
    { id: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", fr: "DM Sans" },
    { id: "'Quicksand', 'Helvetica Neue', Arial, sans-serif", fr: "Quicksand" },
    {
      id: "'Source Code Pro', 'Consolas', 'Monaco', monospace",
      fr: "Source Code Pro",
    },
    { id: "'Pacifico', 'Brush Script MT', cursive", fr: "Pacifico" },
    { id: "'Georgia', 'Times New Roman', Times, serif", fr: "Georgia" },
    { id: "'Verdana', Geneva, Tahoma, sans-serif", fr: "Verdana" },
    { id: "'Arial', Helvetica, sans-serif", fr: "Arial" },
  ];

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Changer la police de l'interface</h2>
      <div className="col-12 col-md-10 col-lg-6 m-auto rounded">
        <div className="mb-4">
          <div className="d-flex flex-wrap ">
            {fonts.map((font) => (
              <button
                key={font.id}
                onClick={() => handleFontChange(font)}
                className={`btn m-2 px-3 py-2 shadow-sm flex-grow-1 ${
                  newFont === font.id
                    ? `btn-${userData.couleur} text-white`
                    : "bgflou"
                }`}
                style={{
                  fontFamily: font.id,
                  minWidth: "120px",
                  cursor: "pointer",
                }}
                aria-label={`Sélectionner la police ${font.fr}`}
              >
                {font.fr}
              </button>
            ))}
          </div>
        </div>

        {/* Affichage du message après changement */}
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
  );
}

export default ModifyFont;
