// import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { PriorAuthService } from './prior-auth.service';
// import { PriorAuthDto } from './dto/prior-auth.dto';
// import { PriorAuthResponseDto } from './dto/prior-authResponse.dto';

// @Resolver(() => PriorAuthResponseDto)
// export class PriorAuthResolver {
//     constructor(private readonly priorAuthService: PriorAuthService) {}

//     // Mutation for creating PriorAuth
//     @Mutation(() => PriorAuthResponseDto)
//     async createPriorAuth(
//         @Args('priorAuth') priorAuth: PriorAuthDto,
//     ): Promise<PriorAuthResponseDto> {
//         return this.priorAuthService.createPriorAuth(priorAuth);
//     }

//     // Mutation for updating PriorAuth
//     @Mutation(() => PriorAuthResponseDto)
//     async updatePriorAuth(
//         @Args('priorAuth') priorAuth: PriorAuthResponseDto,
//     ): Promise<PriorAuthResponseDto> {
//         return this.priorAuthService.updatePriorAuthStatus(priorAuth.id, priorAuth);
//     }

//     // Query for getting PriorAuth by medicationName
//     @Query(() => [PriorAuthResponseDto])
//     async getPriorAuthStatus(
//         @Args('medicineName') medicineName: string,
//         @Args('userId') userId: string, 
//     ): Promise<PriorAuthResponseDto[]> {
//         if (!medicineName) {
//             throw new Error('Invalid medication name || No medicine is found');
//         }

//         const priorAuth = await this.priorAuthService.findByMedicationName(medicineName, userId);

//         if (!priorAuth || priorAuth.length === 0) {
//             throw new Error('No PriorAuth found for the provided medication');
//         }

//         return priorAuth;
//     }
//