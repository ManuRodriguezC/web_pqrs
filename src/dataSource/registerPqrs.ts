interface RegisPQRS {
  name: string;
  asociado: number;
  email: string;
  phone: string;
  description: string;
  userCreated: string;
  typePQRS: number;
}

export const registerPqrs = async (info: RegisPQRS) => {
  try {
    const response = await fetch("/pqrs/api/registrar", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    });

    const data = await response.json();
    return response.ok ? data : data.error;

  } catch (error) {
    return "El servicio de registro está caído, por favor intente más tarde";
  }
};