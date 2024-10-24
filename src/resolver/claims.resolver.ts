import { QueryClaimsArgs, Claim } from '../types'
import db from '../db';

// Define the resolvers
const resolvers = {
  Query: {
    claims: async (_: undefined, args: QueryClaimsArgs): Promise<Claim[]> => {
      const { memberId } = args;
      const claims = await db('Claims')
        .select([
          'claim_status AS claimStatus',
          'medication_name AS medicationName',
          'claim_id AS claimId',
          'claim_date AS claimDate',
          'medication_cost AS medicationCost',
          'plan_paid AS planPaid',
          'member_paid AS memberPaid',
          'member_id AS memberId',
        ])
        .where({ member_id: memberId });
      return claims;
    },
  },
};

export default resolvers;