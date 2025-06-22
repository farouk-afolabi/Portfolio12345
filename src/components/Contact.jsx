import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { theme } from '../styles/theme';
import { useState } from 'react';

const ContactSection = styled.section`
  background-color: ${theme.colors.background};
  padding: ${theme.spacing['2xl']} 0;
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

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  color: ${theme.colors.text};
  font-size: ${theme.fontSizes.lg};
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
`;

const Input = styled.input`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.textLight};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  transition: ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.textLight};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  min-height: 150px;
  resize: vertical;
  transition: ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textDark};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  font-weight: 500;
  cursor: pointer;
  transition: ${theme.transitions.default};

  &:hover {
    background-color: ${theme.colors.secondary};
  }
`;


const SuccessMessage = styled(motion.div)`
  background-color: ${theme.colors.successLight};
  color: ${theme.colors.success};
  padding: ${theme.spacing.md};
  border-radius: 4px;
  font-size: ${theme.fontSizes.base};
  text-align: center;
  margin-top: ${theme.spacing.md};
  border: 1px solid ${theme.colors.success};
`;

const ErrorMessage = styled(SuccessMessage)`
  background-color: ${theme.colors.errorLight};
  color: ${theme.colors.error};
  border-color: ${theme.colors.error};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false });
  
    try {
      const response = await fetch('https://portfolio12345-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          subject: e.target.subject.value,
          message: e.target.message.value
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }
  
      setStatus({
        submitting: false,
        success: true,
        message: data.message
      });
  
      // Reset form
      e.target.reset();
  
    } catch (error) {
      setStatus({
        submitting: false,
        error: true,
        message: error.message || 'An unexpected error occurred'
      });
    }
  };
  

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
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </ContactText>
          <ContactDetails
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactItem>
              <FiMail />
              <span>farouk.afolabi@yahoo.com</span>
            </ContactItem>
            <ContactItem>
              <FiPhone />
              <span>+1 647 862 7461</span>
            </ContactItem>
            <ContactItem>
              <FiMapPin />
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
            <Label htmlFor="name">Name</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="subject">Subject</Label>
            <Input 
              type="text" 
              id="subject" 
              name="subject" 
              value={formData.subject}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              required 
            />
          </FormGroup>
          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status.submitting}
          >
            {status.submitting ? (
              'Sending...'
            ) : (
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
            >
              {status.message}
            </SuccessMessage>
          )}
          
          {status.error && (
            <ErrorMessage
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
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