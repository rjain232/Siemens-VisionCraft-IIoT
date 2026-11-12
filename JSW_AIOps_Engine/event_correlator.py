import time

def aiops_event_correlator():
    print("--- AIOps: Event Correlation & Noise Reduction Engine ---")
    print("Ingesting raw observability stream from all microservices...\n")
    
    # Simulating a chaotic "Alert Storm" across the JSW architecture
    raw_alert_storm = [
        {"timestamp": "10:00:01", "service": "JSW_Database", "error": "OutOfMemory: MSSQL process killed by OOM-Killer"},
        {"timestamp": "10:00:02", "service": "JSW_Backend", "error": "ConnectionRefused: Cannot reach Database"},
        {"timestamp": "10:00:02", "service": "JSW_Backend", "error": "ConnectionRefused: Cannot reach Database"},
        {"timestamp": "10:00:03", "service": "JSW_UI (React)", "error": "HTTP 500: Internal Server Error from API"},
        {"timestamp": "10:00:03", "service": "JSW_UI (React)", "error": "HTTP 500: Internal Server Error from API"},
        {"timestamp": "10:00:04", "service": "JSW_UI (React)", "error": "HTTP 500: Internal Server Error from API"},
        {"timestamp": "10:00:05", "service": "Playwright_E2E", "error": "Timeout: Dashboard failed to load within 15000ms"}
    ]

    for log in raw_alert_storm:
        print(f"RAW ALERT -> [{log['timestamp']}] {log['service']} - {log['error']}")
        time.sleep(0.3)

    print("\n[AIOps Engine: Analyzing 7 cascading alerts...]")
    time.sleep(2)
    
    # AIOps Logic: Event Correlation (Grouping alerts by root cause instead of spamming engineers)
    db_crashes = [log for log in raw_alert_storm if "Database" in log["service"]]
    
    if db_crashes:
        root_cause = db_crashes[0]
        suppressed_count = len(raw_alert_storm) - 1
        
        print("\n=== AIOps INCIDENT REPORT ===")
        print(f"🔴 ROOT CAUSE IDENTIFIED: {root_cause['service']} crashed ({root_cause['error']})")
        print(f"🔇 NOISE REDUCTION: Suppressed {suppressed_count} cascading downstream alerts from Backend and UI.")
        print(f"🤖 AUTO-REMEDIATION: Executing failover to secondary SQL replica database...")
        print("✅ Failover complete. System stabilizing.")

if __name__ == "__main__":
    aiops_event_correlator()
