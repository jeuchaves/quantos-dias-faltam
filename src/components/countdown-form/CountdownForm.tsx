import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ptBR } from "date-fns/locale";

import {
  countdownSchema,
  type TCountdownFormValues,
} from "@/schemas/countdown.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createCountdown } from "@/services/countdownService";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";

export const CountdownForm = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<TCountdownFormValues>({
    resolver: zodResolver(countdownSchema),
    defaultValues: {
      photos: [],
      title: "",
      youtubeMusic: undefined,
      message: undefined,
      date: "",
    },
  });

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Aniversário da Ana" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-full pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: ptBR })
                      ) : (
                        <span>Escolha uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => field.onChange(date?.toISOString())}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Mensagem especial (opcional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="youtubeMusic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Música (link do YouTube)</FormLabel>
              <FormControl>
                <Input placeholder="https://youtube.com/..." {...field} />
              </FormControl>
              <FormDescription>
                Será tocada na página da contagem
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fotos */}
        <FormItem>
          <FormLabel>Fotos (máximo 3)</FormLabel>
          <div className="space-y-2">
            {photos.map((url, index) => (
              <div key={index} className="flex items-center gap-4">
                <img src={url} className="w-20 h-20 object-cover rounded" />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => removePhoto(index)}
                >
                  Remover
                </Button>
              </div>
            ))}
            {photos.length < 3 && (
              <Button type="button" onClick={addPhoto} variant="outline">
                + Adicionar foto
              </Button>
            )}
          </div>
          {form.formState.errors.photos && (
            <FormMessage>{form.formState.errors.photos.message}</FormMessage>
          )}
        </FormItem>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          Criar Contagem
        </Button>
      </form>
    </Form>
  );
};
