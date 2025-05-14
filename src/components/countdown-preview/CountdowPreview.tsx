import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFormContext } from "react-hook-form";

export const CountdownPreview = () => {
  const { watch } = useFormContext();
  const formValues = watch();

  return (
    <div>
      <div>
        {/* Cabeçalho */}
        <div>
          <h2>Pré-visualização</h2>
          <p>Como ficará no mobile</p>
        </div>

        {/* Corpo da pré-visualização */}
        <div>
          <h1>{formValues.title || "Seu evento"}</h1>
        </div>

        {/* Contagem regressiva */}
        <div>
          {formValues.date ? (
            <>
              <div>Faltam</div>
              <div>
                {formatDistanceToNow(new Date(formValues.date), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </div>
              <div>
                {new Date(formValues.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </div>
            </>
          ) : (
            <>
              <div>Selecione uma data</div>
            </>
          )}

          {/* Mensagem */}
          {formValues.message && (
            <div>
              <p>{formValues.message}</p>
            </div>
          )}

          {/* Fotos */}
          {formValues.photos?.length > 0 && (
            <div>
              <div>
                {formValues.photos.map((photo: string, index: number) => (
                  <img key={index} src={photo} alt={`Preview ${index}`} />
                ))}
              </div>
            </div>
          )}

          {/* Música */}
          {formValues.youtubeMusic && (
            <div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span>Música configurada</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
