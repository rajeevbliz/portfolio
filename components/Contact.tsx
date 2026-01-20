
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

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
    <footer id="contact" className="py-32 px-6 md:px-12 bg-white dark:bg-[#050505] border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0" style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400">Ready to start?</span>
          </div>

          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-matteBlack dark:text-white leading-[0.9] mb-8">
            LET'S BUILD <br />
            <span className="text-neutral-400 dark:text-neutral-600">TOGETHER.</span>
          </h2>

          <p className="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-lg mx-auto leading-relaxed">
            Have a project in mind or want to discuss AI, design, or the future of tech? My door is always open for innovators.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-xl mx-auto mb-20"
        >
          <div className="bg-neutral-50 dark:bg-neutral-900/40 backdrop-blur-xl border border-black/5 dark:border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-left">
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center text-center py-10"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white mb-6 shadow-xl shadow-green-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter text-matteBlack dark:text-white mb-4">MESSAGE RECEIVED</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xs leading-relaxed">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button 
                    onClick={() => setFormState('idle')}
                    className="px-8 py-4 rounded-2xl bg-matteBlack dark:bg-white text-white dark:text-matteBlack font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-opacity"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-4">Your Email Address</label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      placeholder="hello@world.com"
                      className={`w-full px-6 py-5 rounded-2xl bg-white dark:bg-black/50 border ${emailError ? 'border-red-500' : 'border-black/5 dark:border-white/10'} text-matteBlack dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-gray-400`}
                      required
                      disabled={formState === 'submitting'}
                      onChange={() => setEmailError('')}
                    />
                    {emailError && (
                      <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest mt-2 ml-4">
                        <AlertCircle className="w-3 h-3" />
                        {emailError}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-4">How can I help you?</label>
                    <textarea 
                      name="message" 
                      id="message" 
                      rows={5}
                      placeholder="Tell me about your vision..."
                      className="w-full px-6 py-5 rounded-2xl bg-white dark:bg-black/50 border border-black/5 dark:border-white/10 text-matteBlack dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-gray-400 resize-none"
                      required
                      disabled={formState === 'submitting'}
                    ></textarea>
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={formState === 'submitting'}
                    className="w-full py-5 rounded-2xl bg-matteBlack dark:bg-white text-white dark:text-matteBlack font-bold uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70"
                  >
                    {formState === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Info Cards (Moved Below Form) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12 border-t border-black/5 dark:border-white/5"
        >
          <motion.a 
            href="mailto:rrajeev11639@gmail.com"
            whileHover={{ y: -5 }}
            className="group p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 mx-auto group-hover:scale-110 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email</h4>
            <p className="text-sm font-bold text-matteBlack dark:text-white break-all">rrajeev11639@gmail.com</p>
          </motion.a>

          <motion.div 
            whileHover={{ y: -5 }}
            className="group p-6 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:border-blue-500/30 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4 mx-auto group-hover:scale-110 transition-transform">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Location</h4>
            <p className="text-sm font-bold text-matteBlack dark:text-white">Remote / Worldwide</p>
          </motion.div>
        </motion.div>

        {/* Minimalist Footer */}
        <div className="mt-32 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col items-center gap-6">
          <p className="text-xs text-gray-500 font-medium">
            © {new Date().getFullYear()} Rajeev Ranjan. Designed for the digital edge.
          </p>
          
          <div className="flex items-center gap-2">
            <div className="h-1 w-8 bg-black dark:bg-white opacity-10 rounded-full" />
            <div className="h-1 w-4 bg-black dark:bg-white opacity-10 rounded-full" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
