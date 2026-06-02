import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { theme } from '../styles/theme';
import { useState, useEffect } from 'react';

// Styled Components
const ContactSection = styled.section`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing['2xl']} 0;
  scroll-margin-top: 80px;
`;

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.xl};

  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
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

const ContactText = styled(motion.p)`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.textLight};
  line-height: 1.8;
`;

const ContactDetails = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.lg};
  text-decoration: none;
  transition: transform 0.2s;
  padding: ${theme.spacing.sm} 0;
  border-bottom: 1px solid ${theme.colors.border};

  &:hover {
    color: ${theme.colors.primary};
    transform: translateX(5px);
  }

  svg {
    flex-shrink: 0;
  }
`;

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  color: ${theme.colors.text};
  font-weight: 500;
  font-size: ${theme.fontSizes.base};
`;

const Input = styled.input`
  padding: ${theme.spacing.sm};
  border: 1.5px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  background: #ffffff;
  transition: ${theme.transitions.default};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.sm};
  border: 1.5px solid ${theme.colors.border};
  border-radius: 6px;
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.text};
  background: #ffffff;
  min-height: 150px;
  resize: vertical;
  transition: ${theme.transitions.default};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  font-family: inherit;

  &::placeholder {
    color: #94a3b8;
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textDark};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  font-weight: 600;
  cursor: pointer;
  transition: ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.secondary};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled(motion.div)`
  padding: ${theme.spacing.md};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  text-align: center;
  margin-top: ${theme.spacing.md};
  border: 1px solid;
`;

const SuccessMessage = styled(StatusMessage)`
  background-color: ${theme.colors.successLight};
  color: ${theme.colors.success};
  border-color: ${theme.colors.success};
`;

const ErrorMessage = styled(StatusMessage)`
  background-color: ${theme.colors.errorLight};
  color: ${theme.colors.error};
  border-color: ${theme.colors.error};
`;

// Main Component
const Contact = () => {
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: '' });

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Enhanced validation
    const errors = [];
    if (!data.name) errors.push('name');
    if (!data.email) errors.push('email');
    if (!data.message) errors.push('message');
    
    if (errors.length > 0) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: `Please fill all required fields: ${errors.join(', ')}`
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please enter a valid email address'
      });
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('https://portfolio12345-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Server error (${response.status})`);
      }

      const result = await response.json();
      form.reset();
      setStatus({ submitting: false, success: true, error: false, message: result.message || 'Message sent successfully!' });

    } catch (error) {
      clearTimeout(timeout);
      console.error('Submission error:', error);
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: error.name === 'AbortError'
          ? 'Request timed out — please try again or email me directly at afolabifarouk99@gmail.com'
          : error.message || 'Something went wrong. Please email me directly at afolabifarouk99@gmail.com',
      });
    }
  };

  // Auto-dismiss success message
  useEffect(() => {
    if (status.success) {
      const timer = setTimeout(() => {
        setStatus(prev => ({ ...prev, success: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [status.success]);

  return (
    <ContactSection id="contact">
      <ContactContainer>
        <ContactInfo>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Get in Touch
          </SectionTitle>
          <ContactText
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I'm currently looking for new opportunities and would love to hear from you.
          </ContactText>
          <ContactDetails
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactItem href="mailto:afolabifarouk99@gmail.com">
              <FiMail size={20} />
              <span>afolabifarouk99@gmail.com</span>
            </ContactItem>
            <ContactItem href="tel:+16478627461">
              <FiPhone size={20} />
              <span>+1 647 862 7461</span>
            </ContactItem>
            <ContactItem 
              href="https://maps.google.com?q=London,ON,Canada" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <FiMapPin size={20} />
              <span>London, ON, Canada</span>
            </ContactItem>
          </ContactDetails>
        </ContactInfo>
        <ContactForm
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email *</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message *</Label>
            <TextArea 
              id="message" 
              name="message" 
              required 
            />
          </FormGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status.submitting}
          >
            {status.submitting ? 'Sending...' : (
              <>
                <FiSend /> Send Message
              </>
            )}
          </SubmitButton>
          
          {status.success && (
            <SuccessMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              aria-live="polite"
            >
              {status.message}
            </SuccessMessage>
          )}
          
          {status.error && (
            <ErrorMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              aria-live="assertive"
            >
              {status.message}
            </ErrorMessage>
          )}
        </ContactForm>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;