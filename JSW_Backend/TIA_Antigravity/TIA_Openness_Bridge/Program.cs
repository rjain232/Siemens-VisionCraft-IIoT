using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Reflection;
using System.Collections.Generic;
using Siemens.Engineering;
using Siemens.Engineering.HW;
using Siemens.Engineering.HW.Features;
using Siemens.Engineering.SW;
using Siemens.Engineering.SW.Blocks;
using Siemens.Engineering.SW.Tags;

namespace TIA_Antigravity_Bridge
{
    class Program
    {
        private static TiaPortal _tiaPortalInstance = null;
        private static Project _activeProject = null;
        private static HttpListener _httpListener;
        private static int _activePort = 5088;

        static void Main(string[] args)
        {
            AppDomain.CurrentDomain.AssemblyResolve += SiemensAssemblyResolver;

            Console.Title = "Siemens TIA Portal V20 - Antigravity / Gemini AI Bridge";
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("=======================================================================");
            Console.WriteLine("  SIEMENS TIA PORTAL V20 <--> ANTIGRAVITY / GEMINI AI BRIDGE");
            Console.WriteLine("=======================================================================");
            Console.ResetColor();

            ConnectToOpenTiaPortal();

            StartHttpServer();
        }

        private static Assembly SiemensAssemblyResolver(object sender, ResolveEventArgs args)
        {
            try
            {
                var assemblyName = new AssemblyName(args.Name).Name;
                string[] possiblePaths = new string[]
                {
                    Path.Combine(AppDomain.CurrentDomain.BaseDirectory, assemblyName + ".dll"),
                    @"C:\Program Files\Siemens\Automation\Portal V20\PublicAPI\V20\" + assemblyName + ".dll",
                    @"C:\Program Files\Siemens\Automation\Portal V20\PublicAPI\V20.AddIn\" + assemblyName + ".dll",
                    @"C:\Program Files\Siemens\Automation\Portal V20\Bin\" + assemblyName + ".dll"
                };

                foreach (var path in possiblePaths)
                {
                    if (File.Exists(path))
                    {
                        return Assembly.LoadFrom(path);
                    }
                }
            }
            catch { }
            return null;
        }

        static void ConnectToOpenTiaPortal()
        {
            try
            {
                Console.WriteLine("\n[*] Scanning for active TIA Portal V20 instances...");
                var processes = TiaPortal.GetProcesses();
                if (processes.Count > 0)
                {
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine($"[+] Found {processes.Count} running TIA Portal instance(s). Attaching to Process ID {processes[0].Id}...");
                    Console.ResetColor();
                    _tiaPortalInstance = processes[0].Attach();
                    if (_tiaPortalInstance.Projects.Count > 0)
                    {
                        _activeProject = _tiaPortalInstance.Projects[0];
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine($"[+] Successfully attached to active project: {_activeProject.Name}");
                        Console.WriteLine($"    Path: {_activeProject.Path.FullName}");
                        Console.ResetColor();
                    }
                    else
                    {
                        Console.WriteLine("[!] TIA Portal is open, but no project is currently loaded.");
                    }
                }
                else
                {
                    Console.ForegroundColor = ConsoleColor.DarkYellow;
                    Console.WriteLine("[*] No active TIA Portal process detected. Starting bridge in listening mode (will attach when TIA opens)...");
                    Console.ResetColor();
                }
            }
            catch (Exception ex)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine($"[-] Openness Attachment Notice: {ex.Message}");
                Console.ResetColor();
            }
        }

