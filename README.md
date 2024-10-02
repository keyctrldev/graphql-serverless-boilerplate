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