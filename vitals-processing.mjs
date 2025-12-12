import { validateVitalInput } from "./vitals-validator.mjs";
import { checkVitalStatus } from "./vitals-checker.mjs";


export async function checkSingleVital(vitals){
    const validationError = validateVitalInput(vitals.name, vitals.value);
        if (validationError) {
            return validationError;
        }
        const status=await checkVitalStatus(vitals.value,vitals.Thresholds)

        if(status!='ok'){
            return vitals.Thresholds.message;
        }
}