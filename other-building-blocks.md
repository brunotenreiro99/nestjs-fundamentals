## Chapter 6 - Other Building Blocks By Example

    NestJS is structure in SOLID Principles
    It allows to keep the code organize, maintainable, scalable

    Others building blocks:

        Exception Filters: are responsaible to handle unhandled exception that may occurr in the application

        Pipes: are useful to handle transformations, that means to transform a value to the desired type and validations to valuate input data, throwing an exception if is not valid

        Guard: Determinate when a given request meet certain conditions, like auth and others, allowing or not to access the route

        Interceptors: make possible to bind extra logic before or after a method exectution, extend a method, handling caching, and other stuff.

        Nest Building Blocks can be at Global, Controller, Method, Param (Pipes Only) level

            Examples:

                @UsePipes(ValidationPipe)
                export class CoffeesController {}

                export class CoffeesController {
                    @UsePipes(ValidationPipe)
                    @Get()
                    ...
                }

                (Pipes Only!)
                export class CoffeesController {
                    @Get()
                    get(@Param(ValidationPipe))
                    getAll(@Query(ValidationPipe))
                    update(@Body(ValidationPipe))
                }

        When an exception is not handled by the app, it is handled by the filters. This base handled filter can handle many cases but we could want to have some control on that, for that we can create our own exception filter.

        This can be really helpful for building for example logging systems that can then store in an external service.

        Guard have a single responsability, that is determinating if something has access or not to a route. It throwns an error if the access is denied.

            The common use for this is authentication.

            canActivate should return a boolean sync or async, determinating if the access is deneid or not.

            @Injectable()
                export class ApiKeyGuard implements CanActivate {
                canActivate(
                    context: ExecutionContext,
                ): boolean | Promise<boolean> | Observable<boolean> {
                    return true;
                }
            }

            The code above would allow any request to access the route