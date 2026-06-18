import PocketBase from 'pocketbase';

// In development, use local PB instance
const PB_URL = import.meta.env.PUBLIC_PB_URL || 'http://127.0.0.1:8090';

export const pb = new PocketBase(PB_URL);

// Optional: disable auto-cancellation if we want parallel requests
pb.autoCancellation(false);
