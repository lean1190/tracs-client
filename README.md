# GENERATOR URL: https://www.npmjs.com/package/generator-ionic-gulp

# Para correr la aplicacion en el navegador como si fuera "ionic serve"
gulp

# Para correr la aplicacion en el emulador como si fuera "ionic run"
gulp -r android

-- Adicionalmente podemos pasarle el parámetro env para setear las variables de environment, por ejemplo:
gulp -r android --env production

Si no le pasamos el parámetro, toma por defecto "development"

# Para poder correr comandos de cordova
- Agregar una carpeta www en la raíz del proyecto
- cordova prepare
