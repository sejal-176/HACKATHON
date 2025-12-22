import { supabase } from './supabaseClient';
import { Pool } from '../types';

export async function savePool(pool: Pool) {
  if (!supabase) return;
  try {
    await supabase.from('pools').insert({
      id: pool.id,
      provider: pool.provider,
      owner_id: pool.ownerId ?? null,
      meetup_name: pool.meetupPoint?.name ?? null,
      meetup_lat: pool.meetupPoint?.lat ?? null,
      meetup_lng: pool.meetupPoint?.lng ?? null,
      deep_link: pool.deepLink ?? null,
    });
    if (pool.members && pool.members.length) {
      await supabase.from('pool_members').insert(
        pool.members.map((m) => ({
          pool_id: pool.id,
          user_id: m.id,
          name: m.name,
          gender: m.gender ?? null,
        }))
      );
    }
    if (pool.pickupPoints && pool.pickupPoints.length) {
      await supabase.from('pool_stops').insert(
        pool.pickupPoints.map((p) => ({
          pool_id: pool.id,
          name: p.name,
          lat: p.lat,
          lng: p.lng,
        }))
      );
    }
  } catch (e) {
    console.error('Supabase savePool error', e);
  }
}
