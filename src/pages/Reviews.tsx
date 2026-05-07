import { 
  Star, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  ThumbsUp,
  ThumbsDown,
  Filter
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

const reviewsData = [
  { 
    id: 1, 
    user: "Anish Kumar", 
    course: "Supreme Court Practice", 
    rating: 5, 
    comment: "This course really helped me understand the intricacies of SLP filings. Highly recommended for young litigation lawyers!", 
    time: "2 hours ago", 
    status: "pending" 
  },
  { 
    id: 2, 
    user: "Priya Sharma", 
    course: "Contract Act Mastery", 
    rating: 4, 
    comment: "Excellent explanation of section 73 and 74. Could use more case law examples though.", 
    time: "5 hours ago", 
    status: "approved" 
  },
  { 
    id: 3, 
    user: "Rahul Verma", 
    course: "Judiciary Mock Test", 
    rating: 1, 
    comment: "This is a scam! The questions are outdated and wrong.", 
    time: "1 day ago", 
    status: "pending" 
  },
  { 
    id: 4, 
    user: "Sneha Reddy", 
    course: "Advanced IP Law", 
    rating: 5, 
    comment: "Best resource for Patent litigation in India. The instructor is very knowledgeable.", 
    time: "2 days ago", 
    status: "approved" 
  },
];

export default function ReviewsManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Reviews & Comments</h2>
          <p className="text-muted-foreground">Moderate student feedback and maintain course quality.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button size="sm">Review Guidelines</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Pending Moderation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">14</div>
            <p className="text-[10px] font-bold text-rose-600 mt-1 uppercase tracking-tight">ATTENTION REQUIRED</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Avg. Platform Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-black text-foreground">4.8</div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-3 w-3 fill-accent text-accent" />
                ))}
              </div>
            </div>
            <p className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-tight">+0.1 (THIS MONTH)</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">2,104</div>
            <p className="text-[10px] font-bold text-muted-foreground/40 mt-1 uppercase tracking-tight">ACROSS ALL CATALOGS</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px] bg-slate-100 border-slate-200 p-1 rounded-lg">
          <TabsTrigger value="pending" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Pending</TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Live</TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs font-bold uppercase tracking-widest">Spam</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-6 space-y-4">
          {reviewsData.filter(r => r.status === 'pending').map((review) => (
            <Card key={review.id} className="glass-card overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex items-start gap-5">
                    <Avatar className="h-10 w-10 border border-slate-200 shadow-sm">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary/10 text-primary font-black text-xs">{review.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-black tracking-tight text-foreground">{review.user}</span>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-primary/5 border border-primary/10 rounded-full">
                           <span className="text-[9px] font-black uppercase text-primary tracking-wider">ON: {review.course}</span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{review.time}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn(
                            "h-3 w-3",
                            i < review.rating ? 'fill-accent text-accent' : 'text-slate-200'
                          )} />
                        ))}
                      </div>
                      <p className="text-xs font-medium leading-relaxed text-slate-600 max-w-2xl px-4 py-3 bg-slate-50 border border-slate-100 rounded-2xl italic">"{review.comment}"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 self-end lg:self-start">
                    <Button variant="outline" size="sm" className="bg-emerald-50 border-emerald-100 text-[10px] uppercase font-black tracking-widest text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800">
                      <CheckCircle2 className="mr-2 h-3 w-3" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="bg-rose-50 border-rose-100 text-[10px] uppercase font-black tracking-widest text-rose-700 hover:bg-rose-100 hover:text-rose-800">
                      <XCircle className="mr-2 h-3 w-3" />
                      Reject
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="border-slate-200 hover:bg-slate-50 h-9 w-9">
                          <MoreHorizontal className="h-4 w-4 text-slate-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border-slate-200">
                        <DropdownMenuItem className="text-xs font-bold">Inspect Profile</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-bold">Deep Link Course</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs font-bold text-danger">Global Exclusion</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        {/* Approved tab content would go here */}
      </Tabs>
    </div>
  );
}
