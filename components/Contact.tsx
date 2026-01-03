
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get('email') as string).trim();

    if (!email || !validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setFormState('submitting');

    try {
      const response = await fetch("https://formspree.io/f/mkgdzyeo", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('idle');
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      setFormState('idle');
      alert("There was a problem sending your message. Please try again.");
    }
  };

  return (
    <footer id="contact" className="py-24 px-6 md:px-12 border-t border-black/10 dark:border-white/10 bg-transparent text-matteBlack dark:text-white transition-colors duration-500 overflow-hidden text-center relative z-20">
      <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/5 dark:bg-black/5 p-8 rounded-3xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8"
        >
          Get in Touch
        </motion.h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-12">
          Have a project in mind or want to discuss AI, design, or the future of tech? I'm always open to new opportunities.
        </p>
        
        <div className="form-container mx-auto mb-16 w-full max-w-lg relative">
          {formState === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50/50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-8 text-center flex flex-col items-center justify-center"
            >
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">Message Sent!</h3>
              <p className="text-green-700 dark:text-green-300">Thank you for reaching out. I'll get back to you shortly.</p>
              <button 
                onClick={() => setFormState('idle')}
                className="mt-6 text-sm font-bold uppercase tracking-widest text-green-800 dark:text-green-400 hover:underline"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form className="form text-left" onSubmit={handleSubmit} action="https://formspree.io/f/mkgdzyeo" method="POST" noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <motion.input 
                  whileHover={{ scale: 1.015, borderColor: 'rgba(0,0,0,0.3)' }}
                  transition={{ duration: 0.2 }}
                  className="dark:hover:border-white/30"
                  required 
                  name="email" 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com"
                  onChange={() => setEmailError('')}
                  style={{ borderColor: emailError ? '#ef4444' : undefined }}
                />
                {emailError && (
                  <span className="text-red-500 text-xs mt-1 font-medium">{emailError}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="message">How Can I Help You?</label>
                <motion.textarea 
                  whileHover={{ scale: 1.015, borderColor: 'rgba(0,0,0,0.3)' }}
                  transition={{ duration: 0.2 }}
                  className="dark:hover:border-white/30"
                  required 
                  cols={50} 
                  rows={6} 
                  id="message" 
                  name="message" 
                  placeholder="Tell me about your project..."
                ></motion.textarea>
              </div>
              <motion.button 
                whileHover={{ scale: 1.02, opacity: 0.95 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={formState === 'submitting'}
                className="form-submit-btn w-full"
              >
                {formState === 'submitting' ? 'Sending...' : 'Submit'}
              </motion.button>
            </form>
          )}
        </div>

        {/* Info Section */}
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 pt-12 border-t border-black/10 dark:border-white/10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email</h4>
            <a href="mailto:rrajeev11639@gmail.com" className="text-lg font-medium text-matteBlack dark:text-white hover:opacity-60 transition-opacity flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              rrajeev11639@gmail.com
            </a>
          </div>
          
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Location</h4>
            <p className="text-lg font-medium text-matteBlack dark:text-white flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" />
              Remote / Worldwide
            </p>
          </div>
        </div>

        <div className="mt-24 flex flex-col md:flex-row justify-between items-center border-t border-black/5 dark:border-white/5 pt-8 gap-4">
           <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Rajeev Ranjan. Designed for the digital edge.
           </p>
           <div className="flex gap-4">
              <div className="h-1 w-8 bg-black dark:bg-white opacity-10" />
              <div className="h-1 w-4 bg-black dark:bg-white opacity-10" />
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
