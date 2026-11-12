const MockOpcServer = require("./mockOpcServer");
const opcuaService = require("../src/services/opcuaService");

async function runTest() {
  console.log("==================================================");
  console.log("   OPC UA Subscribe, Read, Write Integration Test");
  console.log("==================================================");

  const mockServer = new MockOpcServer(4841);
  let endpointUrl;

  try {
    // 1. Start Mock Server
    console.log("\n[STEP 1] Starting Mock OPC UA Server on port 4841...");
    endpointUrl = await mockServer.start();
    console.log(`✓ Mock Server successfully started at: ${endpointUrl}`);

    // 2. Connect OPC UA Client Service
    console.log("\n[STEP 2] Connecting OpcUaService to mock endpoint...");
    await opcuaService.connect(endpointUrl);
    console.log("✓ OpcUaService connected successfully");

    // 3. Test Read (Single Node)
    console.log("\n[STEP 3] Testing READ on ns=1;s=Line1.TargetJPH...");
    const readInitial = await opcuaService.readNode("ns=1;s=Line1.TargetJPH");
    console.log("  Read result:", JSON.stringify(readInitial, null, 2));
    if (readInitial.value !== 45.0) {
      throw new Error(`Expected initial TargetJPH to be 45.0, got ${readInitial.value}`);
    }
    console.log("✓ READ single node passed!");

    // 4. Test Read (Multiple Nodes)
    console.log("\n[STEP 4] Testing Multi-Node READ (Temperature, EmergencyStop, CurrentModel)...");
    const multiRead = await opcuaService.readNode([
      "ns=1;s=Line1.Robot1.Temperature",
      "ns=1;s=Line1.EmergencyStop",
      "ns=1;s=Line1.CurrentModel",
    ]);
    console.log("  Multi-read result:", JSON.stringify(multiRead, null, 2));
    if (multiRead.length !== 3 || multiRead[1].value !== false) {
      throw new Error("Multi-read returned unexpected data");
    }
    console.log("✓ READ multiple nodes passed!");

    // 5. Test Subscribe
    console.log("\n[STEP 5] Setting up SUBSCRIBE on ns=1;s=Line1.TargetJPH...");
    let subscriptionFired = false;
    let receivedValue = null;

    await opcuaService.subscribeTag("ns=1;s=Line1.TargetJPH", (data) => {
      console.log(`  >>> [NOTIFICATION EVENT] Tag ${data.nodeId} changed to: ${data.value} (Type: ${data.dataType})`);
      receivedValue = data.value;
      subscriptionFired = true;
    }, 100);

    // Give subscription a moment to set up initial state
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("✓ Subscription established");

    // 6. Test Write
    console.log("\n[STEP 6] Testing WRITE to ns=1;s=Line1.TargetJPH (Value: 55.5)...");
    const writeResult = await opcuaService.writeNode("ns=1;s=Line1.TargetJPH", 55.5, "Double");
    console.log("  Write result:", JSON.stringify(writeResult, null, 2));
    if (!writeResult.isGood) {
      throw new Error(`Write failed with status ${writeResult.statusCode}`);
    }
    console.log("✓ WRITE node passed!");

    // 7. Verify subscription captured the new value
    console.log("\n[STEP 7] Verifying subscription received the updated value (55.5)...");
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!subscriptionFired || receivedValue !== 55.5) {
      throw new Error(`Subscription did not receive updated value 55.5 (got: ${receivedValue})`);
    }
    console.log("✓ Real-time Subscription change event received and verified!");

    // 8. Test Write Boolean & String
    console.log("\n[STEP 8] Testing WRITE Boolean (EmergencyStop: true) and String (CurrentModel)...");
    await opcuaService.writeNode("ns=1;s=Line1.EmergencyStop", true, "Boolean");
    await opcuaService.writeNode("ns=1;s=Line1.CurrentModel", "JSW-NEW-GRADE-Z900", "String");

    const verifyFinal = await opcuaService.readNode([
      "ns=1;s=Line1.EmergencyStop",
      "ns=1;s=Line1.CurrentModel",
    ]);
    console.log("  Final read after write:", JSON.stringify(verifyFinal, null, 2));
    if (verifyFinal[0].value !== true || verifyFinal[1].value !== "JSW-NEW-GRADE-Z900") {
      throw new Error("Boolean or String write verification failed");
    }
    console.log("✓ Boolean and String Write/Read verified successfully!");

    // 9. Unsubscribe & Disconnect
    console.log("\n[STEP 9] Cleaning up subscriptions and closing connections...");
    await opcuaService.unsubscribeTag("ns=1;s=Line1.TargetJPH");
    await opcuaService.disconnect();
    console.log("✓ OpcUaService disconnected cleanly");

    console.log("\n==================================================");
    console.log("   ALL OPC UA TESTS PASSED SUCCESSFULLY! ✓");
    console.log("==================================================");
  } catch (err) {
    console.error("\n❌ TEST FAILED:", err);
    process.exitCode = 1;
  } finally {
    await mockServer.stop();
  }
}

runTest();
