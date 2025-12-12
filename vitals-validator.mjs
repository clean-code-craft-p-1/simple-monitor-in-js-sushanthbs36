export function validateVitalInput(name, value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return `Invalid input type for ${name}: Received type "${typeof value}". Value must be a number type.`;
  }
  return null;
}
