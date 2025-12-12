import { expect } from 'chai';
import { monitorVitals } from './vitals-monitor.mjs';

let alertMessageLogged = '';
export const mockAlerter = async (message) => { 
  alertMessageLogged=message;
};

beforeEach(() => {
  alertMessageLogged=''
});

describe('vitals checker', function () {
  it('returns true when all vitals are within range', async function () {
    const result = await monitorVitals(
      { temperature: 98.1, pulseRate: 70, spo2: 98 },
      mockAlerter
    );
    expect(result).to.be.true;
  });

  it('alerts and returns false when Pulse Rate is out of range', async function () {
    const result = await monitorVitals(
      { temperature: 99, pulseRate: 102, spo2: 70 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Pulse Rate is out of range!');
  });

  it('alerts and returns false when Temperature is out of range', async function () {
    const result = await monitorVitals(
      { temperature: 103, pulseRate: 99, spo2: 70 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Temperature is critical!');
  });

  it('alerts and returns false when spo2 is out of range', async function () {
    const result = await monitorVitals(
      { temperature: 99, pulseRate: 98, spo2: 101 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Oxygen Saturation out of range!');
  });

  it('alerts and returns false when input is Infinity', async function () {
    const result = await monitorVitals(
      { temperature: 98.1, pulseRate: Infinity, spo2: 98 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Invalid input type for pulseRate');
  });

  it('alerts and returns false when input is undefined', async function () {
    const result = await monitorVitals(
      { temperature: undefined, pulseRate: 70, spo2: 98 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Invalid input type for temperature');
  });

  it('alerts and returns false when input is NaN', async function () {
    const result = await monitorVitals(
      { temperature: 98.1, pulseRate: NaN, spo2: 98 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Invalid input type for pulseRate');
  });

  it('alerts and returns false when input is an empty string', async function () {
    const result = await monitorVitals(
      { temperature: 98.1, pulseRate: 70, spo2: "" },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Invalid input type for spo2');
  });

  it('alerts and returns false when input is a non-numeric string', async function () {
    const result = await monitorVitals(
      { temperature: 98.1, pulseRate: "high", spo2: 98 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Invalid input type for pulseRate');
  });

  it('alerts and returns false when a string is given for temperature', async function () {
    const result = await monitorVitals(
      { temperature: "98.1", pulseRate: 70, spo2: 98 },
      mockAlerter
    );
    expect(result).to.be.false;
    expect(alertMessageLogged).to.include('Invalid input type for temperature');
  });

  it('does not crash when the alerter is not provided', async function () {
    const result = await monitorVitals({ temperature: 99, pulseRate: 102, spo2: 70 });
    expect(result).to.be.false;
  });

  it('ignores unknown vitals and does not fail', async function () {
    const vitals = { temperature: 98, pulseRate: 70, spo2: 98, unknownVital: 123 };
    const result = await monitorVitals(vitals, mockAlerter);
    expect(result).to.be.true;
  });

});