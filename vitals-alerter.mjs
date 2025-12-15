export async function vitalAlertDisplay(message){
  console.log(message)
  for (let i = 0; i < 6; i++) {
    process.stdout.write("\r* ");
    await new Promise(resolve => setTimeout(resolve, 1000));
    process.stdout.write("\r *");
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
