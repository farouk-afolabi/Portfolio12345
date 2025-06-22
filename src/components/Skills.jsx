import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const SkillsSection = styled.section`
  background-color: ${theme.colors.backgroundDark};
  padding: ${theme.spacing['2xl']} 0;
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.textDark};
  margin-bottom: ${theme.spacing.lg};
  position: relative;
  text-align: center;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -${theme.spacing.sm};
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.primary};
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background-color: ${theme.colors.background};
  border-radius: 8px;
  color: ${theme.colors.text};
  font-weight: 500;
`;

const Skills = () => {
  const skills = [
    'HTML5 & CSS3',
    'JavaScript (ES6+)',
    'React.js',
    'Node.js',
    'Git & GitHub',
    'Responsive Design',
  ];

  return (
    <SkillsSection id="skills">
      <SkillsContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
           Skills
        </SectionTitle>
        <SkillsGrid
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {skills.map((skill, index) => (
            <SkillItem
              key={skill}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              {skill}
            </SkillItem>
          ))}
        </SkillsGrid>
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;