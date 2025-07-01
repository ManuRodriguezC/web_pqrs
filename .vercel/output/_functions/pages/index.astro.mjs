import { c as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, e as createAstro, f as addAttribute, g as renderHead, h as renderSlot, i as renderScript } from '../chunks/astro/server_B1ESBLMF.mjs';
import 'kleur/colors';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function Send() {
  return /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", className: "icon icon-tabler icons-tabler-outline icon-tabler-send", children: [
    /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
    /* @__PURE__ */ jsx("path", { d: "M10 14l11 -11" }),
    /* @__PURE__ */ jsx("path", { d: "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" })
  ] });
}

function ArrowSend() {
  return /* @__PURE__ */ jsx("svg", { fill: "currentColor", viewBox: "0 0 24 24", className: "icon", children: /* @__PURE__ */ jsx(
    "path",
    {
      clipRule: "evenodd",
      d: "M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z",
      fillRule: "evenodd"
    }
  ) });
}

const fetchOptions = async () => {
  try {
    const res = await fetch("/pqrs/api/tipos");
    const data = await res.json();
    return res.ok ? data : data.error;
  } catch {
    return "Error de red al obtener los tipos de solicitud";
  }
};

const registerPqrs = async (info) => {
  try {
    const response = await fetch("/pqrs/api/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(info)
    });
    const data = await response.json();
    return response.ok ? data : data.error;
  } catch (error) {
    return "El servicio de registro está caído, por favor intente más tarde";
  }
};

function FormRegister() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [registro, setRegistro] = useState(null);
  useEffect(() => {
    const response = fetchOptions();
    response.then((data) => {
      if (Array.isArray(data)) {
        setOptions(data);
      } else {
        setError("Error al cargar las opciones de solicitud");
      }
    }).catch(() => {
      setError("El servicio de registro está caído, por favor intente más tarde");
    });
  }, []);
  const handleSubmit = (event) => {
    const groserias = [
      "puta",
      "puto",
      "put@",
      "put*",
      "put#",
      "mierda",
      "imbécil",
      "imbecil",
      "estúpido",
      "estupido",
      "estúpida",
      "estupida",
      "pendejo",
      "pendeja",
      "idiota",
      "malparido",
      "malparida",
      "gonorrea",
      "gonorre@",
      "gonorr@",
      "cabron",
      "cabrón",
      "cabrona",
      "culero",
      "culera",
      "verga",
      "verg@",
      "coño",
      "joder",
      "hpta",
      "marica",
      "marico",
      "perra",
      "perro",
      "zorra",
      "zorro",
      "imbecil",
      "imbécil",
      "maldito",
      "maldita",
      "mamón",
      "mamona",
      "culo",
      "chingada",
      "chingado",
      "chingar",
      "mierdero",
      "mierd@",
      "hdp"
    ];
    setError(null);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const errors = [];
    const nombre = String(data.nombre || "").trim();
    if (!nombre) {
      errors.push("El nombre es requerido.");
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
      errors.push("El nombre solo debe contener letras y espacios, sin caracteres especiales.");
    } else if (nombre.split(/\s+/).length < 2) {
      errors.push("Debe ingresar al menos nombre y apellido.");
    }
    const cedula = String(data.cedula || "").trim();
    if (!cedula) {
      errors.push("La cédula es requerida.");
    } else if (!/^\d{5,}$/.test(cedula)) {
      errors.push("La cédula debe contener solo números y al menos 5 dígitos.");
    }
    const descripcion = String(data.descripcion || "").trim();
    if (descripcion.length < 10) {
      errors.push("La descripción debe tener al menos 10 caracteres.");
    } else {
      const descLower = descripcion.toLowerCase();
      const contieneGroseria = groserias.some(
        (palabra) => descLower.includes(palabra)
      );
      if (contieneGroseria) {
        errors.push("La descripción contiene lenguaje inapropiado.");
      }
    }
    if (errors.length > 0) {
      setError(errors.join("\n"));
      return;
    }
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
    const registro2 = registerPqrs(info);
    registro2.then((data2) => {
      console.log(data2);
      setSuccess(true);
      setRegistro(data2.num);
    }).catch(() => {
      setError("Ocurrió un error al enviar la solicitud. Por favor, inténtelo más tarde.");
    });
  };
  return /* @__PURE__ */ jsx("div", { children: success ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center items-center max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-blue-900 mb-4 text-center", children: "¡Solicitud enviada con éxito!" }),
    /* @__PURE__ */ jsx("p", { children: "Su numero de registro es:" }),
    /* @__PURE__ */ jsx("p", { className: "text-3xl bg-[#2F539F] text-white px-6 py-2 rounded-xl m-4", children: registro }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-center", children: "Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible." })
  ] }) : /* @__PURE__ */ jsxs("form", { className: "max-w-4xl mx-auto mt-8 bg-white shadow-md rounded-xl p-6", onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:grid md:grid-cols-2 gap-x-10 gap-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-blue-900", children: "Nombre completo" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "nombre",
            name: "nombre",
            required: true,
            className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-blue-900", children: "Cédula" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "cedula",
            name: "cedula",
            required: true,
            className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-blue-900", children: "Correo electrónico" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "correo",
            name: "correo",
            required: true,
            className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-blue-900", children: "Celular" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            id: "celular",
            name: "celular",
            required: true,
            pattern: "\\d{10}",
            maxLength: 10,
            inputMode: "numeric",
            title: "El número debe tener exactamente 10 dígitos",
            className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-blue-900", children: "Tipo de solicitud" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            id: "tipo",
            name: "tipo",
            required: true,
            className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Seleccione una opción" }),
              options.map((option, index) => /* @__PURE__ */ jsx("option", { value: option.id, children: option.name }, index))
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-blue-900", children: "Descripción" }),
      /* @__PURE__ */ jsx(
        "textarea",
        {
          id: "descripcion",
          name: "descripcion",
          rows: 5,
          required: true,
          className: "mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500",
          placeholder: "Describe aquí tu solicitud con el mayor detalle posible..."
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative w-full flex flex-col items-center justify-center mt-4", children: [
      error && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm mb-4 font-semibold text-center", children: error }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          disabled: loading,
          className: `w-fit items-center justify-center transition-all duration-300 ${loading ? "button-disabled" : "button"}`,
          type: "submit",
          children: [
            !loading ? "Enviar" : "Enviando...",
            !loading ? /* @__PURE__ */ jsx(ArrowSend, {}) : /* @__PURE__ */ jsx(Send, {})
          ]
        }
      )
    ] })
  ] }) });
}

