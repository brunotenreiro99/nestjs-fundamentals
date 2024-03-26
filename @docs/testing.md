## Testing

    Nest provides a built in integration with Jest.
    If we are using REQUEST or TRANSIANT scope, we need to use the module.resolve instead of the module.get of the TestingModule.

    npm run test:watch -- coffees.service allows to run tests only on that file