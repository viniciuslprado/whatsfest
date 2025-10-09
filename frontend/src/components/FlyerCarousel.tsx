import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar, FiMapPin, FiStar } from 'react-icons/fi';
import { GiPartyHat } from 'react-icons/gi';

interface Flyer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkVendas?: string;
  destaque: boolean;
  dataEvento?: string;
  cidade?: string;
  createdAt: string;
}

const FlyerCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [featuredFlyers, setFeaturedFlyers] = useState<Flyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar flyers em destaque da API
  const loadFeaturedFlyers = async () => {
    setIsLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/v1/flyers/featured`);
      if (response.ok) {
        const data = await response.json();
        setFeaturedFlyers(data.flyers || []);
      } else {
        console.error('Erro ao carregar flyers em destaque');
        setFeaturedFlyers([]);
      }
    } catch (error) {
      console.error('Erro ao conectar com a API:', error);
      setFeaturedFlyers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeaturedFlyers();
  }, []);

  // Auto-slide a cada 5 segundos
  useEffect(() => {
    if (featuredFlyers.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredFlyers.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredFlyers]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredFlyers.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredFlyers.length) % featuredFlyers.length);
  };



  if (isLoading) {
    return (
      <div style={{
        height: '400px',
        background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #8b5cf6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  if (featuredFlyers.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px', 
        color: '#6b7280',
        background: '#f9fafb',
        borderRadius: '12px',
        marginBottom: '40px'
      }}>
        <FiCalendar size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
        <p style={{ fontSize: '16px', margin: 0 }}>
          Nenhum flyer em destaque disponível no momento.
        </p>
      </div>
    );
  }

  const currentFlyer = featuredFlyers[currentIndex];

  return (
    <div style={{ marginBottom: '40px' }}>
      {/* Título da seção */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#1f2937',
          margin: '0 0 8px 0'
        }}>
          <GiPartyHat style={{ display: 'inline', marginRight: '8px', color: '#f59e0b' }} />
          Eventos em Destaque
        </h2>
        <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
          Não perca os melhores eventos da cidade!
        </p>
      </div>

      {/* Carousel */}
      <div style={{
        position: 'relative',
        height: '400px',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        background: 'white'
      }}>
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${currentFlyer.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'all 0.5s ease'
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.6))',
            display: 'flex',
            alignItems: 'center',
            padding: '40px'
          }}
        >
          {/* Content */}
          <div style={{ color: 'white', maxWidth: '60%' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'inline-block',
              marginBottom: '16px',
              textTransform: 'uppercase'
            }}>
              <FiStar style={{ display: 'inline', marginRight: '4px' }} />
              Em Destaque
            </div>

            <h3 style={{
              fontSize: '36px',
              fontWeight: 'bold',
              margin: '0 0 16px 0',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {currentFlyer.title}
            </h3>

            <p style={{
              fontSize: '18px',
              margin: '0 0 24px 0',
              opacity: 0.95,
              lineHeight: '1.6'
            }}>
              {currentFlyer.description || 'Venha participar deste evento incrível!'}
            </p>

            {/* Event Details */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}>
              {currentFlyer.dataEvento && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiCalendar />
                  <span>{new Date(currentFlyer.dataEvento).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              {currentFlyer.cidade && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiMapPin />
                  <span>{currentFlyer.cidade}</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            {currentFlyer.linkVendas && (
              <a
                href={currentFlyer.linkVendas}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(255, 255, 255, 0.9)',
                  color: '#8b5cf6',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                🎫 Comprar Ingresso
              </a>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <FiChevronLeft />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          <FiChevronRight />
        </button>

        {/* Dots Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
        }}>
          {featuredFlyers.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlyerCarousel;