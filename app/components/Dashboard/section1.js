import Section from '../section';
import servicesData from './services.json';
import { useState, useEffect } from 'react';
import React from 'react';
import {
    BookOpen,
    Target,
    Users,
    MessageSquare,
    HeartHandshake,
    ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom hook for responsive design
const useViewport = () => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
    
    useEffect(() => {
        const handleWindowResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    
    // Return device type based on width
    return {
        width,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
    };
};

export default function Section1() {
    const viewport = useViewport();
    const icons = {
        mentor: Users,
        councelling: MessageSquare,
        support: HeartHandshake,
    };
    const [services] = useState(servicesData.services);
    const [modalContent, setModalContent] = useState(null);

    // Responsive styles based on viewport
    const styles = {
        header: {
            h1: {
                fontSize: viewport.isMobile ? '2.5rem' : viewport.isTablet ? '3.5rem' : '4.5rem',
                marginBottom: viewport.isMobile ? '1.5rem' : '3rem',
            },
            paragraph: {
                fontSize: viewport.isMobile ? '1rem' : '1.25rem',
                maxWidth: viewport.isMobile ? '100%' : '32rem',
                marginBottom: viewport.isMobile ? '2rem' : '3rem',
            }
        },
        section: {
            padding: viewport.isMobile ? '4rem 1rem' : '8rem 1rem',
        },
        sectionHeading: {
            fontSize: viewport.isMobile ? '2rem' : viewport.isTablet ? '2.5rem' : '3rem',
            marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
        },
        grid: {
            visionMission: {
                gridTemplateColumns: viewport.isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: viewport.isMobile ? '1.5rem' : '3rem',
            },
            services: {
                gridTemplateColumns: viewport.isMobile ? '1fr' : 
                                      viewport.isTablet ? 'repeat(2, 1fr)' : 
                                      'repeat(3, 1fr)',
                gap: viewport.isMobile ? '1.5rem' : '2rem',
            },
            footer: {
                gridTemplateColumns: viewport.isMobile ? '1fr' : 
                                     viewport.isTablet ? 'repeat(2, 1fr)' : 
                                     'repeat(4, 1fr)',
                gap: viewport.isMobile ? '2rem' : '3rem',
            }
        },
        modal: {
            width: viewport.isMobile ? '95%' : '90%',
            padding: viewport.isMobile ? '1.5rem' : '3rem',
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
            <header
                style={{
                    position: 'relative',
                    minHeight: viewport.isMobile ? '80vh' : '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom, rgb(249, 250, 251), white)',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        zIndex: 10,
                        textAlign: 'center',
                        padding: '0 1rem',
                        maxWidth: '64rem',
                        margin: '0 auto',
                    }}
                >
                    <h1
                        style={{
                            fontSize: styles.header.h1.fontSize,
                            fontWeight: 700,
                            color: '#111111',
                            marginBottom: styles.header.h1.marginBottom,
                            marginTop: '1rem',
                            lineHeight: 1.1,
                        }}
                    >
                        Academic{' '}
                        <span style={{ position: 'relative' }}>
                            Counselling
                        </span>{' '}
                        Cell
                    </h1>
                    <div
                        style={{
                            display: 'inline-block',
                            marginBottom: viewport.isMobile ? '2rem' : '3rem',
                            padding: '0.5rem 1.5rem',
                            backgroundColor: 'rgba(17,24,39,0.05)',
                            borderRadius: '9999px',
                        }}
                    >
                        <p
                            style={{
                                fontSize: viewport.isMobile ? '0.75rem' : '0.875rem',
                                fontWeight: 500,
                                color: '#111111',
                                margin: '2px',
                            }}
                        >
                            BITS Pilani, Hyderabad Campus
                        </p>
                    </div>
                    <p
                        style={{
                            fontSize: styles.header.paragraph.fontSize,
                            color: '#4B5563',
                            maxWidth: styles.header.paragraph.maxWidth,
                            margin: `0 auto ${styles.header.paragraph.marginBottom}`,
                            lineHeight: 1.7,
                        }}
                    >
                        Your dedicated partner in academic success, providing
                        personalized guidance and support throughout your
                        educational journey.
                    </p>
                </div>
            </header>
            
            {/* Overview Section */}
            <section
                style={{
                    padding: viewport.isMobile ? '2rem 1rem' : '3rem 1rem',
                    backgroundColor: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at top right, #f3f4f6 0%, transparent 60%)',
                    }}
                ></div>
                <div
                    style={{
                        maxWidth: '72rem',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: styles.sectionHeading.fontSize,
                                fontWeight: 700,
                                color: '#111111',
                                marginBottom: styles.sectionHeading.marginBottom,
                            }}
                        >
                            Overview
                        </h2>
                        <div
                            style={{
                                width: viewport.isMobile ? '3rem' : '5rem',
                                height: '0.375rem',
                                backgroundColor: '#111111',
                                borderRadius: '9999px',
                                marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
                            }}
                        ></div>
                        <p
                            style={{
                                fontSize: viewport.isMobile ? '1rem' : '1.25rem',
                                color: '#4B5563',
                                maxWidth: '48rem',
                                margin: '0 auto',
                                lineHeight: 1.7,
                            }}
                        >
                            The Academic Counselling Cell (ACC) at BITS Pilani,
                            Hyderabad Campus, focuses on supporting students'
                            academic journey and personal development. ACC
                            implements effective mentor-mentee programs to
                            address both educational and psychological
                            challenges. The program ensures a structured support
                            system for students, enhancing communication between
                            teachers and students and ultimately improving the
                            academic environment on campus.
                        </p>
                    </div>
                </div>
            </section>
            
            <section
                style={{
                    padding: styles.section.padding,
                    backgroundColor: '#F9FAFB',
                }}
            >
                <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: viewport.isMobile ? '3rem' : '5rem',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: styles.sectionHeading.fontSize,
                                fontWeight: 700,
                                color: '#111111',
                                marginBottom: styles.sectionHeading.marginBottom,
                            }}
                        >
                            Vision & Mission
                        </h2>
                        <div
                            style={{
                                width: viewport.isMobile ? '3rem' : '5rem',
                                height: '0.375rem',
                                backgroundColor: '#111111',
                                borderRadius: '9999px',
                                marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: styles.grid.visionMission.gridTemplateColumns,
                            gap: styles.grid.visionMission.gap,
                        }}
                    >
                        <motion.div
                            whileHover={{
                                scale: viewport.isMobile ? 1 : 1.01,
                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                                backgroundColor: 'white',
                                padding: viewport.isMobile ? '2rem' : '3rem',
                                borderRadius: '1rem',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <motion.div
                                transition={{ duration: 0.2 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: viewport.isMobile ? '3rem' : '4rem',
                                    height: viewport.isMobile ? '3rem' : '4rem',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '0.75rem',
                                    marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
                                }}
                            >
                                <Target
                                    style={{
                                        width: viewport.isMobile ? '1.5rem' : '2rem',
                                        height: viewport.isMobile ? '1.5rem' : '2rem',
                                        color: '#111111',
                                    }}
                                />
                            </motion.div>
                            <h3
                                style={{
                                    fontSize: viewport.isMobile ? '1.25rem' : '1.5rem',
                                    fontWeight: 700,
                                    color: '#111111',
                                    marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
                                }}
                            >
                                Vision
                            </h3>
                            <p
                                style={{
                                    color: '#4B5563',
                                    lineHeight: 1.7,
                                }}
                            >
                                To help students transform challenges into
                                opportunities for academic achievement and
                                personal growth, making them valuable assets to
                                society.
                            </p>
                        </motion.div>
                        <motion.div
                            whileHover={{
                                scale: viewport.isMobile ? 1 : 1.01,
                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                            }}
                            transition={{ duration: 0.2 }}
                            style={{
                                backgroundColor: 'white',
                                padding: viewport.isMobile ? '2rem' : '3rem',
                                borderRadius: '1rem',
                                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
                            }}
                        >
                            <motion.div
                                transition={{ duration: 0.2 }}
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: viewport.isMobile ? '3rem' : '4rem',
                                    height: viewport.isMobile ? '3rem' : '4rem',
                                    backgroundColor: '#F3F4F6',
                                    borderRadius: '0.75rem',
                                    marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
                                }}
                            >
                                <BookOpen
                                    style={{
                                        width: viewport.isMobile ? '1.5rem' : '2rem',
                                        height: viewport.isMobile ? '1.5rem' : '2rem',
                                        color: '#111111',
                                    }}
                                />
                            </motion.div>
                            <h3
                                style={{
                                    fontSize: viewport.isMobile ? '1.25rem' : '1.5rem',
                                    fontWeight: 700,
                                    color: '#111111',
                                    marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
                                }}
                            >
                                Mission
                            </h3>
                            <p
                                style={{
                                    color: '#4B5563',
                                    lineHeight: 1.7,
                                }}
                            >
                                The ACC promotes holistic student development,
                                addressing personal, emotional, social, and
                                academic growth. It aims to enable students to
                                fully benefit from the resources and
                                opportunities provided by BITS Pilani.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            <section
                style={{
                    padding: styles.section.padding,
                    backgroundColor: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at bottom left, #f3f4f6 0%, transparent 60%)',
                    }}
                ></div>
                <div
                    style={{
                        maxWidth: '72rem',
                        margin: '0 auto',
                        position: 'relative',
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            marginBottom: viewport.isMobile ? '3rem' : '5rem',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: styles.sectionHeading.fontSize,
                                fontWeight: 700,
                                color: '#111111',
                                marginBottom: styles.sectionHeading.marginBottom,
                            }}
                        >
                            Our Services
                        </h2>
                        <div
                            style={{
                                width: viewport.isMobile ? '3rem' : '5rem',
                                height: '0.375rem',
                                backgroundColor: '#111111',
                                borderRadius: '9999px',
                                marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
                            }}
                        ></div>
                        <p
                            style={{
                                fontSize: viewport.isMobile ? '1rem' : '1.25rem',
                                color: '#4B5563',
                                maxWidth: '48rem',
                                margin: '0 auto',
                            }}
                        >
                            Comprehensive support services designed to enhance
                            your academic journey and personal growth.
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: styles.grid.services.gridTemplateColumns,
                            gap: styles.grid.services.gap,
                        }}
                    >
                        {services.map((service, index) => {
                            const IconComponent = icons[service.icon] || BookOpen;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        padding: viewport.isMobile ? '1.5rem' : '2rem',
                                        borderRadius: '1rem',
                                        backgroundColor: 'white',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                                        minHeight: viewport.isMobile ? '240px' : '280px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        gap: '1.5rem',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '1.5rem',
                                        }}
                                    >
                                        <div
                                            style={{
                                                backgroundColor: '#f4f4f4',
                                                borderRadius: '12px',
                                                width: viewport.isMobile ? '48px' : '56px',
                                                height: viewport.isMobile ? '48px' : '56px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <IconComponent
                                                style={{
                                                    width: viewport.isMobile ? '24px' : '28px',
                                                    height: viewport.isMobile ? '24px' : '28px',
                                                    color: '#111111',
                                                }}
                                            />
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '0.75rem',
                                            }}
                                        >
                                            <h3
                                                style={{
                                                    fontSize: viewport.isMobile ? '1.1rem' : '1.25rem',
                                                    fontWeight: '600',
                                                    color: '#111111',
                                                    margin: 0,
                                                }}
                                            >
                                                {service.heading}
                                            </h3>

                                            <p
                                                style={{
                                                    fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                                    color: '#666666',
                                                    lineHeight: '1.6',
                                                    margin: 0,
                                                }}
                                            >
                                                {service.short_description}
                                            </p>
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={() => setModalContent(service)}
                                        whileHover={{
                                            scale: viewport.isMobile ? 1.02 : 1.05,
                                            backgroundColor: '#000000',
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            color: 'white',
                                            fontFamily: 'Poppins',
                                            fontSize: viewport.isMobile ? '0.8rem' : '0.85rem',
                                            fontWeight: '500',
                                            backgroundColor: '#111111',
                                            padding: viewport.isMobile ? '0.6rem 1rem' : '0.75rem 1.25rem',
                                            borderRadius: '0.5rem',
                                            cursor: 'pointer',
                                            border: 'none',
                                            width: 'fit-content',
                                        }}
                                    >
                                        Learn More
                                        <svg
                                            width='16'
                                            height='16'
                                            viewBox='0 0 16 16'
                                            fill='none'
                                            style={{ marginLeft: '4px' }}
                                        >
                                            <path
                                                d='M3.33334 8H12.6667'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                            <path
                                                d='M8 3.33334L12.6667 8.00001L8 12.6667'
                                                stroke='currentColor'
                                                strokeWidth='1.5'
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                            />
                                        </svg>
                                    </motion.button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                
                <AnimatePresence>
                    {modalContent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{
                                position: 'fixed',
                                inset: 0,
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(5px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1000,
                                padding: viewport.isMobile ? '1rem' : 0,
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                transition={{
                                    type: 'spring',
                                    duration: 0.5,
                                    bounce: 0.3,
                                }}
                                style={{
                                    backgroundColor: 'white',
                                    padding: styles.modal.padding,
                                    borderRadius: '1rem',
                                    maxWidth: '40rem',
                                    maxHeight: viewport.isMobile ? '80vh' : '90vh',
                                    overflowY: 'auto',
                                    textAlign: 'center',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    width: styles.modal.width,
                                    position: 'relative',
                                }}
                            >
                                <motion.h2
                                    initial={{ y: -10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    style={{
                                        fontSize: viewport.isMobile ? '1.25rem' : '1.5rem',
                                        fontWeight: 700,
                                        marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
                                        color: '#111111',
                                    }}
                                >
                                    {modalContent.heading}
                                </motion.h2>

                                <motion.div
                                    style={{
                                        color: '#4B5563',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '1rem',
                                    }}
                                >
                                    {modalContent.long_description.map(
                                        (point, index) => (
                                            <motion.p
                                                key={index}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 + index * 0.1 }}
                                                style={{
                                                    margin: 0,
                                                    lineHeight: '1.6',
                                                    fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                                }}
                                            >
                                                {point}
                                            </motion.p>
                                        )
                                    )}
                                </motion.div>
                                <motion.button
                                    onClick={() => setModalContent(null)}
                                    whileHover={{
                                        scale: viewport.isMobile ? 1.02 : 1.05,
                                        backgroundColor: '#000000',
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    style={{
                                        marginTop: viewport.isMobile ? '1.5rem' : '2rem',
                                        backgroundColor: '#111111',
                                        color: 'white',
                                        fontFamily: 'Poppins',
                                        padding: viewport.isMobile ? '0.6rem 1.25rem' : '0.75rem 1.5rem',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        border: 'none',
                                        fontSize: viewport.isMobile ? '0.9rem' : '0.95rem',
                                        fontWeight: '500',
                                    }}
                                >
                                    Close
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
            
            <footer
                style={{
                    position: 'relative',
                    backgroundColor: '#111111',
                    color: 'white',
                    padding: viewport.isMobile ? '3rem 1rem' : '5rem 1rem',
                    zIndex: 95,
                }}
            >
                <div
                    style={{
                        maxWidth: '72rem',
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: styles.grid.footer.gridTemplateColumns,
                            gap: styles.grid.footer.gap,
                        }}
                    >
                        <div style={{ 
                            gridColumn: viewport.isMobile ? 'span 1' : 'span 2',
                            marginBottom: viewport.isMobile ? '1.5rem' : 0
                        }}>
                            <h3
                                style={{
                                    fontSize: viewport.isMobile ? '1.25rem' : '1.5rem',
                                    fontWeight: 700,
                                    marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
                                }}
                            >
                                Academic Counselling Cell
                            </h3>
                            <p
                                style={{
                                    color: '#9CA3AF',
                                    marginBottom: viewport.isMobile ? '1.5rem' : '2rem',
                                    maxWidth: '24rem',
                                    fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                }}
                            >
                                Empowering students through comprehensive
                                guidance, support, and mentorship to achieve
                                academic excellence.
                            </p>
                        </div>
                        <div>
                            <h4
                                style={{
                                    fontSize: viewport.isMobile ? '1rem' : '1.125rem',
                                    fontWeight: 600,
                                    marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
                                }}
                            >
                                Quick Links
                            </h4>
                            <ul
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: viewport.isMobile ? '0.75rem' : '1rem',
                                    padding: 0,
                                    listStyle: 'none',
                                }}
                            >
                                <li>
                                    <a
                                        href='#'
                                        style={{
                                            color: '#9CA3AF',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                        }}
                                    >
                                        Overview
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        style={{
                                            color: '#9CA3AF',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                        }}
                                    >
                                        Vision & Mission
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        style={{
                                            color: '#9CA3AF',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                        }}
                                    >
                                        Services
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4
                                style={{
                                    fontSize: viewport.isMobile ? '1rem' : '1.125rem',
                                    fontWeight: 600,
                                    marginBottom: viewport.isMobile ? '1rem' : '1.5rem',
                                }}
                            >
                                Resources
                            </h4>
                            <ul
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: viewport.isMobile ? '0.75rem' : '1rem',
                                    padding: 0,
                                    listStyle: 'none',
                                }}
                            >
                                <li>
                                    <a
                                        href='#'
                                        style={{
                                            color: '#9CA3AF',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                        }}
                                    >
                                        Mentor Program
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        style={{
                                            color: '#9CA3AF',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                        }}
                                    >
                                        Events Calendar
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        style={{
                                            color: '#9CA3AF',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                        }}
                                    >
                                        Support Services
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href='#'
                                        style={{
                                            color: '#9CA3AF',
                                            transition: 'color 0.3s ease',
                                            textDecoration: 'none',
                                            fontSize: viewport.isMobile ? '0.9rem' : '1rem',
                                        }}
                                    >
                                        FAQ
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
