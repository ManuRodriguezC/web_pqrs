export { renderers } from '../../renderers.mjs';

async function GET() {
  try {
    const response = await fetch("http://161.18.252.219:8001/api/api-types-pqrs/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "TOKEN 5992587b2057001b8a752f141ccf435997497e32"
      }
    });
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Error al obtener los tipos de solicitud" }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "El servicio de registro está caído, por favor intente más tarde" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
