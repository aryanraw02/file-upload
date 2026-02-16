import Link from "next/link";
import { CloudUpload, Menu } from "lucide-react";
import Logout from "./Logout";
import ToggleMenu from "./ToggleMenu";

export default function Navbar() {
    return (
        <nav className="bg-surface/80 border-b border-text/10 backdrop-blur-sm">
            <div className="h-20 px-4 sm:px-6 flex items-center justify-between gap-4">

                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <Link
                        href="/user/dashboard"
                        className="flex items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface min-w-0"
                    >
                        <div className="bg-accent/20 p-1.5 rounded-lg shrink-0">
                            <CloudUpload className="w-7 h-7 text-accent" />
                        </div>
                        <span className="text-lg sm:text-xl font-bold tracking-tight text-text truncate">
                            FileShare
                        </span>
                    </Link>
                </div>


                <div className="flex items-center gap-5 shrink-0">

                    <Logout variant="icon" />

                    <ToggleMenu>
                        <Menu className="w-5 h-5 text-text/80" />
                    </ToggleMenu>
                </div>
            </div>
        </nav>
    );
}