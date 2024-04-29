import { atom } from 'nanostores';

export const carrito = atom([]);

export const agregarCarrito = (producto) => {

    const carritoActual = carrito.get();
    const productoExistente = carritoActual.find(item => item.id === producto.id);

    if (productoExistente) return;

    const nuevoItem = {
        ...producto,
        cantidad: 1
    };

    carrito.set([...carritoActual, nuevoItem]);

    console.log("productos carrito:", carrito.get());
}

export const modificarItem = (item) => {
    const carritoActual = carrito.get();
    const index = carritoActual.findIndex(producto => producto.id === item.id);
    
    if (index !== -1) {
        // Si se encuentra el ítem en el carrito, reemplazarlo con el nuevo ítem
        const nuevoCarrito = [...carritoActual];
        nuevoCarrito[index] = item;
        carrito.set(nuevoCarrito);
    }
}

export const vaciarCarrito = () => {
    carrito.set([]);
}

export const borrarItem = (id) => {
    carrito.set(carrito.get().filter(item => item.id !== id));
    console.log("productos carrito:", carrito.get());
}