# Amazon Cognito React Example

## Environments

* Mac OS X
* Node v.12

You need to setup your AWS Account with `aws configure`

```
aws configure
```

## Getting Started

```
cp .env.sample .env
yarn
yarn cognito:create
```

![cognito-sample_—_fish___Users_ataru_Desktop_cognito-sample_—_-fish_—_80×21](https://user-images.githubusercontent.com/3450879/68059334-7ccbaa80-fd3f-11e9-986c-6aad1ba63213.jpg)

These information will be output.

```
IDENTITY_POOL_ID:        REACT_APP_ID_POOL_ID
USER_POOL_ID:            REACT_APP_USER_POOL_ID
USER_POOL_WEB_CLIENT_ID: REACT_APP_USER_POOL_WEB_CLIENT_ID
```

And please enter them to the `.env` file.

```
# .env

REACT_APP_ID_POOL_ID=xxxxxxxxxxxxxxxxxx
REACT_APP_USER_POOL_ID=xxxxxxxxxxxxxxxxxx
REACT_APP_USER_POOL_WEB_CLIENT_ID=xxxxxxxxxxxxxxxxxx

REACT_APP_AWS_REGION=us-east-1
REACT_APP_USER_POOL_NAME=MY_SAMPLE_USER_POOL
REACT_APP_USER_POOL_CLIENT_NAME=MY_SAMPLE_USER_POOL_CLIENT
REACT_APP_ID_POOL_NAME=MY_SAMPLE_ID_POOL

REACT_APP_LAMBDA_ENDPOINT=
```

Then, start the application.

```
yarn start
```

### Sign Up

1: Access /signup path

![React_App](https://user-images.githubusercontent.com/3450879/68060291-0df05080-fd43-11e9-8c68-0329d21a2962.jpg)


2: enter your email and password. Password must contain symbol character, lowercase, uppercase and numbers. Minimum length of the password is 8.

3: After clicking the "signup" button, an email which contains a confirmation code will be sent to your email box. Then check confirmation code.

4: Enter confirmation code and click the "confirmation" button, and signup will be completed.

5: Navigate to "/siginin" path. And sigin in with the above email and password. Now you can access "/" path.

![React_App](https://user-images.githubusercontent.com/3450879/68060411-a1c21c80-fd43-11e9-9dda-b4e67e6eb812.jpg)


### Deploy Lambda and API Gateway

Clone the following repogitory and deploy to AWS Lambda and API Gateway.

https://github.com/AtaruOhto/cognito-lambda-api-gateway-example


Then set the Lambda endpoint to `.env` file.


```


REACT_APP_LAMBDA_ENDPOINT=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

And restart the applicartion.

```
yarn start
```

### Access authorized API Gateway + Lambda


Access "/" path and the React application will send an request to authrized API Gateway with headers which includes Amazon Cognito JWT Token. Then the response data from Lambda will be displayed in the screen.


## Delete User Pool and Id Pool

```
yarn cognito:clean
```


