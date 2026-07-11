import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAchievementsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1000px;
  margin: 0 auto;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;
    width: 100%;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
  }
`;

const StyledAchievementCard = styled.div`
  ${({ theme }) => theme.mixins.boxShadow};
  display: flex;
  flex-direction: column;
  padding: 2.25rem 1.75rem;
  border-radius: var(--border-radius);
  background-color: var(--light-navy);
  transition: var(--transition);
  height: 100%;
  border: 1px solid transparent;

  @media (prefers-reduced-motion: no-preference) {
    &:hover {
      transform: translateY(-5px);
      border-color: var(--green);
    }
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;

    .icon {
      color: var(--green);
      svg {
        width: 38px;
        height: 38px;
      }
    }

    .badge {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: var(--green);
      background-color: rgba(100, 255, 218, 0.08);
      padding: 4px 10px;
      border-radius: 20px;
      border: 1px solid rgba(100, 255, 218, 0.2);
    }
  }

  .title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
  }

  .description {
    color: var(--slate);
    font-size: var(--fz-sm);
    line-height: 1.5;
  }
`;

const Achievements = () => {
  const revealTitle = useRef(null);
  const revealCards = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealCards.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const achievementsList = [
    {
      title: 'Poker Bot Tournament',
      badge: '1st Place',
      description: 'Secured first place with a high-performance bot yielding a virtual profit of $38,000+ in a highly competitive tournament.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Codeforces Specialist',
      badge: 'Peak 1574',
      description: 'Achieved Specialist rank on Codeforces. Ranked 758th globally in Codeforces Round 1020.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: 'Amex Challenge',
      badge: 'Rank 10',
      description: 'Ranked 10th nationwide in Decision Science among 12,000+ competing participants across top-tier Indian engineering campuses.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: 'IMC Prosperity 3',
      badge: 'Global 86',
      description: 'Ranked 86th globally and 15th nationally out of 13,600+ participating teams in the market-making simulation and algorithmic trading competition.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Leetcode Profile',
      badge: '500+ Solved',
      description: 'Demonstrated robust problem-solving skills across Data Structures and Algorithms with a consistent daily coding habit.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      title: 'Amazon ML Challenge',
      badge: 'Top 50 Rank',
      description: 'Built a multi-modal product price prediction model using text and visual features to secure a ranking in the top 50 out of thousands of participants.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  return (
    <StyledAchievementsSection id="achievements">
      <h2 ref={revealTitle} className="numbered-heading">
        Key Achievements
      </h2>

      <div className="grid">
        {achievementsList.map((ach, i) => (
          <div key={i} ref={el => (revealCards.current[i] = el)}>
            <StyledAchievementCard>
              <div className="card-top">
                <div className="icon">{ach.icon}</div>
                <div className="badge">{ach.badge}</div>
              </div>
              <h3 className="title">{ach.title}</h3>
              <p className="description">{ach.description}</p>
            </StyledAchievementCard>
          </div>
        ))}
      </div>
    </StyledAchievementsSection>
  );
};

export default Achievements;
