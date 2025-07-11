import { useState, useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { detectDeviceSpecs } from "@/lib/device-utils";

export function useDeviceDetection() {
  const hasDetectedRef = useRef(false);
  const [deviceSpecs, setDeviceSpecs] = useState({
    osVersion: "Android 10 (API 29)",
    cpuArchitecture: "arm64-v8a",
    ram: "2.5 GB",
    gpu: "Adreno 610",
    storage: "64 GB (42 GB free)",
    isRooted: false,
    performanceScore: 72,
    model: "Samsung Galaxy A50",
    userAgent: "",
    additionalSpecs: {}
  });

  const { toast } = useToast();

  const createDeviceMutation = useMutation({
    mutationFn: async (deviceData: any) => {
      const response = await apiRequest("POST", "/api/devices/detect", deviceData);
      return response.json();
    },
    onSuccess: (device) => {
      toast({
        title: "Device Detected",
        description: "Your device specifications have been analyzed successfully.",
      });
      return device;
    },
    onError: (error) => {
      toast({
        title: "Detection Failed",
        description: "Failed to detect device specifications. Using fallback data.",
        variant: "destructive",
      });
    },
  });

  const detectDevice = useCallback(async () => {
    if (hasDetectedRef.current) return;
    hasDetectedRef.current = true;
    
    try {
      const detectedSpecs = await detectDeviceSpecs();
      setDeviceSpecs(detectedSpecs);
      
      // Send to backend only once
      createDeviceMutation.mutate({
        userId: 1, // Mock user ID
        ...detectedSpecs,
      });
    } catch (error) {
      console.error("Device detection error:", error);
      hasDetectedRef.current = false; // Allow retry on error
    }
  }, []);

  return {
    deviceSpecs,
    detectDevice,
    isDetecting: createDeviceMutation.isPending,
  };
}
