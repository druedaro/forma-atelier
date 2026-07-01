import PocketBase from 'pocketbase';

const PB_URL = import.meta.env.PUBLIC_PB_URL ?? 'http://127.0.0.1:8090';

// Singleton — reused across SSR requests and client-side calls
export const pb = new PocketBase(PB_URL);

// Disable auto-cancellation so parallel requests don't cancel each other
pb.autoCancellation(false);
