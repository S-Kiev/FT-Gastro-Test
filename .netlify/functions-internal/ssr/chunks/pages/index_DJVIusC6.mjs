/* empty css                          */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent } from '../astro_BXQihkh6.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './_id__B7GYZ-Ff.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { atom } from 'nanostores';
/* empty css                          */
import { useStore } from '@nanostores/react';

const carrito = atom([]);

const agregarCarrito = (producto) => {

    const carritoActual = carrito.get();
    const productoExistente = carritoActual.find(item => item.id === producto.id);

    if (productoExistente) return;

    const nuevoItem = {
        ...producto,
        cantidad: 1
    };

    carrito.set([...carritoActual, nuevoItem]);

    console.log("productos carrito:", carrito.get());
};

const modificarItem = (item) => {
    const carritoActual = carrito.get();
    const index = carritoActual.findIndex(producto => producto.id === item.id);
    
    if (index !== -1) {
        // Si se encuentra el ítem en el carrito, reemplazarlo con el nuevo ítem
        const nuevoCarrito = [...carritoActual];
        nuevoCarrito[index] = item;
        carrito.set(nuevoCarrito);
    }
};

const vaciarCarrito = () => {
    carrito.set([]);
};

const borrarItem = (id) => {
    carrito.set(carrito.get().filter(item => item.id !== id));
    console.log("productos carrito:", carrito.get());
};

const CardProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [detalle, setDetalle] = useState("/producto/");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://strapi-qa-production-936f.up.railway.app/api/productos"
        );
        const data = await response.json();
        setProductos(data.data);
        setFiltrados(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleFilter = (e) => {
    const valorBusqueda = e.target.value.toLowerCase();
    setBusqueda(valorBusqueda);
    applyFilters(valorBusqueda, categoria);
  };
  const handleReset = () => {
    setBusqueda("");
    setCategoria("todas");
    applyFilters("", "todas");
  };
  const handleFilterByCategory = (e) => {
    const valorCategoria = e.target.value.toLowerCase();
    setCategoria(valorCategoria);
    applyFilters(busqueda, valorCategoria);
  };
  const applyFilters = (busqueda2, categoria2) => {
    let filteredProducts = productos.filter(
      (producto) => producto.attributes.nombre.toLowerCase().includes(busqueda2) && (categoria2 === "todas" || producto.attributes.categoria.toLowerCase() === categoria2)
    );
    setFiltrados(filteredProducts);
  };
  return /* @__PURE__ */ jsxs("div", { className: "row", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky-top bg-gray-50", children: [
      /* @__PURE__ */ jsx("nav", { className: "navbar navbar-expand-lg bg-body-tertiary m-1 bg-slate-600", children: /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Buscador",
            value: busqueda,
            onChange: handleFilter,
            className: "form-control m-2"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "input-group-append m-2", children: /* @__PURE__ */ jsx("button", { onClick: handleReset, className: "btn btn-outline-danger", children: "Resetear" }) })
      ] }) }),
      /* @__PURE__ */ jsxs(
        "select",
        {
          className: "form-select m-1",
          "aria-label": "Categorias",
          onChange: handleFilterByCategory,
          value: categoria,
          children: [
            /* @__PURE__ */ jsx("option", { value: "todas", children: "Todas" }),
            /* @__PURE__ */ jsx("option", { value: "hamburgesas", children: "Hamburgesas" }),
            /* @__PURE__ */ jsx("option", { value: "pizzas", children: "Pizzas" }),
            /* @__PURE__ */ jsx("option", { value: "Panchos", children: "Panchos" }),
            /* @__PURE__ */ jsx("option", { value: "chivitos", children: "Chivitos" }),
            /* @__PURE__ */ jsx("option", { value: "refrescos", children: "Refrescos" }),
            /* @__PURE__ */ jsx("option", { value: "otros", children: "Otros" })
          ]
        }
      )
    ] }),
    loading && /* @__PURE__ */ jsx("div", { className: "d-flex justify-content-center align-items-center vh-100", children: /* @__PURE__ */ jsx("div", { className: "spinner-border text-primary", role: "status", children: /* @__PURE__ */ jsx("span", { className: "visually-hidden", children: "Loading..." }) }) }),
    !loading && productosFiltrados.map((item) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "card custom-card",
        style: { width: "95%" },
        children: [
          /* @__PURE__ */ jsx("a", { href: detalle + item.id, children: /* @__PURE__ */ jsx(
            "img",
            {
              src: item.attributes.imagen,
              className: "card-img-top",
              alt: "..."
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
            /* @__PURE__ */ jsx("h5", { className: "card-title", children: item.attributes.nombre }),
            /* @__PURE__ */ jsxs("p", { className: "card-text", children: [
              "Precio: ",
              item.attributes.precio,
              " $"
            ] }),
            /* @__PURE__ */ jsx(
              "a",
              {
                onClick: () => agregarCarrito(item),
                className: "btn btn-primary m-1",
                children: "Agregar"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                onClick: () => borrarItem(item.id),
                className: "btn btn-danger m-1",
                children: "Quitar"
              }
            )
          ] })
        ]
      },
      item.id
    ))
  ] });
};

