`aws dynamodb batch-write-item \
    --request-items '{
        "Users": [
            {
                "PutRequest": {
                    "Item": {
                        "id": {"N": "1"},
                        "name": {"S": "Alice"},
                        "userName": {"S": "alice123"}
                    }
                }
            },
            {
                "PutRequest": {
                    "Item": {
                        "id": {"N": "2"},
                        "name": {"S": "Bob"},
                        "userName": {"S": "bob456"}
                    }
                }
            },
            {
                "PutRequest": {
                    "Item": {
                        "id": {"N": "3"},
                        "name": {"S": "Charlie"},
                        "userName": {"S": "charlie789"}
                    }
                }
            }
        ]
    }' \
    --endpoint-url http://localhost:8000`