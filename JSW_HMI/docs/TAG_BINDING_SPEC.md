# Tag Binding & Faceplate Reconciliation Specification

This specification defines how visual SimaticML screen elements map to physical Siemens S7-1500 PLC data blocks.

---

## 1. Tag Categorization Hierarchy

The project tag database (`D:\TIA v20\hmi tags.xlsx`) contains **1,148 tags**, divided into two primary scopes:

### A. Global Shared Tags (Cross-Screen)
These tags appear across dozens of screens and are managed by header and permanent navigation bars:
- **`OpmodePanel_opmode{1..7}_*` (69 tags)**: Controls active station operation mode (Auto, Manual, Jog, Step).
- **`OPMode1_Blocked` / `OPMode4_Foreground_Blocked`**: Dynamic visibility interlocks that lock out station mode switches when safety barriers or E-Stops trip.
- **`interfaceHmipushButtonBitCoded`**: Word-level bitmask handshaking button presses back to the PLC.

### B. Station-Specific Local Tags
These tags control physical devices located at individual manufacturing stations:
- **`MB110LifterActualPos` - `MB140LifterActualPos`**: Lifter heights (Real/DInt).
- **`MB140RB03AndonStatus`, `MB140RB04AndonStatus`**: Station robot execution status.
- **`GlobalRoller_Bed_Com_Command_RB_Trans{*}`**: Roller bed conveyor motors.

---

## 2. Reconciled Control Bindings

| Screen Element Name | Element Type | Occurrences | Matched PLC Data Block / Tag | Data Type | Function |
|---|---|---|---|---|---|
| `LSicar_Valve8Pos_LeftHomeRightWork_WithPB_1..5` | `HmiFaceplateContainer` | 14 Layouts | `Valve1To8_State`, `Valve1To8_Pos`, `Valve1To8_Alarm` | `UDInt` / `UInt` | Pneumatic tooling clamp control |
| `Fusszeile_Button_ManualOPMode1_1..5` | `HmiButton` | 54 Screens | `OpmodePanel.opmode[1..5].userInterfaceOut.controlNoHmi` | `Int` | Operation mode switcher (Manual OP 1..5) |
| `Button_Back / Button_Back_1..3` | `HmiButton` | 125 Screens | `OpmodePanel.panelHmi[1].interfaceHmi.pushButtonBitCoded` | `Word` | Station exit acknowledgment & navigation |
| `Move_Legend` | `HmiButton` | 48 Screens | UI Route only | None | Opens cycle time / andon legend popup |
| `sequenceControlFaceplate_Lite_1` | `HmiFaceplateContainer` | 17 Screens | `Inst8*.*Graph_DB.learningModeThresholdWarn` | `Bool` / `UDInt` | Sequential motion step progression |

---

## 3. Schema Reference
The machine-readable binding file is located at:
`C:\Users\SDS\Desktop\JSW_HMI\converter-pipeline\exact_faceplate_tag_bindings.json`
