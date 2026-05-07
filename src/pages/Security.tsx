import { 
  ShieldAlert, 
  Monitor, 
  Smartphone, 
  Locate, 
  CameraOff, 
  AlertCircle,
  Clock,
  History
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const securityLogs = [
  { id: 1, user: "anish_22", event: "Screenshot Attempt", description: "System blocked screenshot during 'Lesson 4: Evidence Act'", time: "2 mins ago", severity: "high", icon: CameraOff },
  { id: 2, user: "priya_s", event: "Multiple Device Login", description: "Simultaneous login from Delhi (Chrome) and Mumbai (App)", time: "15 mins ago", severity: "medium", icon: Monitor },
  { id: 3, user: "rahul_v01", event: "Screen Recording", description: "Expo Screen Capture detected and stopped", time: "1 hour ago", severity: "high", icon: ShieldAlert },
  { id: 4, user: "unknown_bot", event: "Brute Force Attempt", description: "5 failed login attempts from IP 192.168.1.1", time: "3 hours ago", severity: "medium", icon: AlertCircle },
  { id: 5, user: "vikram_m", event: "Unusual Location", description: "Logged in from Singapore (VPN detected)", time: "5 hours ago", severity: "low", icon: Locate },
];

export default function SecurityMonitoring() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Security Monitoring</h2>
          <p className="text-muted-foreground">Monitor platform security, DRM violations, and suspicious activities.</p>
        </div>
        <Button variant="destructive" size="sm" className="flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" />
          Immediate Lockdown
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Blocked Screenshots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">124</div>
            <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">+12 (LAST 24H)</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">DRM Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-rose-600">8</div>
            <p className="text-[10px] font-bold text-rose-600/50 mt-1 uppercase tracking-tight">CRITICAL AUDIT REQ.</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Multi-Device Flags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-amber-600">42</div>
            <p className="text-[10px] font-bold text-amber-600/50 mt-1 uppercase tracking-tight">ACTIVE SESSION LOCKS</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-6">
          <div>
            <CardTitle className="text-lg font-bold text-foreground">Real-time Security Logs</CardTitle>
            <CardDescription className="text-xs text-muted-foreground uppercase font-bold tracking-tighter">Monitoring Vidhi Gyan Platform DRM</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="border-slate-200 text-[10px] uppercase font-bold tracking-[0.2em] px-4">
            <History className="mr-2 h-3 w-3" />
            Audit Trail
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <div className="divide-y divide-slate-100">
              {securityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-4 p-6 hover:bg-slate-50/50 transition-colors">
                  <div className={cn(
                    "p-3 rounded-2xl shadow-sm",
                    log.severity === 'high' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 
                    log.severity === 'medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 
                    'bg-blue-50 text-blue-600 border border-blue-100'
                  )}>
                    <log.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold tracking-tight text-foreground">{log.event}</span>
                        <Badge variant="secondary" className="text-[9px] h-4 tracking-wider px-1 font-bold">@{log.user}</Badge>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{log.time}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-2xl">{log.description}</p>
                    <div className="flex items-center gap-4 pt-3">
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-[10px] uppercase font-black tracking-widest text-primary hover:text-primary/80 hover:bg-transparent">Inspect Device</Button>
                      <Button variant="ghost" size="sm" className="h-auto p-0 text-[10px] uppercase font-black tracking-widest text-danger hover:text-danger/80 hover:bg-transparent">Ban Protocol</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Device & OS Breakdown</CardTitle>
            <CardDescription className="text-xs text-muted-foreground underline decoration-primary/30">User agent distribution analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground">Android (Protected)</span>
                  </div>
                  <span className="text-foreground">68%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: '68%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground">Edge (Web Sandbox)</span>
                  </div>
                  <span className="text-foreground">22%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: '22%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground">iOS App (Locked)</span>
                  </div>
                  <span className="text-foreground">10%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">DRM System Configuration</CardTitle>
            <CardDescription className="text-xs text-muted-foreground underline decoration-rose-500/30">Active protection algorithms</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-5">
              {[
                { name: "Screenshot Fingerprinting", status: "Active", color: "text-emerald-600" },
                { name: "Live Session Recording Prevention", status: "Active", color: "text-emerald-600" },
                { name: "Parallel IP Detection", status: "Enabled", color: "text-emerald-600" },
                { name: "VPN/Proxy Firewall", status: "Soft-Block", color: "text-amber-600" },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.1em]">
                  <span className="text-muted-foreground">{setting.name}</span>
                  <span className={cn("px-2 py-0.5 rounded-full border border-slate-200 bg-slate-50", setting.color)}>{setting.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
