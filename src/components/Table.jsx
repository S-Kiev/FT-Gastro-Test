import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  carrito,
  borrarItem,
  vaciarCarrito,
  modificarItem,
} from "../carritoStore.js";

const Table = () => {
  const $carrito = useStore(carrito);
  const [total, setTotal] = useState(0);
  const [productosVenta, setProductosVenta] = useState([]);

  useEffect(() => {
    const productos = $carrito.map((item) => ({
      producto: item.id,
      nombre: item.attributes.nombre,
      precio: item.attributes.precio,
      cantidad: item.cantidad,
      subtotal: item.attributes.precio * item.cantidad,
    }));
    setProductosVenta(productos);
  }, [$carrito]);

  const obtenerFecha = () => {
    const fecha = new Date();
    return fecha.toISOString().split("T")[0];
  };

  const pagarEfectivo = () => {
    const confirmacion = window.confirm("¿Estás seguro de confirmar la orden?");
    if (confirmacion) {
      const datosOrden = {
        data: {
          fechaPedido: obtenerFecha(),
          cliente: "1",
          Productos: productosVenta,
          estado: 'pendiente',
        },
      };
      fetch("https://strapi-qa-production-936f.up.railway.app/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosOrden),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta de la solicitud:", data);
          // Aquí podrías realizar acciones adicionales después de enviar la orden
        })
        .catch((error) => console.error("Error al enviar la venta:", error));
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
          estado: 'pendiente',
        },
      };
      fetch("https://strapi-qa-production-936f.up.railway.app/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosOrden),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta de la solicitud:", data);
          // Aquí podrías realizar acciones adicionales después de enviar la orden
        })
        .catch((error) => console.error("Error al enviar la venta:", error));

        /*
        A LA URL DE MERCADO PAGO

        fetch("URL DE MERCADO PAGO", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosOrden),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta de la solicitud:", data);
          // Aquí podrías realizar acciones adicionales después de enviar la orden
        })
        .catch((error) => console.error("Error al enviar la venta:", error));

        */
      alert("Gracias por su compra");
      vaciarCarrito();
    }
  };
  // Calcula el total del carrito
  useEffect(() => {
    const total = $carrito.reduce(
      (total, item) => total + item.attributes.precio * item.cantidad,
      0
    );

    setTotal(total);
  }, [$carrito]);

  // Función para sumar la cantidad
  const sumarCantidad = (item) => {
    item.cantidad += 1;

    modificarItem(item);
  };

  // Función para restar la cantidad
  const restarCantidad = (item) => {
    if (item.cantidad <= 1) {
      return;
    }

    item.cantidad -= 1;

    modificarItem(item);
  };

  return (
    <div className="container">
      <div className="m-2 col-end justify-content-center">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Productos</th>
                <th>Precio</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {$carrito.map((item) => (
                <tr key={item.id}>
                  <td>
                  <strong>Nombre:</strong> {item.attributes.nombre}
                    <br />
                    <strong>Cantidad:</strong> {item.cantidad}
                    <br />
                    <strong>Subtotal:</strong> {item.attributes.precio * item.cantidad} $
                  </td>
                  <td>{item.attributes.precio} $</td>
                  <td>
                    <button onClick={() => sumarCantidad(item)} className="btn btn-primary m-1">
                      +
                    </button>
                    <button onClick={() => restarCantidad(item)} className="btn btn-success m-1">
                      -
                    </button>
                    <button onClick={() => borrarItem(item.id)} className="btn btn-danger m-1">
                      X
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td colSpan="2">
                  <strong>{total} $</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={() => pagarEfectivo()} className="btn btn-warning m-4">
        Pagar en Puerta
      </button>
      <button onClick={() => pagarTarjeta()} className="btn btn-danger m-4">
        Pagar con Tarjeta
      </button>
    </div>
  );
};

export default Table;
