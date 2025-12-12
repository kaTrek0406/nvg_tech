import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ElectricBorderLight from '../ElectricBorderLight';
import ProjectModal from '../ProjectModal';
import './Portfolio.css';

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const projects = [
    {
      title: `${t('portfolio.projects.0.title')}`,
      tag: `${t('portfolio.projects.0.tag')}`,
      image:
        'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=900&q=80',
      description: `${t('portfolio.projects.0.description')}`,
      tech: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      features: [
        `${t('portfolio.projects.0.features.0')}`,
        `${t('portfolio.projects.0.features.1')}`,
        `${t('portfolio.projects.0.features.2')}`,
        `${t('portfolio.projects.0.features.3')}`
      ]
    },
    {
      title: `${t('portfolio.projects.1.title')}`,
      tag: `${t('portfolio.projects.1.tag')}`,
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=80',
      description: `${t('portfolio.projects.1.description')}`,
      tech: ['React', 'TypeScript', 'WebSocket', 'Chart.js', 'TailwindCSS'],
      features: [
        `${t('portfolio.projects.1.features.0')}`,
        `${t('portfolio.projects.1.features.1')}`,
        `${t('portfolio.projects.1.features.2')}`,
        `${t('portfolio.projects.1.features.3')}`
      ]
    },
    {
      title: `${t('portfolio.projects.2.title')}`,
      tag: `${t('portfolio.projects.2.tag')}`,
      image:
        'https://images.unsplash.com/photo-1558655146-d09347e92766?w=900&q=80',
      description: `${t('portfolio.projects.2.description')}`,
      tech: ['Python', 'OpenAI', 'FastAPI', 'React', 'MongoDB'],
      features: [
        `${t('portfolio.projects.2.features.0')}`,
        `${t('portfolio.projects.2.features.1')}`,
        `${t('portfolio.projects.2.features.2')}`,
        `${t('portfolio.projects.2.features.3')}`
      ]
    },
    {
      title: `${t('portfolio.projects.3.title')}`,
      tag: `${t('portfolio.projects.3.tag')}`,
      image:
        'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
      description: `${t('portfolio.projects.3.description')}`,
      tech: ['Next.js', 'Framer Motion', 'TypeScript', 'Vercel'],
      features: [
        `${t('portfolio.projects.3.features.0')}`,
        `${t('portfolio.projects.3.features.1')}`,
        `${t('portfolio.projects.3.features.2')}`,
        `${t('portfolio.projects.3.features.3')}`
      ]
    },
    {
      title: `${t('portfolio.projects.4.title')}`,
      tag: `${t('portfolio.projects.4.tag')}`,
      image:
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
      description: `${t('portfolio.projects.4.description')}`,
      tech: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase'],
      features: [
        `${t('portfolio.projects.4.features.0')}`,
        `${t('portfolio.projects.4.features.1')}`,
        `${t('portfolio.projects.4.features.2')}`,
        `${t('portfolio.projects.4.features.3')}`
      ]
    },
    {
      title: `${t('portfolio.projects.5.title')}`,
      tag: `${t('portfolio.projects.5.tag')}`,
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
      description: `${t('portfolio.projects.5.description')}`,
      tech: ['Vue.js', 'D3.js', 'Python', 'Apache Kafka', 'ClickHouse'],
      features: [
        `${t('portfolio.projects.5.features.0')}`,
        `${t('portfolio.projects.5.features.1')}`,
        `${t('portfolio.projects.5.features.2')}`,
        `${t('portfolio.projects.5.features.3')}`
      ]
    }
  ];

  const handleProjectClick = project => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section className='portfolio' id='portfolio'>
        <div className='container'>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className='portfolio__title text-center'>
              {t('portfolio.title')}
            </h2>
            <p className='portfolio__subtitle subtitle text-center'>
              {t('portfolio.subtitle')}
            </p>
          </motion.div>

          <div className='portfolio__grid grid-auto'>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ElectricBorderLight
                  color='#7A33FF'
                  speed={0.8}
                  thickness={2}
                  style={{ borderRadius: 16 }}
                >
                  <div
                    className='portfolio-card'
                    onClick={() => handleProjectClick(project)}
                  >
                    <div className='portfolio-card__image'>
                      <img
                        src={project.image}
                        alt={project.title}
                        loading='lazy'
                      />
                      <div className='portfolio-card__overlay'>
                        <span className='portfolio-card__cta'>
                          {t('portfolio.cta')}
                        </span>
                      </div>
                    </div>
                    <div className='portfolio-card__content'>
                      <span className='portfolio-card__tag'>{project.tag}</span>
                      <h3 className='portfolio-card__title'>{project.title}</h3>
                    </div>
                  </div>
                </ElectricBorderLight>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
