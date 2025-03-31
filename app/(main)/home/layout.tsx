//  /app/(main) :_same level as home 
'use client';
import { UserProvider } from '@/context/userContext';
import './main.css';

export default function homeLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <div className="home-layout">
        {children}
      </div>
    </UserProvider>
  );
}