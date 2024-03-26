## Testing

    Nest provides a built in integration with Jest.
    If we are using REQUEST or TRANSIANT scope, we need to use the module.resolve instead of the module.get of the TestingModule.

    npm run test:watch -- coffees.service allows to run tests only on that file

    # !! In E2E tests we need to use the createNestApplication 

    We need to have this afterAll code to destroy the application after our tests:

        afterAll(async () => {
            await app.close();
        });

    By importing the AppModule we are inizializaiting the full project. Its better to do it by moduels and not all in one.

    Any configuration added in the main.ts needs to be applied also in the e2e inizialiation code, otherwise, it will not work as the real one! This means we need to add for example global pipes.