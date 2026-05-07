import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Star, 
  TrendingUp,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Mon', users: 400, courses: 240, amt: 2400 },
  { name: 'Tue', users: 300, courses: 138, amt: 2210 },
  { name: 'Wed', users: 200, courses: 980, amt: 2290 },
  { name: 'Thu', users: 278, courses: 390, amt: 2000 },
  { name: 'Fri', users: 189, courses: 480, amt: 2181 },
  { name: 'Sat', users: 239, courses: 380, amt: 2500 },
  { name: 'Sun', users: 349, courses: 430, amt: 2100 },
];

const enrollmentData = [
  { name: 'Jan', enrollments: 40 },
  { name: 'Feb', enrollments: 30 },
  { name: 'Mar', enrollments: 50 },
  { name: 'Apr', enrollments: 45 },
  { name: 'May', enrollments: 60 },
  { name: 'Jun', enrollments: 75 },
];

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
  trend: string;
  trendType: 'up' | 'down';
  description: string;
}

function StatCard({ title, value, icon: Icon, trend, trendType, description }: StatCardProps) {
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="flex items-center text-[10px] mt-1 font-bold tracking-tight">
            <span className={trendType === 'up' ? 'text-emerald-600' : 'text-rose-600'}>
              {trend}
            </span>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-tight mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Learners" 
          value="12,482" 
          icon={Users} 
          trend="+12%" 
          trendType="up" 
          description="from last month"
        />
        <StatCard 
          title="Active Courses" 
          value="143" 
          icon={BookOpen} 
          trend="+5" 
          trendType="up" 
          description="newly added"
        />
        <StatCard 
          title="Course Revenue" 
          value="₹4.2L" 
          icon={GraduationCap} 
          trend="+18%" 
          trendType="up" 
          description="from last week"
        />
        <StatCard 
          title="Security Alerts" 
          value="3" 
          icon={Activity} 
          trend="Warning" 
          trendType="down" 
          description="active flags"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass-card overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Daily Active Learners</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">Engagement over the last 14 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
                  <Area type="monotone" dataKey="users" stroke="#2563EB" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 glass-card">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-foreground">Recent Security Logs</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">System activity monitoring</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-6">
              {[
                { event: "Screen Capture Attempt", user: "Amit Sharma • IPC Law", severity: "high", time: "2m ago" },
                { event: "Multiple Device Login", user: "Priya Das • 3 IPs detected", severity: "medium", time: "15m ago" },
                { event: "New Course Published", user: "Constitutional Law Basics", severity: "low", time: "1h ago" },
                { event: "Security Audit Completed", user: "Payment Gateway #4", severity: "low", time: "3h ago" },
              ].map((activity, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-4 pl-3 py-1 border-l-2",
                  activity.severity === 'high' ? 'border-rose-500' : 
                  activity.severity === 'medium' ? 'border-amber-500' : 'border-primary'
                )}>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-xs font-bold leading-none text-foreground">{activity.event}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-tight">{activity.user}</p>
                  </div>
                  <span className="text-[10px] text-muted-foreground/50 whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 text-[10px] uppercase font-bold tracking-widest text-foreground hover:bg-slate-50 transition-colors">
                View All Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">Popular Courses</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">Highest engagement this week</CardDescription>
            </div>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: "Judicial Services Preparation", category: "Law", rating: 4.9, students: "1,204" },
                { title: "Constitution of India Deep Dive", category: "General", rating: 4.8, students: "956" },
                { title: "Civil Procedure Code Mastery", category: "Civil Law", rating: 4.7, students: "842" },
                { title: "Criminal Law Concepts", category: "Criminal Law", rating: 4.9, students: "712" },
              ].map((course, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold leading-none text-foreground">{course.title}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{course.category}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight">{course.students} Learners</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-foreground">Platform Status</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">Infrastructure health</CardDescription>
            </div>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                 <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Server Latency</p>
                 <div className="text-xl font-bold text-foreground">24ms</div>
                 <div className="w-full h-1 bg-slate-200 rounded-full mt-2">
                    <div className="w-[80%] h-full bg-emerald-500 rounded-full" />
                 </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                 <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">DB Connections</p>
                 <div className="text-xl font-bold text-foreground">142</div>
                 <div className="w-full h-1 bg-slate-200 rounded-full mt-2">
                    <div className="w-[45%] h-full bg-primary rounded-full" />
                 </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                 <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Storage Usage</p>
                 <div className="text-xl font-bold text-foreground">82%</div>
                 <div className="w-full h-1 bg-slate-200 rounded-full mt-2">
                    <div className="w-[82%] h-full bg-amber-500 rounded-full" />
                 </div>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                 <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-1">Bandwidth Out</p>
                 <div className="text-xl font-bold text-foreground">4.2 TB</div>
                 <div className="w-full h-1 bg-slate-200 rounded-full mt-2">
                    <div className="w-[60%] h-full bg-indigo-500 rounded-full" />
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
