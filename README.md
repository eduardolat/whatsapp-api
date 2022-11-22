# API de whatsapp

Este repositorio contiene un wrapper para la biblioteca whatsapp-web.js que permite enviar mensajes sin usar el api oficial de Whatsapp.

# Configuración y ejecución

- Variables de entorno de ejemplo en `.env.example`
- Existe un Dockerfile ya listo para arrancar
- Ejecutar modo desarrollo `yarn dev`
- Crear build del proyecto `yarn build`
- Ejecutar build del proyecto `yarn serve`

# Funcionamiento

- Iniciar el servidor
- Ir a `/qr` y escanear el código con la app de Whatsapp
- Listo para enviar mensajes en `/send-message` (se debe incluir un token en la cabecera Authorization definido en las variables de ento
