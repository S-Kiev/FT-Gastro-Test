// Definir la clave para almacenar en el localStorage
const localStorageKey = 'carrito';

// Función para obtener el carrito del localStorage
const getCarritoFromLocalStorage = () => {
    const carritoString = localStorage.getItem(localStorageKey);
    return carritoString ? JSON.parse(carritoString) : [];
};

// Función para guardar el carrito en el localStorage
const guardarCarritoEnLocalStorage = (carrito) => {
    localStorage.setItem(localStorageKey, JSON.stringify(carrito));
};

// Exportar el carrito
export const carrito = {
    get: () => getCarritoFromLocalStorage(),
    set: (nuevoCarrito) => {
        guardarCarritoEnLocalStorage(nuevoCarrito);
    }
};

// Resto de las funciones
export const agregarCarrito = (producto) => {
    console.log("producto:", producto);
    const carritoActual = carrito.get();
    console.log("carritoActual:", carritoActual);
    const productoExistente = carritoActual.find(item => item.id === producto.id);
    console.log("productoExistente:", productoExistente);

    if (!productoExistente) {
        const nuevoItem = {
            ...producto,
            cantidad: 1
        };

        carrito.set([...carritoActual, nuevoItem]);

        console.log("productos carrito del LocalStorege:", carrito.get());
    } else {
        console.log("El producto ya existe en el carrito.");
    }
};


export const modificarItem = (item) => {
    const carritoActual = carrito.get();
    const index = carritoActual.findIndex(producto => producto.id === item.id);

    if (index !== -1) {
        // Si se encuentra el ítem en el carrito, reemplazarlo con el nuevo ítem
        const nuevoCarrito = [...carritoActual];
        nuevoCarrito[index] = item;
        carrito.set(nuevoCarrito);
    }
};

export const vaciarCarrito = () => {
    carrito.set([]);
};

export const borrarItem = (id) => {
    carrito.set(carrito.get().filter(item => item.id !== id));
    console.log("productos carrito:", carrito.get());
};
