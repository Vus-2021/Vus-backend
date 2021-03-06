# π bus-project

- μ¬λ΄ ν΅κ·Όλ²μ€ μ μ²­/κ΄λ¦¬ μΉμ±


## π Tech Stack
- Graphql, Apollo-server
- NodeJS
- Serverless Framework
- AWS(Lambda, DynamoDB, SNS, Apigateway, Cloudfront, S3, Route53)
- DB (DynamoDB, MongoDB)


## π Architecture
![image](https://user-images.githubusercontent.com/40652160/117230710-9c71f080-ae58-11eb-8720-487d3ab807bb.png)

## π Directory Tree

```
.
βββ api
β   βββ admin
β   β   βββ notice
β   β   β   βββ createAdminNotice
β   β   β   β   βββ createAdminNotice.graphql
β   β   β   β   βββ createAdminNotice.resolvers.js
β   β   β   βββ deleteAdminNotice
β   β   β   β   βββ deleteAdminNotice.graphql
β   β   β   β   βββ deleteAdminNotice.resolvers.js
β   β   β   βββ updateAdminNotice
β   β   β       βββ updateAdminNotice.graphql
β   β   β       βββ updateAdminNotice.resolvers.js
β   β   βββ route
β   β   β   βββ addMonthlyRoute
β   β   β   β   βββ addMonthlyRoute.graphql
β   β   β   β   βββ addMonthlyRoute.resolvers.js
β   β   β   βββ createDetailRoute
β   β   β   β   βββ createDetailRoute.graphql
β   β   β   β   βββ createDetailRoute.resolvers.js
β   β   β   βββ createRoute
β   β   β   β   βββ createRoute.graphql
β   β   β   β   βββ createRoute.resolvers.js
β   β   β   βββ deleteDetailRoute
β   β   β   β   βββ deleteDetailRoute.graphql
β   β   β   β   βββ deleteDetailRoute.resolvers.js
β   β   β   βββ deleteRoute
β   β   β   β   βββ deleteRoute.graphql
β   β   β   β   βββ deleteRoute.resolvers.js
β   β   β   βββ getRouteByMonth
β   β   β   β   βββ getRouteByMonth.graphql
β   β   β   β   βββ getRouteByMonth.resolvers.js
β   β   β   βββ initPassengers
β   β   β   β   βββ initPassengers.graphql
β   β   β   β   βββ initPassengers.resolvers.js
β   β   β   βββ resetMonthRoute
β   β   β   β   βββ resetMonthRoute.graphql
β   β   β   β   βββ resetMonthRoute.resolvers.js
β   β   β   βββ triggerPassengers
β   β   β   β   βββ triggerPassengers.graphql
β   β   β   β   βββ triggerPassengers.resolvers.js
β   β   β   βββ updateDetailRoute
β   β   β   β   βββ updateDetailRoute.graphql
β   β   β   β   βββ updateDetailRoute.resolvers.js
β   β   β   βββ updateRoute
β   β   β       βββ updateRoute.graphql
β   β   β       βββ updateRoute.resolvers.js
β   β   βββ user
β   β       βββ deleteUser
β   β       β   βββ deleteUser.graphql
β   β       β   βββ deleteUser.resolvers.js
β   β       βββ getBusApplicant
β   β       β   βββ getBusApplicant.graphql
β   β       β   βββ getBusApplicant.resolvers.js
β   β       βββ getUsers
β   β       β   βββ getUsers.graphql
β   β       β   βββ getUsers.resolvers.js
β   β       βββ signupForExcel
β   β       β   βββ signupForExcel.graphql
β   β       β   βββ signupForExcel.resolvers.js
β   β       βββ updateApplyUser
β   β           βββ updateApplyUser.graphql
β   β           βββ updateApplyUser.resolvers.js
β   βββ defaultSchema
β   β   βββ defaultSchena.graphql
β   βββ notice
β   β   βββ createDriverLocation
β   β   β   βββ createDriverLocation.graphql
β   β   β   βββ createDriverLocation.resolvers.js
β   β   βββ getAdminNotice
β   β   β   βββ getAdminNotice.graphql
β   β   β   βββ getAdminNotice.resolvers.js
β   β   βββ getDriverNotice
β   β   β   βββ getDriverNotice.graphql
β   β   β   βββ getDriverNotice.resolvers.js
β   β   βββ getOneAdminNotice
β   β       βββ getOneAdminNotice.graphql
β   β       βββ getOneAdminNotice.resolvers.js
β   βββ route
β   β   βββ getDetailRoutes
β   β   β   βββ getDetailRoutes.graphql
β   β   β   βββ getDetailRoutes.resolvers.js
β   β   βββ getRoutesInfo
β   β       βββ getRoutesInfo.graphql
β   β       βββ getRoutesInfo.resolvers.js
β   βββ user
β       βββ applyRoute
β       β   βββ applyRoute.graphql
β       β   βββ applyRoute.resolvers.js
β       βββ cancelRoute
β       β   βββ cancelRoute.graphql
β       β   βββ cancelRoute.resolvers.js
β       βββ checkUserId
β       β   βββ checkUserId.graphql
β       β   βββ checkUserId.resolvers.js
β       βββ getMyInformation
β       β   βββ getMyInformation.graphql
β       β   βββ getMyInformation.resolvers.js
β       βββ signin
β       β   βββ signin.graphql
β       β   βββ signin.resolvers.js
β       βββ signup
β           βββ signup.graphql
β           βββ signup.resolvers.js
βββ graphql
β   βββ context.js
β   βββ formatError.js
β   βββ mergeSchema.js
βββ handler.js
βββ model
β   βββ dbConnect.js
β   βββ dynamoose.js
β   βββ mongodb.js
βββ modules
β   βββ dateNow.js
β   βββ hash.js
β   βββ jwt.js
β   βββ selectPassenger.js
β   βββ socketResponse.js
β   βββ websocketMessage.js
βββ services
β   βββ dynamoose
β   β   βββ create.js
β   β   βββ deleteItem.js
β   β   βββ get.js
β   β   βββ query.js
β   β   βββ transaction.js
β   β   βββ update.js
β   βββ index.js
β   βββ mongodb
β   β   βββ create.js
β   β   βββ deleteItem.js
β   β   βββ get.js
β   β   βββ query.js
β   β   βββ transaction.js
β   β   βββ update.js
β   βββ sdk
β       βββ create.js
β       βββ deleteItem.js
β       βββ get.js
β       βββ query.js
β       βββ transaction.js
β       βββ update.js
βββ websockets
    βββ connect.js
    βββ default.js
    βββ disconnect.js
    βββ message.js
```

## π Dependency
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

## π  μ°κ΄ νλ‘μ νΈ

- [FrontEnd](https://github.com/Vus-2021/Vus-frontend)

## π§βπ» Developer
- Backend [μ΅μν](https://github.com/dudgns3tp)
- FrontEnd [μλ―Όμ](https://github.com/SausageMania)

