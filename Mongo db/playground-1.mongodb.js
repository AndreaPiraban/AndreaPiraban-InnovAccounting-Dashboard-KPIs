/* global use, db */
// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// Base de datos que vas a usar
use("innovaccounting");

// Crear colección usuarios (se crea automáticamente con el índice)
db.createCollection("usuarios");

// Crear índice único en email
db.usuarios.createIndex(
  { email: 1 },
  { unique: true }
);

// Crear colección verificacion_correos
db.createCollection("verificacion_correos");

// Crear índice único en email
db.verificacion_correos.createIndex(
  { email: 1 },
  { unique: true }
);

// (Opcional) Crear índice TTL para borrar registros vencidos automáticamente
// ExpiraEn debe ser un campo tipo Date, no Unix timestamp
// Si quieres esto, cambiamos luego tu código en Go.
db.verificacion_correos.createIndex(
  { expiraEn: 1 },
  { expireAfterSeconds: 0 }
);
