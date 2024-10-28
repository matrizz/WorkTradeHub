# WorkTradeHub-API

## Description

This is a REST API for the WorkTradeHub web application. It provides endpoints for authentication, user management, and job posting.

## Endpoints

### Authentication

| METHOD     | ROUTE                    |
| ---------- | ------------------------ |
| **`POST`** | **`/api/auth/login`**    |
| **`POST`** | **`/api/auth/register`** |

### User Management

| METHOD       | ROUTE                |
| ------------ | -------------------- |
| **`GET`**    | **`/api/users`**     |
| **`GET`**    | **`/api/users/:id`** |
| **`POST`**   | **`/api/users`**     |
| **`PUT`**    | **`/api/users/:id`** |
| **`DELETE`** | **`/api/users/:id`** |

### Job Posting

| METHOD     | ROUTE           |
| ---------- | --------------- |
| **`GET`**  | **`/api/jobs`** |
| **`POST`** | **`/api/jobs`** |

## Dependencies

- express
- prisma
- bcryptjs
- cors
- dotenv
- jsonwebtoken

## License

MIT License

## Author

| [ Luiz H. ](https://github.com/matrizz)                                                                                     | [Vitor](https://github.com/prussianV)                                                | [Robert]() | [Beatriz]() | [Gabriel]() | [Jackson](https://github.com/jacksonAdiel)                                              |
| --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------- | ----------- | ----------- | --------------------------------------------------------------------------------------- |
| <a href="https://github.com/matrizz"><img style="border-radius: 50%;" width="42" src="https://github.com/matrizz.png"/></a> | <img style="border-radius: 50%;" width="42" src="https://github.com/prussianV.png"/> |            |             |             | <img style="border-radius: 50%;" width="42" src="https://github.com/jacksonAdiel.png"/> |

## Version

1.0.0
