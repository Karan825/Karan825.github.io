import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledWidget = styled.div`
  font-family: var(--font-sans);
`;

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(2, 12, 27, 0.8);
  backdrop-filter: blur(6px);
  z-index: 1000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background-color: var(--light-navy);
  box-shadow: -15px 0 35px -10px rgba(2, 12, 27, 0.9);
  z-index: 1001;
  transform: translateX(${props => (props.isOpen ? '0' : '100%')});
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--lightest-navy);

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 20px;
  border-bottom: 1px solid var(--lightest-navy);
  background-color: var(--navy);

  .title-group {
    display: flex;
    flex-direction: column;
    gap: 4px;

    h3 {
      margin: 0;
      color: var(--lightest-slate);
      font-size: var(--fz-md);
      font-family: var(--font-mono);
      display: flex;
      align-items: center;
      gap: 8px;

      span.status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: var(--green);
        box-shadow: 0 0 10px var(--green);
        display: inline-block;
      }
    }

    p.subtitle {
      margin: 0;
      color: var(--slate);
      font-size: var(--fz-xxs);
    }
  }

  .close-btn {
    background: transparent;
    border: none;
    color: var(--slate);
    font-size: 28px;
    cursor: pointer;
    line-height: 1;
    padding: 4px;
    transition: var(--transition);

    &:hover {
      color: var(--green);
      transform: rotate(90deg);
    }
  }
`;

const ChatBody = styled.div`
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--navy);

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: var(--navy);
  }
  &::-webkit-scrollbar-thumb {
    background: var(--lightest-navy);
    border-radius: 3px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: var(--slate);
  }
`;

const MessageBubble = styled.div`
  max-width: 85%;
  padding: 14px 18px;
  border-radius: 12px;
  font-size: var(--fz-sm);
  line-height: 1.6;
  white-space: pre-wrap;

  &.bot {
    align-self: flex-start;
    background-color: var(--light-navy);
    color: var(--light-slate);
    border-left: 2px solid var(--green);
    border-top-left-radius: 2px;
  }

  &.user {
    align-self: flex-end;
    background-color: var(--lightest-navy);
    color: var(--green);
    border: 1px solid var(--green);
    border-bottom-right-radius: 2px;
    font-weight: 500;
  }

  a {
    color: var(--green);
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ChatInputContainer = styled.form`
  display: flex;
  padding: 20px;
  background-color: var(--navy);
  border-top: 1px solid var(--lightest-navy);
  gap: 12px;

  input {
    flex-grow: 1;
    background-color: var(--light-navy);
    border: 1px solid var(--lightest-navy);
    border-radius: 8px;
    padding: 14px;
    color: var(--white);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    transition: var(--transition);

    &:focus {
      outline: none;
      border-color: var(--green);
    }
  }

  button {
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--green);
    border-radius: 8px;
    padding: 0 20px;
    cursor: pointer;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 500;
    transition: var(--transition);

    &:hover {
      background-color: rgba(100, 255, 218, 0.1);
      color: var(--green);
    }
  }
`;

const QuickChips = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
  padding: 12px 0 0;

  p {
    margin: 0 0 4px;
    font-size: var(--fz-xxs);
    color: var(--slate);
    font-family: var(--font-mono);
  }

  .chips-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  button {
    background-color: var(--light-navy);
    border: 1px solid var(--lightest-navy);
    color: var(--light-slate);
    border-radius: 20px;
    padding: 8px 14px;
    font-size: var(--fz-xs);
    cursor: pointer;
    transition: var(--transition);
    text-align: left;

    &:hover {
      border-color: var(--green);
      color: var(--green);
      background-color: rgba(100, 255, 218, 0.05);
    }
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-self: flex-start;
  gap: 6px;
  padding: 14px 18px;
  background-color: var(--light-navy);
  border-radius: 12px;
  border-top-left-radius: 2px;

  span {
    width: 6px;
    height: 6px;
    background-color: var(--green);
    border-radius: 50%;
    display: inline-block;
    animation: bounce 1.4s infinite ease-in-out both;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1.0); }
  }
