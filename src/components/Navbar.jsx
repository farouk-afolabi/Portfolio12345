import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { theme } from '../styles/theme';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.background};
  padding: ${theme.spacing.sm} 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Logo = styled.a`
  font-size: ${theme.fontSizes.xl};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: ${theme.colors.text};
  font-weight: 500;
  transition: ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};

  @media (max-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 250px;
  background: ${theme.colors.background};
  padding: ${theme.spacing.xl};
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);

  @media (max-width: ${theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <Nav>
      <NavContainer>
        <Logo href="#home">Portfolio</Logo>
        <NavLinks>
          {menuItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </MobileMenuButton>
      </NavContainer>
      <MobileMenu
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween' }}
      >
        {menuItems.map((item) => (
          <NavLink key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </NavLink>
        ))}
      </MobileMenu>
    </Nav>
  );
};

export default Navbar; 