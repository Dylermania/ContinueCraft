import { 
  users, devices, apps, compatibilityChecks,
  type User, type InsertUser,
  type Device, type InsertDevice,
  type App, type InsertApp,
  type CompatibilityCheck, type InsertCompatibilityCheck
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Devices
  getDevice(id: number): Promise<Device | undefined>;
  getDevicesByUserId(userId: number): Promise<Device[]>;
  createDevice(device: InsertDevice): Promise<Device>;
  updateDevice(id: number, device: Partial<Device>): Promise<Device | undefined>;

  // Apps
  getApp(id: number): Promise<App | undefined>;
  getAppByName(name: string): Promise<App | undefined>;
  getPopularApps(): Promise<App[]>;
  searchApps(query: string): Promise<App[]>;
  createApp(app: InsertApp): Promise<App>;

  // Compatibility Checks
  getCompatibilityCheck(id: number): Promise<CompatibilityCheck | undefined>;
  getCompatibilityChecksByUserId(userId: number): Promise<CompatibilityCheck[]>;
  createCompatibilityCheck(check: InsertCompatibilityCheck): Promise<CompatibilityCheck>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private devices: Map<number, Device>;
  private apps: Map<number, App>;
  private compatibilityChecks: Map<number, CompatibilityCheck>;
  private currentUserId: number;
  private currentDeviceId: number;
  private currentAppId: number;
  private currentCheckId: number;

  constructor() {
    this.users = new Map();
    this.devices = new Map();
    this.apps = new Map();
    this.compatibilityChecks = new Map();
    this.currentUserId = 1;
    this.currentDeviceId = 1;
    this.currentAppId = 1;
    this.currentCheckId = 1;

    // Initialize with popular apps
    this.initializePopularApps();
  }

  private initializePopularApps() {
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
        isPopular: true,
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
        isPopular: true,
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
        isPopular: true,
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
        isPopular: true,
      },
    ];

    popularApps.forEach(app => {
      const id = this.currentAppId++;
      this.apps.set(id, { ...app, id, createdAt: new Date() });
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      name: insertUser.name ?? null,
      email: insertUser.email ?? null
    };
    this.users.set(id, user);
    return user;
  }

  // Devices
  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  async getDevicesByUserId(userId: number): Promise<Device[]> {
    return Array.from(this.devices.values()).filter(device => device.userId === userId);
  }

  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const id = this.currentDeviceId++;
    const device: Device = { 
      ...insertDevice, 
      id, 
      createdAt: new Date(),
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

  async updateDevice(id: number, updates: Partial<Device>): Promise<Device | undefined> {
    const device = this.devices.get(id);
    if (!device) return undefined;
    
    const updatedDevice = { ...device, ...updates };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }

  // Apps
  async getApp(id: number): Promise<App | undefined> {
    return this.apps.get(id);
  }

  async getAppByName(name: string): Promise<App | undefined> {
    return Array.from(this.apps.values()).find(app => 
      app.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async getPopularApps(): Promise<App[]> {
    return Array.from(this.apps.values()).filter(app => app.isPopular);
  }

  async searchApps(query: string): Promise<App[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.apps.values()).filter(app =>
      app.name.toLowerCase().includes(lowerQuery) ||
      app.developer?.toLowerCase().includes(lowerQuery) ||
      app.category?.toLowerCase().includes(lowerQuery)
    );
  }

  async createApp(insertApp: InsertApp): Promise<App> {
    const id = this.currentAppId++;
    const app: App = { 
      ...insertApp, 
      id, 
      createdAt: new Date(),
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
    this.apps.set(id, app);
    return app;
  }

  // Compatibility Checks
  async getCompatibilityCheck(id: number): Promise<CompatibilityCheck | undefined> {
    return this.compatibilityChecks.get(id);
  }

  async getCompatibilityChecksByUserId(userId: number): Promise<CompatibilityCheck[]> {
    return Array.from(this.compatibilityChecks.values())
      .filter(check => check.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createCompatibilityCheck(insertCheck: InsertCompatibilityCheck): Promise<CompatibilityCheck> {
    const id = this.currentCheckId++;
    const check: CompatibilityCheck = { 
      ...insertCheck, 
      id, 
      createdAt: new Date(),
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
}

export const storage = new MemStorage();
