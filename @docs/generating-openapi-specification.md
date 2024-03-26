## Generating OpenAPI Specification

    Documentating our application works is a vital part of a software. One great tool for this is swagger.

    OpenAPI Specification is used to describe Restful APIs. Allows to describe operations, input paramters, responses, authentication and much more.

    Nest has a dedicated module to generate this documentation.

    For this we need to install nestjs/swagger swagger-ui-express

        Code to execute a Swagger Documentation:

        const options = new DocumentBuilder()
            .setTitle('Iluvcoffee')
            .setDescription('Coffee Application')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api', app, document);

    TypeScript has some limitations and this does not allow the generating of the documentation to completly generate some documentation for some code, such as the Dtos. For this one we can write them manually or enable a extra cli plugin in nest-cli.json

        "compilerOptions": {
            ...
            "plugins": ["@nestjs/swagger/plugin"]
        }

    # !! Important to notice that PartialType imported from mapped will not translate to OpenAPI documentation. For this we need to change the import to nestjs/swagger:

        From: import { PartialType } from '@nestjs/mapped-types';
        To: import { PartialType } from '@nestjs/swagger';