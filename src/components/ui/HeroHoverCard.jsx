import React from 'react';
import styled from 'styled-components';

/* HeroHoverCard – full-width variant of HoverCard to hold large content */
const HeroHoverCard = ({ children, className = '', ...props }) => {
  return (
    <Wrapper className={className} {...props}>
      <div className="box">
        <span />
        <div className="content">
          {children}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .box {
    position: relative;
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
  }

  /* glow panels */
  .box::before,
  .box::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #ff0066 0%, #ff6600 100%);
    border-radius: 12px;
    transform: skewX(0deg);
    transition: 0.5s;
    filter: blur(35px);
    opacity: 0.35;
  }
  .box::after {
    filter: blur(55px);
    opacity: 0.15;
  }

  /* floating lights */
  .box span {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }
  .box span::before,
  .box span::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    animation: float 6s ease-in-out infinite;
  }
  .box span::before {
    top: -60px;
    left: 50px;
  }
  .box span::after {
    bottom: -60px;
    right: 50px;
    animation-delay: -3s;
  }

  .box .content {
    position: relative;
    width: 100%;
    padding: 60px 40px;
    background: rgba(255, 102, 0, 0.12);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.08) inset;
    backdrop-filter: blur(10px);
    border-radius: 12px;
    z-index: 1;
    color: #fff;
    text-align: center;
  }

  @keyframes float {
    0%, 100% { transform: translateY(15px); }
    50% { transform: translateY(-15px); }
  }
`;

export default HeroHoverCard;
