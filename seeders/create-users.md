`aws dynamodb batch-write-item \
    --request-items '{
        "Users": [
            {
                "PutRequest": {
                    "Item": {
                        "id": {"S": "1"},
                        "firstName": {"S": "John"},
                        "lastName": {"S": "Doe"},
                        "email": {"S": "john.doe@gmail.com"}
                        "phone": {"S": "+91 1785265552"}
                    }
                }
            },
            {
                "PutRequest": {
                    "Item": {
                        "id": {"S": "2"},
                        "firstName": {"S": "James"},
                        "lastName": {"S": "Smith"},
                        "email": {"S": "james.smith@gmail.com"}
                        "phone": {"S": "+91 1785265552"}
                    }
                }
            },
            {
                "PutRequest": {
                    "Item": {
                        "id": {"S": "3"},
                        "firstName": {"S": "Jon"},
                        "lastName": {"S": "Jon"},
                        "email": {"S": "jon.jon@gmail.com"}
                        "phone": {"S": "+91 1785265552"}
                    }
                }
            }
        ]
    }' \
    --endpoint-url http://localhost:8000`
