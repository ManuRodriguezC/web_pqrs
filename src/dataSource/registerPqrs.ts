interface RegisPQRS {
	name: String,
	asociado: Number,
	email: string,
	phone: String,
	description: String,
	userCreated: String,
	typePQRS: Number
}

export const registerPqrs = async (info: RegisPQRS) => {
  const url = import.meta.env.PUBLIC_URL_REGIS
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `TOKEN ${import.meta.env.PUBLIC_TOKEN_URL}`
      },
      body: JSON.stringify(info)
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