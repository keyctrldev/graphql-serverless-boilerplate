import { IResolvers } from '@graphql-tools/utils';
import { Claim, claimsData } from '../models/claims.model';

export const claimResolver: IResolvers = {
  Query: {
    claims: async (_: unknown, { memberId }: { memberId: string }): Promise<Claim[]> => {
      // Filter claims by the provided memberId
      return claimsData.filter(claim => claim.memberId === memberId);
    },
  },
};
