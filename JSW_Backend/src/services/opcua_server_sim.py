import asyncio
import random
import logging
from asyncua import Server, ua

async def run_server():
    logging.basicConfig(level=logging.WARNING)
    server = Server()
    await server.init()
    
    server.set_endpoint("opc.tcp://127.0.0.1:4841/freeopcua/server/")
    server.set_server_name("Siemens_S7_1500_Solvyn_PPC_Simulator")

    # Set security policy to None for easy testing
    server.set_security_policy([ua.SecurityPolicyType.NoSecurity])

    # Setup namespace
    uri = "http://siemens.com/simatic/s7-1500/solvyn"
    idx = await server.register_namespace(uri)

    # Create S7-1500 Plant Objects Folder
    objects = server.nodes.objects
    solvyn_folder = await objects.add_folder(idx, "Solvyn_PPC_S7_1500")

    # Register Tags matching the SCL Block & Solvyn Smart Grid
    tag_freq = await solvyn_folder.add_variable(idx, "Grid_Frequency_Hz", 50.02)
    tag_voltage = await solvyn_folder.add_variable(idx, "Grid_Voltage_V", 231.4)
    tag_active_power = await solvyn_folder.add_variable(idx, "ActivePower_MW", 5.35)
    tag_solar_p = await solvyn_folder.add_variable(idx, "Solar_Generation_MW", 4.85)
    tag_wind_p = await solvyn_folder.add_variable(idx, "Wind_Generation_MW", 2.30)
    tag_bess_soc = await solvyn_folder.add_variable(idx, "BESS_SoC_Pct", 78.4)
    tag_bess_power = await solvyn_folder.add_variable(idx, "BESS_Power_MW", -1.80)
    tag_bess_temp = await solvyn_folder.add_variable(idx, "BESS_MaxCellTemp_C", 28.6)
    tag_droop_active = await solvyn_folder.add_variable(idx, "Droop_Response_Active", False)
    tag_bess_mode = await solvyn_folder.add_variable(idx, "BESS_OperatingMode", 1) # 1: Charging

    # Enable write access
    for tag in [tag_freq, tag_voltage, tag_active_power, tag_solar_p, tag_wind_p, tag_bess_soc, tag_bess_power, tag_bess_temp, tag_droop_active, tag_bess_mode]:
        await tag.set_writable()

    print("=================================================================")
    print(">>> SIEMENS S7-1500 / SOLVYN OPC UA SERVER STARTED SUCCESSFULLY")
    print(f">>> Endpoint: opc.tcp://127.0.0.1:4841/freeopcua/server/")
    print(f">>> Namespace: {uri} (Index: {idx})")
    print("=================================================================")

    async with server:
        while True:
            # Simulate real PLC analog scan tick every 1.5 seconds
            await asyncio.sleep(1.5)
            new_freq = round(50.0 + (random.random() - 0.5) * 0.08, 3)
            new_solar = round(4.85 + (random.random() - 0.5) * 0.15, 2)
            new_wind = round(2.30 + (random.random() - 0.5) * 0.10, 2)
            bess_p = -1.80 if new_solar > 4.80 else 2.50
            total_dispatch = round(new_solar + new_wind + bess_p, 2)

            await tag_freq.write_value(new_freq)
            await tag_solar_p.write_value(new_solar)
            await tag_wind_p.write_value(new_wind)
            await tag_bess_power.write_value(bess_p)
            await tag_active_power.write_value(total_dispatch)
            await tag_droop_active.write_value(abs(new_freq - 50.0) > 0.05)

if __name__ == "__main__":
    asyncio.run(run_server())
