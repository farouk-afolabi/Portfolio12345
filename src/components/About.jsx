import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const AboutSection = styled.section`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing['2xl']} 0;
`;

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};
  align-items: center;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -${theme.spacing.sm};
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.primary};
  }
`;

const AboutText = styled(motion.p)`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textLight};
  line-height: 1.8;
  margin-bottom: ${theme.spacing.md};
`;

const About = () => {
  return (
    <AboutSection id="about">
      <AboutContainer>
        <AboutContent>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            About Me
          </SectionTitle>
          <AboutText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I am a passionate web developer with a strong foundation in modern web technologies.
            My journey in web development began with my diploma program, where I learned the
            fundamentals of web development and fell in love with creating interactive and
            user-friendly applications.
          </AboutText>
          <AboutText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I specialize in building responsive and performant web applications using React
            and other modern technologies. I'm constantly learning and exploring new tools
            and frameworks to stay at the forefront of web development.
          </AboutText>
        </AboutContent>
      </AboutContainer>
    </AboutSection>
  );
};

export default About;