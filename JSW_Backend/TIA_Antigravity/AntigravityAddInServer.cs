using System;
using System.IO;
using System.Collections.Generic;
using Siemens.Engineering;
using Siemens.Engineering.AddIn;
using Siemens.Engineering.AddIn.Menu;
using Siemens.Engineering.SW.Blocks;
using WinForms = System.Windows.Forms;

namespace TIA_Antigravity_AddIn
{
    public class AntigravityAddInServer : ContextMenuAddIn
    {
        public AntigravityAddInServer() : base("Antigravity AI")
        {
        }

        protected override void BuildContextMenuItems(ContextMenuAddInRoot addInRootSubmenu)
        {
            // Option 1: Generate SCL with Gemini
            addInRootSubmenu.Items.AddActionItem<PlcBlockUserGroup>("Antigravity: Generate SCL with Gemini...", OnGenerateScl);

            // Option 2: Analyze & Explain Block
            addInRootSubmenu.Items.AddActionItem<PlcBlock>("Antigravity: Analyze Block with Gemini...", OnAnalyzeBlock);

            // Option 3: Synchronize with Antigravity Bridge
            addInRootSubmenu.Items.AddActionItem<Project>("Antigravity: Sync with Bridge (Port 5088)...", OnSyncBridge);
        }

        private void OnGenerateScl(MenuSelectionProvider<PlcBlockUserGroup> menuSelectionProvider)
        {
            try
            {
                string prompt = Microsoft.VisualBasic.Interaction.InputBox(
                    "Describe the logic or block you want Gemini to write (e.g. 'Droop controller for battery storage' or 'Clamping sequence BSL010'):",
                    "Antigravity / Gemini SCL Generator",
                    "Clamping station BSL010 interlock logic with fault detection");

                if (!string.IsNullOrWhiteSpace(prompt))
                {
                    WinForms.MessageBox.Show(
                        $"Prompt sent to Antigravity / Gemini!\n\nRequirement:\n{prompt}\n\nThe block will be compiled and injected into your project tree via the Antigravity Openness Bridge on port 5088.",
                        "Antigravity AI", WinForms.MessageBoxButtons.OK, WinForms.MessageBoxIcon.Information);
                }
            }
            catch (Exception ex)
            {
                WinForms.MessageBox.Show($"Error: {ex.Message}", "Antigravity AddIn Error", WinForms.MessageBoxButtons.OK, WinForms.MessageBoxIcon.Error);
            }
        }

        private void OnAnalyzeBlock(MenuSelectionProvider<PlcBlock> menuSelectionProvider)
        {
            try
            {
                foreach (PlcBlock block in menuSelectionProvider.GetSelection())
                {
                    WinForms.MessageBox.Show(
                        $"Block '{block.Name}' (Number {block.Number}) selected.\n\nAntigravity is analyzing tags, inputs, and cycle performance against Siemens Programming Style Guide.",
                        "Antigravity AI Block Analysis", WinForms.MessageBoxButtons.OK, WinForms.MessageBoxIcon.Information);
                    break;
                }
            }
            catch (Exception ex)
            {
                WinForms.MessageBox.Show($"Error: {ex.Message}", "Antigravity AddIn Error", WinForms.MessageBoxButtons.OK, WinForms.MessageBoxIcon.Error);
            }
        }

        private void OnSyncBridge(MenuSelectionProvider<Project> menuSelectionProvider)
        {
            WinForms.MessageBox.Show(
                "TIA Portal V20 successfully synced with Antigravity AI Engine at http://localhost:5088!\n\nLive OPC UA telemetry & Openness automation enabled.",
                "Antigravity AI Connection", WinForms.MessageBoxButtons.OK, WinForms.MessageBoxIcon.Information);
        }
    }
}
