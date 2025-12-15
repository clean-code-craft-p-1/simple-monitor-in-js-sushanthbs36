import { expect } from 'chai';
import { monitorVitals } from './vitals-monitor.mjs';

function createMockAlerter() {
  let alertMessageLogged = '';

  const mockAlerter = async (message) => {
    alertMessageLogged = message;
  };

  return {
    mockAlerter,
    getMessage: () => alertMessageLogged
  };
}

const testCases = [
  {
    description: 'returns true when all vitals are within range',
    vitals: { temperature: 98.1, pulseRate: 70, spo2: 98 },
    expected: true,
  },
  {
    description: 'alerts and returns false when Pulse Rate is out of range',
    vitals: { temperature: 99, pulseRate: 102, spo2: 70 },
    expected: false,
    message: 'Pulse Rate is out of range!',
  },
  {
    description: 'alerts and returns false when Temperature is out of range',
    vitals: { temperature: 103, pulseRate: 99, spo2: 70 },
    expected: false,
    message: 'Temperature is critical!',
  },
  {
    description: 'alerts and returns false when spo2 is out of range',
    vitals: { temperature: 99, pulseRate: 98, spo2: 101 },
    expected: false,
    message: 'Oxygen Saturation out of range!',
  },
  {
    description: 'alerts and returns false when input is Infinity',
    vitals: { temperature: 98.1, pulseRate: Infinity, spo2: 98 },
    expected: false,
    message: 'Invalid input type for pulseRate',
  },
  {
    description: 'alerts and returns false when input is undefined',
    vitals: { temperature: undefined, pulseRate: 70, spo2: 98 },
    expected: false,
    message: 'Invalid input type for temperature',
  },
  {
    description: 'alerts and returns false when input is NaN',
    vitals: { temperature: 98.1, pulseRate: NaN, spo2: 98 },
    expected: false,
    message: 'Invalid input type for pulseRate',
  },
  {
    description: 'alerts and returns false when input is an empty string',
    vitals: { temperature: 98.1, pulseRate: 70, spo2: '' },
    expected: false,
    message: 'Invalid input type for spo2',
  },
  {
    description: 'alerts and returns false when input is a non-numeric string',
    vitals: { temperature: 98.1, pulseRate: 'high', spo2: 98 },
    expected: false,
    message: 'Invalid input type for pulseRate',
  },
  {
    description: 'alerts and returns false when a string is given for temperature',
    vitals: { temperature: '98.1', pulseRate: 70, spo2: 98 },
    expected: false,
    message: 'Invalid input type for temperature',
  },
  {
    description: 'ignores unknown vitals and does not fail',
    vitals: { temperature: 98, pulseRate: 70, spo2: 98, unknownVital: 123 },
    expected: true,
  },
  {
    description: 'does not crash when the alerter is not provided',
    vitals: { temperature: 99, pulseRate: 102, spo2: 70 },
    expected: false,
    noAlerter: true,
  },
];

describe('vitals checker', function () {
  testCases.forEach(({ description, vitals, expected, message, noAlerter }) => {
    it(description, async function () {

      const { mockAlerter, getMessage } = createMockAlerter();
      const result = await monitorVitals(vitals, noAlerter ? undefined : mockAlerter);
      expect(result).to.equal(expected);
      if (message) expect(getMessage()).to.include(message);
    });
  });
});
