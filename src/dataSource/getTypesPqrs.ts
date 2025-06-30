export const fetchOptions = async () => {
  const url = import.meta.env.PUBLIC_URL_OPTIONS
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `TOKEN ${import.meta.env.PUBLIC_TOKEN_URL}`
      }
    });
    if (!response.ok) {
      return "Error al obtener los tipos de solicitud";
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return "El servicio de registro esta caido, por favor intente más tarde";
  }
}