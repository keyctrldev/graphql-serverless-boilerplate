# graphql-serverless-boilerplate

This repository provides a boilerplate setup for building a GraphQL API using TypeScript and hosting it on AWS Lambda. By leveraging serverless architecture, it allows for scalable, cost-efficient API management without the overhead of managing infrastructure.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 20.x)
- **npm**
- **AWS CLI** (configured with proper credentials for deploying to AWS)
- **Serverless Framework** (installed globally)

## Getting Started

Follow the steps below to set up and run the GraphQL API locally and deploy it to AWS Lambda.

### 1. Install Serverless Framework Globally

To manage the serverless deployment, you'll need to install the Serverless Framework:

```bash
npm install -g serverless
```

### 2. Clone the respository

```bash
git clone https://github.com/your-username/graphql-serverless-boilerplate.git
cd graphql-serverless-boilerplate
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the API locally

```bash
npm run start
```

### 5. Invoking the deployed API

After deploying, Serverless will provide a URL where your GraphQL API is hosted. You can access the GraphQL Playground from that URL and start using your API.

### 6. DynamoDB Local setup

steps to setup dynamodb locally

# Prerequisites

Docker desktop

## steps

1. To setup dynamodb locally, run the following command

   ```bash
       docker-compose up
   ```

   running the above command will start a instance of dynamodb locally running on 'http://localhost:8000'

2. To create a table in the local DB, run the following command

   ```bash
       aws dynamodb create-table --table-name <TABLE_NAME>  --attribute-definitions AttributeName=id,AttributeType=<S | N | B> --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput  ReadCapacityUnits=5,WriteCapacityUnits=5  --endpoint-url <ENDPOINT_URL>
   ```

   Ex:
   aws dynamodb create-table --table-name Users --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 --endpoint-url http://localhost:8000

   running the above command will create a table in the database

3. Run the seeder scripts in "seeders" folder to add data into the tables.

NOTE: In the older versions of dynamodb, you can interact with local dynamodb on http://localhost:8000/shell/. but in newer versions this is depricated. you can either use AWS cli or Dynamodb GUI clients like 'https://github.com/Arattian/DynamoDb-GUI-Client' to interact with DB
