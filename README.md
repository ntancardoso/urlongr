# urlongr
A meteor application that makes URL longer.

## Test
```
  meteor test --driver-package practicalmeteor:mocha
```

## Deployment
### Run locally

* Dependencies: node, meteor

1. Install the packages
```
  npm install
```
2. Run the meteor application
```
  meteor --settings settings-dev.json
```


### Run on server

* Dependencies: node, meteor, mongo

1. Build the meteor application. This will output a file named urlongr.tar.gz. You may change the output path. 
```
meteor build --architecture=os.linux.x86_64 .
```
2. Extract the output file urlongr.tar.gz. It will extract a directory called bundle
```
  tar -zxvf urlongr.tar.gz
```
3. Go to the bundle's server directory
```
  cd /bundle/programs/server
```
4. Install the packages
```
  npm install
```
5. Setup Environment variables for meteor. Check [Meteor Docs](https://docs.meteor.com/environment-variables.html)
```
    METEOR_SETTINGS='{"DEFAULT_URL_LENGTH": 4000,"DEFAULT_DOMAIN": "test.urlongr.com"}'
    MONGO_URL='mongodb://<mongo_host>/<app>'
    ROOT_URL='http://localhost'
    PORT='80'
    ...
```
6. Run the application
```
  node /bundle/main.js
```


### Run on Docker

* Dependencies: node, meteor, docker

1. Build the meteor application. This will output a file named urlongr.tar.gz
```
meteor build --architecture=os.linux.x86_64 .
```
2. Extract the output file urlongr.tar.gz. It will extract a directory called bundle
```
  tar -zxvf urlongr.tar.gz
```
3. Update docker-compose.yml with the your volume paths and environment variables.
4. Run the container
```
  docker-compose up
```



