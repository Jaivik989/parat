import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
}

interface BottomNavProps {
  items: NavItem[];
}

// Generic bottom navigation bar reused by Farmer and Procurement dashboards.
// The "Scan" item is always rendered as a raised circular button.
export default function BottomNav({ items }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 mx-auto max-w-md bg-white border-t border-gray-100 flex justify-around items-end pt-2 pb-3 px-2 z-20">
      {items.map(({ label, to, icon: Icon }) => {
        const isScan = label === 'Scan';
        return (
          <NavLink key={`${label}-${to}`} to={to} className="flex flex-col items-center gap-1 w-14">
            {({ isActive }) => (
              <>
                {isScan ? (
                  <div className="w-14 h-14 -mt-8 rounded-full bg-primary text-white flex items-center justify-center shadow-lg border-4 border-white">
                    <Icon size={24} />
                  </div>
                ) : (
                  <div className={isActive ? 'text-primary' : 'text-gray-400'}>
                    <Icon size={22} />
                  </div>
                )}
                <span className={`text-[11px] font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
