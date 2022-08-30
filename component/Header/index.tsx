import React, { FC } from 'react';
import './Header.css';

interface HeaderProps {
  isDisabled: boolean;
  connectedChainId: number;
  connectedChainName: string;
  connectedEnsAddress: string | undefined;
  requestAccount: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  const { isDisabled, connectedChainId, connectedChainName, connectedEnsAddress, requestAccount } =
    props;

  return (
    <>
      <div className="header-container">
        <div className="header-flex-row-center">
          <button className="connect-btn" onClick={requestAccount} disabled={isDisabled}>
            Connect Wallet
          </button>
          <div className="header-details medium-title">
            <div>
              <span>Connected Chain ID: </span>
              <span>{connectedChainId}</span>
            </div>
            <div>
              <span>Connected Chain Name: </span>
              <span>{connectedChainName}</span>
            </div>
            <div>
              <span>Connected Chain ENS Address: </span>
              <span className="font-small">{connectedEnsAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
