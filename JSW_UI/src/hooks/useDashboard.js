import { useState, useEffect, useRef } from "react";
import { dashboardApi } from "../services/api";
import appConfig from "../config/appConfig";

const WS_RECONNECT_BASE = 2_000;
const WS_RECONNECT_MAX = 30_000;
const POLL_INTERVAL = 15_000;

function getWsUrl(range) {
  const wsUrl = import.meta.env.VITE_WS_URL;

  // Development (full WebSocket URL)
  if (wsUrl.startsWith("ws://") || wsUrl.startsWith("wss://")) {
    return `${wsUrl}?range=${encodeURIComponent(range)}`;
  }

  // Production behind IIS (relative path)
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";

  return `${protocol}//${window.location.host}${wsUrl}?range=${encodeURIComponent(range)}`;
}

export function useDashboard(range, refreshKey = 0) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const reconnectDelayRef = useRef(WS_RECONNECT_BASE);
  const pollTimerRef = useRef(null);
  const abortRef = useRef(null);
  const mountedRef = useRef(false);
  const hasDataRef = useRef(false);

  const wsOpenedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    wsOpenedRef.current = false;
    hasDataRef.current = false;

    // ── Shared data handler ───────────────────────────────────────────────────
    function onData(payload) {
      if (!mountedRef.current) return;
      hasDataRef.current = true;
      setData(payload);
      setLastUpdated(new Date());
      setLoading(false);
      setError(null);
    }

    // ── Cleanup helper ────────────────────────────────────────────────────────
    function cleanup() {
      clearTimeout(reconnectTimerRef.current);
      clearTimeout(pollTimerRef.current);
      abortRef.current?.abort();
      if (wsRef.current) {
        wsRef.current.onopen = null;
        wsRef.current.onclose = null;
        wsRef.current.onerror = null;
        wsRef.current.onmessage = null;
        wsRef.current.close();
        wsRef.current = null;
      }
    }

    // ─────────────────────────────────────────────────────────────────────────
    // HISTORICAL RANGES — single fetch, no live connection needed
    // ─────────────────────────────────────────────────────────────────────────
    if (range !== "today") {
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);

      dashboardApi
        .getData(range, controller.signal)
        .then(onData)
        .catch((err) => {
          if (!mountedRef.current || err.name === "AbortError") return;
          setError(err.message || "Failed to load data");
          setLoading(false);
        });

      return () => {
        mountedRef.current = false;
        controller.abort();
      };
    }

    // ─────────────────────────────────────────────────────────────────────────
    // "TODAY" — WebSocket with polling fallback
    // ─────────────────────────────────────────────────────────────────────────

    // ── HTTP polling (fallback) ───────────────────────────────────────────────
    async function poll() {
      if (!mountedRef.current) return;

      // Skip fetch while tab is hidden — reschedule for when it comes back
      if (document.hidden) {
        pollTimerRef.current = setTimeout(poll, 5_000);
        return;
      }

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await dashboardApi.getData(range, controller.signal);
        onData(res);
      } catch (err) {
        if (err.name === "AbortError") return;
        if (mountedRef.current) setError(err.message || "Refresh failed");
      }

      if (mountedRef.current) {
        pollTimerRef.current = setTimeout(poll, POLL_INTERVAL);
      }
    }

    function startPolling() {
      poll();
    }

    function connect() {
      if (!mountedRef.current) return;

      if (document.hidden) return;

      if (!hasDataRef.current) setLoading(true);

      try {
        const ws = new WebSocket(getWsUrl(range));
        wsRef.current = ws;

        ws.onopen = () => {
          if (!mountedRef.current) return ws.close();
          wsOpenedRef.current = true;
          reconnectDelayRef.current = WS_RECONNECT_BASE;
          setError(null);
        };

        ws.onmessage = (e) => {
          try {
            const parsed = JSON.parse(e.data);
            if (parsed.type === "error") {
              if (mountedRef.current)
                setError(parsed.message || "Server error");
              return;
            }
            onData(parsed);
          } catch (err) {
            console.warn("[WS dashboard] failed to parse message:", err);
          }
        };

        ws.onerror = () => {
          if (!wsOpenedRef.current) {
            ws.close();
            startPolling();
          } else if (mountedRef.current) {
            if (!hasDataRef.current) {
              startPolling();
            } else {
              setError("Connection lost, reconnecting…");
            }
          }
        };

        ws.onclose = () => {
          if (!mountedRef.current) return;
          if (!wsOpenedRef.current) return;

          const delay = Math.min(reconnectDelayRef.current, WS_RECONNECT_MAX);
          reconnectDelayRef.current = delay * 2;
          reconnectTimerRef.current = setTimeout(connect, delay);
        };
      } catch {
        startPolling();
      }
    }

    // ── Visibility API ────────────────────────────────────────────────────────
    function onVisibilityChange() {
      if (document.hidden) {
        clearTimeout(pollTimerRef.current);
        pollTimerRef.current = null;
        abortRef.current?.abort();
      } else {
        if (!wsRef.current) {
          poll();
        } else if (wsRef.current.readyState === WebSocket.CLOSED) {
          connect();
        }
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange);
    const initialConnectTimer = setTimeout(connect, 0);

    return () => {
      mountedRef.current = false;
      clearTimeout(initialConnectTimer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cleanup();
    };
  }, [range, refreshKey]);

  return { data, loading, error, lastUpdated };
}
