import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [serverStatus, setServerStatus] = useState("stopped");
  const [serverIP, setServerIP] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const startServer = async () => {
    setIsLoading(true);
    const res = await fetch("https://your-backend-host/start-server", {
      method: "POST",
    });
    const data = await res.json();
    setServerIP(data.ip);
    setServerStatus("running");
    setIsLoading(false);
  };

  const stopServer = async () => {
    setIsLoading(true);
    await fetch("https://your-backend-host/stop-server", {
      method: "POST",
    });
    setServerStatus("stopped");
    setServerIP(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Minecraft Hosting Dashboard</h1>
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md text-center">
        <p className="text-lg mb-4">
          Server Status: <span className={serverStatus === "running" ? "text-green-600" : "text-red-600"}>{serverStatus}</span>
        </p>
        {serverStatus === "running" && serverIP && (
          <p className="text-gray-700 mb-4">Connect to: <span className="font-mono">{serverIP}</span></p>
        )}
        <div className="space-x-2">
          <Button onClick={startServer} disabled={isLoading || serverStatus === "running"}>
            Start Server
          </Button>
          <Button onClick={stopServer} variant="destructive" disabled={isLoading || serverStatus === "stopped"}>
            Stop Server
          </Button>
        </div>
      </div>
    </div>
  );
}