import Section from "../section"
import React from 'react';
import { BookOpen, Target, Users, MessageSquare, HeartHandshake, Calendar, Clock, Building2, Users2, ArrowRight, ChevronRight } from 'lucide-react';

export default function Section1() {
  return (
   
    <div style={{ minHeight: '100vh', backgroundColor: 'white' }}>
      {/* Hero Section */}
      <header style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, rgb(249, 250, 251), white)',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"
            alt="University Campus"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1 }}
          />
        </div>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.9))'
        }}></div>
        <div style={{ 
          position: 'relative', 
          zIndex: 10, 
          textAlign: 'center', 
          padding: '0 1rem', 
          maxWidth: '64rem', 
          margin: '0 auto' 
        }}>
          <div style={{ 
            display: 'inline-block', 
            marginBottom: '1.5rem', 
            padding: '0.5rem 1.5rem', 
            backgroundColor: 'rgba(17,24,39,0.05)', 
            borderRadius: '9999px' 
          }}>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#111827' }}>Empowering Academic Excellence</p>
          </div>
          <h1 style={{ 
            fontSize: '4.5rem', 
            fontWeight: 700, 
            color: '#111827', 
            marginBottom: '2rem', 
            lineHeight: 1.1 
          }}>
            Academic <span style={{ position: 'relative' }}>
              Counselling 
              <span style={{ 
                position: 'absolute', 
                bottom: '0.5rem', 
                left: 0, 
                width: '100%', 
                height: '0.75rem', 
                backgroundColor: '#f3f4f6', 
                zIndex: -1 
              }}></span>
            </span> Cell
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            color: '#4B5563', 
            maxWidth: '32rem', 
            margin: '0 auto 3rem', 
            lineHeight: 1.7 
          }}>
            Your dedicated partner in academic success, providing personalized guidance and support throughout your educational journey.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button style={{ 
              padding: '1rem 2rem', 
              backgroundColor: '#111827', 
              color: 'white', 
              borderRadius: '0.5rem', 
              fontWeight: 500,
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              ':hover': {
                backgroundColor: '#1F2937',
                transform: 'scale(1.05)'
              }
            }}>
              Get Started
            </button>
            <button style={{ 
              padding: '1rem 2rem', 
              backgroundColor: 'white', 
              border: '2px solid #E5E7EB', 
              color: '#111827', 
              borderRadius: '0.5rem', 
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}>
              Learn More <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </button>
          </div>
        </div>
        <div style={{ 
          position: 'absolute', 
          bottom: '2.5rem', 
          left: '50%', 
          transform: 'translateX(-50%)',
          animation: 'bounce 1s infinite'
        }}>
          <ChevronRight style={{ 
            width: '1.5rem', 
            height: '1.5rem', 
            color: '#9CA3AF',
            transform: 'rotate(90deg)' 
          }} />
        </div>
      </header>

      {/* Overview Section */}
      <section style={{ 
        padding: '8rem 1rem', 
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at top right, #f3f4f6 0%, transparent 60%)' 
        }}></div>
        <div style={{ 
          maxWidth: '72rem', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 700, 
              color: '#111827',
              marginBottom: '1.5rem'
            }}>Overview</h2>
            <div style={{ 
              width: '5rem', 
              height: '0.375rem', 
              backgroundColor: '#111827',
              borderRadius: '9999px',
              marginBottom: '2rem'
            }}></div>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#4B5563',
              maxWidth: '48rem',
              margin: '0 auto',
              lineHeight: 1.7
            }}>
              The Academic Counselling Cell (ACC) is dedicated to fostering academic excellence through personalized guidance, 
              comprehensive support systems, and innovative mentorship programs designed to empower every student's journey 
              towards success.
            </p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                title: "Student-Centric Approach",
                description: "Tailored guidance that puts your academic needs and aspirations at the forefront.",
                stat: "95%",
                label: "Student Satisfaction"
              },
              {
                title: "Expert Mentorship",
                description: "Access to experienced mentors who provide valuable insights and direction.",
                stat: "500+",
                label: "Active Mentors"
              },
              {
                title: "Continuous Support",
                description: "Round-the-clock assistance ensuring you're never alone in your academic journey.",
                stat: "24/7",
                label: "Support Available"
              }
            ].map((item, index) => (
              <div key={index} style={{ 
                backgroundColor: 'white',
                border: '1px solid #F3F4F6',
                borderRadius: '1rem',
                padding: '2rem',
                transition: 'all 0.3s ease',
                ':hover': {
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ 
                    fontSize: '2.25rem', 
                    fontWeight: 700, 
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>{item.stat}</div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    color: '#6B7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>{item.label}</div>
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 700, 
                  color: '#111827',
                  marginBottom: '1rem'
                }}>{item.title}</h3>
                <p style={{ color: '#4B5563' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ 
        padding: '8rem 1rem', 
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 700, 
              color: '#111827',
              marginBottom: '1.5rem'
            }}>Vision & Mission</h2>
            <div style={{ 
              width: '5rem', 
              height: '0.375rem', 
              backgroundColor: '#111827',
              borderRadius: '9999px',
              marginBottom: '2rem'
            }}></div>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '3rem'
          }}>
            <div style={{ 
              backgroundColor: 'white',
              padding: '3rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              ':hover': {
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
              }
            }}>
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '4rem',
                height: '4rem',
                backgroundColor: '#F3F4F6',
                borderRadius: '0.75rem',
                marginBottom: '2rem'
              }}>
                <Target style={{ width: '2rem', height: '2rem', color: '#111827' }} />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#111827',
                marginBottom: '1.5rem'
              }}>Vision</h3>
              <p style={{ 
                color: '#4B5563',
                lineHeight: 1.7
              }}>
                To create an empowering academic environment where every student can reach their full potential through proper 
                guidance and support, fostering a community of lifelong learners and achievers.
              </p>
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '3rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              ':hover': {
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
              }
            }}>
              <div style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '4rem',
                height: '4rem',
                backgroundColor: '#F3F4F6',
                borderRadius: '0.75rem',
                marginBottom: '2rem'
              }}>
                <BookOpen style={{ width: '2rem', height: '2rem', color: '#111827' }} />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700, 
                color: '#111827',
                marginBottom: '1.5rem'
              }}>Mission</h3>
              <p style={{ 
                color: '#4B5563',
                lineHeight: 1.7
              }}>
                To provide comprehensive academic counselling services that address the diverse needs of our student community, 
                fostering academic excellence through innovative guidance and mentorship programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ 
        padding: '8rem 1rem', 
        backgroundColor: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'radial-gradient(circle at bottom left, #f3f4f6 0%, transparent 60%)' 
        }}></div>
        <div style={{ 
          maxWidth: '72rem', 
          margin: '0 auto',
          position: 'relative',
          zIndex: 10
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 700, 
              color: '#111827',
              marginBottom: '1.5rem'
            }}>Our Services</h2>
            <div style={{ 
              width: '5rem', 
              height: '0.375rem', 
              backgroundColor: '#111827',
              borderRadius: '9999px',
              marginBottom: '2rem'
            }}></div>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#4B5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              Comprehensive support services designed to enhance your academic journey and personal growth.
            </p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              { icon: BookOpen, title: "Academic Guidance", desc: "Personalized academic planning and course selection assistance" },
              { icon: Users, title: "Mentor-Mentee Program", desc: "Connect with experienced mentors for guidance and support" },
              { icon: MessageSquare, title: "Counselling Sessions", desc: "One-on-one counselling for academic and related concerns" },
              { icon: HeartHandshake, title: "Support Services", desc: "Additional resources and support for student success" },
              { icon: Calendar, title: "Events & Workshops", desc: "Regular events focused on academic and personal development" },
              { icon: Clock, title: "Flexible Scheduling", desc: "Convenient timing for counselling sessions" }
            ].map((service, index) => (
              <div key={index} style={{ 
                padding: '2rem',
                backgroundColor: 'white',
                border: '1px solid #F3F4F6',
                borderRadius: '1rem',
                transition: 'all 0.3s ease',
                ':hover': {
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
                }
              }}>
                <div style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '4rem',
                  height: '4rem',
                  backgroundColor: '#F3F4F6',
                  borderRadius: '0.75rem',
                  marginBottom: '1.5rem',
                  transition: 'all 0.3s ease',
                  ':hover': {
                    backgroundColor: '#111827'
                  }
                }}>
                  <service.icon style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    color: '#111827',
                    transition: 'color 0.3s ease',
                    ':hover': {
                      color: 'white'
                    }
                  }} />
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: 700, 
                  color: '#111827',
                  marginBottom: '1rem'
                }}>{service.title}</h3>
                <p style={{ 
                  color: '#4B5563',
                  marginBottom: '1.5rem'
                }}>{service.desc}</p>
                <a href="#" style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#111827',
                  fontWeight: 500,
                  transition: 'gap 0.3s ease',
                  ':hover': {
                    gap: '0.5rem'
                  }
                }}>
                  Learn More <ArrowRight style={{ width: '1rem', height: '1rem', marginLeft: '0.25rem' }} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ 
        padding: '8rem 1rem', 
        backgroundColor: '#F9FAFB'
      }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '5rem'
          }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 700, 
              color: '#111827',
              marginBottom: '1.5rem'
            }}>Contact Us</h2>
            <div style={{ 
              width: '5rem', 
              height: '0.375rem', 
              backgroundColor: '#111827',
              borderRadius: '9999px',
              marginBottom: '2rem'
            }}></div>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#4B5563',
              maxWidth: '48rem',
              margin: '0 auto'
            }}>
              Get in touch with our team for personalized support and guidance.
            </p>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '4rem'
          }}>
            <div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 700,
                marginBottom: '2rem'
              }}>Get in Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '0.75rem'
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <Building2 style={{ width: '1.5rem', height: '1.5rem', color: '#111827' }} />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontWeight: 500, 
                      color: '#111827'
                    }}>Visit Us</h4>
                    <p style={{ color: '#4B5563' }}>Academic Counselling Cell Office</p>
                  </div>
                </div>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem',
                  padding: '1.5rem',
                  backgroundColor: 'white',
                  borderRadius: '0.75rem'
                }}>
                  <div style={{ flexShrink: 0 }}>
                    <Users2 style={{ width: '1.5rem', height: '1.5rem', color: '#111827' }} />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontWeight: 500, 
                      color: '#111827'
                    }}>Working Hours</h4>
                    <p style={{ color: '#4B5563' }}>Monday - Friday, 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ 
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>Your Name</label>
                  <input
                    type="text"
                    style={{ 
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      transition: 'all 0.3s ease',
                      ':focus': {
                        outline: 'none',
                        ring: '2px solid #111827',
                        border: 'transparent'
                      }
                    }}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>Email Address</label>
                  <input
                    type="email"
                    style={{ 
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      transition: 'all 0.3s ease',
                      ':focus': {
                        outline: 'none',
                        ring: '2px solid #111827',
                        border: 'transparent'
                      }
                    }}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label style={{ 
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#374151',
                    marginBottom: '0.5rem'
                  }}>Message</label>
                  <textarea
                    rows={4}
                    style={{ 
                      width: '100%',
                      padding: '0.75rem 1rem',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      transition: 'all 0.3s ease',
                      ':focus': {
                        outline: 'none',
                        ring: '2px solid #111827',
                        border: 'transparent'
                      }
                    }}
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  style={{ 
                    width: '100%',
                    backgroundColor: '#111827',
                    color: 'white',
                    padding: '1rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                    transform: 'scale(1)',
                    ':hover': {
                      backgroundColor: '#1F2937',
                      transform: 'scale(1.05)'
                    }
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#111827',
        color: 'white',
        padding: '5rem 1rem'
      }}>
        <div style={{ 
          maxWidth: '72rem', 
          margin: '0 auto'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '3rem'
          }}>
            <div style={{ gridColumn: 'span 2' }}>
              <h3 style={{ 
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem'
              }}>Academic Counselling Cell</h3>
              <p style={{ 
                color: '#9CA3AF',
                marginBottom: '2rem',
                maxWidth: '24rem'
              }}>
                Empowering students through comprehensive guidance, support, and mentorship to achieve academic excellence.
              </p>
            </div>
            <div>
              <h4 style={{ 
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}>Quick Links</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Overview</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Vision & Mission</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Services</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ 
                fontSize: '1.125rem',
                fontWeight: 600,
                marginBottom: '1.5rem'
              }}>Resources</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Mentor Program</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Events Calendar</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Support Services</a></li>
                <li><a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>FAQ</a></li>
              </ul>
            </div>
          </div>
          <div style={{ 
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid #1F2937',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            '@media (min-width: 768px)': {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }
          }}>
            <p style={{ color: '#9CA3AF' }}>&copy; {new Date().getFullYear()} Academic Counselling Cell. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Privacy Policy</a>
              <a href="#" style={{ color: '#9CA3AF', transition: 'color 0.3s ease', ':hover': { color: 'white' } }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );



  
}

