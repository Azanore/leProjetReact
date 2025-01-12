import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeFont } from "../../redux/actions";

function ModifyFont() {
  const dispatch = useDispatch();
  const [newFont, setNewFont] = useState("");
  const [realFont, setRealFont] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const userData = useSelector((state) => state.auth.userData);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (newFont) {
      dispatch(changeFont(newFont, userData.id))
        .then(() => {
          setSuccess(`Succès ! La police '${realFont}' a été appliquée !`);
        })
        .catch(() => {
          setError("Erreur lors de la mise à jour de la police.");
        });
    } else {
      setError("Veuillez choisir une police.");
    }
  };

  const fonts = [
    // System & Modern Sans-Serif
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
    {
      id: "'Work Sans', 'Helvetica Neue', Arial, sans-serif",
      fr: "Work Sans",
    },
    {
      id: "'Nunito', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      fr: "Nunito",
    },
    {
      id: "'Nunito Sans', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
      fr: "Nunito Sans",
    },

    // Professional Sans-Serif
    {
      id: "'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif",
      fr: "Source Sans Pro",
    },
    {
      id: "'Lato', 'Helvetica Neue', Arial, sans-serif",
      fr: "Lato",
    },
    {
      id: "'Ubuntu', 'Helvetica Neue', Arial, sans-serif",
      fr: "Ubuntu",
    },
    {
      id: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
      fr: "IBM Plex Sans",
    },
    {
      id: "'Mulish', 'Helvetica Neue', Arial, sans-serif",
      fr: "Mulish",
    },

    // Elegant Serifs
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
    {
      id: "'Lora', Georgia, 'Times New Roman', serif",
      fr: "Lora",
    },
    {
      id: "'PT Serif', Georgia, 'Times New Roman', serif",
      fr: "PT Serif",
    },
    {
      id: "'IBM Plex Serif', Georgia, 'Times New Roman', serif",
      fr: "IBM Plex Serif",
    },

    // Display & Decorative
    {
      id: "'Oswald', 'Impact', 'Arial Narrow Bold', sans-serif",
      fr: "Oswald",
    },
    {
      id: "'Bebas Neue', 'Impact', 'Arial Narrow Bold', sans-serif",
      fr: "Bebas Neue",
    },
    {
      id: "'DM Sans', 'Helvetica Neue', Arial, sans-serif",
      fr: "DM Sans",
    },
    {
      id: "'Quicksand', 'Helvetica Neue', Arial, sans-serif",
      fr: "Quicksand",
    },

    // Monospace
    {
      id: "'IBM Plex Mono', 'Consolas', 'Monaco', monospace",
      fr: "IBM Plex Mono",
    },
    {
      id: "'Source Code Pro', 'Consolas', 'Monaco', monospace",
      fr: "Source Code Pro",
    },
    {
      id: "'Fira Code', 'Consolas', 'Monaco', monospace",
      fr: "Fira Code",
    },

    // Handwriting Style
    {
      id: "'Dancing Script', 'Brush Script MT', cursive",
      fr: "Dancing Script",
    },
    {
      id: "'Pacifico', 'Brush Script MT', cursive",
      fr: "Pacifico",
    },

    // Classic Fonts
    {
      id: "'Georgia', 'Times New Roman', Times, serif",
      fr: "Georgia",
    },
    {
      id: "'Verdana', Geneva, Tahoma, sans-serif",
      fr: "Verdana",
    },
    {
      id: "'Arial', Helvetica, sans-serif",
      fr: "Arial",
    },
  ];
  const fontPairs = [];
  for (let i = 0; i < fonts.length; i += 2) {
    fontPairs.push(fonts.slice(i, i + 2));
  }
  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Changer la police de l'interface</h2>
      <div className="col-12 col-md-10 col-lg-6  m-auto rounded ">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            {fontPairs.map((pair, index) => (
              <div key={index} className="row g-3 mb-4">
                {pair.map((font) => (
                  <div key={font.id} className="col-12 col-md-6">
                    <div
                      className={`p-1 ${
                        newFont === font.id
                          ? `bg-${userData.couleur} rounded text-white`
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setNewFont(font.id);
                          setRealFont(font.fr);
                          setError("");
                          setSuccess("");
                        }}
                        className={`btn w-100 shadow-sm ${
                          newFont === font.id
                            ? `btn-${userData.couleur} `
                            : `btn btn-light`
                        }`}
                        style={{
                          fontFamily: font.id,
                          height: "40px",
                        }}
                        aria-label={`Sélectionner la police ${font.fr}`}
                      >
                        {font.fr}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {error && (
            <div className="alert alert-danger text-center" role="alert">
              {error}
            </div>
          )}
          {success && (
            <div
              className={`alert alert-${userData.couleur} text-center`}
              role="alert"
            >
              {success}
            </div>
          )}
          <div className="d-grid my-3">
            <button type="submit" className={`btn btn-${userData.couleur} `}>
              Appliquer la police
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyFont;
