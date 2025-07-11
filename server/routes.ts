import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertDeviceSchema, insertCompatibilityCheckSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Device detection endpoint
  app.post("/api/devices/detect", async (req, res) => {
    try {
      const deviceData = insertDeviceSchema.parse(req.body);
      const device = await storage.createDevice(deviceData);
      res.json(device);
    } catch (error) {
      console.error("Device detection error:", error);
      res.status(400).json({ error: "Invalid device data" });
    }
  });

  // Get popular apps
  app.get("/api/apps/popular", async (req, res) => {
    try {
      const apps = await storage.getPopularApps();
      res.json(apps);
    } catch (error) {
      console.error("Error fetching popular apps:", error);
      res.status(500).json({ error: "Failed to fetch apps" });
    }
  });

  // Search apps
  app.get("/api/apps/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Search query required" });
      }
      const apps = await storage.searchApps(query);
      res.json(apps);
    } catch (error) {
      console.error("Error searching apps:", error);
      res.status(500).json({ error: "Failed to search apps" });
    }
  });

  // Get app by ID
  app.get("/api/apps/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const app = await storage.getApp(id);
      if (!app) {
        return res.status(404).json({ error: "App not found" });
      }
      res.json(app);
    } catch (error) {
      console.error("Error fetching app:", error);
      res.status(500).json({ error: "Failed to fetch app" });
    }
  });

  // Check compatibility
  app.post("/api/compatibility/check", async (req, res) => {
    try {
      const { deviceId, appId, appName } = req.body;
      
      if (!deviceId || (!appId && !appName)) {
        return res.status(400).json({ error: "Device ID and App ID or name required" });
      }

      const device = await storage.getDevice(deviceId);
      if (!device) {
        return res.status(404).json({ error: "Device not found" });
      }

      let app;
      if (appId) {
        app = await storage.getApp(appId);
      } else {
        app = await storage.getAppByName(appName);
      }

      if (!app) {
        return res.status(404).json({ error: "App not found" });
      }

      // Compatibility analysis logic
      const compatibility = analyzeCompatibility(device, app);
      
      const checkData = insertCompatibilityCheckSchema.parse({
        userId: device.userId,
        deviceId: device.id,
        appId: app.id,
        appName: app.name,
        isCompatible: compatibility.isCompatible,
        compatibilityScore: compatibility.score,
        issues: compatibility.issues,
        suggestions: compatibility.suggestions,
      });

      const check = await storage.createCompatibilityCheck(checkData);
      res.json({ ...check, app, device, compatibility });
    } catch (error) {
      console.error("Compatibility check error:", error);
      res.status(500).json({ error: "Failed to check compatibility" });
    }
  });

  // Get user's compatibility history
  app.get("/api/compatibility/history/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const checks = await storage.getCompatibilityChecksByUserId(userId);
      res.json(checks);
    } catch (error) {
      console.error("Error fetching compatibility history:", error);
      res.status(500).json({ error: "Failed to fetch history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Compatibility analysis function
function analyzeCompatibility(device: any, app: any) {
  const issues = [];
  const suggestions = [];
  let score = 100;
  let isCompatible = true;

  // RAM check
  const deviceRam = parseFloat(device.ram);
  const requiredRam = parseFloat(app.minRam);
  if (deviceRam < requiredRam) {
    issues.push({
      component: "RAM",
      required: app.minRam,
      actual: device.ram,
      status: "insufficient"
    });
    suggestions.push("Consider closing background apps or upgrading device");
    score -= 30;
    isCompatible = false;
  }

  // OS Version check
  const deviceOSNum = parseInt(device.osVersion.match(/\d+/)?.[0] || "0");
  const requiredOSNum = parseInt(app.minAndroidVersion.match(/\d+/)?.[0] || "0");
  if (deviceOSNum < requiredOSNum) {
    issues.push({
      component: "OS Version",
      required: app.minAndroidVersion,
      actual: device.osVersion,
      status: "outdated"
    });
    suggestions.push("Update Android OS or try app's older version");
    score -= 25;
    isCompatible = false;
  }

  // Storage check
  const deviceStorage = parseFloat(device.storage.match(/\d+/)?.[0] || "0");
  const requiredStorage = parseFloat(app.minStorage?.match(/\d+/)?.[0] || "0");
  if (deviceStorage < requiredStorage) {
    issues.push({
      component: "Storage",
      required: app.minStorage,
      actual: device.storage,
      status: "insufficient"
    });
    suggestions.push("Free up storage space");
    score -= 15;
  }

  // Performance suggestions
  if (score < 80) {
    suggestions.push("Try running in virtual container");
    suggestions.push("Apply performance tweaks");
    if (app.name === "Genshin Impact") {
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
