import { MatchRequest, MatchResponse, Pool, PoolMember, PoolStop } from '../types';

function id() {
  return Math.random().toString(36).slice(2, 10);
}

function randAround(base: number, spread: number) {
  return base + (Math.random() - 0.5) * spread;
}

function names(count: number, femaleOnly?: boolean): PoolMember[] {
  const female = ['Aisha', 'Sneha', 'Priya', 'Zoya', 'Mira', 'Ananya', 'Kriti', 'Sanya'];
  const male = ['Arjun', 'Rohan', 'Kabir', 'Vikram', 'Rahul', 'Dev', 'Varun', 'Ishaan'];
  const arr: PoolMember[] = [];
  for (let i = 0; i < count; i++) {
    const isF = femaleOnly ? true : Math.random() < 0.5;
    const name = isF ? female[i % female.length] : male[i % male.length];
    arr.push({ id: `U-${id()}`, name, gender: isF ? 'female' : 'male' });
  }
  return arr;
}

export async function requestMatch(input: MatchRequest): Promise<MatchResponse> {
  const baseLat = input.currentLat ?? 19.1334;
  const baseLng = input.currentLng ?? 72.9133;
  const party = Math.max(1, Math.min(input.partySize || 1, 4));
  const effectiveFemaleOnly = Boolean(input.femaleOnly && input.ownerGender === 'female');
  const totalSize = 4; // hard cap group at 4
  const additionalNeeded = Math.max(0, totalSize - party);

  // Build owner's party
  const ownerName = input.ownerName || 'You';
  const ownerGender = (input.ownerGender as PoolMember['gender']) || undefined;
  const ownerId = input.ownerId || `U-${id()}`;

  const ownerMembers: PoolMember[] = [
    { id: ownerId, name: ownerName, gender: ownerGender },
  ];
  for (let i = 1; i < party; i++) {
    ownerMembers.push({ id: `U-${id()}`, name: `${ownerName} Friend ${i}`, gender: ownerGender });
  }

  // Build additional pool members to reach 4
  const others: PoolMember[] = names(additionalNeeded, effectiveFemaleOnly);
  const members = [...ownerMembers, ...others];

  const meetup: PoolStop = {
    name: `${input.collegeName} Gate`,
    lat: baseLat,
    lng: baseLng,
  };
  const pickupPoints: PoolStop[] = members.map((m) => ({
    name: `${m.name} Pickup`,
    lat: randAround(baseLat, 0.01),
    lng: randAround(baseLng, 0.01),
  }));
  const deepLink = input.provider === 'Uber'
    ? `https://m.uber.com/`
    : `https://book.olacabs.com/`;
  const pool: Pool = {
    id: `P-${id()}`,
    provider: input.provider,
    members,
    pickupPoints,
    meetupPoint: meetup,
    deepLink,
    ownerId,
  };
  return { pool };
}
