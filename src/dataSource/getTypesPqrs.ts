export const fetchOptions = async () => {
  try {
    const response = await fetch("http://161.18.252.219:8001/api/api-types-pqrs/", {
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