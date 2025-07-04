import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiCpu } from 'react-icons/fi';
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
            <FiCpu /> Fullstack Developer
          </Title>

          <Description
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Recent graduate specializing in React, Node.js, and responsive design. 
            I turn complex problems into elegant, user-friendly solutions.
          </Description>

          <SocialLinks
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
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
              href="mailto:farouk.afolabi@yahoo.com"
              whileHover={{ scale: 1.1 }}
            >
              <FiMail />
            </SocialLink>
          </SocialLinks>
        </HeroContent>
      </HeroContainer>
    </HeroSection>
  );
};

export default Hero;