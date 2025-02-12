import { supabase } from "./supabaseClient";
import { Message, Room } from "./types";

// Save a new message into Supabase
export async function saveMessage(message: Message) {
  const { error } = await supabase.from("messages").insert([message]);
  if (error) {
    throw new Error(`Failed to save message: ${error.message}`);
  }
  return message;
}

// Retrieve chat history for a specific room
export async function getChatHistory(roomid: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("roomid", roomid)
    .order("timestamp", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch chat history: ${error.message}`);
  }
  return data as Message[];
}

// Get all rooms a user is part of (as student, professor, or coordinator)
export async function getRoomsForUser(userId: string): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .or(`student.eq.${userId},professor.eq.${userId},coordinator.eq.${userId}`);

  if (error) {
    throw new Error(`Failed to fetch rooms: ${error.message}`);
  }
  return data as Room[];
}
