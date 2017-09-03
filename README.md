# ezmaster-cli
Node wrapper for ezMaster's HTTP API & usefull tools scripts using the API

## Installation

This package can be used as a library:

```shell
npm install --save ezmaster-cli
```

And can be used as a command line:

```shell
npm install -g ezmaster-cli
```

## Command line usage

### ezmaster-auto-create-new-version

Script used to autonomate latest application creation from the latest dockerhub published tag and to automaticaly create a new instance from this app. Run example:

```bash
APPLICATION_BASENAME="istex/istex-dl" \
INSTANCE_BASENAME="istex-dl" \
CONFIG_FROM_INSTANCE="istex-dl-2" \
EZMASTER_BASEURL="http://127.0.0.1:35267" \
ezmaster-auto-create-new-version
```

- `APPLICATION_BASENAME`: this is the docker image basename (without the tag), that will be checked on the dockerhub to get the latest published tag
- `INSTANCE_BASENAME`: this is the ezmaster instance basename (without the version), that will be used to create the next instance using an incremented version number
- `CONFIG_FROM_INSTANCE`: if you want the new instance to have a none blank configuration, you can use this variable to ask the script to copy it from another ezmaster instance (this instance should exists)
- `EZMASTER_BASEURL`: if you want to interact with another ezmaster, by default it's `http://127.0.0.1:35267`

### ezmaster-cleanup scripts

Script used to cleanup all existing ezmaster instances.

```bash
ezmaster-cleanup-all-instances    # cleanup all existing ezmaster instances.
ezmaster-cleanup-all-applications # cleanup all existing ezmaster application.
```

## API usage

TODO