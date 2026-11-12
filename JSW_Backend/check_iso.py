import subprocess

iso = r"D:\TIA v20\STARTDRIVE_ADVANCED_V20.iso"
cmd = f"Mount-DiskImage -ImagePath '{iso}' -PassThru | Get-Volume | Select-Object -ExpandProperty DriveLetter"
res = subprocess.run(["powershell", "-Command", cmd], capture_output=True, text=True)
drive = res.stdout.strip()
print("Mounted Drive:", drive)
if drive:
    cmd_ls = f"Get-ChildItem '{drive}:\\' | Select-Object -ExpandProperty Name"
    res_ls = subprocess.run(["powershell", "-Command", cmd_ls], capture_output=True, text=True)
    print("Files:\n" + res_ls.stdout)
