import { useEffect, useState } from "react";
import Send from "@components/icons/Send.tsx";
import ArrowSend from "@components/icons/ArrowSend.tsx";
import { fetchOptions } from "@/dataSource/getTypesPqrs";
import { registerPqrs } from "@/dataSource/registerPqrs";

interface PQRS {
  id: string;
  name: string;
  timeExecute: string;
  area_redirect: string;
}

export default function FormRegister() {

  const [options, setOptions] = useState<PQRS[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [registro, setRegistro] = useState<string | null>(null);

  useEffect(() => {
    const response = fetchOptions();
    response.then((data: PQRS[]) => {
      if (Array.isArray(data)) {
        setOptions(data);
      } else {
        setError("Error al cargar las opciones de solicitud");
      }
    }).catch(() => {
      setError("El servicio de registro está caído, por favor intente más tarde");
    });
  }, [])

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  const groserias = [
    "puta", "puto", "put@", "put*", "put#", "mierda",
    "imbécil", "imbecil", "estúpido", "estupido", "estúpida", "estupida",
    "pendejo", "pendeja", "idiota", "malparido", "malparida",
    "gonorrea", "gonorre@", "gonorr@", "cabron", "cabrón", "cabrona",
    "culero", "culera", "verga", "verg@", "coño", "joder", "hpta",
    "marica", "marico", "perra", "perro", "zorra", "zorro",
    "imbecil", "imbécil", "maldito", "maldita", "mamón", "mamona",
    "culo", "chingada", "chingado", "chingar", "mierdero", "mierd@", "hdp"
  ];

  setError(null); // Reset error state
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());

  const errors: string[] = [];

  // Validar nombre (no vacío, solo letras y espacios)
  const nombre = String(data.nombre || "").trim();

  if (!nombre) {
    errors.push("El nombre es requerido.");
  } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
    errors.push("El nombre solo debe contener letras y espacios, sin caracteres especiales.");
  } else if (nombre.split(/\s+/).length < 2) {
    errors.push("Debe ingresar al menos nombre y apellido.");
  }

    // Validar cédula (solo números, mínimo 5 dígitos)
    const cedula = String(data.cedula || "").trim();
    if (!cedula) {
      errors.push("La cédula es requerida.");
    } else if (!/^\d{5,}$/.test(cedula)) {
      errors.push("La cédula debe contener solo números y al menos 5 dígitos.");
    }

    const descripcion = String(data.descripcion || "").trim();

    // Mínimo 10 caracteres
    if (descripcion.length < 10) {
      errors.push("La descripción debe tener al menos 10 caracteres.");
    } else {
      // Convertir a minúsculas para comparar
      const descLower = descripcion.toLowerCase();

      // Revisar si contiene alguna grosería
      const contieneGroseria = groserias.some((palabra) =>
        descLower.includes(palabra)
      );

      if (contieneGroseria) {
        errors.push("La descripción contiene lenguaje inapropiado.");
      }
    }

    // Si hay errores, no enviar
    if (errors.length > 0) {
      setError(errors.join("\n")); // Puedes reemplazar esto con un sistema de errores en el estado
      return;
    }

    // Si pasa validación
    setLoading(true);
    
    const info = {
      name: nombre,
      asociado: Number(cedula),
      email: String(data.correo || "").trim(),
      phone: String(data.celular || "").trim(),
      description: descripcion,
      userCreated: "web",
      typePQRS: Number(data.tipo)
    };

    const registro = registerPqrs(info)
    registro.then((data) => {
      console.log(data);
      setSuccess(true);
      setRegistro(data.num);
    }).catch(() => {
      setError("Ocurrió un error al enviar la solicitud. Por favor, inténtelo más tarde.");
    });
  };


  return (
    <div>
      {
        success ?
        <div className="flex flex-col justify-center items-center max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">¡Solicitud enviada con éxito!</h2>
          <p>Su numero de registro es:</p>
          <p className="text-3xl bg-[#2F539F] text-white px-6 py-2 rounded-xl m-4">{registro}</p>
          <p className="text-gray-700 text-center">Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.</p>
        </div>
        :
        <form className="max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-x-10 gap-y-5">
            <div>
              <label className="block text-sm font-semibold text-blue-900">Nombre completo</label>
              <input type="text" id="nombre" name="nombre" required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900">Cédula</label>
              <input type="text" id="cedula" name="cedula" required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900">Correo electrónico</label>
              <input type="email" id="correo" name="correo" required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-blue-900">Celular</label>
              <input
                type="tel"
                id="celular"
                name="celular"
                required
                pattern="\d{10}"
                maxLength={10}
                inputMode="numeric"
                title="El número debe tener exactamente 10 dígitos"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold text-blue-900">Tipo de solicitud</label>
              <select id="tipo" name="tipo" required
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option value="">Seleccione una opción</option>
                {
                  options.map((option: PQRS, index) => (
                    <option key={index} value={option.id}>{option.name}</option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="mt-10">
            <label className="block text-sm font-semibold text-blue-900">Descripción</label>
            <textarea id="descripcion" name="descripcion" rows={5} required
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Describe aquí tu solicitud con el mayor detalle posible..."></textarea>
          </div>

          <div className="relative w-full flex flex-col items-center justify-center mt-4">
            {
              error && <p className="text-red-500 text-sm mb-4 font-semibold text-center">{error}</p>
            }
            <button
              disabled={loading}
              className={`w-fit items-center justify-center transition-all duration-300 ${loading ? "button-disabled" : "button"}`} type="submit">
              {
                !loading ?
                "Enviar" :
                "Enviando..."
              }
              {
                !loading ?
                <ArrowSend />
                :
                <Send />
              }
            </button>
          </div>
        </form>
      }
    </div>
  )
}