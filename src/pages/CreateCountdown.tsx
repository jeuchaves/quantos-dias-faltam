import { CountdownForm } from "@/components/countdown-form/CountdownForm";

export const CreateCountdown = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mt-5">
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-4">Quase lá!</h1>
          <p className="mb-6">Preencha os dados para criar seu contador</p>
          <CountdownForm />
        </div>
        <div className="md:w-1/2 bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Protótipo</h2>
          <div className="bg-white p-4 rounded shadow">
            Visualização do contador aparecerá aqui
          </div>
        </div>
      </div>
    </div>
  );
};
