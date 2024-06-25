### START APP

- To start application, run
    ```bash
        $ npm run dev # to start development server
    ```

## API DOCS
_base_url : http://localhost:8080_

- Available routes
    - [Base Route](#base-route)

    - [Authentication](#authentication)
        - [Singup](#sign-up)
        - [login](#login)
        - [Get Current User](#get-current-user)

    - [Todos](#todos)
        - [Get user Todos](#get-user-todos)


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
                        "_id": "mongo_id",
                        "username": "test_username",
                    }
                }
        ```

- ### Todos
    - #### Get User Todos
        ```bash
            Get("/todos/user")
            - # body: require
                {
                    "username": "test_username"
                }
            - # response: status - 200
                {
                    //
                }
        ```
