import { supabase } from './supabaseClient';
import {
	Message,
	Chat,
	Student,
	Consultant,
	Query,
	Answer,
	Request as ChatRequest,
} from './types';

// Save a new message into the messages array of the chats table
export async function saveMessage(message: Message) {
	// Fetch the current messages array for the room
	const { data, error } = await supabase
		.from('chats')
		.select('messages')
		.eq('roomid', message.roomid)
		.single();

	if (error) {
		console.error('Error fetching messages:', error); // Log the detailed error
		throw new Error(`Failed to fetch messages: ${error.message}`);
	}

	const currentMessages = data.messages || [];
	const updatedMessages = [...currentMessages, message];

	// Update the messages array in the chats table
	const { data: updateData, error: updateError } = await supabase
		.from('chats')
		.update({ messages: updatedMessages })
		.eq('roomid', message.roomid);

	if (updateError) {
		console.error('Error updating messages:', updateError); // Log the detailed error
		throw new Error(`Failed to update messages: ${updateError.message}`);
	}

	console.log('Message saved successfully:', updateData); // Log success message
	return message;
}

// Retrieve chat history for a specific room
export async function getChatHistory(roomid: string): Promise<Message[]> {
	const { data, error } = await supabase
		.from('chats')
		.select('messages')
		.eq('roomid', roomid)
		.single();

	if (error) {
		throw new Error(`Failed to fetch chat history: ${error.message}`);
	}
	return data.messages as Message[];
}

// Get all rooms a user is part of (as student or consultant)
export async function getRoomsForUser(userId: string): Promise<Chat[]> {
	const { data, error } = await supabase
		.from('chats')
		.select('*')
		.or(`student_id.eq.${userId},consultant_id.eq.${userId}`);

	if (error) {
		throw new Error(`Failed to fetch rooms: ${error.message}`);
	}
	return data as Chat[];
}
