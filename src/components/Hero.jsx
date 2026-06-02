import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCpu, FiDownload } from 'react-icons/fi';
import { theme } from '../styles/theme';


const Highlight = styled.span`
  color: ${theme.colors.primary};
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${theme.colors.primary};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.backgroundDark} 100%);
  position: relative;
  overflow: hidden;
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Greeting = styled(motion.h1)`
  font-size: ${theme.fontSizes['4xl']};
  color: ${theme.colors.text};
  line-height: 1.2;
`;

const Name = styled(motion.span)`
  font-size: ${theme.fontSizes['4xl']};
  font-weight: 700;
  color: ${theme.colors.primary};
  display: block;
  margin: ${theme.spacing.sm} 0;
`;

const Title = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.md};

  svg {
    color: ${theme.colors.primary};
  }
`;

const Description = styled(motion.p)`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textSecondary};
  max-width: 600px;
  line-height: 1.6;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: ${theme.colors.primary};
  color: #ffffff;
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  border-radius: 8px;
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }
`;

const ViewProjectsButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  border-radius: 8px;
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.primary};
    color: #ffffff;
    transform: translateY(-2px);
  }
`;

const HeroVisual = styled(motion.div)`
  background: ${theme.colors.backgroundDark};
  border-radius: 16px;
  padding: ${theme.spacing.lg};
  font-family: 'Courier New', monospace;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textDark};
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const TerminalBar = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: ${theme.spacing.sm};
`;

const TerminalDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const CodeLine = styled.div`
  line-height: 1.8;
  color: ${({ color }) => color || theme.colors.textDark};
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.md}) {
    justify-content: center;
  }
`;

const SocialLink = styled(motion.a)`
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.xl};
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid ${theme.colors.border};

  &:hover {
    color: ${theme.colors.primary};
    background: rgba(${theme.colors.primaryRgb}, 0.1);
    border-color: ${theme.colors.primary};
    transform: translateY(-3px);
  }
`;

const Hero = () => {
  return (
    <HeroSection id="home">
      <HeroContainer>
        <HeroContent>
          <Greeting
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Building digital experiences with <Highlight>precision</Highlight>
          </Greeting>
          
          <Name
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Farouk Afolabi
          </Name>

          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FiCpu /> Full-Stack Developer
          </Title>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            2025 graduate of Fanshawe College specializing in React, Node.js, and responsive design.
            I turn complex problems into elegant, user-friendly solutions.
          </Description>

          <CTAButtons
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <ResumeButton href="/resume.pdf" download="Farouk_Afolabi_Resume.pdf">
              <FiDownload /> Download Resume
            </ResumeButton>
            <ViewProjectsButton href="#projects">
              View Projects
            </ViewProjectsButton>
          </CTAButtons>

          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SocialLink 
              href="https://github.com/farouk-afolabi" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
            >
              <FiGithub />
            </SocialLink>
            <SocialLink 
              href="https://www.linkedin.com/in/farouk-afolabi/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
            >
              <FiLinkedin />
            </SocialLink>
            <SocialLink
              href="mailto:afolabifarouk99@gmail.com"
              whileHover={{ scale: 1.1 }}
            >
              <FiMail />
            </SocialLink>
          </SocialLinks>
        </HeroContent>

        <HeroVisual
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <TerminalBar>
            <TerminalDot color="#ff5f57" />
            <TerminalDot color="#febc2e" />
            <TerminalDot color="#28c840" />
          </TerminalBar>
          <CodeLine color="#94a3b8">// farouk.js</CodeLine>
          <CodeLine><span style={{ color: '#60a5fa' }}>const</span> <span style={{ color: '#f8fafc' }}>developer</span> <span style={{ color: '#94a3b8' }}>=</span> {'{'}</CodeLine>
          <CodeLine>&nbsp;&nbsp;<span style={{ color: '#34d399' }}>name</span><span style={{ color: '#94a3b8' }}>:</span> <span style={{ color: '#fbbf24' }}>"Farouk Afolabi"</span><span style={{ color: '#94a3b8' }}>,</span></CodeLine>
          <CodeLine>&nbsp;&nbsp;<span style={{ color: '#34d399' }}>role</span><span style={{ color: '#94a3b8' }}>:</span> <span style={{ color: '#fbbf24' }}>"Full-Stack Developer"</span><span style={{ color: '#94a3b8' }}>,</span></CodeLine>
          <CodeLine>&nbsp;&nbsp;<span style={{ color: '#34d399' }}>stack</span><span style={{ color: '#94a3b8' }}>:</span> [</CodeLine>
          <CodeLine>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"React"</span><span style={{ color: '#94a3b8' }}>,</span> <span style={{ color: '#fbbf24' }}>"Node.js"</span><span style={{ color: '#94a3b8' }}>,</span></CodeLine>
          <CodeLine>&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"MongoDB"</span><span style={{ color: '#94a3b8' }}>,</span> <span style={{ color: '#fbbf24' }}>"Express"</span></CodeLine>
          <CodeLine>&nbsp;&nbsp;]<span style={{ color: '#94a3b8' }}>,</span></CodeLine>
          <CodeLine>&nbsp;&nbsp;<span style={{ color: '#34d399' }}>available</span><span style={{ color: '#94a3b8' }}>:</span> <span style={{ color: '#60a5fa' }}>true</span></CodeLine>
          <CodeLine>{'}'}<span style={{ color: '#94a3b8' }}>;</span></CodeLine>
          <CodeLine>&nbsp;</CodeLine>
          <CodeLine color="#94a3b8">// Open to opportunities</CodeLine>
          <CodeLine><span style={{ color: '#60a5fa' }}>export default</span> <span style={{ color: '#f8fafc' }}>developer</span><span style={{ color: '#94a3b8' }}>;</span></CodeLine>
        </HeroVisual>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;