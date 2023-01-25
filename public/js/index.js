const main = document.getElementById('main')
const users = document.getElementById('users')
const userStatus = document.getElementById('user-status')
const contextMenu = document.getElementById('context-menu')

//control de usuario activo
let userId = 0
let isAdmin = false

function admin() {
    if (isAdmin) {
        return "true"
    } else {
        return "none"
    }
}

//fetch de usuarios
async function getUsers() {
    let usuarios = await fetch('/api/usuarios')
    let data = await usuarios.json()
    return data
}

async function getUser(id) {
    let usuario = await fetch(`/api/usuarios/${id}`)
    let data = await usuario.json()
    return data
}

//fetch de productos
async function getProducts() {
    let productos = await fetch('/api/productos')
    let data = await productos.json()
    return data
}

async function getProduct(id) {
    let producto = await fetch(`/api/productos/${id}`)
    let data = await producto.json()
    return data
}

//fetch de carrito
async function getCart(id) {
    let cart = await fetch(`api/carrito/${id}/productos/`)
    let data = await cart.json()
    return data
}

//principal
async function listarUsuarios() {
    const usuarios = await getUsers()
    usuarios.forEach((usuario) => {
        document.createElement("option")
        const contenido = `
        <option value="${usuario.id}">${usuario.usuario}</option>
        `
        users.innerHTML += contenido
    })
}

async function mainBody() {
    const productos = await getProducts()
    main.innerHTML = ""
    contextMenu.innerHTML = ""
    if (isAdmin) {
        const user = await getUser(userId)
        const cartOptions = `
        <p class="menu-name">menú administrador de ${user.usuario}</p>
        <input class="btn" type="button" onclick="crearProducto()" name="boton" value="+ producto">
        `
        contextMenu.innerHTML = cartOptions
    }
    productos.forEach((producto) => {
        document.createElement("div");
        const contenido = `
<div class="card-container">
    <div class="image-container"><img class="image" src="${producto.thumbnail}" alt=""></div>
    <div class="detail-container">
        <p class="descripcion-titulo">${producto.nombre}</p>
        <p class="detalle-card"><strong>-tipo:</strong> ${producto.codigo}<br>
        <strong>-descripcion:</strong><br>${producto.detalle}<br>
        <strong>-precio:</strong> $:${producto.precio}-<br>
        <strong>-stock:</strong> ${producto.stock}
        </p>
    </div>
    <div class="form">
        <input class="input-number" id="cant${producto.id}" onkeydown="return false" step="1" min="1" max="${producto.stock}" value="1" type="number" name="cantidad">
        <input class="btn" type="submit" onclick="addToCart(${producto.id})" name="boton" value="agregar al carrito">
    </div>
    <input class="btn" type="button" onclick="detallarProducto(${producto.id})" name="boton" value="ver producto">
</div>
`
        main.innerHTML += contenido
    });
}

