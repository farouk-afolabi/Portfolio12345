import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiAward, FiBook, FiUsers, FiGlobe } from 'react-icons/fi';
import { theme } from '../styles/theme';


const AboutSection = styled.section`
  padding: 120px 0;
  background: ${theme.colors.backgroundLight};
  
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 80px 0;
    background: ${theme.colors.backgroundLight};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['3xl']};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  position: relative;
  color: ${theme.colors.text};

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: ${theme.colors.primary};
  }

  @media (max-width: ${theme.breakpoints.md}) {
    color: ${theme.colors.textLight};
    font-size: ${theme.fontSizes['2xl']};
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.md};
  align-items: space-between;

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const AboutText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  
  p {
    color: ${theme.colors.text}; 
    line-height: 1.6;
    
    @media (max-width: ${theme.breakpoints.md}) {
      color: ${theme.colors.textLight};
    }
  }
`;

const HighlightText = styled.span`
  color: ${theme.colors.primary};
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const AchievementGrid = styled.div`
  display: grid;
  gap: ${theme.spacing.lg};
`;

const AchievementItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.1);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const AchievementIcon = styled.div`
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(74, 144, 226, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xl};
`;

const AchievementContent = styled.div``;

const AchievementTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text}; 
  
  @media (max-width: ${theme.breakpoints.md}) {
    color: ${theme.colors.text};
  }
`;

const AchievementDescription = styled.p`
  color: ${theme.colors.text}; // Add this to your theme
  line-height: 1.6;

  @media (max-width: ${theme.breakpoints.md}) {
    color: ${theme.colors.text};
  }
`;

const About = () => {
  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Journey
        </SectionTitle>
        
        <ContentWrapper>
          <AboutText>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              As a <HighlightText>Dean's Honor Roll recipient (2024)</HighlightText> from Fanshawe College's Web Development program, I combine my <HighlightText>engineering background</HighlightText> (B.Sc Civil Engineering, M.Sc Engineering Management) with cutting-edge web technologies to build innovative solutions.
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              My passion for technology extends beyond coding - I spent a year as a <HighlightText>Technology Tutor at London Public Library</HighlightText>, helping community members bridge the digital divide. This experience reinforced my belief that great technology should be <HighlightText>accessible to everyone</HighlightText>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Fluent in English with a <HighlightText>CELPIP Band 9</HighlightText> certification, I excel at communicating technical concepts to diverse audiences - a skill honed through both my academic journey and community work.
            </motion.p>
          </AboutText>
          
          <AchievementGrid>
            <AchievementItem
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <AchievementIcon>
                <FiAward />
              </AchievementIcon>
              <AchievementContent>
                <AchievementTitle>Academic Excellence</AchievementTitle>
                <AchievementDescription>
                  Achieved Dean's Honor Roll in both semesters of 2024 at Fanshawe College and graduated with a 3.85 CGPA in Web Development and Internet Applications.
                </AchievementDescription>
              </AchievementContent>
            </AchievementItem>

            <AchievementItem
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AchievementIcon>
                <FiBook />
              </AchievementIcon>
              <AchievementContent>
                <AchievementTitle>Engineering Foundation</AchievementTitle>
                <AchievementDescription>
                  Hold a Bachelor's in Civil Engineering and WES-certified Master's in Engineering Management, bringing analytical problem-solving to web development.
                </AchievementDescription>
              </AchievementContent>
            </AchievementItem>

            <AchievementItem
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AchievementIcon>
                <FiUsers />
              </AchievementIcon>
              <AchievementContent>
                <AchievementTitle>Community Impact</AchievementTitle>
                <AchievementDescription>
                  Volunteered for one year as a Technology Tutor at London Public Library, teaching digital literacy to community members of all ages.
                </AchievementDescription>
              </AchievementContent>
            </AchievementItem>

            <AchievementItem
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <AchievementIcon>
                <FiGlobe />
              </AchievementIcon>
              <AchievementContent>
                <AchievementTitle>Language Proficiency</AchievementTitle>
                <AchievementDescription>
                  Certified CELPIP Band 9 (Canadian English Language Proficiency Index Program) holder, demonstrating advanced English communication skills.
                </AchievementDescription>
              </AchievementContent>
            </AchievementItem>
          </AchievementGrid>
        </ContentWrapper>
      </Container>
    </AboutSection>
  );
};

export default About;