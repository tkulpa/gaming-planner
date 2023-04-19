import { GamingPlatforms } from '@/components/planner.jsx';
import pushMetadata from './pushMetadata';

async function updateMetadata(token: string, selectedPlatforms: GamingPlatforms) {
  let metadata = {};
  try {
    // Fetch the new metadata you want to use from an external source. 
    // This data could be POST-ed to this endpoint, but every service
    // is going to be different.  To keep the example simple, we'll
    // just generate some random data. 
    metadata = {
      pc: selectedPlatforms.pc ? 1 : 0,
      xbox: selectedPlatforms.xbox ? 1 : 0,
      playstation: selectedPlatforms.playstation ? 1 : 0,
      switch: selectedPlatforms.switch ? 1 : 0,
    };
  } catch (e) {
    console.error(e);
    // If fetching the profile data for the external service fails for any reason,
    // ensure metadata on the Discord side is nulled out. This prevents cases
    // where the user revokes an external app permissions, and is left with
    // stale linked role data.
  }

  // Push the data to Discord.
  await pushMetadata(token, metadata);
}

export default updateMetadata