`;

const KNOWLEDGE_BASE = [
  {
    keywords: ['project', 'projects', 'portfolio', 'built'],
    response: `Karan has engineered several advanced high-performance projects:

1. <strong>RetrievAl: Candidate Ranking System</strong>
• Quantized 4-bit Qwen-2.5 (1.5B) via Llama.cpp with dual-vector scoring & honeypot filters.
• Achieved 1,700+ candidates/second processing (ranked 100K candidates in 58 seconds on CPU).

2. <strong>Multi-Modal Document Intelligence</strong>
• Advanced multi-modal RAG parsing text, tables, and images from PDFs. Boosted relevance by 20% and reduced latency by 15%.

3. <strong>AskCampus: Campus RAG Assistant</strong>
• Campus Q&A combining FAQs, scrapers, FAISS, and Groq LLaMA 3.1.

4. <strong>NLP with Disaster Tweets</strong>
• BERT-based tweet classification. Rank #71 on Kaggle leaderboard with 84.06% accuracy.

5. <strong>DRL Optimal Trade Execution</strong>
• DDPG agent simulating liquidation schedules to balance market risk & shortfall.

6. <strong>Persona-Based AI Chatbot</strong>
• LangChain agent with custom conversational memory schemas.`
  },
  {
    keywords: ['experience', 'work', 'intern', 'internship', 'jobs', 'job', 'marko', 'retape'],
    response: `Karan has completed key high-impact engineering internships:

1. <strong>MarkoAI (Mar 2026 - Present) — Full Stack AI Developer</strong>
• Built autonomous AI marketing agents combining LLM reasoning, statistical inference, and multi-agent workflows.
• Integrated Meta/Google Ads APIs with stateful circuit breakers and PostgreSQL distributed lock services.
• Designed a 13-model LLM fallback chain and real-time SSE streaming.
• Live agents: <a href="https://performance-marketerfrontend.vercel.app/" target="_blank" rel="noreferrer">Performance Marketer</a> and <a href="https://analytics-and-forecasting.vercel.app/" target="_blank" rel="noreferrer">Analytics & Forecasting</a>.

2. <strong>RetapeAI (Jun 2025 - Jul 2025) — AI/ML Intern</strong>
• Engineered a telephony compliance engine processing 8 kHz PCM audio streams in 20 ms frames.
• Built DSP beep detector using FFT spectral analysis and silence-based VAD.
• Integrated live Deepgram STT and LLM semantic checks.`
  },
  {
    keywords: ['achievement', 'achievements', 'rank', 'ranks', 'contest', 'compete', 'codeforces', 'leetcode'],
    response: `Karan is a highly competitive programmer and algorithm solver:
• <strong>Codeforces</strong>: Specialist rank (Peak rating: 1574; Global rank 758 in Round 1020).
• <strong>Poker Bot Tournament</strong>: 1st Place ($38,000+ mock profit).
• <strong>American Express Challenge</strong>: National Rank 10 overall out of 12,000+ competitors.
• <strong>IMC Prosperity 3</strong>: Global Rank 86, National Rank 15 overall out of 13,600+ teams.
• <strong>Amazon ML Challenge</strong>: Top 50 Rank.
• <strong>LeetCode</strong>: Solved 500+ DSA problems.
• <strong>Chess</strong>: 1st Place in Division 20 of the Spring 2025 Indian College Chess Championship.`
  },
  {
    keywords: ['skill', 'skills', 'languages', 'tech', 'stack', 'database', 'framework'],
    response: `Here is Karan's technical skillset:
