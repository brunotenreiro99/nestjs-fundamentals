import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable() // the same as @Injectable({ scope: Scope.DEFAULT })
/**
    Control Providers Scope

    By default Injectable sets the scope as singleton, this is the same as writing @Injectable({ scope: Scope.DEFAULT  })
    When the app boostraps all the singleton providers instantiate

    Transient instances are not shared between consumers, each one recives a dedicated instance:
        Example: scope: Scope.TRANSIENT enables that feature

    The same can be done in the module itself:

    @Module({
        imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
        controllers: [CoffeesController],
        providers: [
            CoffeesService,
            {
            provide: COFFEE_BRANDS,
            useFactory: () => ['buddy brew', 'nescafe'],
            scope: Scope.TRANSIENT,
            },
        ],
        exports: [CoffeesService],
    })

    Then we have the request scope, this provides an instance of the providers for each request
    that means it get deleted and instanceted each time its called
    Example of usage: scope: Scope.REQUEST

    ----

    The scope is chanined to all the childs that means if the most outer one is a REQUEST scope, the other providers will also be REQUEST

 */
export class CoffeeRatingService {
  constructor(private readonly coffeesService: CoffeesService) {}
}