        static void StartHttpServer()
        {
            int[] portsToTry = new int[] { 5088, 5089, 5090, 5095 };
            bool started = false;

            foreach (int port in portsToTry)
            {
                try
                {
                    _httpListener = new HttpListener();
                    _httpListener.Prefixes.Add($"http://127.0.0.1:{port}/");
                    _httpListener.Start();
                    _activePort = port;
                    started = true;
                    break;
                }
                catch
                {
                    _httpListener?.Close();
                }
            }

            if (!started)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("[-] Could not bind HTTP listener to candidate ports.");
                Console.ResetColor();
                return;
            }

            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"\n[+] Antigravity TIA Bridge REST API listening on: http://127.0.0.1:{_activePort}/");
            Console.WriteLine("=======================================================================");
            Console.WriteLine("  AVAILABLE AI REST ENDPOINTS:");
            Console.WriteLine($"  - GET  http://127.0.0.1:{_activePort}/status        (Check project & PLC status)");
            Console.WriteLine($"  - GET  http://127.0.0.1:{_activePort}/blocks        (List all PLC Program Blocks)");
            Console.WriteLine($"  - GET  http://127.0.0.1:{_activePort}/tags          (List PLC Tag tables)");
            Console.WriteLine($"  - POST http://127.0.0.1:{_activePort}/inject-scl   (Inject AI-generated SCL block)");
            Console.WriteLine("=======================================================================");
            Console.ResetColor();
            Console.WriteLine("\n[READY] Connected and waiting for Gemini / Antigravity commands. Keep this window open.\n");

            Task.Run(async () =>
            {
                while (_httpListener != null && _httpListener.IsListening)
                {
                    try
                    {
                        var context = await _httpListener.GetContextAsync();
                        _ = Task.Run(() => HandleRequest(context));
                    }
                    catch { }
                }
            });

            while (true)
            {
                System.Threading.Thread.Sleep(1000);
            }
        }

        static void HandleRequest(HttpListenerContext context)
        {
            var req = context.Request;
            var res = context.Response;
            res.Headers.Add("Access-Control-Allow-Origin", "*");
            res.Headers.Add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.Headers.Add("Access-Control-Allow-Headers", "Content-Type");

            if (req.HttpMethod == "OPTIONS")
            {
                res.StatusCode = 200;
                res.Close();
                return;
            }

            string path = req.Url.AbsolutePath.ToLower();
            object responseObj = null;

            try
            {
                if (_tiaPortalInstance == null || _activeProject == null)
                {
                    var processes = TiaPortal.GetProcesses();
                    if (processes.Count > 0)
                    {
                        _tiaPortalInstance = processes[0].Attach();
                        if (_tiaPortalInstance.Projects.Count > 0)
                            _activeProject = _tiaPortalInstance.Projects[0];
                    }
                }

                if (path == "/status")
                {
                    responseObj = new
                    {
                        status = "online",
                        tiaConnected = _tiaPortalInstance != null,
                        projectName = _activeProject != null ? _activeProject.Name : "None",
                        projectPath = _activeProject != null ? _activeProject.Path.FullName : ""
                    };
                }
                else if (path == "/blocks")
                {
                    var blockList = new List<object>();
                    if (_activeProject != null)
                    {
                        foreach (Device device in _activeProject.Devices)
                        {
                            foreach (DeviceItem item in device.DeviceItems)
                            {
                                SoftwareContainer container = item.GetService<SoftwareContainer>();
                                if (container != null && container.Software is PlcSoftware plc)
                                {
                                    foreach (PlcBlock block in plc.BlockGroup.Blocks)
                                    {
                                        blockList.Add(new { device = device.Name, name = block.Name, number = block.Number, type = block.GetType().Name });
                                    }
                                }
                            }
                        }
                    }
                    responseObj = new { success = true, blocks = blockList };
                }
                else if (path == "/tags")
                {
                    var tagTableList = new List<object>();
                    if (_activeProject != null)
                    {
                        foreach (Device device in _activeProject.Devices)
                        {
                            foreach (DeviceItem item in device.DeviceItems)
                            {
                                SoftwareContainer container = item.GetService<SoftwareContainer>();
                                if (container != null && container.Software is PlcSoftware plc)
                                {
                                    foreach (PlcTagTable table in plc.TagTableGroup.TagTables)
                                    {
                                        tagTableList.Add(new { device = device.Name, tableName = table.Name, tagCount = table.Tags.Count });
                                    }
                                }
                            }
                        }
                    }
                    responseObj = new { success = true, tagTables = tagTableList };
                }
                else if (path == "/inject-scl" && req.HttpMethod == "POST")
                {
                    using (var reader = new StreamReader(req.InputStream, req.ContentEncoding))
                    {
                        string body = reader.ReadToEnd();
                        var doc = JsonDocument.Parse(body);
                        string blockName = doc.RootElement.GetProperty("name").GetString();
                        string sclSource = doc.RootElement.GetProperty("source").GetString();

                        string tempFile = Path.Combine(Path.GetTempPath(), $"{blockName}.scl");
                        File.WriteAllText(tempFile, sclSource);

                        if (_activeProject != null)
                        {
                            foreach (Device device in _activeProject.Devices)
                            {
                                foreach (DeviceItem item in device.DeviceItems)
                                {
                                    SoftwareContainer container = item.GetService<SoftwareContainer>();
                                    if (container != null && container.Software is PlcSoftware plc)
                                    {
                                        var externalSourceGroup = plc.ExternalSourceGroup;
                                        var extSource = externalSourceGroup.ExternalSources.CreateFromFile(blockName, tempFile);
                                        extSource.GenerateBlocksFromSource();
                                        responseObj = new { success = true, message = $"Block {blockName} generated and imported successfully into {device.Name}!" };
                                        break;
                                    }
                                }
                            }
                        }
                        else
                        {
                            responseObj = new { success = false, message = "No active TIA Project attached." };
                        }
                    }
                }
                else
                {
                    responseObj = new { message = "TIA Antigravity Openness Bridge running." };
                }
            }
            catch (Exception ex)
            {
                responseObj = new { success = false, error = ex.Message, stack = ex.StackTrace };
            }

            string jsonStr = JsonSerializer.Serialize(responseObj);
            byte[] buffer = Encoding.UTF8.GetBytes(jsonStr);
            res.ContentType = "application/json";
            res.ContentLength64 = buffer.Length;
            res.OutputStream.Write(buffer, 0, buffer.Length);
            res.Close();
        }
    }
}
