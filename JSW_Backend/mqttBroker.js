const { Aedes } = require('aedes');
const aedes = new Aedes(); 
const server = require('net').createServer(aedes.handle);
const { writeTelemetry } = require('./telemetryUtils'); 

const MQTT_PORT = 1883;

const startMqttBroker = () => {
    server.listen(MQTT_PORT, function () {
        console.log(`Enterprise MQTT Broker running on port ${MQTT_PORT}`);
    });

    aedes.on('client', function (client) {
        console.log(`Edge Device Connected: ${client.id}`);
    });

    aedes.on('publish', function (packet, client) {
        if (packet.topic === 'factory/telemetry') {
            try {
                const payload = JSON.parse(packet.payload.toString());
                writeTelemetry(payload.robotId, payload.lineId, payload.motorTemp, payload.currentAmps);
            } catch (err) {
                console.error("Failed to parse IoT payload:", err.message);
            }
        }
    });
};

if (require.main === module) {
    startMqttBroker();
}

module.exports = startMqttBroker;