//validación de usuario
function activeUser() {
    const activeUserId = document.getElementById("users").value
    return activeUserId
}
async function userValidation(id) {
    const user = await getUser(id)
    userId = id
    mainBody()
    updateUser()
    if (user.admin == true || user.admin == "true") {
        isAdmin = true
        userStatus.innerHTML = `usuario activo: ${user.nombre}, (admin)`
        return true
    } else if (user.admin == false || user.admin == "false") {
        userStatus.innerHTML = `usuario activo: ${user.nombre}, (usuario)`
        isAdmin = false
        return false
    }

    async function updateUser() {
        const url = "api/usuarios/login"
        const payload = {
            id: id
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        await fetch(url, options)
            .then(response => console.log(response.status))
            .then(alert(`el usuario ${id} se ha logueado correctamente`))
    }
}

//manejo de usuarios
async function crearUsuario() {
    const contenido = `
    <div class="card-container">
    <label for="nombre">nombre</label>
    <input class="input" id="nombre" class="input" type="text" placeholder="María">
    <label for="apellido">apellido</label>
    <input class="input" id="apellido" class="input" type="text" placeholder="Rodríguez">
    <label for="usuario">nombre de usuario</label>
    <input class="input" id="usuario" class="input" type="text" placeholder="Mar-Rodri">
    <label for="email">e-mail</label>
    <input class="input" id="email" class="input" type="email" placeholder="maria-rodríguez@gmail.com" >
    <label for="email2">repita su e-mail</label>
    <input class="input" id="email2" class="input" type="email" placeholder="maria-rodríguez@gmail.com" >
    <label for="contrasena1">contraseña</label>
    <input class="input" id="contrasena1" class="input" type="password">
    <label for="contrasena2">repita la contraseña</label>
    <input class="input" id="contrasena2" class="input" type="password">
    <label for="admin">tipo de usuario</label>
    <select id="admin">
    <option value=false>cliente</option>
    <option value=true>admin</option>
    </select>
    <input class="btn" type="button" onclick="createUser()" name="boton" value="confirmar">
    </div>
    `
    main.innerHTML = contenido
}

async function createUser() {
    const nombre = document.getElementById(`nombre`).value
    const apellido = document.getElementById(`apellido`).value
    const usuario = document.getElementById(`usuario`).value
    const email = document.getElementById(`email`).value
    const email2 = document.getElementById(`email2`).value
    const contrasena = document.getElementById(`contrasena1`).value
    const contrasena2 = document.getElementById(`contrasena2`).value
    const admin = document.getElementById(`admin`).value
    if (!nombre) {
        alert("Alerta: no se ha especificado ningún nombre")
    } else if (!apellido) {
        alert("Alerta: no se ha especificado ningún apellido")
    } else if (!usuario) {
        alert("Alerta: no se ha especificado ningún nombre de usuario")
    } else if (!email) {
        alert("Alerta: no se ha especificado ningún e-mail")
    } else if (!email2) {
        alert("Alerta: no ha repetido el e-mail")
    } else if (email !== email2) {
        alert("Alerta: el email no coincide en ambos campos")
    } else if (!contrasena) {
        alert("Alerta: no se ha especificado ninguna contraseña")
    } else if (!contrasena2) {
        alert("Alerta: no ha repetido la contraseña")
    } else if (contrasena !== contrasena2) {
        alert("Alerta: las contraseñas no coinciden en ambos campos")
    } else {
        sendData(usuario)
    }
    async function sendData(user) {
        const url = `api/usuarios/`
        const payload = {
            nombre: nombre,
            apellido: apellido,
            usuario: usuario,
            email: email,
            contrasena: contrasena,
            admin: admin
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        await fetch(url, options)
            .then(response => console.log(response.status))
            .then(alert(`El usuario ${user} ha sido creado satisfactoriamente`))
        window.location.reload()
    }
}

async function modificarUsuario() {
    if (userId == 0) {
        alert("no hay ningún usuario logueado")
    } else {
        const usuario = await getUser(userId)
        main.innerHTML = ""
        const contenido = `
        <div class="card-container">
        <label for="nombre">nombre</label>
        <input class="input" id="nombre" class="input" type="text" value="${usuario.nombre}">
        <label for="apellido">apellido</label>
        <input class="input" id="apellido" class="input" type="text" value="${usuario.apellido}">
        <label for="usuario">nombre de usuario</label>
        <input class="input" id="usuario" class="input" type="text" value="${usuario.usuario}">
        <label for="email">e-mail</label>
        <input class="input" id="email" class="input" type="email" value="${usuario.email}" >
        <label for="email2">repita su e-mail</label>
        <input class="input" id="email2" class="input" type="email" placeholder="maria-rodríguez@gmail.com" >
        <label for="contrasena1">contraseña</label>
        <input class="input" id="contrasena1" type="password" class="input">
        <label for="contrasena2">repita la contraseña</label>
        <input class="input" id="contrasena2" class="input" type="password">
        <label for="admin">tipo de usuario</label>
        <select id="admin">
        <option value=false>cliente</option>
        <option value=true>admin</option>
        </select>
        <input class="btn" type="button" onclick="changeUser(${usuario.id})" name="boton" value="confirmar">
        <input class="btn" type="button" onclick="deleteUser(${usuario.id})" name="boton" value="eliminar usuario">
        </div>
        `
        main.innerHTML = contenido
    }
}

async function changeUser(id) {
    const nombre = document.getElementById(`nombre`).value
    const apellido = document.getElementById(`apellido`).value
    const usuario = document.getElementById(`usuario`).value
    const email = document.getElementById(`email`).value
    const email2 = document.getElementById(`email2`).value
    const contrasena = document.getElementById(`contrasena1`).value
    const contrasena2 = document.getElementById(`contrasena2`).value
    const admin = document.getElementById(`admin`).value
    if (!nombre) {
        alert("Alerta: no se ha especificado ningún nombre")
    } else if (!apellido) {
        alert("Alerta: no se ha especificado ningún apellido")
    } else if (!usuario) {
        alert("Alerta: no se ha especificado ningún nombre de usuario")
    } else if (!email) {
        alert("Alerta: no se ha especificado ningún e-mail")
    } else if (!email2) {
        alert("Alerta: no ha repetido el e-mail")
    } else if (email !== email2) {
        alert("Alerta: el email no coincide en ambos campos")
    } else if (!contrasena) {
        alert("Alerta: no se ha especificado ninguna contraseña")
    } else if (!contrasena2) {
        alert("Alerta: no ha repetido la contraseña")
    } else if (contrasena !== contrasena2) {
        alert("Alerta: las contraseñas no coinciden en ambos campos")
    } else {
        sendData(id, usuario)
    }
    async function sendData(id, usuario) {
        const url = `api/usuarios/${id}`
        const payload = {
            nombre: nombre,
            apellido: apellido,
            usuario: usuario,
            email: email,
            contrasena: contrasena,
            admin: admin
        }
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
        await fetch(url, options)
            .then(response => console.log(response.status))
            .then(alert(`El usuario ${usuario} ha sido modificado satisfactoriamente`))
        window.location.reload()
    }
}

async function deleteUser(id) {
    const url = `api/usuarios/${id}`
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetch(url, options)
        .then(response => console.log(response.status))
        .then(alert(`El usuario ha sido eliminado satisfactoriamente`))
    deleteCart(id)
    window.location.reload()
}

//manejo de productos
async function crearProducto() {
    const contenido = `
    <div class="card-container">
    <label for="nombre">nombre</label>
    <input id="nombre" class="input" type="text" name="nombre" >
    <label for="precio">precio</label>
    <input id="precio" class="input" type="number" name="precio"  step="0.1" min="0.1">
    <label for="codigo">codigo</label>
    <input id="codigo" class="input" type="text" name="codigo" >
    <label for="thumbnail">imagen (url)</label>
    <input id="thumbnail" class="input" type="text" name="thumbnail" >
    <label for="stock">stock</label>
    <input id="stock" class="input" type="number" name="precio"  onkeydown="return false" step="1" min="1">
    <label for="detalle">detalle</label>
    <input id="detalle" class="input" type="text" name="detalle" >
    <input class="btn" type="button" onclick="createProduct()" name="boton" value="confirmar">
    </div>
    `
    main.innerHTML = contenido
}

async function createProduct() {
    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const codigo = document.getElementById('codigo').value
    const thumbnail = document.getElementById('thumbnail').value
    const stock = document.getElementById('stock').value
    const detalle = document.getElementById('detalle').value
    const url = "api/productos/"
    const payload = {
        nombre: nombre,
        precio: precio,
        codigo: codigo,
        thumbnail: thumbnail,
        stock: stock,
        detalle: detalle
    }
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    if (!nombre) {
        alert("Alerta: no se ha especificado ningún nombre")
    } else if (!precio) {
        alert("Alerta: no se ha especificado ningún precio")
    } else if (!codigo) {
        alert("Alerta: no se ha especificado ningún codigo")
    } else if (!thumbnail) {
        alert("Alerta: no se ha agregado ninguna imagen")
    } else if (!stock) {
        alert("Alerta: no ha especificado el stock")
    } else if (!detalle) {
        alert("Alerta: no ha detallado el producto")
    } else {
        sendData(nombre)
    }
    async function sendData(nombre) {
        await fetch(url, options)
            .then(response => console.log(response.status))
            .then(alert(`El producto ${nombre} ha sido creado satisfactoriamente`))
        window.location.reload()
    }
}

async function actualizarProducto(id) {
    const producto = await getProduct(id)
    const contenido = `
    <div class="card-container">
    <label for="nombre">nombre</label>
    <input id="nombre" class="input" type="text" name="nombre" value="${producto.nombre}">
    <label for="precio">precio</label>
    <input id="precio" class="input" type="number" name="precio" value="${producto.precio}" step="0.1" min="0.1">
    <label for="codigo">codigo</label>
    <input id="codigo" class="input" type="text" name="codigo" value="${producto.codigo}">
    <label for="thumbnail">imagen (url)</label>
    <input id="thumbnail" class="input" type="text" name="thumbnail" value="${producto.thumbnail}">
    <label for="stock">stock</label>
    <input id="stock" class="input" type="number" name="precio" value="${producto.stock}" onkeydown="return false" step="1" min="1">
    <label for="detalle">detalle</label>
    <input id="detalle" class="input" type="text" name="detalle" value="${producto.detalle}">
    <input class="btn" type="button" onclick="updateProduct(${producto.id})" name="boton" value="confirmar">
    </div>
    `
    main.innerHTML = contenido
}

async function updateProduct(id) {
    const url = `/api/productos/${id}`
    const payload = {
        nombre: document.getElementById('nombre').value,
        precio: document.getElementById('precio').value,
        codigo: document.getElementById('codigo').value,
        thumbnail: document.getElementById('thumbnail').value,
        stock: document.getElementById('stock').value,
        detalle: document.getElementById('detalle').value
    }
    const options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    await fetch(url, options)
        .then(response => console.log(response.status))
        .then(alert("el producto ha sido actualizado satisfactoriamente, Volviendo al Home."))
    mainBody()
}

async function detallarProducto(id) {
    const producto = await getProduct(id)
    const contenido = `
<div class="card-container">
    <div class="image-container"><img class="image" src="${producto.thumbnail}" alt=""></div>
    <div class="detail-container">
        <p class="descripcion-titulo">${producto.nombre}</p>
        <p class="detalle-card"><strong>-tipo:</strong> ${producto.codigo}<br>
        <strong>-descripcion:</strong><br>${producto.detalle}<br>
        <strong>-precio:</strong> $:${producto.precio}-<br>
        <strong>-stock:</strong> ${producto.stock}
        </p>
    </div>
    <div class="form">
        <input class="input-number" id="cant${producto.id}" onkeydown="return false" step="1" min="1" max="${producto.stock}" value="1" type="number" name="cantidad">
        <input class="btn" type="submit" onclick="addToCart(${producto.id})" name="boton" value="agregar al carrito">
    </div>
    <div class="form">
    <input style="display:${admin()}" class="btn" type="button" onclick="actualizarProducto(${producto.id})" name="boton" value="editar">
    <input style="display:${admin()}" class="btn" type="button" onclick="deleteProduct(${producto.id})" name="boton" value="eliminar">
    </div>     
</div>
`
    main.innerHTML = contenido
};

async function deleteProduct(id) {
    const url = `api/productos/${id}`
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetch(url, options)
        .then(response => console.log(response.status))
        .then(alert(`El producto ha sido eliminado satisfactoriamente`))
    window.location.reload()
}

//manejo del carrito
async function createCart(id) {
    const url = `api/carrito/`
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(url, options)
        .then(response => console.log(response.status))
        .then(alert(`El carrito ${id} ha sido creado satisfactoriamente`))
    seeCart()
}

async function addToCart(id) {
    const url = `api/carrito/${id}/productos`
    const payload = {
        cantidad: document.getElementById(`cant${id}`).value
    }
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }
    if (userId == 0) {
        console.log("no hay ningun usuario logueado")
    } else {
        await fetch(url, options)
            .then(response => console.log(response.status))
            .then(alert(`El producto ${id} ha sido agregado satisfactoriamente`))
        mainBody()
    }
}

async function seeCart() {
    if (userId == 0) {
        alert("no hay ningun usuario logueado")
    } else {
        const user = await getUser(userId)
        const cart = await getCart(userId)
        const cartOptions = `
                <p class="menu-name">carrito de ${user.nombre} ${user.apellido} (${user.usuario})</p>
                <input class="btn" type="button" onclick="seeCart()" name="boton" value="refresh">
                `
        contextMenu.innerHTML = cartOptions
        if (cart.error) {
            const contenido = `
            <div class="no-cart">
            <h2 class="h2">Al parecer este carrito no existe<h3>
            <h3 class="h3">desea crear uno?<h4>
            <input class="btn" type="button" onclick="createCart(${userId})" name="boton" value="crear carrito">
            </div>
            `
            main.innerHTML = contenido
        } else if (!cart.length) {
            const contenido = `
            <div class="no-cart">
            <h2 class="h2">El carrito se encuentra vacío<h3>
            <h3 class="h3">agrega productos desde el home<h4>
            <input class="btn" type="button" value="Ir al Home" onClick="mainBody()">
            </div>
            `
            main.innerHTML = contenido
        } else {
            main.innerHTML = ""
            contextMenu.innerHTML = cartOptions
            cart.forEach((producto) => {
                document.createElement("div");
                const contenido = `
                <div class="card-container">
                    <div class="image-container"><img class="image" src="${producto.thumbnail}" alt=""></div>
                    <div class="detail-container">
                        <p class="descripcion-titulo">${producto.nombre}</p>
                        <p class="detalle-card"><strong>-tipo:</strong> ${producto.codigo}<br>
                        <strong>-descripcion:</strong><br>${producto.detalle}<br>
                        <strong>-precio:</strong> $:${producto.precio}-<br>
                        <strong>-stock:</strong> ${producto.stock}
                        </p>
                    </div>
                    <input class="btn" type="button" onclick="quitarDelCarrito(${producto.id})" name="boton" value="quitar del carrito">
                </div>
                `
                main.innerHTML += contenido
            })
        }
    }
}

async function quitarDelCarrito(id) {
    const url = `api/carrito/${userId}/productos/${id}/`
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch(url, options)
        .then(response => console.log(response.status))
        .then(alert(`El producto ${id} ha sido eliminado satisfactoriamente del carrito`))
    seeCart()
}

async function deleteCart(id) {
    const url = `api/carrito/${id}`
    const options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    await fetch(url, options)
        .then(response => console.log(response.status))
        .then(alert(`El carrito del usuario ha sido eliminado también`))
}

listarUsuarios()
mainBody()




