# Anabella Avena - Ecommerce

El proyecto consta de crear un e-commerce orientado a la venta de trabajos de ilustración y diseños creados por la Ilustradora Anabella Avena, de acuerdo con los líneamientos y requisitos del actual curso de backend que imparte Coderhouse. 

## Comenzando 🚀

esta entrega está desarrollada de acuerdo con las pautas de la segunda entrega final del curso de Backend de coderhouse. comisión 40280
url: "https://github.com/robercepp/proyecto-final-entrega-2"

### Pre-requisitos 📋

- Visual studio code (ultima version estable).
- git.
- node (ultima versión estable).
- nodemon (instalado de forma global).

basicamente se trata de descargar el repositorio ya sea desde un pull desde la consola de git o manualmente y luego descomprimiendo.

### Instalación 🔧

Tras haber descargado el repositorio: 
-Ejecutar Visual studio code,
-Abrir carpeta raíz del proyecto en visual studio code,
-Abrir una consola nueva,
-Tipear "npm install" en la terminal, (esto descargarán la dependencias "express" ver. 4.18.2, "firebase-admin" ver. 11.5.0 y "mongoose" ver.6.8.4 para ser usadadas como dependencias)
-tipear en una consola (del tipo powershell o gitBash, siempre posicionada en el directorio raíz del proyecto) "npm run start". Para cargar el servidor,
-abrir cualquier explorador (actualizado a la última versión, ej: chrome, edge o firefox),
- tipear en la barra de direcciones del explorador "localhost:8080" y presionar "enter" (esto cargará el frontend del proyecto)

## Ejecutando las pruebas ⚙️

Las pruebas están mayormente pensadas para ser realizadas dentro del entorno del frontend ofrecido, pero también pueden ser realizadas desde un software del tipo "Postman"

-las pruebas en frontend se sugieren de la siguiente forma: 
1- crear un usuario del tipo administrador
2-loguearse como ese usuario,
3-crear un producto nuevo y volver a la pagina principal, 
4-verificar que el producto esté debidamente cargado en el archivo "productos.txt" en formato JSON,
5-verificar que le producto nuevo se haya creado y esté listado,
6-modificar stock y precio de algún otro producto que ya haya estado listado previamente. 
7-verificar que el producto esté debidamente cargado en el archivo "productos.txt" en formato JSON,
8-cargar ese mismo producto al carrito del administrador, 
9-ir al carrito y verificar que el producto, su stock y precio nuevo estén actualizados. 
10-borrar el producto del carrito.
11-verificar que el producto haya sido retirado del inventario de carritos del archivo "carrito.txt" en formato JSON,
12-volver al menú principal y eliminar el producto que ha sido creado en el punto 3.
13-verificar que el producto haya sido eliminado del archivo "productos.txt" en formato JSON,
14-crear un usuario nuevo de clase "usuario" (sin privilegios de administrador.
15-cargar un producto en el carrito,
16-verificar que el producto haya sido debidamente cargado con su stock correspondiente, 
17-quitar el producto del carrito, 
18-verificar que el producto haya sido debidamente cargado con su stock correspondiente.

##pruebas mediante "Postman" (sin uso del backend)
NOTA: para este segmento, no hay un servicio de frontend que nos permita loguearnos o autenticarnos por lo que para "emular" esto debemos cambiar la variable "userLogged" ubicada en el archivo main.js - linea 29,  de la siguente forma:
- userLogged = 0 (no hay ningun usuario loggueado, por ende las funciones de carga de productos y accesos autorizados no están disponibles),
- userLogged = 1 (carga un usuario que dispone de privilegios de administrador, permite crear, modificar y eliminar productos, además de todo lo que puede hacer un usuario común),
- userLoggued = 2(carga un usuario común, este solo puede cargar productos al carrito y quitarlos de su propio carrito.
(IMPORTANTE: recordar reiniciar el servidor cuando se cambien los valores de esta variable para que las tome en cuenta, se recomienda NODEMON)


1- crear un usuario del tipo administrador:
En postman usar como dirección "localhost:8080/api/usuarios"
tipo: POST,
en body enviar los siguientes datos: {"nombre": "NOMBREAQUI", "apellido": "APELLIDOAQUÍ", "usuario": "NOMBREDEUSUARIOAQUI", "email": "EMAILAQUÍ", "contrasena": "CONTRASEÑAAQUI", "admin": "true"}
(NOTA: el campo admin hace referencia si el usuario es administrador o no, escribir "true" o "false" según corresponda

2-verificar que el usuario nuevo esté debidamente cargado en el archivo "users.txt" en formato JSON,

3-crear un producto nuevo, 
En postman usar como dirección "localhost:8080/api/productos"
tipo: POST,
en body enviar los siguientes datos:{"nombre": "NOMBREDEPRODUCTO", "precio": NUMERO, "codigo": "CATEGORIADEPRODUCTO", "thumbnail": "URLDEIMAGEN", "stock": NUMERO, "detalle": "DESCRIPCIONDEPRODUCTO"}

4-verificar que el producto esté debidamente cargado en el archivo "productos.txt" en formato JSON,

5-cargar ese mismo producto al carrito del administrador, 
En postman usar como dirección "localhost:8080/api/carrito/:id/productos" (":id" corresponde al número de id con el que el nuevo producto fué almacenado)
tipo: POST,
en body enviar los siguientes datos: {"cantidad": NUMERO} (algún numero menor al stock disponible)


6-ir al carrito y verificar que el producto, su stock y precio nuevo estén debidamente cargados. 

7-borrar el producto del carrito.
En postman usar como dirección "localhost:8080/api/carrito/:id/productos/:id_prod" (":id" corresponde al id del usuario, ":id_prod" corresponde al número de id con el que el nuevo producto fué almacenado)
tipo: DELETE
sin body

8-verificar que el producto haya sido retirado del inventario de carritos del archivo "carrito.txt" en formato JSON,

9-loguearse como un usuario común (sin privilegios de administrador). ("var userLogged = 2" en main.js - línea 29)

10- intentar crear un producto nuevo (paso 3) - dará error, metodo POST no autorizado

## Construido con 🛠️

Visual studio code
express v.4.18.2,
firebase-admin v.11.5.0,
mongoose v.6.8.4 

## Autores ✒️


* **Robertino Cepparo** - *Trabajo Inicial* - [robercepp](https://github.com/robercepp)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC) - (use bajo su propio riesgo)
😊
