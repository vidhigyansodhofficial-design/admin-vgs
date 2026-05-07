import { 
  Plus, 
  BookOpen, 
  ListOrdered, 
  Image as ImageIcon, 
  Settings2,
  Eye,
  EyeOff,
  Star,
  GraduationCap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
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

import { Link } from 'react-router-dom';

const coursesData = [
  { 
    id: "1", 
    title: "Supreme Court Practice & Procedure", 
    category: "Law", 
    status: "published", 
    students: 450, 
    rating: 4.9, 
    lessons: 12,
    price: "₹4,999",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "2", 
    title: "Contract Act Mastery", 
    category: "Civil Law", 
    status: "published", 
    students: 1200, 
    rating: 4.7, 
    lessons: 25,
    price: "₹2,499",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "3", 
    title: "Advanced IP Law", 
    category: "Corporate", 
    status: "draft", 
    students: 0, 
    rating: 0, 
    lessons: 8,
    price: "₹7,999",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400"
  },
  { 
    id: "4", 
    title: "Mock Interview Series", 
    category: "Judiciary", 
    status: "published", 
    students: 890, 
    rating: 4.8, 
    lessons: 15,
    price: "₹3,999",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=400"
  },
];

export default function CoursesManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Course Management</h2>
          <p className="text-muted-foreground">Create, organize, and publish your legal courses.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Course
        </Button>
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
            {coursesData.map((course) => (
              <Card key={course.id} className="glass-card overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className={cn(
                      "text-[10px] font-bold uppercase rounded-full border border-white/50 backdrop-blur-sm",
                      course.status === 'published' ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                    )}>
                      {course.status}
                    </Badge>
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
                      <span>{course.lessons} Lessons</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" strokeWidth={3} />
                      <span>{course.students} Learners</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-black tracking-tight text-foreground">{course.price}</span>
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
                    {course.status === 'published' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            {/* Create New Placeholder */}
            <button className="bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-4 text-slate-300 hover:text-primary hover:border-primary/30 hover:bg-slate-50 transition-all h-full min-h-[300px] group">
              <div className="h-12 w-12 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform group-hover:border-primary/50">
                <Plus className="h-6 w-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Add Course</span>
            </button>
          </div>
        </TabsContent>
        {/* Other tabs would filter the coursesData array */}
      </Tabs>
    </div>
  );
}
