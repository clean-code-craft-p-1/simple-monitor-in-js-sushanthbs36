import { validateVitalInput } from "./vitals-validator.mjs";
import { checkVitalStatus } from "./vitals-checker.mjs";


export async function checkSingleVital(vital){
    const validationError = validateVitalInput(vital.name, vital.value);
        if (validationError) {
            return validationError;
        }
        const status=await checkVitalStatus(vital.value,vital.thresholds)

        if(status!='ok'){
            return vital.message;
        }
}