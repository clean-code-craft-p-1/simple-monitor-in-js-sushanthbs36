import { vitalsThresholds } from "./vitals-thresholds.mjs";
import {mockAlerter as defaultAlerter} from "./vitals-monitor.test.mjs";
import { checkSingleVital } from "./vitals-processing.mjs"; 

export async function monitorVitals(vitals = {}, alerter = defaultAlerter) {
  const validVitals = Object.entries(vitals)
    .filter(([name]) => vitalsThresholds[name])
    .map(([name, value]) => ({ name, value, Thresholds: vitalsThresholds[name] }));

  for (const vital of validVitals) {
    const alertMessage = await checkSingleVital(vital);
    if (alertMessage) {
      await alerter(alertMessage);
      return false;
    }
  }

  return true;
}