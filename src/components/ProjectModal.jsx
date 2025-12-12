import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ElectricBorder from './ElectricBorder';
import './ProjectModal.css';

export default function ProjectModal({ project, isOpen, onClose }) {
  // Блокировать скролл когда модалка открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Закрывать по Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="project-modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <ElectricBorder
              color="#CBA3FF"
              speed={0.8}
              chaos={0.6}
              thickness={3}
              style={{ borderRadius: 24 }}
            >
              <div className="project-modal">
                {/* Header */}
                <div className="project-modal__header">
                  <div className="project-modal__tag">{project.tag}</div>
                  <button
                    className="project-modal__close"
                    onClick={onClose}
                    aria-label="Close modal"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6L18 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Image */}
                <div className="project-modal__image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-modal__image-glow" />
                </div>

                {/* Content */}
                <div className="project-modal__content">
                  <h2 className="project-modal__title">{project.title}</h2>
                  
                  <p className="project-modal__description">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  {project.tech && (
                    <div className="project-modal__tech">
                      <h3>Технологии:</h3>
                      <div className="project-modal__tech-list">
                        {project.tech.map((tech, index) => (
                          <span key={index} className="tech-badge">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {project.features && (
                    <div className="project-modal__features">
                      <h3>Особенности:</h3>
                      <ul>
                        {project.features.map((feature, index) => (
                          <li key={index}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path
                                d="M16.6 5L7.5 14.1L3.4 10"
                                stroke="var(--success)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA Buttons */}
                  <div className="project-modal__actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--primary"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 1C5 1 1 5 1 10s4 9 9 9 9-4 9-9-4-9-9-9z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M1 10h18M10 1a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                        </svg>
                        Посмотреть проект
                      </a>
                    )}
                    
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--secondary"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M10 2a8 8 0 00-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0010 2z"
                            fill="currentColor"
                          />
                        </svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
