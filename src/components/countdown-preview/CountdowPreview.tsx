import { useFormContext } from "react-hook-form";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import type { TCountdownFormValues } from "@/schemas/countdown.schema";

export const CountdownPreview = () => {
  const { watch } = useFormContext<TCountdownFormValues>();
  const formValues = watch();

  return (
    <div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        {/* Cabeçalho */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 text-white">
          <h2 className="text-xl font-bold">Pré-visualização</h2>
          <p className="text-sm opacity-90">Como ficará no mobile</p>
        </div>

        {/* Corpo da pré-visualização */}
        <div className="px-4 pt-4 mb-2">
          <h1 className="text-2xl font-bold text-center">
            {formValues.title || "Seu Evento"}
          </h1>
        </div>

        {/* Contagem regressiva */}
        <div className="p-4">
          <div className="bg-gray-100 rounded-lg p-4 mb-4 text-center">
            {formValues.date ? (
              <>
                <div className="text-sm text-gray-600 mb-1">Faltam</div>
                <div className="text-3xl font-bold text-purple-600">
                  {formatDistanceToNow(new Date(formValues.date), {
                    locale: ptBR,
                    addSuffix: true,
                  })}
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {new Date(formValues.date).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </>
            ) : (
              <>
                <div className="text-gray-500">Selecione uma data</div>
              </>
            )}
          </div>

          {/* Mensagem */}
          {formValues.message && (
            <div className="bg-blue-50 rounded-lg p-3 mb-4">
              <p className="text-blue-800">{formValues.message}</p>
            </div>
          )}

          {/* Fotos */}
          {formValues.photos?.length > 0 && (
            <div className="mb-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {formValues.photos.map((photo: string, index: number) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
