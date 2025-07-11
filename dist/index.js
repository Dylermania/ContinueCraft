// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  devices;
  apps;
  compatibilityChecks;
  currentUserId;
  currentDeviceId;
  currentAppId;
  currentCheckId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.devices = /* @__PURE__ */ new Map();
    this.apps = /* @__PURE__ */ new Map();
    this.compatibilityChecks = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentDeviceId = 1;
    this.currentAppId = 1;
    this.currentCheckId = 1;
    this.initializePopularApps();
  }
  initializePopularApps() {
    const popularApps = [
      {
        name: "Call of Duty Mobile",
        packageName: "com.activision.callofduty.shooter",
        developer: "Activision Publishing",
        category: "Action",
        size: "1.8GB",
        minAndroidVersion: "Android 5.1",
        minRam: "3GB",
        minCpu: "Snapdragon 660",
        minStorage: "2GB",
        icon: "COD",
        isPopular: true
      },
      {
        name: "Genshin Impact",
        packageName: "com.mihoyo.genshin",
        developer: "miHoYo Limited",
        category: "RPG",
        size: "15.2GB",
        minAndroidVersion: "Android 7.0",
        minRam: "4GB",
        minCpu: "Snapdragon 660",
        minStorage: "15GB",
        icon: "GI",
        isPopular: true
      },
      {
        name: "PUBG Mobile",
        packageName: "com.tencent.ig",
        developer: "Tencent Games",
        category: "Battle Royale",
        size: "2.1GB",
        minAndroidVersion: "Android 5.1",
        minRam: "2GB",
        minCpu: "Snapdragon 630",
        minStorage: "3GB",
        icon: "PG",
        isPopular: true
      },
      {
        name: "Among Us",
        packageName: "com.innersloth.spacemafia",
        developer: "InnerSloth LLC",
        category: "Social",
        size: "250MB",
        minAndroidVersion: "Android 4.4",
        minRam: "1GB",
        minCpu: "Any",
        minStorage: "500MB",
        icon: "AU",
        isPopular: true
      }
    ];
    popularApps.forEach((app2) => {
      const id = this.currentAppId++;
      this.apps.set(id, { ...app2, id, createdAt: /* @__PURE__ */ new Date() });
    });
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = {
      ...insertUser,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      name: insertUser.name ?? null,
      email: insertUser.email ?? null
    };
    this.users.set(id, user);
    return user;
  }
  // Devices
  async getDevice(id) {
    return this.devices.get(id);
  }
  async getDevicesByUserId(userId) {
    return Array.from(this.devices.values()).filter((device) => device.userId === userId);
  }
  async createDevice(insertDevice) {
    const id = this.currentDeviceId++;
    const device = {
      ...insertDevice,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      userId: insertDevice.userId ?? null,
      gpu: insertDevice.gpu ?? null,
      isRooted: insertDevice.isRooted ?? null,
      performanceScore: insertDevice.performanceScore ?? null,
      model: insertDevice.model ?? null,
      userAgent: insertDevice.userAgent ?? null,
      additionalSpecs: insertDevice.additionalSpecs ?? {}
    };
    this.devices.set(id, device);
    return device;
  }
  async updateDevice(id, updates) {
    const device = this.devices.get(id);
    if (!device) return void 0;
    const updatedDevice = { ...device, ...updates };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }
  // Apps
  async getApp(id) {
    return this.apps.get(id);
  }
  async getAppByName(name) {
    return Array.from(this.apps.values()).find(
      (app2) => app2.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  async getPopularApps() {
    return Array.from(this.apps.values()).filter((app2) => app2.isPopular);
  }
  async searchApps(query) {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.apps.values()).filter(
      (app2) => app2.name.toLowerCase().includes(lowerQuery) || app2.developer?.toLowerCase().includes(lowerQuery) || app2.category?.toLowerCase().includes(lowerQuery)
    );
  }
  async createApp(insertApp) {
    const id = this.currentAppId++;
    const app2 = {
      ...insertApp,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      size: insertApp.size ?? null,
      packageName: insertApp.packageName ?? null,
      developer: insertApp.developer ?? null,
      category: insertApp.category ?? null,
      minAndroidVersion: insertApp.minAndroidVersion ?? null,
      minRam: insertApp.minRam ?? null,
      minCpu: insertApp.minCpu ?? null,
      minGpu: insertApp.minGpu ?? null,
      minStorage: insertApp.minStorage ?? null,
      icon: insertApp.icon ?? null,
      isPopular: insertApp.isPopular ?? null
    };
    this.apps.set(id, app2);
    return app2;
  }
  // Compatibility Checks
  async getCompatibilityCheck(id) {
    return this.compatibilityChecks.get(id);
  }
  async getCompatibilityChecksByUserId(userId) {
    return Array.from(this.compatibilityChecks.values()).filter((check) => check.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }
  async createCompatibilityCheck(insertCheck) {
    const id = this.currentCheckId++;
    const check = {
      ...insertCheck,
      id,
      createdAt: /* @__PURE__ */ new Date(),
      userId: insertCheck.userId ?? null,
      deviceId: insertCheck.deviceId ?? null,
      appId: insertCheck.appId ?? null,
      compatibilityScore: insertCheck.compatibilityScore ?? null,
      issues: insertCheck.issues ?? {},
      suggestions: insertCheck.suggestions ?? {}
    };
    this.compatibilityChecks.set(id, check);
    return check;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  name: text("name"),
  createdAt: timestamp("created_at").defaultNow()
});
var devices = pgTable("devices", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  osVersion: text("os_version").notNull(),
  cpuArchitecture: text("cpu_architecture").notNull(),
  ram: text("ram").notNull(),
  gpu: text("gpu"),
  storage: text("storage").notNull(),
  isRooted: boolean("is_rooted").default(false),
  performanceScore: integer("performance_score"),
  model: text("model"),
  userAgent: text("user_agent"),
  additionalSpecs: jsonb("additional_specs"),
  createdAt: timestamp("created_at").defaultNow()
});
var apps = pgTable("apps", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  packageName: text("package_name"),
  developer: text("developer"),
  category: text("category"),
  size: text("size"),
  minAndroidVersion: text("min_android_version"),
  minRam: text("min_ram"),
  minCpu: text("min_cpu"),
  minStorage: text("min_storage"),
  icon: text("icon"),
  isPopular: boolean("is_popular").default(false),
  createdAt: timestamp("created_at").defaultNow()
});
var compatibilityChecks = pgTable("compatibility_checks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  deviceId: integer("device_id"),
  appId: integer("app_id"),
  appName: text("app_name").notNull(),
  isCompatible: boolean("is_compatible").notNull(),
  compatibilityScore: integer("compatibility_score"),
  issues: jsonb("issues"),
  suggestions: jsonb("suggestions"),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true
});
var insertDeviceSchema = createInsertSchema(devices).omit({
  id: true,
  createdAt: true
});
var insertAppSchema = createInsertSchema(apps).omit({
  id: true,
  createdAt: true
});
var insertCompatibilityCheckSchema = createInsertSchema(compatibilityChecks).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
async function registerRoutes(app2) {
  app2.post("/api/devices/detect", async (req, res) => {
    try {
      const deviceData = insertDeviceSchema.parse(req.body);
      const device = await storage.createDevice(deviceData);
      res.json(device);
    } catch (error) {
      console.error("Device detection error:", error);
      res.status(400).json({ error: "Invalid device data" });
    }
  });
  app2.get("/api/apps/popular", async (req, res) => {
    try {
      const apps2 = await storage.getPopularApps();
      res.json(apps2);
    } catch (error) {
      console.error("Error fetching popular apps:", error);
      res.status(500).json({ error: "Failed to fetch apps" });
    }
  });
  app2.get("/api/apps/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ error: "Search query required" });
      }
      const apps2 = await storage.searchApps(query);
      res.json(apps2);
    } catch (error) {
      console.error("Error searching apps:", error);
      res.status(500).json({ error: "Failed to search apps" });
    }
  });
  app2.get("/api/apps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const app3 = await storage.getApp(id);
      if (!app3) {
        return res.status(404).json({ error: "App not found" });
      }
      res.json(app3);
    } catch (error) {
      console.error("Error fetching app:", error);
      res.status(500).json({ error: "Failed to fetch app" });
    }
  });
  app2.post("/api/compatibility/check", async (req, res) => {
    try {
      const { deviceId, appId, appName } = req.body;
      if (!deviceId || !appId && !appName) {
        return res.status(400).json({ error: "Device ID and App ID or name required" });
      }
      const device = await storage.getDevice(deviceId);
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }
      let app3;
      if (appId) {
        app3 = await storage.getApp(appId);
      } else {
        app3 = await storage.getAppByName(appName);
      }
      if (!app3) {
        return res.status(404).json({ error: "App not found" });
      }
      const compatibility = analyzeCompatibility(device, app3);
      const checkData = insertCompatibilityCheckSchema.parse({
        userId: device.userId,
        deviceId: device.id,
        appId: app3.id,
        appName: app3.name,
        isCompatible: compatibility.isCompatible,
        compatibilityScore: compatibility.score,
        issues: compatibility.issues,
        suggestions: compatibility.suggestions
      });
      const check = await storage.createCompatibilityCheck(checkData);
      res.json({ ...check, app: app3, device, compatibility });
    } catch (error) {
      console.error("Compatibility check error:", error);
      res.status(500).json({ error: "Failed to check compatibility" });
    }
  });
  app2.get("/api/compatibility/history/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const checks = await storage.getCompatibilityChecksByUserId(userId);
      res.json(checks);
    } catch (error) {
      console.error("Error fetching compatibility history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
function analyzeCompatibility(device, app2) {
  const issues = [];
  const suggestions = [];
  let score = 100;
  let isCompatible = true;
  const deviceRam = parseFloat(device.ram);
  const requiredRam = parseFloat(app2.minRam);
  if (deviceRam < requiredRam) {
    issues.push({
      component: "RAM",
      required: app2.minRam,
      actual: device.ram,
      status: "insufficient"
    });
    suggestions.push("Consider closing background apps or upgrading device");
    score -= 30;
    isCompatible = false;
  }
  const deviceOSNum = parseInt(device.osVersion.match(/\d+/)?.[0] || "0");
  const requiredOSNum = parseInt(app2.minAndroidVersion.match(/\d+/)?.[0] || "0");
  if (deviceOSNum < requiredOSNum) {
    issues.push({
      component: "OS Version",
      required: app2.minAndroidVersion,
      actual: device.osVersion,
      status: "outdated"
    });
    suggestions.push("Update Android OS or try app's older version");
    score -= 25;
    isCompatible = false;
  }
  const deviceStorage = parseFloat(device.storage.match(/\d+/)?.[0] || "0");
  const requiredStorage = parseFloat(app2.minStorage?.match(/\d+/)?.[0] || "0");
  if (deviceStorage < requiredStorage) {
    issues.push({
      component: "Storage",
      required: app2.minStorage,
      actual: device.storage,
      status: "insufficient"
    });
    suggestions.push("Free up storage space");
    score -= 15;
  }
  if (score < 80) {
    suggestions.push("Try running in virtual container");
    suggestions.push("Apply performance tweaks");
    if (app2.name === "Genshin Impact") {
      suggestions.push("Try Genshin Impact Lite version");
    }
  }
  return {
    isCompatible,
    score: Math.max(score, 0),
    issues,
    suggestions
  };
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
