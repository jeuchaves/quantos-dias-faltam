import { getCountdownBySlug } from "@/services/countdownService";
import type { Countdown } from "@/types/countdown";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCountdown } from "@/hooks/useCountdown";
import { formatTimeLeft } from "@/lib/formatTimeLeft";

export const ViewCountdownPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [countdown, setCountdown] = useState<Countdown | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Usando o hook useCountdown apenas quando countdown estiver disponível
  const timeLeft = useCountdown(countdown?.date || new Date());

  useEffect(() => {
    if (!slug) return;

    const fetchCountdown = async () => {
      setLoading(true);
      try {
        const data = await getCountdownBySlug(slug);
        setCountdown(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to load countdown"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountdown();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Carregando...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Erro</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!countdown) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Contagem Regressiva</h1>
        <p>Contagem não encontrada</p>
      </div>
    );
  }

  // Formatando o tempo restante
  const formattedTime = formatTimeLeft(timeLeft);
  const targetDateFormatted = countdown.date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">{countdown.title}</h1>

      {countdown.message && (
        <p className="text-lg mb-8 text-center text-gray-600">
          {countdown.message}
        </p>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Tempo Restante
          </h2>
          <p className="text-4xl font-bold text-indigo-600 my-4">
            {formattedTime}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700">Data Final</h3>
            <p className="text-lg">{targetDateFormatted}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700">Criado em</h3>
            <p className="text-lg">
              {countdown.createdAt.toLocaleDateString("pt-BR")}
            </p>
          </div>
        </div>
      </div>

      {/* Você pode adicionar mais seções ou componentes aqui */}
    </div>
  );
};
