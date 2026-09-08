import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/** Reveals children once they scroll into view. */
export const Reveal: React.FC<{ delay?: number; className?: string; children: React.ReactNode }> = ({
    delay = 0,
    className,
    children,
}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
