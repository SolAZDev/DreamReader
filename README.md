# DreamReader (dreamreader)

DreamReader is an offline dream interpretation dictionary and journal app.
Made Quasar, LocalForage, and DreamMoods as base database.

## Install the dependencies

```
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```
quasar dev #-m electron for electron
quasar dev -m capacitor -T android
```

### Lint the files

```
yarn run lint
```

### Build the app for production

```
quasar build -m pwa/electron #for web or electron
yarn build:capand:sign #for android + signing
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
