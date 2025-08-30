import { defineMiddleware } from "astro:middleware";
import { Console } from "console";

export const onRequest = defineMiddleware((context, next) => {
    // interceptar los datos de una solicitud.
    // opcionalmente, modifica las propiedades en `locals`.
    //context.locals.title = "Nuevo título";
    console.log("Middleware");
    // devuelve una respuesta o el resultado de llamar a `next()`.
    return next();
});
