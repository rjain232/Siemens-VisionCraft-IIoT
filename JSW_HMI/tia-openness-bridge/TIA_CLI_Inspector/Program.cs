using System;
using System.IO;
using System.Text;
using System.Text.Json;
using System.Collections.Generic;
using System.Reflection;
using Siemens.Engineering;
using Siemens.Engineering.HW;
using Siemens.Engineering.HW.Features;
using Siemens.Engineering.SW;
using Siemens.Engineering.SW.Blocks;
using Siemens.Engineering.SW.Tags;

namespace TIA_CLI_Inspector
{
    class Program
    {
        static void Main(string[] args)
        {
            AppDomain.CurrentDomain.AssemblyResolve += SiemensAssemblyResolver;
            Inspect();
        }

        private static Assembly SiemensAssemblyResolver(object sender, ResolveEventArgs args)
        {
            try
            {
                var assemblyName = new AssemblyName(args.Name).Name;
                string[] possiblePaths = new string[]
                {
                    @"C:\Program Files\Siemens\Automation\Portal V20\PublicAPI\V20\" + assemblyName + ".dll",
                    @"C:\Program Files\Siemens\Automation\Portal V20\PublicAPI\V20.AddIn\" + assemblyName + ".dll",
                    @"C:\Program Files\Siemens\Automation\Portal V20\Bin\" + assemblyName + ".dll"
                };

                foreach (var path in possiblePaths)
                {
                    if (File.Exists(path))
                        return Assembly.LoadFrom(path);
                }
            }
            catch { }
            return null;
        }

        static void Inspect()
        {
            try
            {
                var processes = TiaPortal.GetProcesses();
                if (processes.Count == 0)
                {
                    Console.WriteLine(JsonSerializer.Serialize(new { success = false, error = "No TIA Portal instances found running." }));
                    return;
                }

                using (var tia = processes[0].Attach())
                {
                    if (tia.Projects.Count == 0)
                    {
                        Console.WriteLine(JsonSerializer.Serialize(new { success = false, error = "TIA Portal is open, but no project is open." }));
                        return;
                    }

                    var project = tia.Projects[0];
                    var blocksList = new List<object>();
                    var bsl010TagsList = new List<object>();

                    foreach (Device device in project.Devices)
                    {
                        foreach (DeviceItem item in device.DeviceItems)
                        {
                            SoftwareContainer container = item.GetService<SoftwareContainer>();
                            if (container != null && container.Software is PlcSoftware plc)
                            {
                                // 1. Scan Program Blocks (Recursive)
                                ScanBlockGroup(plc.BlockGroup, device.Name, blocksList);

                                // 2. Scan Tag Tables for BSL010
                                foreach (PlcTagTable table in plc.TagTableGroup.TagTables)
                                {
                                    bool isBsl010Table = table.Name.IndexOf("BSL010", StringComparison.OrdinalIgnoreCase) >= 0;
                                    foreach (PlcTag tag in table.Tags)
                                    {
                                        if (isBsl010Table || tag.Name.IndexOf("BSL010", StringComparison.OrdinalIgnoreCase) >= 0)
                                        {
                                            bsl010TagsList.Add(new
                                            {
                                                table = table.Name,
                                                name = tag.Name,
                                                dataType = tag.DataTypeName,
                                                address = tag.LogicalAddress,
                                                comment = tag.Comment.Items.Count > 0 ? tag.Comment.Items[0].Text : ""
                                            });
                                        }
                                    }
                                }

                                foreach (PlcTagTableUserGroup group in plc.TagTableGroup.Groups)
                                {
                                    ScanTagGroup(group, bsl010TagsList);
                                }
                            }
                        }
                    }

                    var result = new
                    {
                        success = true,
                        projectName = project.Name,
                        totalBlocksFound = blocksList.Count,
                        blocks = blocksList,
                        totalBsl010Tags = bsl010TagsList.Count,
                        bsl010Tags = bsl010TagsList
                    };

                    string json = JsonSerializer.Serialize(result, new JsonSerializerOptions { WriteIndented = true });
                    File.WriteAllText(@"D:\TIA v20\TIA_Antigravity\inspection_results.json", json);
                    Console.WriteLine(json);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(JsonSerializer.Serialize(new { success = false, error = ex.Message, stack = ex.StackTrace }));
            }
        }

        static void ScanBlockGroup(PlcBlockGroup group, string deviceName, List<object> blocksList)
        {
            foreach (PlcBlock block in group.Blocks)
            {
                blocksList.Add(new
                {
                    device = deviceName,
                    name = block.Name,
                    number = block.Number,
                    type = block.GetType().Name
                });
            }

            foreach (PlcBlockUserGroup subGroup in group.Groups)
            {
                ScanBlockGroup(subGroup, deviceName, blocksList);
            }
        }

        static void ScanTagGroup(PlcTagTableUserGroup group, List<object> tagsList)
        {
            foreach (PlcTagTable table in group.TagTables)
            {
                bool isBsl010Table = table.Name.IndexOf("BSL010", StringComparison.OrdinalIgnoreCase) >= 0;
                foreach (PlcTag tag in table.Tags)
                {
                    if (isBsl010Table || tag.Name.IndexOf("BSL010", StringComparison.OrdinalIgnoreCase) >= 0)
                    {
                        tagsList.Add(new
                        {
                            table = table.Name,
                            name = tag.Name,
                            dataType = tag.DataTypeName,
                            address = tag.LogicalAddress,
                            comment = tag.Comment.Items.Count > 0 ? tag.Comment.Items[0].Text : ""
                        });
                    }
                }
            }

            foreach (PlcTagTableUserGroup sub in group.Groups)
            {
                ScanTagGroup(sub, tagsList);
            }
        }
    }
}
