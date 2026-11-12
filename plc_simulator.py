import time
import json
import random
import paho.mqtt.client as mqtt

BROKER_URL = "127.0.0.1" 
BROKER_PORT = 1883
TOPIC = "factory/telemetry"

# Updated for paho-mqtt version 2.0+
client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2, client_id="Siemens_PLC_01")

print(f"Connecting to Enterprise MQTT Broker at {BROKER_URL}:{BROKER_PORT}...")
client.connect(BROKER_URL, BROKER_PORT, 60)
client.loop_start()

print("Commencing Factory Operations. Streaming live telemetry...")
try:
    motor_temp = 80.0
    for i in range(5):
        motor_temp += random.uniform(-1.5, 1.8)
        current_amps = 12.0 + random.uniform(-0.5, 0.8)

        payload = {
            "robotId": "R-01",
            "lineId": "BIW-Line",
            "motorTemp": round(motor_temp, 2),
            "currentAmps": round(current_amps, 2)
        }

        client.publish(TOPIC, json.dumps(payload))
        print(f"Transmitted: {payload}")
        time.sleep(1)

finally:
    print("\nAutomated Factory Shutdown Sequence Initiated.")
    client.loop_stop()
    client.disconnect()

