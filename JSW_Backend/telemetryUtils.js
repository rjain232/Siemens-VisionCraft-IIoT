const { InfluxDB, Point } = require('@influxdata/influxdb-client');

const INFLUX_URL = 'http://localhost:8086';
const INFLUX_TOKEN = 'kE7PO1eDCzFItdgd7VnbgXgRjFjlxwur72KRYHeozvODTqAravOPv40o1fYKLs-G8W961XQab0PzRJt376MG7w==';
const INFLUX_ORG = 'rjain';
const INFLUX_BUCKET = 'rjain';

const client = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });

const writeTelemetry = (robotId, lineId, motorTemp, currentAmps) => {
    const writeApi = client.getWriteApi(INFLUX_ORG, INFLUX_BUCKET);
    writeApi.useDefaultTags({ facility: 'Plant_1' });

    const dataPoint = new Point('robot_telemetry')
        .tag('robot_id', robotId)
        .tag('line_id', lineId)
        .floatField('motor_temp', motorTemp)
        .floatField('current_amps', currentAmps);

    writeApi.writePoint(dataPoint);
    
    writeApi.close()
        .then(() => console.log(`[InfluxDB] Telemetry logged for Robot: ${robotId}`))
        .catch(e => console.error('Error saving telemetry:', e));
};

module.exports = { writeTelemetry, client, INFLUX_ORG, INFLUX_BUCKET };

