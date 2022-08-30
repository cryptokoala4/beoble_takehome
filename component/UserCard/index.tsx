import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import { ethers } from 'ethers';
import './UserCard.css';

interface UserCardProps {
  loading: boolean;
  getSigner: ethers.Signer | undefined;
  connected: boolean;
  searchedEnsName: string;
  searchedEnsAvatar: string | null | undefined;
  searchedWalletAddress: string | undefined;
  searchedWalletBalance: string;
  connectedWalletAddress: string;
  connectedWalletBalance: string;
}

const UserCard: FC<UserCardProps> = (props) => {
  const [signedMsgInput, setSignedMsgInput] = useState<string>('');
  const [signedMsgOutput, setSignedMsgOutput] = useState<string | undefined>('');
  const {
    connected,
    searchedEnsName,
    searchedEnsAvatar,
    searchedWalletBalance,
    searchedWalletAddress,
    connectedWalletAddress,
    connectedWalletBalance,
    loading,
    getSigner
  } = props;

  const handleChangeSignedMessage = (ev: ChangeEvent<HTMLInputElement>) => {
    setSignedMsgInput(ev.target.value);
  };

  const signMessage = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const signedMsg = await getSigner?.signMessage(signedMsgInput);
      setSignedMsgOutput(signedMsg);
    } catch (err) {
      console.error('err', err);
      return;
    }
  };

  return (
    <>
      {connected ? (
        <>
          <div className="card-container" style={{ opacity: loading ? 0.5 : 1 }}>
            <main className="card">
              <div>
                <div className="big-title-wrapper">
                  <div>
                    <h1 className="font-large">ENS Name</h1>
                    <div className="small-title">
                      {' '}
                      {searchedEnsName ? searchedEnsName : 'Searched User ENS Name'}
                    </div>
                  </div>
                  <div>
                    <h1 className="font-large">ENS Avatar</h1>
                    <div>
                      {searchedEnsAvatar ? (
                        <img src={searchedEnsAvatar} alt="Profile" className="image-ens" />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div>
                    <h1 className="font-large">Balance</h1>
                    <div className="small-title">
                      {' '}
                      {searchedWalletBalance
                        ? Number(searchedWalletBalance).toFixed(4)
                        : 'Searched User Balance'}
                    </div>
                  </div>
                </div>
                <div className="flex-column-center">
                  <h1 className="font-large">Address</h1>
                  <div className="small-title">
                    {searchedWalletAddress
                      ? searchedWalletAddress
                      : 'Searched User Address'}
                  </div>
                </div>
              </div>
            </main>
          </div>
          <div className="card-container pt-40">
            <main className="card">
              <div className="flex-column big-title-wrapper">
                <div>
                  <h1 className="font-large">My Address</h1>
                  <div className="small-title">{connectedWalletAddress}</div>
                </div>
                <div>
                  <h1 className="font-large">My Balance</h1>
                  <div className="small-title">{connectedWalletBalance}</div>
                </div>

                <form onSubmit={signMessage} style={{ paddingTop: 20 }}>
                  <div className="flex-row-center">
                    <input
                      className="input"
                      type="input"
                      id="signbox"
                      placeholder="Sign a message"
                      onChange={handleChangeSignedMessage}
                    />
                    <button type="submit" className="confirm-button">
                      Confirm
                    </button>
                  </div>
                  <div className="small-title mt-20">
                    <span className="p-20" style={{ wordBreak: 'break-all' }}>
                      {signedMsgOutput}
                    </span>
                  </div>
                </form>
              </div>
            </main>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default UserCard;
