import { vitalsThresholds } from "./vitals-thresholds.mjs";
import { checkSingleVital } from "./vitals-processing.mjs"; 
import { vitalsMessage } from "./vitals-message.mjs";


const noopAlerter = async () => {};
export async function monitorVitals(vitals = {}, alerter = noopAlerter) {
  const vitalsWithDefinedThresholds = Object.entries(vitals)
    .filter(([name]) => vitalsThresholds[name])
    .map(([name, value]) => ({ 
      name, 
      value, 
      thresholds: vitalsThresholds[name],
      message: vitalsMessage[name] 
    }));

  for (const vital of vitalsWithDefinedThresholds) {
    const alertMessage = await checkSingleVital(vital);
    if (alertMessage) {
      await alerter(alertMessage);
      return false;
    }
  }

  return true;
}