• <strong>Languages</strong>: C++, Python, JavaScript, HTML, CSS
• <strong>ML & GenAI</strong>: PyTorch, LangChain, FAISS, HuggingFace, Scikit-learn, Vector DBs, RAG
• <strong>Backend & APIs</strong>: FastAPI, Flask, Pydantic, REST APIs, SSE
• <strong>Databases</strong>: PostgreSQL, SQL, MongoDB, Supabase
• <strong>Cloud & DevOps</strong>: AWS, Docker, Vercel, Render, Git, GitHub`
  },
  {
    keywords: ['contact', 'email', 'phone', 'hire', 'resume', 'linkedin', 'github', 'social'],
    response: `You can reach out to Karan Kumar Dhote at:
• <strong>Email</strong>: <a href="mailto:karan.sdhote@gmail.com">karan.sdhote@gmail.com</a>
• <strong>Phone</strong>: +91-7862035856
• <strong>GitHub</strong>: <a href="https://github.com/Karan825" target="_blank" rel="noreferrer">github.com/Karan825</a>
• <strong>LinkedIn</strong>: <a href="https://linkedin.com/in/Karan" target="_blank" rel="noreferrer">linkedin.com/in/Karan</a>
• <strong>Resume</strong>: <a href="/resume.pdf" target="_blank" rel="noreferrer">Download PDF</a>`
  },
  {
    keywords: ['college', 'education', 'gpa', 'iit', 'bhu', 'degree', 'graduation'],
    response: `• <strong>College</strong>: Indian Institute of Technology (BHU) Varanasi, India.
• <strong>Degree</strong>: Bachelor of Technology (B.Tech) in Mechanical Engineering (Nov 2022 - Jun 2026).
• <strong>GPA</strong>: 8.21/10.0`
  }
];

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Karan's Assistant. I'm trained on his background, projects, experience, and achievements. How can I help you today?"
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { sender: 'user', text: textToSend }]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = textToSend.toLowerCase();
      let matchedResponse = null;

      for (const entry of KNOWLEDGE_BASE) {
        if (entry.keywords.some(keyword => lowerText.includes(keyword))) {
          matchedResponse = entry.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = `I specialize in answering questions about Karan's professional background.

Try asking me:
• "What projects has he built?"
• "Tell me about his work at MarkoAI."
• "What are his competitive programming ranks?"
• "How can I contact him?"`;
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: matchedResponse }]);
    }, 800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    if (typeof window !== 'undefined') {
      window.addEventListener('open-ai-assistant', handleOpen);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('open-ai-assistant', handleOpen);
      }
    };
  }, []);

  return (
    <StyledWidget>
      <DrawerOverlay isOpen={isOpen} onClick={() => setIsOpen(false)} />

      <DrawerContainer isOpen={isOpen}>
        <DrawerHeader>
          <div className="title-group">
            <h3>
              <span className="status-dot"></span>
              AI Assistant
            </h3>
            <p className="subtitle">Knowledge Base: Karan Kumar Dhote</p>
          </div>
          <button className="close-btn" onClick={() => setIsOpen(false)} aria-label="Close drawer">
            &times;
          </button>
        </DrawerHeader>

        <ChatBody>
          {messages.map((m, i) => (
            <MessageBubble key={i} className={m.sender} dangerouslySetInnerHTML={{ __html: m.text }} />
          ))}
          {isTyping && <TypingIndicator><span></span><span></span><span></span></TypingIndicator>}
          <div ref={chatEndRef} />

          {!isTyping && (
            <QuickChips>
              <p>Suggested queries:</p>
              <div className="chips-grid">
                <button onClick={() => handleSend("What projects has Karan built?")}>Featured Projects</button>
                <button onClick={() => handleSend("Tell me about his work experience.")}>Work Internships</button>
                <button onClick={() => handleSend("What are his competitive programming ranks?")}>Contest Achievements</button>
                <button onClick={() => handleSend("How can I contact Karan?")}>Contact Channels</button>
              </div>
            </QuickChips>
          )}
        </ChatBody>

        <ChatInputContainer onSubmit={(e) => { e.preventDefault(); handleSend(inputVal); }}>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask a question about Karan..."
          />
          <button type="submit">Ask</button>
        </ChatInputContainer>
      </DrawerContainer>
    </StyledWidget>
  );
};

export default AIAssistant;
