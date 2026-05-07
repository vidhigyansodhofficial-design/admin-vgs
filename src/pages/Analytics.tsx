import { 
  BarChart3, 
  Users, 
  BookOpen, 
  PlayCircle, 
  Clock, 
  ArrowUpRight,
  Target,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const activityData = [
  { name: '00:00', value: 45 },
  { name: '04:00', value: 20 },
  { name: '08:00', value: 120 },
  { name: '12:00', value: 450 },
  { name: '16:00', value: 380 },
  { name: '20:00', value: 520 },
  { name: '23:59', value: 180 },
];

const completionData = [
  { name: 'Course A', completed: 85, inProgress: 15 },
  { name: 'Course B', completed: 60, inProgress: 40 },
  { name: 'Course C', completed: 45, inProgress: 55 },
  { name: 'Course D', completed: 92, inProgress: 8 },
];

const sourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 300 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Learning Analytics</h2>
          <p className="text-muted-foreground">Detailed insights into student engagement and course performance.</p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px] bg-slate-100 border-slate-200 p-1 rounded-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Overview</TabsTrigger>
          <TabsTrigger value="engagement" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Engagement</TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Performance</TabsTrigger>
          <TabsTrigger value="demographics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
             <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Completion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">76.4%</div>
                <div className="flex items-center text-[10px] text-emerald-600 mt-1 font-bold italic">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +4.2% Growth
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Active Learners</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">1,842</div>
                <div className="flex items-center text-[10px] text-rose-600 mt-1 font-bold italic">
                  <ArrowUpRight className="mr-1 h-3 w-3 rotate-90" />
                  -2.1% Today
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Learning Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">14.2k</div>
                <div className="flex items-center text-[10px] text-emerald-600 mt-1 font-bold italic">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  +15% Total
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Avg. Course Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">4.82/5</div>
                <div className="flex items-center text-[10px] text-muted-foreground/60 mt-1 font-bold italic">
                  Top 5% Global
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Engagement Intensity</CardTitle>
                <CardDescription className="text-xs text-muted-foreground underline decoration-primary/30">Hourly student activity heatmap</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                      <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} stroke="#64748B" />
                      <YAxis fontSize={10} tickLine={false} axisLine={false} stroke="#64748B" />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                         itemStyle={{ color: '#1E293B' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#2563EB" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3 glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Acquisition Sources</CardTitle>
                <CardDescription className="text-xs text-muted-foreground underline decoration-indigo-500/30">Referral analytics breakdown</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center pt-8">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={8}
                        dataKey="value"
                        strokeWidth={0}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-8 flex flex-wrap justify-center gap-6">
                  {sourceData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Drop-off Rates by Category</CardTitle>
              <CardDescription className="text-xs text-muted-foreground underline decoration-rose-500/30">Strategic retention optimization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-10 py-4">
                {completionData.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                      <span className="text-foreground">{item.name}</span>
                      <span className="text-primary">{item.completed}% Success</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-primary" style={{ width: `${item.completed}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
