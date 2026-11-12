const { InfluxDB, Point } = require('@influxdata/influxdb-client');
const client = new InfluxDB({ url: 'http://localhost:8086', token: 'kE7PO1eDCzFItdgd7VnbgXgRjFjlxwur72KRYHeozvODTqAravOPv40o1fYKLs-G8W961XQab0PzRJt376MG7w==' });
const writeApi = client.getWriteApi('rjain', 'rjain');

let count = 0;
let temp = 80.0;

const interval = setInterval(() => {
    temp += (Math.random() * 4) - 1.5; // Fluctuate temperature up and down
    const p = new Point('robot_telemetry').tag('robot_id', 'R-01').floatField('motor_temp', temp);
    writeApi.writePoint(p);
    count++;
    
    if(count >= 30) {
        clearInterval(interval);
        writeApi.close();
    }
}, 1000);
