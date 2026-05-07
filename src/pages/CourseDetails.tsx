import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  GripVertical, 
  Play, 
  FileText, 
  MoreVertical,
  ChevronRight,
  Eye,
  Lock,
  CalendarCheck,
  Video,
  PlayCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reorder, motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const INITIAL_LESSONS = [
  { id: "1", title: "Introduction to Supreme Court Practice", type: "video", duration: "12:05", isPreview: true },
  { id: "2", title: "Filing procedures for SLP", type: "video", duration: "45:30", isPreview: false },
  { id: "3", title: "Review Petition Guidelines (PDF)", type: "resource", duration: "1.2 MB", isPreview: false },
  { id: "4", title: "Senior Advocate Briefing Etiquette", type: "video", duration: "32:15", isPreview: false },
  { id: "5", title: "Writ Jurisdiction - Article 32 vs 226", type: "video", duration: "55:00", isPreview: true },
];

export default function CourseDetails() {
  const { id } = useParams();
  const [lessons, setLessons] = useState(INITIAL_LESSONS);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 border border-slate-200" asChild>
          <Link to="/admin/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Supreme Court Practice & Procedure</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">UID: {id || '1'}</span>
            <span className="text-slate-200 text-xs">•</span>
            <Badge variant="secondary" className="text-[10px] font-bold uppercase py-0 px-2">Law Catalog</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-8 mb-4">
              <div>
                <CardTitle className="text-lg font-bold text-foreground">Curriculum Matrix</CardTitle>
                <CardDescription className="text-xs text-muted-foreground underline decoration-primary/30">Drag to sequence your legal educational path</CardDescription>
              </div>
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-[10px] uppercase font-bold tracking-widest px-4 h-9">
                <Plus className="h-4 w-4 mr-1" />
                Attach Lesson
              </Button>
            </CardHeader>
            <CardContent>
              <Reorder.Group axis="y" values={lessons} onReorder={setLessons} className="space-y-3">
                {lessons.map((lesson) => (
                  <Reorder.Item 
                    key={lesson.id} 
                    value={lesson}
                    className="flex items-center gap-4 glass bg-white/5 p-4 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all group cursor-default"
                  >
                    <div className="cursor-grab active:cursor-grabbing text-white/20 group-hover:text-blue-400">
                      <GripVertical className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-4 flex-1">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        {lesson.type === 'video' ? <Video className="h-4 w-4 text-emerald-600" /> : <FileText className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold tracking-tight text-foreground">{lesson.title}</p>
                        <div className="flex items-center gap-3 mt-1">
                           <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{lesson.duration}</span>
                          <span className="text-slate-200">•</span>
                          {lesson.isPreview ? (
                            <span className="flex items-center gap-1 text-[9px] uppercase font-black tracking-[0.1em] text-emerald-600">
                              <Eye className="h-3 w-3" />
                              Public Preview
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[9px] uppercase font-black tracking-[0.1em] text-muted-foreground/40">
                              <Lock className="h-3 w-3" />
                              DRM Locked
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <Button variant="ghost" size="sm" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground hover:text-foreground">Edit</Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 border border-transparent hover:border-slate-200">
                            <MoreVertical className="h-4 w-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-slate-200">
                          <DropdownMenuItem className="text-xs font-bold">Toggle Visibility</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold">Clone Payload</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold">Release Logic</DropdownMenuItem>
                          <DropdownMenuItem className="text-xs font-bold text-rose-600">Purge Data</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Release Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Deployment Status</Label>
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-xl p-3">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.2)] animate-pulse" />
                   <span className="text-xs font-black uppercase tracking-widest text-emerald-700">Live Production</span>
                </div>
              </div>
              <Button variant="outline" className="w-full text-[10px] uppercase font-bold tracking-[0.2em] text-foreground hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-colors">Emergency Unpublish</Button>
              <Separator className="bg-slate-100" />
              <div className="space-y-3 px-1">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-foreground">
                  <span className="text-muted-foreground">Genesis Date</span>
                  <span>Jan 12, 2024</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-foreground">
                  <span className="text-muted-foreground">Last Revision</span>
                  <span className="text-primary">2 Hours Prior</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-foreground">Sync Intelligence</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="p-3 bg-warning/10 text-warning rounded-xl">
                  <PlayCircle className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Playback Load</p>
                  <p className="text-sm font-black tracking-tight text-foreground">12,480 HOURS</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                <div className="p-3 bg-emerald-500/10 text-emerald-600 rounded-xl">
                  <CalendarCheck className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Mastery Index</p>
                  <p className="text-sm font-black tracking-tight text-foreground">78.42% SCALE</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="px-0 h-auto text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary/80 hover:bg-transparent" asChild>
                <Link to="/admin/analytics">Deep Analytics Loop</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Separator({ className, ...props }: any) {
  return <div className={`h-px bg-border ${className}`} {...props} />;
}
