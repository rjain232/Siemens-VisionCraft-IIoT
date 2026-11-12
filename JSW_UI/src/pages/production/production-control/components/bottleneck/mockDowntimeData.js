// ── Dummy BNI data generator ───────────────────────────────────────────────

const LINE_CATALOG = {
  MB2: { name: "MB2", stations: ["MB110", "MB120", "MB130", "MB140", "MB2050", "MB2060", "MB2070", "MB2080", "MB2090", "MB2100" , "MB2110" , "MB2120" , "MB2130" , "MB2140" , "MB2150"] },
  FE: { name: "FE", stations: ["FE010", "FE020", "FE030", "FE040", "FE050" ,"FE060", "FE070", "FE080", "FE090", "FE100" , "FE110", "FE120", "FE130", "FE140", "FE150"] },
  FF: { name: "FF", stations: ["FF010", "FF020", "FF030", "FF040"] },
  RF: { name: "RF", stations: ["RF010", "RF020", "RF030", "RF040"] },
};

// Simple deterministic PRNG so the same seed always gives the same numbers
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function seedFromString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

function randomBni(rand, max = 4) {
  return +(rand() * rand() * max).toFixed(2);
}

function makeSubstations(stationId, rand, count = 2) {
  return Array.from({ length: count }, (_, i) => {
    const bni = randomBni(rand);
    return {
      id: `${stationId}RBT${i + 1}`,
      name: `${stationId}RBT${i + 1}`,
      bni,
    };
  });
}

function makeStation(stationId, rand) {
  const substations = makeSubstations(stationId, rand);
  const bni = substations.reduce((max, s) => Math.max(max, s.bni), 0);
  return {
    id: stationId,
    name: stationId,
    bni,
    substations,
  };
}

function makeLine(lineId, lineName, stationIds, rand) {
  const stations = stationIds.map((sid) => makeStation(sid, rand));


  if (stations.length >= 2) {
    const forcedMaxBni = Math.max(2.8, ...stations.map((s) => s.bni));
    stations[0].bni = forcedMaxBni;
    stations[1].bni = forcedMaxBni;
  }

  const bni = stations.reduce((max, s) => Math.max(max, s.bni), 0);
  return {
    id: lineId,
    name: lineName,
    bni,
    stations,
  };
}

/**
 * generateDowntimeData
 * @param {Object} filters
 * @param {string} filters.areaId     - selected area id (or "" / "All")
 * @param {string} filters.lineId     - selected line id, e.g. "FE", or "All"
 * @param {string} filters.stationId  - selected station id, e.g. "FE010", or "All"
 * @param {string|Date} filters.startDate
 * @param {string|Date} filters.endDate
 */
export function generateDowntimeData({ areaId, lineId, stationId, startDate, endDate } = {}) {
  const seedKey = [areaId, lineId, stationId, startDate, endDate].filter(Boolean).join("|") || "default";
  const rand = seededRandom(seedFromString(seedKey));

  const lineIds =
    lineId && lineId !== "All" && LINE_CATALOG[lineId]
      ? [lineId]
      : Object.keys(LINE_CATALOG);

  return lineIds.map((lid) => {
    const catalog = LINE_CATALOG[lid];
    const stationIds =
      stationId && stationId !== "All" && catalog.stations.includes(stationId)
        ? [stationId]
        : catalog.stations;
    return makeLine(lid, catalog.name, stationIds, rand);
  });
}