const Table = () => {
  const $carrito = useStore(carrito);
  const [total, setTotal] = useState(0);
  const [productosVenta, setProductosVenta] = useState([]);
  useEffect(() => {
    const productos = $carrito.map((item) => ({
      id: item.id,
      nombre: item.attributes.nombre,
      precio: item.attributes.precio,
      cantidad: item.cantidad
    }));
    setProductosVenta(productos);
  }, [$carrito]);
  const obtenerFecha = () => {
    const fecha = /* @__PURE__ */ new Date();
    return fecha.toISOString().split("T")[0];
  };
  const pagarEfectivo = () => {
    const confirmacion = window.confirm("¿Estás seguro de confirmar la orden?");
    if (confirmacion) {
      const datosOrden = {
        data: {
          fechaPedido: obtenerFecha(),
          cliente: "1",
          Productos: {
            items: productosVenta,
            total
          },
          estado: "pendiente",
          // Ver si por query string se puede enviar la el celular del cliente
          celular: "1234567890"
        }
      };
      fetch("https://strapi-qa-production-936f.up.railway.app/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosOrden)
      }).then((response) => response.json()).then((data) => {
        console.log("Respuesta de la solicitud:", data);
      }).catch((error) => console.error("Error al enviar la venta:", error));
      alert("Gracias por su compra");
      vaciarCarrito();
    }
  };
  const pagarTarjeta = () => {
    const confirmacion = window.confirm("¿Estás seguro de confirmar la orden?");
    if (confirmacion) {
      const datosOrden = {
        data: {
          fechaPedido: obtenerFecha(),
          cliente: "1",
          Productos: productosVenta,
          estado: "pendiente"
        }
      };
      fetch("https://strapi-qa-production-936f.up.railway.app/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosOrden)
      }).then((response) => response.json()).then((data) => {
        console.log("Respuesta de la solicitud:", data);
      }).catch((error) => console.error("Error al enviar la venta:", error));
      alert("Gracias por su compra");
      vaciarCarrito();
    }
  };
  useEffect(() => {
    const total2 = $carrito.reduce(
      (total3, item) => total3 + item.attributes.precio * item.cantidad,
      0
    );
    setTotal(total2);
  }, [$carrito]);
  const sumarCantidad = (item) => {
    item.cantidad += 1;
    modificarItem(item);
  };
  const restarCantidad = (item) => {
    if (item.cantidad <= 1) {
      return;
    }
    item.cantidad -= 1;
    modificarItem(item);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "m-2 col-end justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Productos" }),
        /* @__PURE__ */ jsx("th", { children: "Precio" }),
        /* @__PURE__ */ jsx("th", { children: "Modificar" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        $carrito.map((item) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsxs("td", { children: [
            /* @__PURE__ */ jsx("strong", { children: "Nombre:" }),
            " ",
            item.attributes.nombre,
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Cantidad:" }),
            " ",
            item.cantidad,
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Subtotal:" }),
            " ",
            item.attributes.precio * item.cantidad,
            " $"
          ] }),
          /* @__PURE__ */ jsxs("td", { children: [
            item.attributes.precio,
            " $"
          ] }),
          /* @__PURE__ */ jsxs("td", { children: [
            /* @__PURE__ */ jsx("button", { onClick: () => sumarCantidad(item), className: "btn btn-primary m-1", children: "+" }),
            /* @__PURE__ */ jsx("button", { onClick: () => restarCantidad(item), className: "btn btn-success m-1", children: "-" }),
            /* @__PURE__ */ jsx("button", { onClick: () => borrarItem(item.id), className: "btn btn-danger m-1", children: "X" })
          ] })
        ] }, item.id)),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { children: "Total" }),
          /* @__PURE__ */ jsx("td", { colSpan: "2", children: /* @__PURE__ */ jsxs("strong", { children: [
            total,
            " $"
          ] }) })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("button", { onClick: () => pagarEfectivo(), className: "btn btn-warning m-4", children: "Pagar en Puerta" }),
    /* @__PURE__ */ jsx("button", { onClick: () => pagarTarjeta(), className: "btn btn-danger m-4", children: "Pagar con Tarjeta" })
  ] });
};

const Main = () => {
  const [visible, setVisible] = useState(true);
  return /* @__PURE__ */ jsxs("main", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx("div", { style: { position: "fixed", bottom: "20px", right: "20px", zIndex: "9999" }, children: /* @__PURE__ */ jsx("button", { onClick: () => setVisible(!visible), className: visible ? "btn btn-danger m-4" : "btn btn-primary m-4", children: visible ? /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "25", height: "25", fill: "currentColor", className: "bi bi-cart3", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" }) }) : /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "25", height: "25", fill: "currentColor", className: "bi bi-basket2", viewBox: "0 0 16 16", children: [
      /* @__PURE__ */ jsx("path", { d: "M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" }),
      /* @__PURE__ */ jsx("path", { d: "M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" })
    ] }) }) }),
    visible ? /* @__PURE__ */ jsx(CardProducto, {}) : /* @__PURE__ */ jsx(Table, {})
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/zeek2/OneDrive/Escritorio/FT-Gastro/src/components/Main.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/zeek2/OneDrive/Escritorio/FT-Gastro/src/pages/index.astro", void 0);

const $$file = "C:/Users/zeek2/OneDrive/Escritorio/FT-Gastro/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