const $$FormPqrs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section class="min-h-[600px] bg-backSection pb-10 backgroud-form"> <div class="max-w-2xl mx-auto mt-5 px-4 text-center"> <h1 class="text-3xl font-bold text-[#2F539F] mb-4">Cuéntanos tu experiencia</h1> <p class="text-gray-600 text-md md:text-lg">
En este espacio puedes registrar una Petición, Queja, Reclamo o Sugerencia (PQRS).
            Valoramos tus comentarios para mejorar nuestros servicios.
            Por favor completa el siguiente formulario con tus datos y describe tu solicitud.
</p> </div> ${renderComponent($$result, "FormRegister", FormRegister, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/FormRegister", "client:component-export": "default" })} </section>`;
}, "/home/manurodriguez/cootratiempo/web_pqrs/src/components/FormPqrs.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="https://cootratiempo.com/wp-content/uploads/2024/08/LogoWeb.png"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>PQRS - Cootratiempo</title><meta name="description" content="En Cootratiempo tendrás beneficios increíbles. Aportes Crédito Beneficios Convenios. Somos una entidad de la economía solidaria conformada por los trabajadores y familiares de los medios de comunicación, industria gráfica y empresas vinculadas a esta, que presta un amplio portafolio de servicios y beneficios integrales a sus asociados, con el fin de aportar a la construcción de sus proyectos y elevar su calidad de vida; a través de nuestro talento humano y administración eficiente de los recursos.">${renderHead()}</head> <body class="bg-[#FDFDFD]" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "/home/manurodriguez/cootratiempo/web_pqrs/src/layouts/Layout.astro", void 0);

const $$Arrow = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg width="16" height="14" viewBox="0 0 448 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="ml-2"> <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"></path> </svg>`;
}, "/home/manurodriguez/cootratiempo/web_pqrs/src/components/icons/Arrow.astro", void 0);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const options = [
    {
      name: "Con\xF3cenos",
      url: "https://cootratiempo.com/conocenos/nosotros/",
      links: [
        {
          name: "Nosotros",
          url: "https://cootratiempo.com/conocenos/nosotros/"
        },
        {
          name: "Normatividad",
          url: "https://cootratiempo.com/conocenos/normatividad/"
        }
      ]
    },
    {
      name: "Servicios",
      url: "https://cootratiempo.com/servicios/creditos/",
      links: [
        {
          name: "Cr\xE9ditos",
          url: "https://cootratiempo.com/servicios/creditos/"
        },
        {
          name: "Convenios",
          url: "https://cootratiempo.com/servicios/convenios/"
        }
      ]
    },
    {
      name: "Beneficios",
      url: "https://cootratiempo.com/beneficios/",
      links: [
        {
          name: "Auxilios",
          url: "https://cootratiempo.com/beneficios/"
        }
      ]
    },
    {
      name: "Afiliaci\xF3n",
      url: "https://cootratiempo.com/afiliacion/"
    },
    {
      name: "Novedades",
      url: "https://cootratiempo.com/novedades/"
    },
    {
      name: "Clasificados",
      url: "https://cootratiempo.com/clasificados/"
    },
    {
      name: "Cont\xE1ctenos",
      url: "https://cootratiempo.com/contactenos/"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="w-full flex flex-row justify-between xl:justify-center items-center py-2 px-5 xl:px-20 gap-12"> <a href="https://cootratiempo.com" class="flex items-center"> <img src="https://cootratiempo.com/wp-content/uploads/2024/08/LogoWeb.png" alt="Logo Cootratiempo"> </a> <nav class="hidden xl:block bg-[#E1E5F0] px-4 rounded-full"> <ul class="flex flex-row items-center justify-center text-[#2F539F] font-bold gap-7 text-[18px]"> <li> <a href="https://cootratiempo.com"> <img src="https://cootratiempo.com/wp-content/uploads/2024/08/homeIco.png.webp" alt="Logo home"> </a> </li> ${options.map(({ name, url, links }, index) => renderTemplate`<li class="relative group"> <div class="flex flex-col items-start"> <a class="flex flex-row items-center py-2 hover:text-[#2f539fc4]"${addAttribute(url, "href")}> ${name} ${links && renderTemplate`${renderComponent($$result, "Arrow", $$Arrow, {})}`} </a> ${links && renderTemplate`<div class="
                                absolute left-0 mt-10
                                w-fit max-h-0 overflow-hidden
                                opacity-0 pointer-events-none
                                group-hover:opacity-100 group-hover:pointer-events-auto group-hover:max-h-[500px]
                                flex flex-col text-[14px] 
                                rounded-bl-3xl rounded-tr-3xl
                                transition-all duration-300 ease-in-out
                                "> ${links.map((link) => renderTemplate`<a class="px-6 py-2 bg-[#35559AD6] text-white hover:text-[#2F539F] hover:bg-[#E1E5F0]
                                        transition-all duration-300"${addAttribute(link.url, "href")}> ${link.name} </a>`)} </div>`} </div> </li>`)} </ul> </nav> <button id="open-nav" class="fixed top-5 right-5 z-50 xl:hidden bg-[#2E549E] w-14 h-14 rounded-md flex flex-col justify-around items-center p-4 transition-all duration-300 ease-in-out group"> <div class="bg-white w-full h-[2px] transition-all duration-300 ease-in-out group-[.open]:rotate-45 group-[.open]:translate-y-[8px]"></div> <div class="bg-white w-full h-[2px] transition-all duration-300 ease-in-out group-[.open]:opacity-0"></div> <div class="bg-white w-full h-[2px] transition-all duration-300 ease-in-out group-[.open]:-rotate-45 group-[.open]:-translate-y-[8px]"></div> </button> <div id="phone-nav" class="z-30 fixed w-screen transform -translate-x-full transition-all opacity-0 duration-300 h-screen bg-black/30 right-0 top-0"> <div class="bg-[#2E549E] absolute top-0 w-[70%] h-full hero-back left-0 overflow-visible"> <ul class="flex flex-col items-center justify-center text-white font-bold gap-3 text-[18px] mt-4"> <a href="https://cootratiempo.com" class="flex items-center"> <img src="https://cootratiempo.com/wp-content/uploads/2024/08/LogoFooter.png.webp" alt="Logo Cootratiempo"> </a> ${options.map(({ name, url, links }, index) => renderTemplate`<li class="flex flex-col w-full items-center"> <div class="flex flex-col w-full items-center"> ${links ? renderTemplate`<p class="toggle-btn w-full flex flex-row justify-center items-center py-2 hover:text-[#2f539fc4]"${addAttribute(`${index}`, "data-index")}> ${name} ${renderComponent($$result, "Arrow", $$Arrow, {})} </p>` : renderTemplate`<a class="flex flex-row items-center py-2 hover:text-[#2f539fc4]"${addAttribute(url, "href")}> ${name} </a>`} ${links && renderTemplate`<div class="submenu w-full flex-col hidden gap-1"${addAttribute(`${index}`, "data-index")}> ${links.map((link) => renderTemplate`<a class="w-full px-6 py-2 bg-[#E1E5F0] text-[#2f539fc4]
                                            transition-all duration-300 text-center"${addAttribute(link.url, "href")}> ${link.name} </a>`)} </div>`} </div> </li>`)} </ul> </div> </div> </header> ${renderScript($$result, "/home/manurodriguez/cootratiempo/web_pqrs/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/manurodriguez/cootratiempo/web_pqrs/src/components/Header.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${renderComponent($$result2, "FormPqrs", $$FormPqrs, {})} ` })}`;
}, "/home/manurodriguez/cootratiempo/web_pqrs/src/pages/index.astro", void 0);

const $$file = "/home/manurodriguez/cootratiempo/web_pqrs/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
