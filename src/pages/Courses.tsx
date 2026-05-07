import { useEffect, useState } from 'react';
import { 
  Plus, 
  BookOpen, 
  Settings2,
  Eye,
  Star,
  GraduationCap,
  Trash2,
  Edit
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Helper for random image if empty
const randomImage = () => `https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400`;

export default function CoursesManagement() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Create / Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'General',
    instructor: 'Admin',
    price: '',
    total_duration: '10h 30m',
    image: ''
  });

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSave = async () => {
    try {
      const coursePayload = {
        title: formData.title || 'Untitled Course',
        category: formData.category || 'General',
        instructor: formData.instructor || 'Admin',
        price: parseFloat(formData.price) || 0,
        total_duration: formData.total_duration || '0h',
        image: formData.image || randomImage(),
      };

      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(coursePayload)
          .eq('id', editingCourse.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([coursePayload]);
        if (error) throw error;
      }
      
      setIsModalOpen(false);
      setEditingCourse(null);
      setFormData({ title: '', category: 'General', instructor: 'Admin', price: '', total_duration: '10h 30m', image: '' });
      fetchCourses();
    } catch (err) {
      console.error('Error saving course:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);
      if (error) throw error;
      fetchCourses();
    } catch (err) {
      console.error('Error deleting course:', err);
    }
  };

  const openEdit = (course: any) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      category: course.category,
      instructor: course.instructor,
      price: course.price?.toString() || '',
      total_duration: course.total_duration,
      image: course.image
    });
    setIsModalOpen(true);
  };

  const openCreate = () => {
    setEditingCourse(null);
    setFormData({ title: '', category: 'General', instructor: 'Admin', price: '', total_duration: '10h 30m', image: '' });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Course Management</h2>
          <p className="text-muted-foreground">Create, organize, and publish your legal courses.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" onClick={openCreate}>
              <Plus className="h-4 w-4" />
              Create New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCourse ? 'Edit Course' : 'Create New Course'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Course Title</Label>
                <Input id="title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input id="instructor" value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input id="price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input id="image" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="Optional: Enter an image URL" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>Save Course</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-slate-100 border-slate-200 p-1 rounded-lg">
          <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">All</TabsTrigger>
          <TabsTrigger value="published" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Live</TabsTrigger>
          <TabsTrigger value="drafts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Drafts</TabsTrigger>
          <TabsTrigger value="archived" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Hidden</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {loading ? (
              <div className="col-span-full py-12 text-center text-muted-foreground">Loading courses...</div>
            ) : courses.map((course) => (
              <Card key={course.id} className="glass-card overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image || randomImage()} 
                    alt={course.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-full border border-white/50 backdrop-blur-sm">
                      Published
                    </Badge>
                  </div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full" onClick={() => openEdit(course)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive" className="h-8 w-8 rounded-full" onClick={() => handleDelete(course.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader className="p-5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">{course.category}</span>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-foreground">
                      <Star className="h-3 w-3 fill-accent text-accent" />
                      <span>{course.rating || 'N/A'}</span>
                    </div>
                  </div>
                  <CardTitle className="text-sm font-bold line-clamp-2 tracking-tight group-hover:text-primary transition-colors text-foreground">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <div className="flex items-center justify-between text-muted-foreground text-[10px] font-bold uppercase tracking-tighter">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" strokeWidth={3} />
                      <span>{course.lectures} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" strokeWidth={3} />
                      <span>{course.reviews} Learners</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-black tracking-tight text-foreground">₹{course.price || 0}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-[10px] uppercase font-bold tracking-widest hover:bg-slate-50" asChild>
                    <Link to={`/admin/courses/${course.id}`}>
                      <Settings2 className="h-3 w-3 mr-2" />
                      Configure
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9 p-0 border-slate-200 text-slate-400 hover:text-slate-600">
                    <Eye className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Create New Placeholder */}
            <button onClick={openCreate} className="bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-primary hover:border-primary/30 hover:bg-slate-50 transition-all h-full min-h-[300px] group">
              <div className="h-12 w-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:border-primary/50">
                <Plus className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Add Course</span>
            </button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
