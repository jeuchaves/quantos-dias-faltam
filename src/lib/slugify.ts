export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "") // remove diacríticos
    .replace(/[^a-z0-9]+/g, "-") // troca não alfanumérico por hífen
    .replace(/^-+|-+$/g, "") // remove hífens no início/fim
    .substring(0, 50); // limita tamanho
};
