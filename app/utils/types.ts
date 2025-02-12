export interface Message {
  timestamp: string;
  name: string;
  content: string;
  roomid: string;
}

export interface Professor {
  id: string;
  name: string;
  department: string;
  expertise: string;
}

export interface Coordinator {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  name: string;
}

export interface Room {
  roomid: string;
  student: string; // student id
  professor: string | null; // professor id or null
  coordinator: string | null; // coordinator id or null
}
