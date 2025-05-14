import { CountdownForm } from "@/components/countdown-form/CountdownForm";
import { CountdownPreview } from "@/components/countdown-preview/CountdowPreview";
import {
  countdownSchema,
  type TCountdownFormValues,
} from "@/schemas/countdown.schema";
import { createCountdown } from "@/services/countdownService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const CreateCountdownPage = () => {
  const form = useForm<TCountdownFormValues>({
    resolver: zodResolver(countdownSchema),
    defaultValues: {
      photos: [],
      title: "",
      youtubeMusic: "",
      message: "",
      date: "",
    },
  });

  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([]);

  const onSubmit = async (data: TCountdownFormValues) => {
    const slug = await createCountdown(data);
    navigate(`/contador/${slug}`);
  };

  const addPhoto = () => {
    const url = prompt("Digite a URL da imagem");
    if (url && photos.length < 3) {
      const updated = [...photos, url];
      setPhotos(updated);
      form.setValue("photos", updated);
    }
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    setPhotos(updated);
    form.setValue("photos", updated);
  };

  return (
    <div className="container mx-auto p-4">
      <FormProvider {...form}>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h1 className="text-2xl font-bold mb-4">Quase lá!</h1>
            <p className="mb-6">Preencha os dados para criar seu contador</p>
            <CountdownForm
              onSubmit={onSubmit}
              photos={photos}
              addPhoto={addPhoto}
              removePhoto={removePhoto}
            />
          </div>
          <div className="md:w-1/3">
            <CountdownPreview />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
