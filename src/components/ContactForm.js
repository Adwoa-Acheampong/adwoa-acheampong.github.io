import React, { useState, useCallback, memo } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { validateContactForm } from '../utils/validation';
import { debounce } from '../utils/helpers';

const ContactForm = memo(() => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Debounced validation
  const validateField = useCallback(
    debounce((field, value) => {
      const tempData = { ...formData, [field]: value };
      const validation = validateContactForm(tempData);
      setErrors(prev => ({
        ...prev,
        [field]: validation.errors[field] || null
      }));
    }, 500),
    [formData]
  );

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear submit status on new input
    if (submitStatus) setSubmitStatus(null);
    
    // Validate field after user stops typing
    validateField(name, value);
  }, [validateField, submitStatus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const validation = validateContactForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Focus on first error field
      const firstErrorField = Object.keys(validation.errors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-5" aria-labelledby="contact-heading">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center mb-5">
            <h2 id="contact-heading" className="fw-bold display-6">Get In Touch</h2>
            <p className="text-secondary">
              Have a project in mind? Let's discuss how data can solve your problems.
            </p>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="bg-white p-4 p-lg-5 rounded-4 shadow-sm border">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label small fw-bold text-secondary">
                    Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`form-control bg-light border-0 p-3 ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <div id="name-error" className="invalid-feedback d-flex align-items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label small fw-bold text-secondary">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control bg-light border-0 p-3 ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <div id="email-error" className="invalid-feedback d-flex align-items-center gap-1">
                      <AlertCircle size={14} /> {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="message" className="form-label small fw-bold text-secondary">
                    Message <span className="text-danger">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-control bg-light border-0 p-3 ${errors.message ? 'is-invalid' : ''}`}
                    rows="4"
                    placeholder="Tell me about your operational challenges..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <div id="message-error" className="invalid-feedback d-flex align-items-center gap-1">
                      <AlertCircle size={14} /> {errors.message}
                    </div>
                  )}
                </div>

                {submitStatus === 'success' && (
                  <div className="alert alert-success d-flex align-items-center" role="alert">
                    <CheckCircle size={20} className="me-2" />
                    <span>Thank you! Your message has been sent successfully.</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <AlertCircle size={20} className="me-2" />
                    <span>Sorry, there was an error sending your message. Please try again.</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-dark w-100 py-3 rounded-pill fw-bold d-flex align-items-center justify-content-center gap-2"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

ContactForm.displayName = 'ContactForm';

export default ContactForm;