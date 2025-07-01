export const fetchOptions = async () => {
  try {
    const res = await fetch("https://pqrs-cootratiempo.vercel.app//api/tipos");
    const data = await res.json();
    return res.ok ? data : data.error;
  } catch {
    return "Error de red al obtener los tipos de solicitud";
  }
};