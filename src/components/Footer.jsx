import styled from '@emotion/styled';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { theme } from '../styles/theme';

const FooterWrapper = styled.footer`
  background: ${theme.colors.backgroundDark};
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  padding: ${theme.spacing.lg} 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const NavLinks = styled.nav`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

const FooterLink = styled.a`
  color: rgba(248, 250, 252, 0.5);
  font-size: ${theme.fontSizes.sm};
  transition: ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
`;

const SocialIcon = styled.a`
  color: rgba(248, 250, 252, 0.4);
  font-size: ${theme.fontSizes.lg};
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Copyright = styled.p`
  font-size: ${theme.fontSizes.xs};
  color: rgba(248, 250, 252, 0.3);
  text-align: center;
`;

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const Footer = () => (
  <FooterWrapper>
    <FooterContainer>
      <NavLinks>
        {navItems.map(({ href, label }) => (
          <FooterLink key={href} href={href}>{label}</FooterLink>
        ))}
      </NavLinks>
      <SocialRow>
        <SocialIcon href="https://github.com/farouk-afolabi" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FiGithub />
        </SocialIcon>
        <SocialIcon href="https://www.linkedin.com/in/farouk-afolabi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FiLinkedin />
        </SocialIcon>
        <SocialIcon href="mailto:afolabifarouk99@gmail.com" aria-label="Email">
          <FiMail />
        </SocialIcon>
      </SocialRow>
      <Copyright>© {new Date().getFullYear()} Farouk Afolabi · All rights reserved</Copyright>
    </FooterContainer>
  </FooterWrapper>
);

export default Footer;
