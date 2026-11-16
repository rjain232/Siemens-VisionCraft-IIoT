from fpdf import FPDF
import os

class PDF(FPDF):
    def header(self):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, 'Top Indian IIoT, SCADA & Smart Grid Companies', 0, 1, 'C')
        self.set_font('Arial', 'I', 10)
        self.cell(0, 10, '(Companies offering solutions similar to SGrids / Solvyn / Modern MES)', 0, 1, 'C')
        self.ln(5)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

pdf = PDF()
pdf.add_page()
pdf.set_font('Arial', '', 11)

data = [
    {
        "name": "1. Smart Grid Analytics (SGrids)",
        "location": "Bengaluru",
        "work": "Flagship product 'Solvyn' acts as an OS for renewable energy. Integrates SCADA, Energy Management Systems (EMS), and Digital Twins. Uses AI for predictive maintenance and grid compliance for solar and battery systems."
    },
    {
        "name": "2. Prescinto",
        "location": "Ahmedabad",
        "work": "AI-powered SaaS platform for renewable energy assets. Connects to solar/wind farm PLCs, builds a digital twin, and automatically identifies generation losses to improve asset performance and yield."
    },
    {
        "name": "3. Altizon",
        "location": "Pune",
        "work": "Famous for their 'Datonis' platform. Connects directly to factory PLCs and pushes data to the cloud to provide modern MES (Manufacturing Execution Systems) dashboards, OEE tracking, and condition monitoring."
    },
    {
        "name": "4. EnerMAN Technologies",
        "location": "Bengaluru",
        "work": "Builds SCADA, IoT hardware, and software specifically for Solar PV plants. Their flagship product, ETi-SOL, is a cloud-based energy management dashboard for remote monitoring and control."
    },
    {
        "name": "5. ExactSpace",
        "location": "Bengaluru",
        "work": "Focuses on deep Industrial AI. Ingests time-series data from thermal power plants and renewable grids, building AI digital twins that predict equipment failure days in advance."
    },
    {
        "name": "6. Infinite Uptime",
        "location": "Pune",
        "work": "Specializes entirely in Predictive Maintenance. Provides edge hardware sensors that monitor the vibrations and temperatures of factory motors, using AI to predict machine breakdowns before they halt production."
    },
    {
        "name": "7. Utthunga",
        "location": "Bengaluru",
        "work": "Deep-tech industrial automation experts. They build the software bridges (OPC-UA, Modbus, MQTT) that translate diverse PLC protocols into modern web formats for IT/OT convergence."
    },
    {
        "name": "8. Flutura (Acquired by Accenture)",
        "location": "Bengaluru",
        "work": "Their core product 'Cerebra' is an AI platform designed to ingest massive telemetry from heavy industrial machinery to predict yield optimization and equipment failure in energy and manufacturing."
    }
]

for item in data:
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 8, f"{item['name']} ({item['location']})", 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.multi_cell(0, 6, f"Work & Details: {item['work']}")
    pdf.ln(5)

output_path = 'c:/Users/SDS/OneDrive - dacpl.in/Desktop/JSW/Indian_IIoT_Companies.pdf'
pdf.output(output_path)
print(f"PDF successfully generated at: {output_path}")
