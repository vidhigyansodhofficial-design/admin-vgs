import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Ban, 
  ShieldCheck, 
  Trash2,
  Mail,
  ExternalLink
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SupabaseUser {
  id: string;
  email: string;
  full_name: string | null;
  profile_image_url: string | null;
  created_at: string;
}

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        return;
      }

      if (data) {
        const formattedUsers = data.map((user: SupabaseUser) => ({
          id: user.id,
          name: user.full_name || 'Unknown User',
          email: user.email,
          image: user.profile_image_url || '',
          joined: new Date(user.created_at).toLocaleDateString(),
          enrolled: Math.floor(Math.random() * 5) + 1, // Mock data for now
          progress: Math.floor(Math.random() * 100), // Mock data for now
          status: 'active', // Mock data for now
        }));
        setUsers(formattedUsers);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel('public:users')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        (payload) => {
          console.log('Realtime change received!', payload);
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage your students and their account access.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Export CSV</Button>
          <Button size="sm">Add Manual User</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="pl-8 w-full md:max-w-[400px] border-slate-200"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-10 border-slate-200">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <Card className="glass-card overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow className="hover:bg-transparent border-slate-200">
                <TableHead className="w-[200px] text-[10px] uppercase font-bold tracking-wider text-muted-foreground">User</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Joined Date</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Enrollments</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Avg. Progress</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Status</TableHead>
                <TableHead className="text-right text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    Loading users...
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-slate-200 shadow-sm">
                          <AvatarImage src={user.image} alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                            {user.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{user.name}</span>
                          <span className="text-[10px] text-muted-foreground">{user.email}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{user.joined}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-[10px] font-semibold">{user.enrolled} Courses</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${user.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground">{user.progress}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'destructive'} className={cn(
                        "capitalize text-[10px] font-bold rounded-full px-2 py-0 border-none",
                        user.status === 'active' ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                      )}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="hover:bg-slate-100">
                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-slate-200">
                          <DropdownMenuLabel className="text-[10px] uppercase text-muted-foreground">Actions</DropdownMenuLabel>
                          <DropdownMenuItem className="flex items-center gap-2 text-xs">
                            <ExternalLink className="h-4 w-4 text-slate-400" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-xs">
                            <Mail className="h-4 w-4 text-slate-400" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-100" />
                          <DropdownMenuItem className="flex items-center gap-2 text-xs text-primary">
                            <ShieldCheck className="h-4 w-4" />
                            Grant Premium
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-xs text-warning">
                            <Ban className="h-4 w-4" />
                            Suspend Account
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-xs text-danger">
                            <Trash2 className="h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
