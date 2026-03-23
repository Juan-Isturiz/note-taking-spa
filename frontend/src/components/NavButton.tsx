import { NavLink, NavLinkProps } from 'react-router-dom';

export const NavButton = ({ to, children }: NavLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-neutral-500 text-gold'
            : 'bg-neutral-800 text-gold hover:bg-neutral-500'
        }`
      }
    >
      {children}
    </NavLink>
  );
};
