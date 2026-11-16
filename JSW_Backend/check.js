const { client, INFLUX_ORG, INFLUX_BUCKET } = require('./telemetryUtils'); 
const queryApi = client.getQueryApi(INFLUX_ORG);
const fluxQuery = \
  from(bucket: "\")
  |> range(start: -1m)
  |> filter(fn: (r) => r._measurement == "robot_telemetry")
\;
queryApi.queryRows(fluxQuery, {
    next(row, tableMeta) {
        const o = tableMeta.toObject(row);
        console.log(\[\] \ = \\);
    },
    error(err) { console.error(err) },
    complete() { console.log("Done"); }
});
