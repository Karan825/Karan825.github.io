import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
  width: 100%;
`;

const StyledText = styled.div`
  p {
    font-size: var(--fz-lg);
    line-height: 1.9;
    color: #a0a0a0;
    margin: 0;
    min-height: 1.8em;
  }

  .cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    background-color: #cccccc;
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const FULL_TEXT = `Final-year Mechanical Engineering undergraduate at IIT (BHU) Varanasi with a strong focus on AI, Machine Learning, and autonomous AI systems. Experienced in building production-ready LLM agents, RAG pipelines, multimodal AI applications, and scalable backend services using Python, PyTorch, FastAPI, and SQL. Passionate about developing reliable, end-to-end AI systems that bridge research and engineering, with interests in agentic AI, reasoning systems, and scalable ML infrastructure.`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [displayed, setDisplayed] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  // Typewriter effect — starts when section enters viewport
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(FULL_TEXT);
      setIsDone(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setDisplayed(FULL_TEXT.slice(0, i));
            if (i >= FULL_TEXT.length) {
              clearInterval(interval);
              setIsDone(true);
            }
          }, 18); // speed: ~18ms per character
        }
      },
      { threshold: 0.2 }
    );

    if (revealContainer.current) observer.observe(revealContainer.current);
    return () => observer.disconnect();
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <StyledText>
        <p>
          {displayed}
          {!isDone && <span className="cursor" aria-hidden="true" />}
        </p>
      </StyledText>
    </StyledAboutSection>
  );
};

export default About;
