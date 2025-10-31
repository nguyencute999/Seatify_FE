import React from 'react';
import styled from 'styled-components';

/*
 * AnimatedLoginButton
 * Re-usable animated SVG button. Usage:
 * <AnimatedLoginButton onClick={...}>Đăng nhập</AnimatedLoginButton>
 */
const AnimatedLoginButton = ({ children = 'Đăng nhập', ...props }) => {
  return (
    <StyledWrapper>
      <button {...props}>
        {children}
        <div className="icon-1">
          {/* Feather SVG 1 */}
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 26.3 65.33"
            style={{
              shapeRendering: 'geometricPrecision',
              textRendering: 'geometricPrecision',
              imageRendering: 'optimizeQuality',
              fillRule: 'evenodd',
              clipRule: 'evenodd'
            }}
            version="1.1"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Layer_x0020_1">
              <path
                d="M13.98 52.87c0.37,-0.8 0.6,-1.74 0.67,-2.74 1.01,1.1 2.23,2.68 1.24,3.87 -0.22,0.26 -0.41,0.61 -0.59,0.97 -2.95,5.89 3.44,10.87 2.98,0.78 0.29,0.23 0.73,0.82 1.03,1.18 0.33,0.4 0.7,0.77 1,1.15 0.29,0.64 -0.09,2.68 1.77,4.91 5.42,6.5 5.67,-2.38 0.47,-4.62 -0.41,-0.18 -0.95,-0.26 -1.28,-0.54 -0.5,-0.41 -1.23,-1.37 -1.66,-1.9 0.03,-0.43 -0.17,-0.13 0.11,-0.33 4.98,1.72 8.4,-1.04 2.38,-3.16 -1.98,-0.7 -2.9,-0.36 -4.72,0.16 -0.63,-0.58 -2.38,-3.82 -2.82,-4.76 1.21,0.56 1.72,1.17 3.47,1.3 6.5,0.5 2.31,-4.21 -2.07,-4.04 -1.12,0.04 -1.62,0.37 -2.49,0.62l-1.25 -3.11c0.03,-0.26 0.01,-0.18 0.1,-0.28 1.35,0.86 1.43,1 3.25,1.45 2.35,0.15 3.91,-0.15 1.75,-2.4 -1.22,-1.27 -2.43,-2.04 -4.22,-2.23l-2.08 0.13c-0.35,-0.58 -0.99,-2.59 -1.12,-3.3 -0.24,-0.36 1.88,1.31 2.58,1.57 1.32,0.49 2.6,0.33 3.82,0 -0.37,-1.08 -1.17,-2.31 -2.13,-3.11 -1.79,-1.51 -3.07,-1.41 -5.22,-1.38l-0.93 -4.07c0.41,-0.57 1.41,0.9 2.82,1.36 0.96,0.31 1.94,0.41 3,0.14 2,-0.52 -2.25,-4.4 -4.53,-4.71 -0.7,-0.1 -1.23,-0.04 -1.92,-0.03 -0.46,-0.82 -0.68,-3.61 -0.92,-4.74 0.8,0.88 1.15,1.54 2.25,2.23 0.8,0.5 1.58,0.78 2.57,0.85 2.54,0.18 -0.1,-3.47 -0.87,-4.24 -1.05,-1.05 -2.34,-1.59 -4.32,-1.78l-0.33 -3.49c0.83,0.67 1.15,1.48 2.3,2.16 1.07,0.63 2.02,0.89 3.58,0.79 0.15,-1.34 -1.07,-3.39 -2.03,-4.3 -1.05,-0.99 -2.08,-1.47 -3.91,-1.68l-0.07 -3.27 0.32 -0.65c0.44,0.88 1.4,1.74 2.24,2.22 0.69,0.39 2.4,1.1 3.44,0.67 0.31,-1.92 -1.84,-4.49 -3.5,-5.29 -0.81,-0.39 -1.61,-0.41 -2.18,-0.68 -0.12,-1.28 0.27,-3.23 0.37,-4.55l-0.89 0c-0.06,1.28 -0.35,3.12 -0.34,4.31 -0.44,0.45 -0.37,0.42 -0.96,0.64 -3.88,1.49 -4.86,6.38 -3.65,7.34 1.42,-0.31 3.69,-2.14 4.16,-3.66 0.23,0.5 0.1,2.36 0.05,3.05 -1.23,0.4 -2.19,1.05 -2.92,1.82 -1.17,1.24 -2.36,4.04 -1.42,5.69 1.52,0.09 4.07,-2.49 4.49,-4.07l0.29 3.18c-2.81,0.96 -5.01,3.68 -4.18,7.43 2.06,-0.09 3.78,-2.56 4.66,-4.15 0.23,1.45 0.67,3.06 0.74,4.52 -1.26,0.93 -2.37,1.8 -2.97,3.55 -0.48,1.4 -0.49,3.72 0.19,4.55 0.59,0.71 2.06,-1.17 2.42,-1.67 1,-1.35 0.81,-1.92 1.29,-2.46l0.7 3.44c-0.49,0.45 -0.94,0.55 -1.5,1.19 -1.93,2.23 -2.14,4.33 -1.01,6.92 0.72,0.09 2.04,-1.4 2.49,-2.06 0.65,-0.95 0.79,-1.68 1.14,-2.88z"
                className="fil0"
              />
            </g>
          </svg>
        </div>
        <div className="icon-2">
          {/* Feather SVG 2 */}
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 11.67 37.63"
            style={{
              shapeRendering: 'geometricPrecision',
              textRendering: 'geometricPrecision',
              imageRendering: 'optimizeQuality',
              fillRule: 'evenodd',
              clipRule: 'evenodd'
            }}
            version="1.1"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.63 35.26c-0.02,0.13 0.01,0.05 -0.06,0.14 -0,0 -0.08,0.07 -0.11,0.1 -0.42,0.25 -0.55,0.94 -0.23,1.4 0.68,0.95 2.66,0.91 3.75,0.21 0.2,-0.13 0.47,-0.3 0.57,-0.49l-1.35 -1.24c-0.78,-0.78 -1.25,-1.9 -2.07,-0.62 -0.11,0.18 -0.06,0.16 -0.22,0.26l-1.26 -2.59 1.99 0.28c0.56,-0.07 1.33,-0.42 1.62,-0.71l0.1 -0.1c-0.74,-0.68 -1.09,-1.2 -1.65,-1.99 -1.09,-1.52 -1.2,-0.28 -1.92,0.17 -0.26,-0.79 -0.73,0.2 -0.12,-2.76 0.06,-0.3 0.19,-0.7 0.2,-0.98 0.18,0.08 0.01,-0.01 0.11,0.08 0.05,0.05 0.07,0.07 0.1,0.12 0.94,1.17 3.63,0.82 4.21,0.01 0.13,-0.02 0.06,0.03 0.1,-0.1 -1.14,-0.81 -1.91,-2.89 -2.58,-2.67 -0.29,0.09 -0.78,0.63 -0.93,0.87 -0.54,-0.48 -0.36,-0.63 -0.38,-0.81 0.01,-0.01 0.03,-0.04 0.03,-0.03 0.01,0.02 0.36,-0.35 0.45,-0.6 0.13,-0.35 0.04,-0.65 -0.05,-0.95 0.06,-0.41 0.33,-1.33 0.28,-1.71 0.22,-0.05 0.19,0.05 0.45,0.17 0.47,0.23 1.17,0.33 1.7,0.32 0.62,-0 1.74,-0.39 1.94,-0.75l-1.62 -1.92c-0.58,-0.81 -0.9,-1.27 -1.9,0.12 -0.44,-0.5 -0.64,-0.69 -0.66,-1.24 0.02,-0.31 0.15,-0.36 0.08,-0.73 -0.04,-0.24 -0.14,-0.41 -0.29,-0.59l-0.47 -2.54 2.45 0.02 1.95,-0.15c0.57,-0.19 1.53,-0.8 1.68,-1.18z"
              className="fil0"
            />
          </svg>
        </div>
        <div className="icon-3">
          {/* Feather SVG 3 */}
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 25.29 76.92"
            style={{
              shapeRendering: 'geometricPrecision',
              textRendering: 'geometricPrecision',
              imageRendering: 'optimizeQuality',
              fillRule: 'evenodd',
              clipRule: 'evenodd'
            }}
            version="1.1"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.14 6.58c0.09,0.1 -0.02,0.03 0.17,0.15 0.04,0.03 0.19,0.09 0.27,0.13l0.16 0.02c0.12,0.14 0.02,0.06 0.22,0.18 0.63,0.37 1.81,0.52 2.51,0.53 0.42,-0.26 0.61,-1.58 0.55,-2.27 -0.11,-1.17 -1.02,-3.42 -2.17,-3.76 -0.84,-0.25 -1.19,0.02 -1.4,0.7l-0.27 0.28c-0.18,-0.36 -0.77,-0.97 -1.2,-1.18 -0.64,-0.31 -0.36,-0.26 -0.84,-1.59l-0.75 0 1.19 3.97c-0.21,0.36 -0.43,0.5 -0.31,1.1 0.11,0.51 0.35,0.71 0.76,0.9l0.39 1.78c-0.68,0.24 -1.38,0.85 -1.62,1.43 -0.45,-0.47 -0.29,-1.59 -1.59,-1.22 -0.8,0.22 -1.09,0.8 -1.45,1.52 -0.58,1.18 -0.96,2.15 -0.6,3.58 0.65,0.99 2.99,-1.09 4.13,-1.55 0.22,-0.13 0.65,-0.39 0.79,-0.62 0.74,-1.2 -0.74,-2.14 -1.7,-2.43z"
              className="fil0"
            />
          </svg>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    position: relative;
    padding: 10px 30px;
    background: #000080;
    font-size: 17px;
    font-weight: 500;
    color: #ffffff;
    cursor: pointer;
    border: 1px solid #000080;
    border-radius: 8px;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
    overflow:hidden;
    
    /* leaf color */
    svg path {
      fill: #28a745;
    }
  }

  button:hover {
    border: 1px solid #00006a;
    background: linear-gradient(85deg, #000080, #00006a, #00008f, #00006a, #000080);
    );
    animation: wind 2s ease-in-out infinite;
  }

  @keyframes wind {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 50% 100%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .icon-1,
  .icon-2,
  .icon-3 {
    position: absolute;
    top: 0;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.35));
  }

  .icon-1 {
    right: 0;
    width: 25px;
    transform-origin: 0 0;
    transform: rotate(10deg);
    transition: all 0.5s ease-in-out;
  }
  button:hover .icon-1 {
    animation: slay-1 3s cubic-bezier(0.52, 0, 0.58, 1) infinite;
  }
  @keyframes slay-1 {
    0% {
      transform: rotate(10deg);
    }
    50% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(10deg);
    }
  }

  .icon-2 {
    left: 25px;
    width: 12px;
    transform-origin: 50% 0;
    transform: rotate(10deg);
    transition: all 1s ease-in-out;
  }
  button:hover .icon-2 {
    animation: slay-2 3s cubic-bezier(0.52, 0, 0.58, 1) 1s infinite;
    transform: rotate(0);
  }
  @keyframes slay-2 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(15deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  .icon-3 {
    left: 0;
    width: 18px;
    transform-origin: 50% 0;
    transform: rotate(-5deg);
    transition: all 1s ease-in-out;
  }
  button:hover .icon-3 {
    animation: slay-3 2s cubic-bezier(0.52, 0, 0.58, 1) 1s infinite;
    transform: rotate(0);
  }
  @keyframes slay-3 {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-5deg);
    }
    100% {
      transform: rotate(0);
    }
  }
`;

export default AnimatedLoginButton;
