import appConfig from "../config/appConfig";

export const getStoredAuth = () => {
  const userText = localStorage.getItem(appConfig.storageKeys.user);
  if (!userText) return { user: null };
  try {
    return { user: JSON.parse(userText) };
  } catch {
    localStorage.removeItem(appConfig.storageKeys.user);
    return { user: null };
  }
};

export const storeAuth = ({ user }) => {
  localStorage.setItem(appConfig.storageKeys.user, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(appConfig.storageKeys.user);
};

export const reportsApi = {
  shareByEmail: (payload) =>
    apiRequest("/api/reports/share-email", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export const subscriptionApi = {
  getAll: () => apiRequest("/api/subscriptions"),
  create: (data) =>
    apiRequest("/api/subscriptions", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id, data) =>
    apiRequest(`/api/subscriptions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id) =>
    apiRequest(`/api/subscriptions/${id}`, {
      method: "DELETE",
    }),
  dispatchNow: (id) =>
    apiRequest(`/api/subscriptions/${id}/dispatch`, {
      method: "POST",
    }),
  recordSuccess: (id) =>
    apiRequest(`/api/subscriptions/${id}/record-success`, {
      method: "POST",
    }),
  dispatchCadence: (cadence) =>
    apiRequest("/api/subscriptions/dispatch-cadence", {
      method: "POST",
      body: JSON.stringify({ cadence }),
    }),
};

// ── FIXED apiRequest — never crashes on non-JSON ──────────────────
export const apiRequest = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  let response;
  try {
    response = await fetch(`${appConfig.apiBaseUrl}${path}`, {
      ...options,
      credentials: "include",
      headers,
    });
  } catch (networkErr) {
    if (networkErr.name === "AbortError") throw networkErr;
    throw new Error(`Network error: ${networkErr.message}`);
  }

  const rawText = await response.text();

  let data = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    console.error(
      `[apiRequest] Non-JSON from ${path} | status: ${response.status}\n`,
      rawText.slice(0, 500),
    );
    throw new Error(
      `Server error (status ${response.status}). Check backend terminal.`,
    );
  }

  if (!response.ok) {
    throw new Error(data?.message || `Request failed: ${response.status}`);
  }

  return data;
};

export const authApi = {
  login: (payload) =>
    apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  setupSuperAdmin: (payload) =>
    apiRequest("/api/setup/superadmin", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: () => apiRequest("/api/auth/me"),
  logout: () => apiRequest("/api/auth/logout", { method: "POST" }),
};

export const usersApi = {
  list: () => apiRequest("/api/users"),
  create: (payload) =>
    apiRequest("/api/users", { method: "POST", body: JSON.stringify(payload) }),
  update: (userId, payload) =>
    apiRequest(`/api/users/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (userId) => apiRequest(`/api/users/${userId}`, { method: "DELETE" }),
};

export const accessApi = {
  myPages: () => apiRequest("/api/access/me/pages"),
  allPages: () => apiRequest("/api/access/pages"),
  userPages: (userId) => apiRequest(`/api/access/users/${userId}/pages`),
  updateUserPages: (userId, pageKeys) =>
    apiRequest(`/api/access/users/${userId}/pages`, {
      method: "PUT",
      body: JSON.stringify({ pageKeys }),
    }),
};

export const productionApi = {
  // ── Production Summary ─────────────────────────────────────────
  transactions: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/production/production-summary?${query}`
        : "/api/production/production-summary",
    );
  },

  // ── Detailed Report ──────────────────────────────────────────────
  detailedProduction: (filters = {}) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
    });
    if (!params.has("pageNumber")) params.set("pageNumber", "1");
    if (!params.has("pageSize")) params.set("pageSize", "3");

    const query = params.toString();

    return apiRequest(
      query
        ? `/api/production/detailed-production?${query}`
        : "/api/production/detailed-production",
    );
  },

  // ── Hourly Report ──────────────────────────────────────────────
  hourlyReport: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/production/hourly-report?${query}`
        : "/api/production/hourly-report",
    );
  },

  // ── Update Hourly Production Remarks Update ─────────────────────────────
  updateHourlyProductionRemarks: (payload) =>
    apiRequest("/api/production/update-remark", {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  // ── Production Overview ────────────────────────────────────────
  overview: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/production/production-overview?${query}`
        : "/api/production/production-overview",
    );
  },

  // ── Annual Graph ───────────────────────────────────────────────
  annualGraph: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/production/annual-graph?${query}`
        : "/api/production/annual-graph",
    );
  },
  masterData: () => apiRequest("/api/master"),
};

// ── Master Data ────────────────────────────────────────────────
export const masterApi = {
  getMasterData: () => apiRequest("/api/master"),
};

export const lineVariantApi = {
  getLineAndVariantData: () => apiRequest("/api/master/line-variant"),
};

export const cycleTimeApi = {
  getVariants: () => apiRequest("/api/cycle-time/variants"),

  // Main level — paginated sub-station CT records
  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/cycle-time/report?${query}` : "/api/cycle-time/report",
      signal ? { signal } : {},
    );
  },

  // Supermain level — overview / aggregated CT records
  overview: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/cycle-time/overview?${query}` : "/api/cycle-time/overview",
      signal ? { signal } : {},
    );
  },
};

