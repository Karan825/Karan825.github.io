import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  /* Override global section constraints — must be full bleed */
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  padding: 0 !important;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  position: relative;
  overflow: hidden;

  /* The Unsplash image IS the background — nearly full brightness */
  background-image: url('/hero-bg.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  /* Very slight white overlay — just enough to soften contrast */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.18);
    z-index: 0;
    pointer-events: none;
  }

  .hero-content {
    position: relative;
    z-index: 1;
    padding-left: 150px;

    @media (max-width: 1080px) {
      padding-left: 100px;
    }
    @media (max-width: 768px) {
      padding-left: 50px;
    }
    @media (max-width: 480px) {
      padding-left: 25px;
    }
  }

  h1.name {
    margin: 0 0 12px;
    color: #0d0d0d;
    font-family: var(--font-sans);
    font-size: clamp(36px, 5.5vw, 62px);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
  }

  p.role {
    margin: 0;
    color: #444444;
    font-family: var(--font-mono);
    font-size: clamp(12px, 1.4vw, 15px);
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsMounted(true);
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const content = (
    <div className="hero-content">
      <h1 className="name">Karan Dhote</h1>
      <p className="role">AI Engineer</p>
    </div>
  );

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        content
      ) : (
        <TransitionGroup component={null}>
          {isMounted && (
            <CSSTransition classNames="fadeup" timeout={loaderDelay}>
              {content}
            </CSSTransition>
          )}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
