## User Authentication
- Node.js, Express.js
- MySQL as database (with Sequelize)
- JWT (JSON web token for authentication)
- Bcrypt (for password encryption)

### Model :

```yaml
{
    firstName: {
        type: Sequelize.DataTypes.STRING
    },
    lastName: {
        type: Sequelize.DataTypes.STRING
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.DataTypes.STRING
    }
}
```

## Usage :

### POST /user/authenticate

```
{
    "token": "***token***"
}
```

### Response :

- Successful response
```
{
    "status": "success",
    "user":
    {
        "firstName": "first",
        "lastName": "last",
        "username: "username"
    }
}
```

- Invalid or expired token
```
{
    "status": "failed",
    "message": "invalid or expired token"
}
```

### POST /user/login

```
{
    "username": "username",
    "password": "password"
}
```

### Response :

- Successful response
```
{
    "status": "success",
    "token": "***token***"
}
```

- Invalid credential
```
{
    "status": "failed",
    "message": "invalid credentials"
}
```

## POST /user/signup

```
{
    "firstName": "Sheesh",
    "lastName": "Mirza",
    "username": "sheeshmirza",
    "password": "**password**"
}
```

### Response :

- Successful response
```
{
    "status": "success",
    "message": "user registered"
}
```

- Duplicate user or username exists
```
{
    "status": "failed",
    "message": "user with this username already exists"
}
```

### Invalid request or syntax error
- 
```
{
    "status": "failed",
    "message": "invalid request"
}
```