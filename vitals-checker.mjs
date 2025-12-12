export async function checkVitalStatus(value,thresholds){
  if(value < thresholds.low){
    return 'low'
  }
  else if(value > thresholds.high){
    return 'high'
  }
  else{
    return 'ok'
  }
}