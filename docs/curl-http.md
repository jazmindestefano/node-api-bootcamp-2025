## Auth endpoints

### POST Register:

curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456"
  }'

### POST Login:

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "123456"
  }'

### GET users:

curl -X GET http://localhost:3000/api/users

### GET user by id:

curl -X GET http://localhost:3000/api/users/1234567890

### POST Create user:

curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "María García",
    "email": "maria@example.com",
    "password": "password123"
  }'

### PUT complete user:

curl -X PUT http://localhost:3000/api/users/1234567890 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Carlos Pérez",
    "email": "juancarlos@example.com",
    "password": "newpassword123"
  }'

### PATCH user:

curl -X PATCH http://localhost:3000/api/users/1234567890 \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Actualizado"
  }'

### Change user password:

curl -X PATCH http://localhost:3000/api/users/1234567890/password \
  -H "Content-Type: application/json" \
  -d '{
    "oldPassword": "123456",
    "newPassword": "nuevaPassword123"
  }'

### DELETE user:

curl -X DELETE http://localhost:3000/api/users/1234567890
