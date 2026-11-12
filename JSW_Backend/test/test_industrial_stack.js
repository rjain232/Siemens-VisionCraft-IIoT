const mockPlantService = require("../src/services/mockIndustrialPlantService");
const opcuaService = require("../src/services/opcuaService");

async function runIndustrialIntegrationTest() {
  console.log("==================================================================");
  console.log(" JSW INTEGRATED AUTOMATION TEST: PLC + DCS + SCADA + OMS + OPC-UA");
  console.log("==================================================================");

  let endpointUrl;

  try {
    // 1. Launch Unified Plant OPC UA Server
    console.log("\n[STEP 1] Starting Integrated Industrial OPC UA Server (port 4840)...");
    endpointUrl = await mockPlantService.start();
    console.log(`✓ Industrial Plant Server running at: ${endpointUrl}`);

    // 2. Connect Backend OPC UA Client Service
    console.log("\n[STEP 2] Connecting OpcUaService to unified plant endpoint...");
    await opcuaService.connect(endpointUrl);
    console.log("✓ OpcUaService connected successfully");

    // 3. Verify PLC Discrete Tag (TargetJPH & Robot Temperature)
    console.log("\n[STEP 3] Reading PLC Layer: TargetJPH & Robot1 Temperature...");
    const plcTags = await opcuaService.readNode([
      "ns=1;s=PLC.Line1.TargetJPH",
      "ns=1;s=PLC.Line1.Robot1.Temperature",
      "ns=1;s=PLC.Line1.OperatingMode",
    ]);
    console.log("  PLC Data:", JSON.stringify(plcTags, null, 2));
    if (plcTags[0].value !== 45.0 || plcTags[2].value !== "AUTO") {
      throw new Error("PLC layer read returned unexpected values");
    }
    console.log("✓ PLC Layer verified!");

    // 4. Verify DCS Continuous Process Tag (Blast Furnace & Hot Strip Mill)
    console.log("\n[STEP 4] Reading DCS Layer: Blast Furnace Hearth Temp & Hot Strip Exit Thickness...");
    const dcsTags = await opcuaService.readNode([
      "ns=1;s=DCS.BlastFurnace.HearthTemperature",
      "ns=1;s=DCS.BlastFurnace.HotBlastPressure",
      "ns=1;s=DCS.HotStripMill.ExitThicknessMm",
    ]);
    console.log("  DCS Data:", JSON.stringify(dcsTags, null, 2));
    if (dcsTags[0].value < 1400 || dcsTags[2].value !== 22.5) {
      throw new Error("DCS layer read returned unexpected values");
    }
    console.log("✓ DCS Continuous Process Layer verified!");

    // 5. Verify SCADA Supervisory Tag (Overall OEE & Active Alarms)
    console.log("\n[STEP 5] Reading SCADA Layer: Plant OEE & Total Power...");
    const scadaTags = await opcuaService.readNode([
      "ns=1;s=SCADA.OverallOEE",
      "ns=1;s=SCADA.TotalPlantPowerMW",
      "ns=1;s=SCADA.ActiveAlarmsCount",
    ]);
    console.log("  SCADA Data:", JSON.stringify(scadaTags, null, 2));
    if (scadaTags[0].value < 50 || scadaTags[1].value <= 0) {
      throw new Error("SCADA layer read returned unexpected values");
    }
    console.log("✓ SCADA Supervisory Layer verified!");

    // 6. Verify OMS / MES Operations Tag (Work Order & Scheduled Coils)
    console.log("\n[STEP 6] Reading OMS Layer: Active Work Order & Steel Grade...");
    const omsTags = await opcuaService.readNode([
      "ns=1;s=OMS.ActiveWorkOrder",
      "ns=1;s=OMS.TargetSteelGrade",
      "ns=1;s=OMS.BacklogCoils",
    ]);
    console.log("  OMS Data:", JSON.stringify(omsTags, null, 2));
    if (!omsTags[0].value.includes("WO-JSW") || omsTags[2].value !== 36) {
      throw new Error("OMS layer read returned unexpected values");
    }
    console.log("✓ OMS Operations Layer verified!");

    // 7. Test Cross-System Control: OMS Dispatches New Target -> Writes to PLC & SCADA
    console.log("\n[STEP 7] Testing OMS Dispatch to PLC: Writing new TargetJPH = 52.0...");
    await opcuaService.writeNode("ns=1;s=PLC.Line1.TargetJPH", 52.0, "Double");
    const updatedTarget = await opcuaService.readNode("ns=1;s=PLC.Line1.TargetJPH");
    console.log("  Updated TargetJPH from PLC:", updatedTarget.value);
    if (updatedTarget.value !== 52.0) {
      throw new Error("Failed to write updated TargetJPH to PLC layer");
    }
    console.log("✓ Cross-System Write from OMS/SCADA to PLC passed!");

    // 8. Clean Teardown
    console.log("\n[STEP 8] Disconnecting client and stopping plant simulation...");
    await opcuaService.disconnect();
    console.log("✓ OpcUaService disconnected cleanly");

    console.log("\n==================================================================");
    console.log(" ALL 4 AUTOMATION TIERS (PLC, DCS, SCADA, OMS) VERIFIED! ✓");
    console.log("==================================================================");
  } catch (err) {
    console.error("\n❌ TEST FAILED:", err);
    process.exitCode = 1;
  } finally {
    await mockPlantService.stop();
  }
}

runIndustrialIntegrationTest();
