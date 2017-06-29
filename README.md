# IAS

ExpressJS + NodeJS Web Build Automation System.

## Pre Install

### Dependency

- NodeJS
Install NodeJS from [NodeJS Official Site](https://nodejs.org/)

- node_modules
    - nodemon

        ```
            # npm install -g nodemon
        ```

    - bower

        ```
            # npm install -g bower
        ```

    - gulp

        ```
            # npm install -g gulp
        ```

- ETC
    - MySQL

        ```
            # brew install mysql
        ```

    - MongoDB

        ```
            # brew install mongodb
        ```

    - Redis

        ```
            # brew install redis
        ```

## Getting Started

```
1. rename express/config-sample.json -> express/config.json
2. Settings config.json
3. Execute Command.
    # npm install
    # node ias-cli init     // npm install / bower install Automation.
    # node ias-cli build    // Pug, Less Compile / Distribution.
    # node ias-cli watch    // Tracking Pug, Less Files(Build, Dist Automation).
    # node ias-cli run      // Start Express Server
        or # nodemon ias-cli run

```

## Path
- View Files Path

    ```
        src : The path of src matches the path of URL.
    ```

- API Files Path

    ```
        api : The path of API matches the path of API URL.
    ```