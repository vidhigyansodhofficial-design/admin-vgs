import { useEffect, useState } from 'react';
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
import { supabase } from '../lib/supabase';

const activityData = [
  { name: '00:00', value: 45 },
  { name: '04:00', value: 20 },
  { name: '08:00', value: 120 },
  { name: '12:00', value: 450 },
  { name: '16:00', value: 380 },
  { name: '20:00', value: 520 },
  { name: '23:59', value: 180 },
];

const sourceData = [
  { name: 'Direct', value: 400 },
  { name: 'Referral', value: 300 },
  { name: 'Social', value: 300 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function Analytics() {
  const [stats, setStats] = useState({
    completionRate: 0,
    activeLearners: 0,
    totalCourses: 0,
    avgScore: 0
  });
  const [completionData, setCompletionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();

    const enrollmentsChannel = supabase.channel('analytics-enroll').on('postgres_changes', { event: '*', schema: 'public', table: 'user_course_enrollments' }, fetchAnalyticsData).subscribe();
    const coursesChannel = supabase.channel('analytics-courses').on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, fetchAnalyticsData).subscribe();

    return () => {
      supabase.removeChannel(enrollmentsChannel);
      supabase.removeChannel(coursesChannel);
    };
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [
        { data: enrollments },
        { data: courses },
        { count: userCount }
      ] = await Promise.all([
        supabase.from('user_course_enrollments').select('*'),
        supabase.from('courses').select('*'),
        supabase.from('users').select('*', { count: 'exact', head: true })
      ]);

      if (enrollments && courses) {
        const completedCount = enrollments.filter(e => e.completed).length;
        const totalEnroll = enrollments.length;
        const compRate = totalEnroll > 0 ? (completedCount / totalEnroll) * 100 : 0;

        const totalRating = courses.reduce((acc, c) => acc + (parseFloat(c.rating) || 0), 0);
        const avgRating = courses.length > 0 ? totalRating / courses.length : 0;

        setStats({
          completionRate: compRate,
          activeLearners: userCount || 0,
          totalCourses: courses.length,
          avgScore: avgRating
        });

        // Calculate course completion
        const compData = courses.slice(0, 4).map(course => {
          const courseEnrolls = enrollments.filter(e => e.course_id === course.id);
          const cCount = courseEnrolls.filter(e => e.completed).length;
          const cRate = courseEnrolls.length > 0 ? Math.round((cCount / courseEnrolls.length) * 100) : 0;
          return {
            name: course.title,
            completed: cRate,
            inProgress: 100 - cRate
          };
        });
        setCompletionData(compData);
      }
    } catch (error) {
      console.error("Error fetching analytics", error);
    } finally {
      setLoading(false);
    }
  };

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
                <div className="text-2xl font-black text-foreground">{stats.completionRate.toFixed(1)}%</div>
                <div className="flex items-center text-[10px] text-emerald-600 mt-1 font-bold italic">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  Live Sync
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Active Learners</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">{stats.activeLearners}</div>
                <div className="flex items-center text-[10px] text-emerald-600 mt-1 font-bold italic">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  Live Sync
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">{stats.totalCourses}</div>
                <div className="flex items-center text-[10px] text-emerald-600 mt-1 font-bold italic">
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                  Live Sync
                </div>
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Avg. Course Score</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-foreground">{stats.avgScore.toFixed(2)}/5</div>
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
                {completionData.length === 0 && <p className="text-sm text-muted-foreground">No course completion data available.</p>}
                {completionData.map((item, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                      <span className="text-foreground line-clamp-1 max-w-[60%]">{item.name}</span>
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
