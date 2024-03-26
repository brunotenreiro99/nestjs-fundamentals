## Chapter 5 - Application Configuration

    It is common to store global values in the environment.
    We need to install @nestjs/config
    By default ConfigModule.forRoot() looks for ".env" file
        We can set to envFilePath a string or an array of files. If a variable is found in multiple files, the first one found is the one used.
        When deploying to production we may not need a .env file for that case we could use ignoreEnvFile: true. And now it will be ignore intirely.
        NestJS does not check for changes in the .env, we need to restart or update another ts file