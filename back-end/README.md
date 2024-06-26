### START APP

- To start application, run

    ```bash
        npm run dev # to start development server
    ```

## API DOCS

_base_url : <http://localhost:8080>_

- Available routes
  - [Base Route](#base-route)

  - [Authentication](#authentication)
    - [Singup](#sign-up)
    - [login](#login)
    - [Get Current User](#get-current-user)

  - [Todos](#todos)
    - [Get user Todos](#get-user-todo)
    - [Create User Todos](#create-user-todo)
    - [Query Todos](#query-todos)
    - [Edit Todo](#edit-todo)

- ### Base Route

        - Index Route
            ```bash
                Get("/")
                - # response: status - 200
                Welcome to our APi. ##ALMIGHTY_REBASE_DEVS
            ```

- ### AUTHENTICATION

- #### Sign Up

        ```bash
            Post("/signup")
            - # body: require
                {
                    "username": "test_username",
                    "password": "test_password",
                }
            - # response: status - 200
                {
                    message: "Signup Successfull",
                    data: "<jwt_token>",
                }
        ```

- #### Login

        ```bash
            Post("/login")
            - # body: require
                {
                    "username": "test_username",
                    "password": "test_password",
                }
            - # response: status - 200
                {
                    message: "login  Successfull",
                    data: "<jwt_token>",
                }
        ```

- #### Get Current User

        ```bash
            Get("/current-user")
            - # header: require
                {
                    "Authorization": "Bearer <jwt_token>"
                }
            - # response: status - 200
                {
                    message: "User Retrieved",
                    data: {
                        "id": "<mongo_id>",
                        "username": "test_username",
                    }
                }
        ```

- ### Todos

    - #### Create User Todo

            ```bash
                Post("/todos/")
                - # header: required
                    {
                        "Authorization": "Bearer <jwt_token>"
                    }
                - # body: required
                    {
                        "userId": "<mongo_id>",
                        "todo": "lorem ipsum bla bla bla",
                        "priority": "Medium", # ["High", "Medium", "Low"], default is "Medium"
                        "status": "To Do", # ["To Do", "In Progress", "Completed", "Blocked"], default is "To Do"
                    }
                - # response: status - 200
                    {
                        "message": "Todo Retrieved",
                        data: {
                            "id": "<mongo_id>",
                            "userId": "<mongo_id>",
                            "todo": "lorem ipsum bla bla bla",
                            "priority": "Medium",
                            "status": "To Do",
                            "createdAt": "Date in ISO standard",
                            "updatedAt": "Date in ISO standard",
                        }
                    }
            ```

    - #### Get User Todo

            ```bash
                Get("/todos/<todo_id>")
                - # header: require
                    {
                        "Authorization": "Bearer <jwt_token>"
                    }
                - # response: status - 200
                    {
                        "message": "Todo Created",
                        data: {
                            "id": "<mongo_id>",
                            "userId": "<mongo_id>",
                            "todo": "lorem ipsum bla bla bla",
                            "priority": {
                                "enum": ["High", "Medium", "Low"],
                                "default": "Medium",
                            },
                            "status": {
                                "enum": ["To Do", "In Progress", "Completed", "Blocked"],
                                "default": "To Do",
                            },
                            "createdAt": "Date in ISO standard",
                            "updatedAt": "Date in ISO standard",
                        }
                    }
            ```

    - #### Query Todos

            ```bash
                Get("/todos/")
                - # header: required
                    {
                        "Authorization": "Bearer <jwt_token>"
                    }
                - # Query: if none of the query parameters is passed, it get all of the user's todos
                    {
                        "todo": "<matching_the_todo_itself>",
                        "priority": "", # ["High", "Medium", "Low"],
                        "status": "", # ["In Progress", "Completed", "Blocked"],
                    }
                - # response: status - 200
                    {
                        "message": "Todos Retrieved",
                        "total": 1,
                        "data": [
                            {
                                "id": "<mongo_id>",
                                "userId": "<mongo_id>",
                                "todo": "lorem ipsum bla bla bla",
                                "priority": {
                                    "enum": ["High", "Medium", "Low"],
                                    "default": "Medium",
                                },
                                "status": {
                                    "enum": ["To Do", "In Progress", "Completed", "Blocked"],
                                    "default": "To Do",
                                },
                                "createdAt": "Date in ISO standard",
                                "updatedAt": "Date in ISO standard",
                            }
                        ]
                    }
            ```

    - #### Edit Todo

            ```bash
                Put("/<todo_id>")
                - # header: required
                    {
                        "Authorization": "Bearer <jwt_token>"
                    }
                - # Body: Key value pairs to edit
                    {
                        "todo": "<matching_the_todo_itself>",
                        "priority": "", # ["High", "Medium", "Low"],
                        "status": "", # ["In Progress", "Completed", "Blocked"],
                    }
                - # response: status - 200
                    {
                        "message": "Todos Retrieved",
                        "total": 1,
                        "data": {
                            "id": "<mongo_id>",
                            "userId": "<mongo_id>",
                            "todo": "lorem ipsum bla bla bla",
                            "priority": {
                                "enum": ["High", "Medium", "Low"],
                                "default": "Medium",
                            },
                            "status": {
                                "enum": ["To Do", "In Progress", "Completed", "Blocked"],
                                "default": "To Do",
                            },
                            "createdAt": "Date in ISO standard",
                            "updatedAt": "Date in ISO standard",
                        }
                    }
            ```
