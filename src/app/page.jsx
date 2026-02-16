import Link from 'next/link';
import { CloudUpload } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      
      <div className="text-center space-y-10 max-w-2xl">
        <div className="space-y-3">
          <CloudUpload size={72} className='text-accent mx-auto mb-4'/>
          <h1 className="text-6xl font-black text-text tracking-tighter">FileShare</h1>
          <p className="text-text/60 text-lg font-medium tracking-[0.3em]">CLOUD STORAGE</p>
        </div>

        <p className="text-text/80 leading-relaxed text-lg px-4"> 
          Securely store, share, and manage your files with an interface designed for users.
        </p>

        <div className="flex flex-row gap-4 justify-center pt-6">
          <Link href="/login" className="px-10 py-4 bg-accent text-background font-bold rounded-xl hover:bg-accent/80 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl">
            Login
          </Link>
          <Link href="/signup" className="px-10 py-4 bg-surface border-2 border-accent/30 text-text font-bold rounded-xl hover:bg-surface/80 hover:border-accent/50 active:scale-[0.98] transition-all shadow-lg">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}