import { 
  Bell, 
  Lock, 
  CreditCard, 
  Globe, 
  Mail, 
  Smartphone,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your platform configuration and preferences.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-slate-100 border-slate-200 p-1 rounded-lg">
          <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">General</TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Alarms</TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">DRM/Auth</TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">APIs</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Platform Information</CardTitle>
              <CardDescription className="text-xs text-muted-foreground underline decoration-primary/30">Basic details about your Vidhi Gyan instance.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-[10px] uppercase font-bold text-muted-foreground">Platform Name</Label>
                <Input id="name" defaultValue="Vidhi Gyan" className="border-slate-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="url" className="text-[10px] uppercase font-bold text-muted-foreground">Public URL</Label>
                <Input id="url" defaultValue="https://vidhigyan.com" className="border-slate-200" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-[10px] uppercase font-bold text-muted-foreground">Support Email</Label>
                <Input id="email" defaultValue="support@vidhigyan.com" className="border-slate-200" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-slate-100 px-6 py-4">
              <Button className="bg-primary hover:bg-primary/90 text-xs font-bold uppercase tracking-widest">Flush Changes</Button>
            </CardFooter>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Platform Lockdown</CardTitle>
              <CardDescription className="text-xs text-muted-foreground underline decoration-danger/30">Temporarily disable public access to the platform.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold tracking-tight text-foreground">Maintenance Mode</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Only @vidhigyan.com domains will bypass the firewall.</p>
              </div>
              <Switch className="data-[state=checked]:bg-danger" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Communication Protocols</CardTitle>
              <CardDescription className="text-xs text-muted-foreground underline decoration-emerald-500/30">Configure how you notify your learners.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold tracking-tight text-foreground">Mass Emailers</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Periodic legal updates to 12.4k students.</p>
                  </div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-primary" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-indigo-100 border border-indigo-200 rounded-xl flex items-center justify-center text-indigo-600">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold tracking-tight text-foreground">FCM Push Node</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Instant alerts directly to Android/iOS shells.</p>
                  </div>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-indigo-600" />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-warning/10 border border-warning/20 rounded-xl flex items-center justify-center text-warning">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold tracking-tight text-foreground">Admin Webhooks</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-tighter">Trigger events when a milestone is achieved.</p>
                  </div>
                </div>
                <Switch className="data-[state=checked]:bg-warning" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
           <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">DRM & Content Protection</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">Manage how your video content is protected.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-foreground">Block Multiple Sessions</p>
                  <p className="text-xs text-muted-foreground">Prevent a user from logging in on more than 2 devices.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-slate-100" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-foreground">Dynamic Watermarking</p>
                  <p className="text-xs text-muted-foreground">Overlay user ID on video playback.</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
