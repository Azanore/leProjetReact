import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeFont } from "../../redux/actions";

function ModifyFont() {
  const dispatch = useDispatch();
  const [newFont, setNewFont] = useState("");
  const [realFont, setRealFont] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const handleFontChange = (font) => {
    setNewFont(font.id);
    setRealFont(font.fr);
    dispatch(changeFont(font.id, userData.id)); // Mise à jour de la police
  };

  const fonts = [
    {
      id: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
      fr: "System UI",
    },
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
      id: "'Nunito Sans', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      fr: "Nunito Sans",
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
    {
      id: "'Bebas Neue', 'Impact', 'Arial Narrow Bold', sans-serif",
      fr: "Bebas Neue",
    },
    { id: "'DM Sans', 'Helvetica Neue', Arial, sans-serif", fr: "DM Sans" },
    { id: "'Quicksand', 'Helvetica Neue', Arial, sans-serif", fr: "Quicksand" },
    {
      id: "'IBM Plex Mono', 'Consolas', 'Monaco', monospace",
      fr: "IBM Plex Mono",
    },
    {
      id: "'Source Code Pro', 'Consolas', 'Monaco', monospace",
      fr: "Source Code Pro",
    },
    { id: "'Fira Code', 'Consolas', 'Monaco', monospace", fr: "Fira Code" },
    {
      id: "'Dancing Script', 'Brush Script MT', cursive",
      fr: "Dancing Script",
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
                className={`btn m-2 p-3 shadow-sm flex-grow-1 ${
                  newFont === font.id
                    ? `btn-${userData.couleur} text-white`
                    : "btn-light"
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

        {newFont && (
          <div className="alert alert-success text-center" role="alert">
            La police a été changée en :{" "}
            <span style={{ fontFamily: newFont }}>{realFont}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModifyFont;
