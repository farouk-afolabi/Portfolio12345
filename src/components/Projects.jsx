import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { theme } from '../styles/theme';

const ProjectsSection = styled.section`
  background-color: ${theme.colors.backgroundDark};
  padding: ${theme.spacing['2xl']} 0;
  color: ${theme.colors.textDark};
`;

const ProjectsContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.textDark};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -${theme.spacing.sm};
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${theme.colors.primary};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${theme.spacing.xl};
`;

const ProjectCard = styled(motion.div)`
  background-color: ${theme.colors.background};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: ${theme.transitions.default};
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${theme.colors.backgroundDark};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSizes.xl};
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    padding: 8px;
    object-position: top;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05); 
  }
`;

const ProjectContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const ProjectTitle = styled.h3`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
`;

const ProjectDescription = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textLight};
  margin-bottom: ${theme.spacing.md};
`;

const ProjectTech = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const TechTag = styled.span`
  font-size: ${theme.fontSizes.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  background-color: ${theme.colors.backgroundDark};
  color: ${theme.colors.textDark};
  border-radius: 4px;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
`;

const ProjectLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.sm};
  transition: ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.secondary};
  }
`;

const Projects = () => {
  const projects = [

    {
      title: "Farouk's Sports Store",
      description: 'Sports Store is a full-stack e-commerce application built with Angular 9 and Node.js. It features a responsive UI, JWT authentication, a mock API powered by JSON Server and Express, and full cart and product management functionality.',
      technologies: ['Angular 9', 'Bootstrap', 'Node.js', 'Express', 'JSON Server', 'JWT', 'Docker', 'Github Pages', 'Github Actions'],
      github: 'https://github.com/farouk-afolabi/sports-store',
      live: 'https://farouk-afolabi.github.io/sports-store/', 
      image: '/images/Farouks Sport store.png' 
    },    
    {
      title: 'TrainLinkIT',
      description: 'TrainLinkIT is a full-stack web application designed to connect users with tech training programs, job boards, and real-time messaging. Built with React and Firebase, it includes authentication, dynamic routing, and private user areas.',
      technologies: ['React', 'Firebase', 'React Router', 'GitHub Actions', 'GitHub Pages'],
      github: 'https://github.com/farouk-afolabi/TrainLinkIT',
      live: 'https://farouk-afolabi.github.io/TrainLinkIT',
      image: '/images/TrainLinkIT.PNG' 
    },
    {
      title: 'Todo App with React & Firebase',
      description: 'A modern, responsive Todo application that lets users create, complete, and delete tasks in real time. It leverages React for a dynamic UI, Firebase for backend services (Firestore & Authentication), and is styled using Sass for modular and maintainable CSS.',
      technologies: ['React', 'Firebase','Sass (SCSS)'],
      github: 'https://github.com/farouk-afolabi/TodoApp',
      live: 'https://farouk-afolabi.github.io/TodoApp/',
      image: '/images/TodoApp.png'
    },
    {
      title: 'Sociable',
      description: ' Sociable is a full-stack social media web application which was designed to provide users with a seamless and modern social media experience. The app allows registered users to create posts, comment, like, follow others, and engage in real-time private messaging.',
      technologies: ['React', 'Firebase (Auth + Firestore)','React Router', 'Material UI','GitHub Actions', 'GitHub Pages'],
      github: 'https://github.com/farouk-afolabi/Sociable',
      live: 'https://farouk-afolabi.github.io/Sociable/',
      image: '/images/Sociable.PNG'
    },
    
  ];

  return (
    <ProjectsSection id="projects">
      <ProjectsContainer>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </SectionTitle>
        <ProjectsGrid
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <ProjectImage> <img src={project.image} alt={project.title} /></ProjectImage>
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <ProjectTech>
                  {project.technologies.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </ProjectTech>
                <ProjectLinks>
                  <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                    <FiGithub /> GitHub
                  </ProjectLink>
                  <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer">
                    <FiExternalLink /> Live Demo
                  </ProjectLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContainer>
    </ProjectsSection>
  );
};

export default Projects; 