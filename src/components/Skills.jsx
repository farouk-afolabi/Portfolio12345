import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { theme } from '../styles/theme';

const SkillsSection = styled.section`
  background-color: ${theme.colors.backgroundDark};
  padding: ${theme.spacing['2xl']} 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23${theme.colors.primary.replace('#', '')}' opacity='0.05'/%3E%3C/svg%3E");
    z-index: 0;
  }
`;

const SkillsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  position: relative;
  z-index: 1;
`;

const SectionTitle = styled(motion.h2)`
  font-size:  ${theme.fontSizes['3xl']};
  color: ${theme.colors.textLight};  
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  text-align: center;
  font-weight: 700;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -${theme.spacing.sm};
    width: 80px;
    height: 4px;
    background-color: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
`;

const SkillItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md};
  background-color: rgb(255, 255, 255);  // Lighter background
  border-radius: 8px;
  color: ${theme.colors.textLight};  // Changed to light text
  font-weight: 500;
  border: 1px solid rgba(255, 255, 255, 0.1);  // Subtle border
  transition: all 0.3s ease;
  will-change: transform;

  &:hover {
    background-color: rgba(${theme.colors.primaryRgb}, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: black;  
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
  }
`;

const CategoryTitle = styled(motion.h3)`
  color: ${theme.colors.primary};
  margin: ${theme.spacing.lg} 0 ${theme.spacing.md};
  font-size: ${theme.fontSizes.xl};
  font-weight: 600;
`;

const Skills = () => {
  const skills = {
    'Frontend': ['React.js', 'Angular', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3'],
    'Backend': ['Node.js', 'Express', 'REST APIs', 'SQL', 'Firebase'],
    'DevOps': ['Docker', 'CI/CD Pipelines', 'Full-Stack Deployment'],
    'Tools': ['Git & GitHub', 'WordPress', 'VS Code', 'Postman']
  };

  return (
    <SkillsSection id="skills">
      <SkillsContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </SectionTitle>
        
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <CategoryTitle
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              {category}
            </CategoryTitle>
            <SkillsGrid
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
            >
              {items.map((skill, index) => (
                <SkillItem
                  key={skill}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {skill}
                </SkillItem>
              ))}
            </SkillsGrid>
          </div>
        ))}
      </SkillsContainer>
    </SkillsSection>
  );
};

export default Skills;