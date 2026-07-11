import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout, Hero, About, Jobs, Featured, Projects, Achievements, Contact } from '@components';

const StyledMain = styled.main`
  margin: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh;
  padding: 0 !important;
  counter-reset: section;
`;

const SectionBlock = styled.div`
  width: 100%;
  background-color: ${props => props.bg || '#0a0a0a'};
  border-top: 1px solid ${props => props.light ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.05)'};

  /* Override ALL heading colors based on background lightness */
  h1, h2, h3, h4, h5, h6 {
    color: ${props => props.light ? '#111111' : '#e8e8e8'};
  }

  /* The numbered-heading counter number & rule line */
  .numbered-heading {
    color: ${props => props.light ? '#111111' : '#e8e8e8'};
    &:before {
      color: ${props => props.light ? '#555555' : '#aaaaaa'};
    }
    &:after {
      background-color: ${props => props.light ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)'};
    }
  }

  /* Body text */
  p, li, span {
    color: ${props => props.light ? '#333333' : '#a0a0a0'};
  }

  .section-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 120px 80px;

    @media (max-width: 1080px) {
      padding: 100px 60px;
    }
    @media (max-width: 768px) {
      padding: 80px 40px;
    }
    @media (max-width: 480px) {
      padding: 60px 24px;
    }
  }
`;

const IndexPage = ({ location }) => (
  <Layout location={location}>
    <StyledMain>

      {/* HERO — full bleed image */}
      <Hero />

      {/* ABOUT — dark charcoal, matches Experience */}
      <SectionBlock bg="#111111">
        <div className="section-inner">
          <About />
        </div>
      </SectionBlock>

      {/* EXPERIENCE — deep charcoal */}
      <SectionBlock bg="#111111">
        <div className="section-inner">
          <Jobs />
        </div>
      </SectionBlock>

      {/* FEATURED WORK — dark charcoal */}
      <SectionBlock bg="#111111">
        <div className="section-inner">
          <Featured />
        </div>
      </SectionBlock>

      {/* OTHER PROJECTS — dark charcoal */}
      <SectionBlock bg="#111111">
        <div className="section-inner">
          <Projects />
        </div>
      </SectionBlock>

      {/* ACHIEVEMENTS — same charcoal */}
      <SectionBlock bg="#111111">
        <div className="section-inner">
          <Achievements />
        </div>
      </SectionBlock>

      {/* CONTACT — clean white */}
      <SectionBlock bg="#f9f9f9" light>
        <div className="section-inner">
          <Contact />
        </div>
      </SectionBlock>

    </StyledMain>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IndexPage;
