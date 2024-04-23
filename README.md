# ![Universidad de palermo](https://www.palermo.edu/images/header/logo.png) Fullstack Web Development

___

## Curso 2024

Este proyecto es el de backend de la aplicación de Fullstack Web Development.

![License](https://img.shields.io/github/license/vdacun1/fullstack-web-development)
![GitHub package.json version](https://img.shields.io/github/package-json/v/vdacun1/fullstack-web-development)
![Repo Size](https://img.shields.io/github/repo-size/vdacun1/fullstack-web-development)
![Top Language](https://img.shields.io/github/languages/top/vdacun1/fullstack-web-development)

![Coverage Status](https://coveralls.io/repos/github/vdacun1/fullstack-web-development/badge.svg)
![Last Commit](https://img.shields.io/github/last-commit/vdacun1/fullstack-web-development)
![Contributors](https://img.shields.io/github/contributors/vdacun1/fullstack-web-development)

## Ejecución

Para ejecutar el proyecto, se debe instalar las dependencias con el siguiente comando:

```
npm install
```

La aplicación se desarrolló utilizando la versión `20.11.1` de Node.js.

Luego, se debe ejecutar el siguiente comando para iniciar el servidor de MongoDB y RedisCache:

```
docker-compose up
```

Y finalmente, se debe ejecutar el siguiente comando para iniciar el servidor de Express:

```
npm run start
```

### Docker

En docker se ejecutarán los siguientes servicios:

- **MongoDB** - Servidor de base de datos
- **Redis** - Servidor de caché
- **Elasticsearch** - Servidor de logging
- **Grafana** - Interfaz de visualización de logs
- **Mongo Express** - Interfaz de administración de MongoDB

#### Grafana

Para visitar grafana y ver los logs de la aplicación, se debe ingresar a la siguiente URL:

```
http://localhost:3000
```

No es necesario iniciar sesión en grafana, pero si se requiere se pueden utilizar las siguientes credenciales:

- Usuario: `admin`
- Contraseña: `secret`

## Pruebas

Para ejecutar las pruebas, se debe ejecutar el siguiente comando:

```
npm run test
```

Para ejecutar las pruebas con cobertura, se debe ejecutar el siguiente comando:

```
npm run test-coverage
```

Al ejecutar `test-coverage`, se creará un directorio con el nombre `coverage`.
Dentro se encuentra otro directorio con el nombre `lcov-report`.
Para visualizar el reporte de cobertura, se debe abrir el archivo `index.html` en un navegador.

## Servicios externos

### Mailersend

La aplicación se sustenta sobre el servicio de `Mailersend` para el envío de correos electrónicos y confirmación de
cuentas.
Por ello, se debe configurar las siguientes variables de entorno:

- `MAILERSEND_API_KEY` - API Key de `Mailersend`
- `MAILERSEND_FROM_EMAIL` - Dirección de correo electrónico de origen

Estas variables de entorno se pueden configurar en el archivo `.env`.
Si se quiere probar la funcionalidad se debe solicitar al dueño del repositorio las credenciales de `Mailersend`.
O bien crear una cuenta en [`Mailersend`](https://www.mailersend.com/) y configurar las variables de entorno con las
credenciales de la cuenta.

No se recomienda configurar `Mailersend` antes de la ejecución de las pruebas E2E, ya que se enviarán correos
electrónicos de prueba.
Una vez finalizada la ejecución de las pruebas E2E, se puede configurar `Mailersend` para el envío de correos
electrónicos. Y de esa forma visualizar los correos enviados.

### Postman

Para probar los endpoints de la aplicación, se puede importar la colección de Postman que se encuentra en el
directorio `test/e2e/Postman`.
Dentro de la colección se encuentra una carpeta de Postman con el nombre `Poblar base de datos`, al hacer clic sobre la
carpeta se pueden leer las instrucciones para poblar la base de datos de manera automática.

## Tecnologías utilizadas en el proyecto

![Node.js](https://img.shields.io/badge/-Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/-Express-000000?style=flat&logo=express&logoColor=white)
![Javascript](https://img.shields.io/badge/-Javascript-F7DF1E?style=flat&logo=javascript&logoColor=black)

![ESLint](https://img.shields.io/badge/-ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/-Prettier-F7B93E?style=flat&logo=prettier&logoColor=black)

![Jest](https://img.shields.io/badge/-Jest-C21325?style=flat&logo=jest&logoColor=white)
![Coveralls](https://img.shields.io/badge/-Coveralls-3F5767?style=flat&logo=coveralls&logoColor=white)

![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/-Redis-DC382D?style=flat&logo=redis&logoColor=white)

![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/-Elasticsearch-005571?style=flat&logo=elasticsearch&logoColor=white)
![Grafana](https://img.shields.io/badge/-Grafana-F46800?style=flat&logo=grafana&logoColor=white)
![Mailersend](https://img.shields.io/badge/-Mailersend-1c81c1?style=flat&logo=gmail&logoColor=white)

![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github&logoColor=white)
