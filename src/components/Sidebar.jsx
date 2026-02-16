import { navItems } from "@/constants/navConfig";
import NavItem from "./NavItem";
import LogoutButton from "./Logout";
import Avatar from "./Avatar";
import SidebarCloseButton from "./SidebarCloseButton";

export default function Sidebar({ user, profilePic, setProfilePic }) {
  return (
    <aside className="w-80 bg-surface p-8 flex flex-col h-screen border-r border-text/10 overflow-hidden relative">
      <SidebarCloseButton />
      <div className="flex flex-col items-center mb-12 pt-4">
        <Avatar
          name={user?.name}
          email={user?.email}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />
      </div>

      <nav className="flex-1 space-y-5">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>

      <LogoutButton />
    </aside>
  );
}