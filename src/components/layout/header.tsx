import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold">
              Mano India
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/admin"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild variant="ghost">
                <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Sign Up</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
