import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import { theme } from '../styles/theme';

const ExperienceSection = styled.section`
  background: ${theme.colors.background};
  padding: ${theme.spacing['2xl']} 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const SectionTitle = styled(motion.h2)`
  font-size: ${theme.fontSizes['3xl']};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  position: relative;

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
`;

const Timeline = styled.div`
  position: relative;
  max-width: 860px;
  margin: 0 auto;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, ${theme.colors.primary}, rgba(37,99,235,0.1));

    @media (min-width: ${theme.breakpoints.md}) {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  padding-left: 52px;
  position: relative;

  @media (min-width: ${theme.breakpoints.md}) {
    padding-left: 0;
    width: 47%;
    margin-left: ${({ right }) => right ? '53%' : '0'};
  }
`;

const Dot = styled.div`
  position: absolute;
  left: 12px;
  top: 20px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: ${({ tech }) => tech ? theme.colors.primary : theme.colors.backgroundDark};
  border: 3px solid ${theme.colors.primary};
  z-index: 1;

  @media (min-width: ${theme.breakpoints.md}) {
    left: ${({ right }) => right ? '-9px' : 'auto'};
    right: ${({ right }) => right ? 'auto' : '-9px'};
  }
`;

const Card = styled.div`
  background: ${theme.colors.backgroundLight};
  border-radius: 12px;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  width: 100%;
  transition: ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: 0 4px 20px rgba(37, 99, 235, 0.08);
    transform: translateY(-2px);
  }
`;

const RoleHeader = styled.div`
  margin-bottom: ${theme.spacing.xs};
`;

const RoleName = styled.h3`
  font-size: ${theme.fontSizes.lg};
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 4px;
`;

const CompanyRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 12px;
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  margin-bottom: 6px;
`;

const CompanyName = styled.span`
  font-weight: 600;
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Meta = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TechBadge = styled.span`
  display: inline-block;
  background: rgba(37, 99, 235, 0.1);
  color: ${theme.colors.primary};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  padding: 2px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const BulletList = styled.ul`
  padding-left: 16px;
  list-style-type: disc;
  margin-top: 4px;
`;

const Bullet = styled.li`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textLight};
  line-height: 1.6;
  margin-bottom: 4px;
`;

const roles = [
  {
    title: 'Security Guard / Life Safety Officer',
    company: 'Cadillac Fairview',
    location: 'London, ON',
    dates: 'Aug 2024 – Present',
    tech: false,
    bullets: [
      'Monitor and operate building systems, maintaining service continuity across a large commercial property.',
      'Respond to incidents under time pressure using structured troubleshooting to resolve safety-critical situations.',
      'Maintain detailed incident logs and reports, ensuring accurate documentation for compliance and follow-up.',
    ],
  },
  {
    title: 'Technology Tutor (Volunteer)',
    company: 'London Public Library',
    location: 'London, ON',
    dates: 'May 2024 – Jul 2025',
    tech: true,
    bullets: [
      'Delivered 91+ hours of one-on-one and group technology support to patrons with varying technical skill levels.',
      'Assisted users with device setup, internet navigation, email, and common software applications.',
      'Translated complex technical concepts into accessible language for non-technical audiences.',
    ],
  },
  {
    title: 'IT Support Technician',
    company: 'BİL Okulları',
    location: 'Istanbul, Turkey',
    dates: 'Sept 2022 – Aug 2023',
    tech: true,
    bullets: [
      'Provided helpdesk support for 200+ staff and students: hardware/software troubleshooting, OS reinstallation, and network connectivity.',
      'Managed user accounts and system access across Windows domain environments.',
      'Maintained IT asset inventory and coordinated with vendors for repairs and procurement.',
      'Delivered first-line technical support to staff and students for device, login, and connectivity issues — resolving the majority of tickets without escalation'
    ],
  },
  {
    title: 'IT Support Technician',
    company: 'Inci Yildiz Anaokullari',
    location: 'Istanbul, Turkey',
    dates: 'Sept 2021 -  Sept2022',
    tech: true,
    bullets: [
      'Configured and maintained workstations, printers, and network devices across multiple campus locations.',
      'Set up, configured, and maintained AV and computing equipment across 12+ classrooms, performing routine hardware checks and resolving issues proactively',
      'Supported staff with daily use of digital platforms and productivity tools, providing hands-on guidance that improved adoption of technology-assisted instruction', 
      'Troubleshot connectivity, display, and software issues in real time during lessons, minimizing classroom downtime', 
    ],
  },
];

const Experience = () => (
  <ExperienceSection id="experience">
    <Container>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Experience
      </SectionTitle>

      <Timeline>
        {roles.map((role, i) => (
          <TimelineItem
            key={`${role.company}-${i}`}
            right={i % 2 !== 0}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
          >
            <Dot tech={role.tech} right={i % 2 !== 0} />
            <Card>
              <RoleHeader>
                <RoleName>{role.title}</RoleName>
                <CompanyRow>
                  <CompanyName><FiBriefcase size={13} />{role.company}</CompanyName>
                  <Meta><FiMapPin size={12} />{role.location}</Meta>
                  <Meta><FiCalendar size={12} />{role.dates}</Meta>
                </CompanyRow>
                {role.tech && <TechBadge>Tech-Related</TechBadge>}
              </RoleHeader>
              <BulletList>
                {role.bullets.map((b, j) => (
                  <Bullet key={j}>{b}</Bullet>
                ))}
              </BulletList>
            </Card>
          </TimelineItem>
        ))}
      </Timeline>
    </Container>
  </ExperienceSection>
);

export default Experience;
