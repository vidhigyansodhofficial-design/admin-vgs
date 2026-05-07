/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  profile_image?: string;
  join_date: string;
  last_active: string;
  status: 'active' | 'suspended' | 'banned';
  courses_enrolledCount: number;
  completion_percentage: number;
  is_premium: boolean;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  description: string;
  price: number;
  thumbnail_url: string;
  topics: string[];
  is_recommended: boolean;
  is_most_purchased: boolean;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
  enrollment_count: number;
  average_rating: number;
  total_lessons: number;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  video_url: string;
  duration: string;
  thumbnail_url?: string;
  resources: any[]; // JSON
  status: 'published' | 'draft';
  release_date?: string;
  order_index: number;
  is_preview: boolean;
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface SecurityLog {
  id: string;
  user_id: string;
  user_name: string;
  event_type: 'screenshot_attempt' | 'screen_recording_attempt' | 'multiple_devices' | 'suspicious_login';
  timestamp: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  enrolled_at: string;
  progress: number;
  completed_at?: string;
  last_watched_lesson_id?: string;
}
