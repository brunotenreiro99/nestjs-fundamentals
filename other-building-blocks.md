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
        
        Detect if a endpoint is public or not. For this we can use custom metadata, by using setMetadata decorator, this requests two parameters, the key and metadata value:

            Example: @setMetadata('key', 'value')
                     @SetMetadata('isPublic', true)

            We can also create our own decorator to set a metadata and make it better

            Example:

                import { SetMetadata } from '@nestjs/common';
                export const IS_PUBLIC_KEY = 'isPublic';
                export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

                Usage:

                    @Public()
                    @Get()
                    ...

            To get the metadata we can use the Reflector class of nestjs core.

                Example: const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());

                    The first method is the key of the metadata and the second argument is the target object context. If we want to get the metadata from a method, we use getHandler, instead if the metadata is at the class level, we use getClass() etc

            Since we added dependencies injection in the constructor of the api key guard, the global guard will not work anymore. When we have dependencies we need to instancate at the module level!

                Removed: 
                    
                    app.useGlobalGuards(new ApiKeyGuard());

                Added:

                    @Module({
                        imports: [ConfigModule],
                        providers: [
                            {
                            provide: APP_GUARD,
                            useClass: ApiKeyGuard,
                            },
                        ],
                    })
                    export class CommonModule {}

        Interceptors are inspired to Aspect Oriented Technic. These add additional funcionalities to a code.

            Command: nest g interceptor <file>

            Some usage of an interceptor could be to wrap a response to a certain format for example, having wrap it to:

                error: false,
                data: { ...data }

                Code example:

                    import {
                        CallHandler,
                        ExecutionContext,
                        Injectable,
                        NestInterceptor,
                    } from '@nestjs/common';
                    import { Observable, map } from 'rxjs';

                    @Injectable()
                    export class WrapResponseInterceptor implements NestInterceptor {
                        intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
                            console.log('Before');
                            return next.handle().pipe(map((data) => ({ data })));
                        }
                    }

        Pipes have two main responsabilities, transformation and validation. In both cases, they operate just before a method is invoked. Any transformation or validation takes place at this time.

        Nest has several pipes out of the box, such has parse pipes and validation pipe.

        We can also create custom pipes!

            Example of a custom pipes (yes it already exists by default):

                @Injectable()
                export class ParseIntPipe implements PipeTransform {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    transform(value: string, _: ArgumentMetadata) {
                        const val = parseInt(value);
                        console.log(value);

                        if (isNaN(val)) {
                        throw new BadRequestException(
                            `Validation failed. "${value}" is not an integer.`,
                        );
                        }

                        return val;
                    }
                }

        Middlewares can be created as functions or classes. A function middleware is stateless, it cannot inject dependencies and dont have access to the nest container. On the other hand, classes do.

            Command: nest g middleware <file>

        We bind middlewares to a PATH, for that we can implement NestModule in a module class such as this example:

            export class CommonModule implements NestModule {
                configure(consumer: MiddlewareConsumer) {
                    consumer.apply(LoggingMiddleware).forRoutes('*');
                }
            }

            And here we also set the path(s) that will execute the middleware, in this case * makes it execute in all the paths.

            consumer.apply(LoggingMiddleware).forRoutes({ 
                path: 'coffees', method: RequestMethod.GET
            });

            In this case instead if will only execute for the GET method of the coffees routes

            consumer.apply(LoggingMiddleware).exclude('coffees').forRoutes('*');

            We can also exclude paths, in this case, we exclude coffees routes to execute the middleware