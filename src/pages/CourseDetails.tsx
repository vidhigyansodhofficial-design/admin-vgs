import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  GripVertical, 
  FileText, 
  MoreVertical,
  Eye,
  Lock,
  CalendarCheck,
  Video,
  PlayCircle,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Reorder } from "motion/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { supabase } from '../lib/supabase';

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Course Edit Modal
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({ title: '', category: '', price: '' });

  // Lesson Edit Modal
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);
  const [lessonForm, setLessonForm] = useState({
    title: '', duration: '', content_type: 'video', preview: false
  });

  useEffect(() => {
    if (id) {
      fetchCourseAndLessons();
    }
  }, [id]);

  const fetchCourseAndLessons = async () => {
    try {
      setLoading(true);
      const [courseRes, syllabusRes] = await Promise.all([
        supabase.from('courses').select('*').eq('id', id).single(),
        supabase.from('course_syllabus').select('*').eq('course_id', id).order('order_index', { ascending: true })
      ]);
      
      if (courseRes.data) setCourse(courseRes.data);
      if (syllabusRes.data) setLessons(syllabusRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (newOrder: any[]) => {
    setLessons(newOrder);
    // Background update order_index
    for (let i = 0; i < newOrder.length; i++) {
      if (newOrder[i].order_index !== i) {
        supabase.from('course_syllabus').update({ order_index: i }).eq('id', newOrder[i].id).then();
      }
    }
  };

  const handleSaveCourse = async () => {
    try {
      await supabase.from('courses').update({
        title: courseForm.title,
        category: courseForm.category,
        price: parseFloat(courseForm.price) || 0
      }).eq('id', id);
      setIsCourseModalOpen(false);
      fetchCourseAndLessons();
    } catch (err) {
      console.error('Error updating course', err);
    }
  };

  const openCourseEdit = () => {
    if (course) {
      setCourseForm({ title: course.title, category: course.category, price: course.price?.toString() || '' });
      setIsCourseModalOpen(true);
    }
  };

  const handleSaveLesson = async () => {
    try {
      const payload = {
        course_id: id,
        title: lessonForm.title || 'Untitled Lesson',
        duration: lessonForm.duration || '0:00',
        content_type: lessonForm.content_type,
        preview: lessonForm.preview,
        order_index: editingLesson ? editingLesson.order_index : lessons.length
      };

      if (editingLesson) {
        await supabase.from('course_syllabus').update(payload).eq('id', editingLesson.id);
      } else {
        await supabase.from('course_syllabus').insert([payload]);
      }
      setIsLessonModalOpen(false);
      fetchCourseAndLessons();
    } catch (err) {
      console.error('Error saving lesson', err);
    }
  };

  const openLessonCreate = () => {
    setEditingLesson(null);
    setLessonForm({ title: '', duration: '', content_type: 'video', preview: false });
    setIsLessonModalOpen(true);
  };

  const openLessonEdit = (lesson: any) => {
    setEditingLesson(lesson);
    setLessonForm({ 
      title: lesson.title, 
      duration: lesson.duration, 
      content_type: lesson.content_type || 'video', 
      preview: lesson.preview || false 
    });
    setIsLessonModalOpen(true);
  };

  const deleteLesson = async (lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) return;
    try {
      await supabase.from('course_syllabus').delete().eq('id', lessonId);
      fetchCourseAndLessons();
    } catch (err) {
      console.error('Error deleting lesson', err);
    }
  };

  if (loading || !course) {
    return <div className="p-8 text-center text-muted-foreground">Loading course details...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="h-10 w-10 border border-slate-200" asChild>
          <Link to="/admin/courses">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{course.title}</h2>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={openCourseEdit}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">UID: {id?.substring(0,8)}</span>
            <span className="text-slate-200 text-xs">•</span>
            <Badge variant="secondary" className="text-[10px] font-bold uppercase py-0 px-2">{course.category}</Badge>
            <span className="text-slate-200 text-xs">•</span>
            <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest">₹{course.price}</span>
          </div>
        </div>
      </div>

      {/* Course Edit Dialog */}
      <Dialog open={isCourseModalOpen} onOpenChange={setIsCourseModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Course Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Course Title</Label>
              <Input value={courseForm.title} onChange={e => setCourseForm({...courseForm, title: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label>Category</Label>
              <Input value={courseForm.category} onChange={e => setCourseForm({...courseForm, category: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label>Price (₹)</Label>
              <Input type="number" value={courseForm.price} onChange={e => setCourseForm({...courseForm, price: e.target.value})} />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveCourse}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Lesson Edit Dialog */}
      <Dialog open={isLessonModalOpen} onOpenChange={setIsLessonModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLesson ? 'Edit Lesson' : 'Add New Lesson'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Lesson Title</Label>
              <Input value={lessonForm.title} onChange={e => setLessonForm({...lessonForm, title: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label>Duration (e.g., 12:30 or 1.2 MB)</Label>
              <Input value={lessonForm.duration} onChange={e => setLessonForm({...lessonForm, duration: e.target.value})} />
            </div>
            <div className="grid gap-2">
              <Label>Content Type (video / resource)</Label>
              <Input value={lessonForm.content_type} onChange={e => setLessonForm({...lessonForm, content_type: e.target.value})} />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <input 
                type="checkbox" 
                id="preview" 
                checked={lessonForm.preview} 
                onChange={e => setLessonForm({...lessonForm, preview: e.target.checked})} 
                className="rounded border-gray-300"
              />
              <Label htmlFor="preview">Is Public Preview?</Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveLesson}>Save Lesson</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between border-b pb-8 mb-4">
              <div>
                <CardTitle className="text-lg font-bold text-foreground">Curriculum Matrix</CardTitle>
                <CardDescription className="text-xs text-muted-foreground underline decoration-primary/30">Drag to sequence your legal educational path</CardDescription>
              </div>
              <Button size="sm" onClick={openLessonCreate} className="bg-primary hover:bg-primary/90 text-[10px] uppercase font-bold tracking-widest px-4 h-9">
                <Plus className="h-4 w-4 mr-1" />
                Attach Lesson
              </Button>
            </CardHeader>
            <CardContent>
              {lessons.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">No lessons attached yet.</div>
              ) : (
                <Reorder.Group axis="y" values={lessons} onReorder={handleReorder} className="space-y-3">
                  {lessons.map((lesson) => (
                    <Reorder.Item 
                      key={lesson.id} 
                      value={lesson}
                      className="flex items-center gap-4 glass bg-white/5 p-4 rounded-2xl border border-transparent hover:border-blue-500/30 transition-all group cursor-default bg-white shadow-sm"
                    >
                      <div className="cursor-grab active:cursor-grabbing text-slate-300 group-hover:text-blue-400">
                        <GripVertical className="h-4 w-4" />
                      </div>
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                          {lesson.content_type === 'video' ? <Video className="h-4 w-4 text-emerald-600" /> : <FileText className="h-4 w-4 text-primary" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold tracking-tight text-foreground">{lesson.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{lesson.duration || '0:00'}</span>
                            <span className="text-slate-200">•</span>
                            {lesson.preview ? (
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
                        <Button variant="ghost" size="sm" onClick={() => openLessonEdit(lesson)} className="text-[10px] uppercase font-black tracking-widest text-muted-foreground hover:text-foreground">Edit</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100 border border-transparent hover:border-slate-200">
                              <MoreVertical className="h-4 w-4 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-slate-200">
                            <DropdownMenuItem className="text-xs font-bold" onClick={() => openLessonEdit(lesson)}>Edit Configuration</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs font-bold text-rose-600" onClick={() => deleteLesson(lesson.id)}>Purge Data</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </Reorder.Item>
                  ))}
                </Reorder.Group>
              )}
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
                  <span className="text-muted-foreground">Created At</span>
                  <span>{new Date(course.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-foreground">
                  <span className="text-muted-foreground">Lessons Count</span>
                  <span className="text-primary">{lessons.length}</span>
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
