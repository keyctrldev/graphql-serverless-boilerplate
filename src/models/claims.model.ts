export interface Claim {
    claimStatus: string;
    medicationName: string;
    claimId: string;
    claimDate: string;
    medicationCost: number;
    planPaid: number;
    memberPaid: number;
    memberId: string; // You mentioned 'Get claims by memberId'
  }
  
  // Sample local in-memory claim data
  export const claimsData: Claim[] = [
    {
      claimStatus: 'Approved',
      medicationName: 'Aspirin',
      claimId: 'C001',
      claimDate: '2024-09-20',
      medicationCost: 50.0,
      planPaid: 30.0,
      memberPaid: 20.0,
      memberId: 'M001',
    },
    {
      claimStatus: 'Rejected',
      medicationName: 'Ibuprofen',
      claimId: 'C002',
      claimDate: '2024-09-21',
      medicationCost: 100.0,
      planPaid: 0.0,
      memberPaid: 100.0,
      memberId: 'M002',
    },
    {
      claimStatus: 'Approved',
      medicationName: 'Paracetamol',
      claimId: 'C003',
      claimDate: '2024-09-22',
      medicationCost: 70.0,
      planPaid: 50.0,
      memberPaid: 20.0,
      memberId: 'M001',
    }
  ];
  