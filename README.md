# bus-project

## 아키텍쳐
![image](https://user-images.githubusercontent.com/40652160/117230710-9c71f080-ae58-11eb-8720-487d3ab807bb.png)

## Directory Tree

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
