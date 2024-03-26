## Chapter 5 - Application Configuration

    It is common to store global values in the environment.
    We need to install @nestjs/config
    By default ConfigModule.forRoot() looks for ".env" file
        We can set to envFilePath a string or an array of files. If a variable is found in multiple files, the first one found is the one used.
        When deploying to production we may not need a .env file for that case we could use ignoreEnvFile: true. And now it will be ignore intirely.
    NestJS does not check for changes in the .env, we need to restart or update another ts file
    The config modules comes with a ConfigService that allows to read the parsed configuration variables
        First we need to import the ConfigModule in the imports of the section where we want to use the ConfigService.
        We can also set default values in the configService when for some reasons one was not set:
            
            this.configService.get<string>(
                'DATABASE_HOST',
                'localhost',
            );

            In this case we try to get the DATABASE_HOST but if it is not set, it will return "localhost".
    Custom config files allow us to group related configuration data
    We can add type safety to our config service

            @Inject(coffeesConfig.KEY)
            private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>

            In the constructor, by writing the code above, the variable is going to be type safe and allow us to select the corresponding values easier
    The order matters when importing files, to fix this, we can use async instead of forRoot,
    this allow us for example to import first the database module that askes for env values and after that the config module that has the values for the envs