export const shiftSummaryApi = {
  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/production/shift-summary-report?${query}`
        : "/api/production/shift-summary-report",
      signal ? { signal } : {},
    );
  },
};

export const oeeApi = {
  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/oee/report?${query}` : "/api/oee/report",
      signal ? { signal } : {},
    );
  },
};

export const lineCycleTimeApi = {
  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/line-cycle-time/report?${query}`
        : "/api/line-cycle-time/report",
      signal ? { signal } : {},
    );
  },
};

export const lossesAnalysisApi = {
  lossTypes: () => apiRequest("/api/losses-analysis/loss-types"),

  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/losses-analysis/report?${query}`
        : "/api/losses-analysis/report",
      signal ? { signal } : {},
    );
  },
};

export const mtbfMttrApi = {
  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/mtbf-mttr/report?${query}` : "/api/mtbf-mttr/report",
      signal ? { signal } : {},
    );
  },
};

export const partMarriageApi = {
  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/part-marriage?${query}` : "/api/part-marriage",
      signal ? { signal } : {},
    );
  },
};

export const lineBufferApi = {
  getLineBufferHistory: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(query ? `/api/line-buffer?${query}` : "/api/line-buffer");
  },
};

export const robotApi = {
  getHealth: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/robot-health/status?${query}` : "/api/robot-health/status",
    );
  },
  getRobotList: (filters = {}) => {
    return robotApi.getHealth(filters);
  },
  getSpotHitRate: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/robot-spot-hit-rate/report?${query}`
        : "/api/robot-spot-hit-rate/report",
    );
  },
};

export const alarmApi = {
  categories: () => apiRequest("/api/alarm/categories"),

  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/alarm/alarm-report?${query}` : "/api/alarm/alarm-report",
      signal ? { signal } : {},
    );
  },

  topXAlarms: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/alarm/top-alarms?${query}` : "/api/alarm/top-alarms",
      signal ? { signal } : {},
    );
  },
};

export const robotHealthApi = {
  getStatus: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/robot-health/status?${query}` : "/api/robot-health/status",
    );
  },
};

// ── Robot Status Report ──────────────────────────────────────────
export const robotStatusApi = {
  report: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/robot-status/report?${query}` : "/api/robot-status/report",
      signal ? { signal } : {},
    );
  },
};

export const dashboardApi = {
  getData: (range = "today", signal) =>
    apiRequest(
      `/api/dashboard/dashboard-data?range=${encodeURIComponent(range)}`,
      signal ? { signal } : {},
    ),
};

export const maintenanceApi = {
  tipChangeCount: (filters = {}, signal) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query
        ? `/api/maintenance/tip-change-count?${query}`
        : "/api/maintenance/tip-change-count",
      signal ? { signal } : {},
    );
  },
};

export const ctOeeConfigApi = {
  list: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return apiRequest(
      query ? `/api/ct-oee-config?${query}` : "/api/ct-oee-config",
    );
  },
  create: (payload) =>
    apiRequest("/api/ct-oee-config", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/api/ct-oee-config/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};

export const shiftBacklogPlanningApi = {
  list: () => apiRequest("/api/shift-backlog-planning"),
  update: (hourId, payload) =>
    apiRequest(`/api/shift-backlog-planning/${hourId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
};
