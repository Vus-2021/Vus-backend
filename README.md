# 🚌 bus-project

- 사내 통근버스 신청/관리 웹앱


## 📚 Tech Stack
- Graphql, Apollo-server
- NodeJS
- Serverless Framework
- AWS(Lambda, DynamoDB, SNS, Apigateway, Cloudfront, S3, Route53)
- DB (DynamoDB, MongoDB)


## 🏗 Architecture
![image](https://user-images.githubusercontent.com/40652160/117230710-9c71f080-ae58-11eb-8720-487d3ab807bb.png)

## 🎋 Directory Tree

```
.
├── api
│   ├── admin
│   │   ├── notice
│   │   │   ├── createAdminNotice
│   │   │   │   ├── createAdminNotice.graphql
│   │   │   │   └── createAdminNotice.resolvers.js
│   │   │   ├── deleteAdminNotice
│   │   │   │   ├── deleteAdminNotice.graphql
│   │   │   │   └── deleteAdminNotice.resolvers.js
│   │   │   └── updateAdminNotice
│   │   │       ├── updateAdminNotice.graphql
│   │   │       └── updateAdminNotice.resolvers.js
│   │   ├── route
│   │   │   ├── addMonthlyRoute
│   │   │   │   ├── addMonthlyRoute.graphql
│   │   │   │   └── addMonthlyRoute.resolvers.js
│   │   │   ├── createDetailRoute
│   │   │   │   ├── createDetailRoute.graphql
│   │   │   │   └── createDetailRoute.resolvers.js
│   │   │   ├── createRoute
│   │   │   │   ├── createRoute.graphql
│   │   │   │   └── createRoute.resolvers.js
│   │   │   ├── deleteDetailRoute
│   │   │   │   ├── deleteDetailRoute.graphql
│   │   │   │   └── deleteDetailRoute.resolvers.js
│   │   │   ├── deleteRoute
│   │   │   │   ├── deleteRoute.graphql
│   │   │   │   └── deleteRoute.resolvers.js
│   │   │   ├── getRouteByMonth
│   │   │   │   ├── getRouteByMonth.graphql
│   │   │   │   └── getRouteByMonth.resolvers.js
│   │   │   ├── initPassengers
│   │   │   │   ├── initPassengers.graphql
│   │   │   │   └── initPassengers.resolvers.js
│   │   │   ├── resetMonthRoute
│   │   │   │   ├── resetMonthRoute.graphql
│   │   │   │   └── resetMonthRoute.resolvers.js
│   │   │   ├── triggerPassengers
│   │   │   │   ├── triggerPassengers.graphql
│   │   │   │   └── triggerPassengers.resolvers.js
│   │   │   ├── updateDetailRoute
│   │   │   │   ├── updateDetailRoute.graphql
│   │   │   │   └── updateDetailRoute.resolvers.js
│   │   │   └── updateRoute
│   │   │       ├── updateRoute.graphql
│   │   │       └── updateRoute.resolvers.js
│   │   └── user
│   │       ├── deleteUser
│   │       │   ├── deleteUser.graphql
│   │       │   └── deleteUser.resolvers.js
│   │       ├── getBusApplicant
│   │       │   ├── getBusApplicant.graphql
│   │       │   └── getBusApplicant.resolvers.js
│   │       ├── getUsers
│   │       │   ├── getUsers.graphql
│   │       │   └── getUsers.resolvers.js
│   │       ├── signupForExcel
│   │       │   ├── signupForExcel.graphql
│   │       │   └── signupForExcel.resolvers.js
│   │       └── updateApplyUser
│   │           ├── updateApplyUser.graphql
│   │           └── updateApplyUser.resolvers.js
│   ├── defaultSchema
│   │   └── defaultSchena.graphql
│   ├── notice
│   │   ├── createDriverLocation
│   │   │   ├── createDriverLocation.graphql
│   │   │   └── createDriverLocation.resolvers.js
│   │   ├── getAdminNotice
│   │   │   ├── getAdminNotice.graphql
│   │   │   └── getAdminNotice.resolvers.js
│   │   ├── getDriverNotice
│   │   │   ├── getDriverNotice.graphql
│   │   │   └── getDriverNotice.resolvers.js
│   │   └── getOneAdminNotice
│   │       ├── getOneAdminNotice.graphql
│   │       └── getOneAdminNotice.resolvers.js
│   ├── route
│   │   ├── getDetailRoutes
│   │   │   ├── getDetailRoutes.graphql
│   │   │   └── getDetailRoutes.resolvers.js
│   │   └── getRoutesInfo
│   │       ├── getRoutesInfo.graphql
│   │       └── getRoutesInfo.resolvers.js
│   └── user
│       ├── applyRoute
│       │   ├── applyRoute.graphql
│       │   └── applyRoute.resolvers.js
│       ├── cancelRoute
│       │   ├── cancelRoute.graphql
│       │   └── cancelRoute.resolvers.js
│       ├── checkUserId
│       │   ├── checkUserId.graphql
│       │   └── checkUserId.resolvers.js
│       ├── getMyInformation
│       │   ├── getMyInformation.graphql
│       │   └── getMyInformation.resolvers.js
│       ├── signin
│       │   ├── signin.graphql
│       │   └── signin.resolvers.js
│       └── signup
│           ├── signup.graphql
│           └── signup.resolvers.js
├── graphql
│   ├── context.js
│   ├── formatError.js
│   └── mergeSchema.js
├── handler.js
├── model
│   ├── dbConnect.js
│   ├── dynamoose.js
│   └── mongodb.js
├── modules
│   ├── dateNow.js
│   ├── hash.js
│   ├── jwt.js
│   ├── selectPassenger.js
│   ├── socketResponse.js
│   └── websocketMessage.js
├── services
│   ├── dynamoose
│   │   ├── create.js
│   │   ├── deleteItem.js
│   │   ├── get.js
│   │   ├── query.js
│   │   ├── transaction.js
│   │   └── update.js
│   ├── index.js
│   ├── mongodb
│   │   ├── create.js
│   │   ├── deleteItem.js
│   │   ├── get.js
│   │   ├── query.js
│   │   ├── transaction.js
│   │   └── update.js
│   └── sdk
│       ├── create.js
│       ├── deleteItem.js
│       ├── get.js
│       ├── query.js
│       ├── transaction.js
│       └── update.js
└── websockets
    ├── connect.js
    ├── default.js
    ├── disconnect.js
    └── message.js
```

## 📚 Dependency
```json
"dependencies": {
    "apollo-server": "^2.21.1",
    "apollo-server-core": "^2.23.0",
    "apollo-server-lambda": "^2.18.0-rc.1",
    "aws-sdk": "^2.893.0",
    "cors": "^2.8.5",
    "crypto": "^1.0.1",
    "dayjs": "^1.10.4",
    "dotenv": "^8.2.0",
    "dynamoose": "^2.7.2",
    "graphql": "^15.5.0",
    "graphql-tools": "^7.0.4",
    "jsonwebtoken": "^8.5.1",
    "lodash": "^4.17.21",
    "mongoose": "^5.12.3",
    "rand-token": "^1.0.1",
    "serverless-http": "^2.7.0",
    "serverless-offline": "^6.9.0",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "@babel/cli": "^7.13.10",
    "@babel/core": "^7.13.10",
    "@babel/node": "^7.13.10",
    "@babel/plugin-transform-runtime": "^7.13.10",
    "@babel/preset-env": "^7.13.10",
    "apollo-server-testing": "^2.21.1",
    "babel-jest": "^26.6.3",
    "eslint": "^7.22.0",
    "eslint-config-prettier": "^8.1.0",
    "eslint-plugin-prettier": "^3.3.1",
    "jest": "^26.6.3",
    "prettier": "^2.2.1",
    "serverless-dotenv-plugin": "^3.9.0"
  }
```

## 🛠 연관 프로젝트

- [FrontEnd](https://github.com/Vus-2021/Vus-frontend)

## 🧑‍💻 Developer
- Backend [최영훈](https://github.com/dudgns3tp)
- FrontEnd [엄민식](https://github.com/SausageMania)

