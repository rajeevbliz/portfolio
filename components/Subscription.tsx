
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

const Subscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('subject', 'Newsletter Subscription');

      const response = await fetch("https://formspree.io/f/mkgdzyeo", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('idle');
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('idle');
      setError('Network error. Check your connection.');
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-white dark:bg-[#050505] border-t border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-8">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-600 dark:text-gray-400">Newsletter</span>
          </div>

          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-matteBlack dark:text-white leading-[0.9] mb-8">
            JOIN THE <br />
            <span className="text-neutral-400 dark:text-neutral-600">EVOLUTION.</span>
          </h2>

          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Get early access to my latest experiments, open-source releases, and deep dives into the world of AI and engineering. No spam, just value.
          </p>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-4 p-8 rounded-3xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-matteBlack dark:text-white">You're on the list!</h3>
                <p className="text-gray-600 dark:text-gray-400">Welcome to the inner circle. Stay tuned for updates.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-sm font-bold uppercase tracking-widest text-blue-500 hover:underline"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="relative max-w-md mx-auto"
              >
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Enter your email address"
                    className={`w-full px-8 py-5 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border ${error ? 'border-red-500' : 'border-black/5 dark:border-white/10'} text-matteBlack dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-gray-400`}
                    disabled={status === 'loading'}
                    required
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="absolute right-2 top-2 bottom-2 px-6 rounded-xl bg-matteBlack dark:bg-white text-white dark:text-matteBlack font-bold flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 disabled:opacity-50"
                  >
                    {status === 'loading' ? (
                       <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {error && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-bold uppercase tracking-widest mt-4 flex items-center justify-center gap-2"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {error}
                  </motion.p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Subscription;
