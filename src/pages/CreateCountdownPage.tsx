import { CountdownForm } from "@/components/countdown-form/CountdownForm";

export const CreateCountdownPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quase lá!</h1>
      <p className="mb-6">Preencha os dados para criar seu contador</p>
      <CountdownForm />
    </div>
  );
};
