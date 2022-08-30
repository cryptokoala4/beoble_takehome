import { ethers, providers } from 'ethers';
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import SearchEnsInput from '../component/SearchEnsInput';
import UserCard from '../component/UserCard';
import './App.css';

declare global {
  interface Window {
    ethereum: providers.ExternalProvider;
  }
}

interface FetchedUserDetails {
  onSearchedEnsAvatar: string | null | undefined;
  formatOnSearchWalletBalance: string;
  onSearchedWalletAddress: string | undefined;
  searchedUser: string;
}

const App = () => {
  const [connected, setConnected] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const [promptMetaMask, setPromptMetaMask] = useState<boolean>(false);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState<string>('');
  const [connectedWalletBalance, setConnectedWalletBalance] = useState<string>('');
  const [connectedChainId, setConnectedChainId] = useState<number>(0);
  const [connectedChainName, setConnectedChainName] = useState<string>('');
  const [connectedEnsAddress, setConnectedEnsAddress] = useState<string | undefined>('');
  const [searchedEnsAvatar, setSearchedEnsAvatar] = useState<string | null | undefined>('');
  const [searchedEnsName, setSearchedEnsName] = useState<string>('');
  const [searchedWalletAddress, setSearchedWalletAddress] = useState<string | undefined>('');
  const [searchedWalletBalance, setSearchedWalletBalance] = useState<string>('');
  const [getProvider, setGetProvider] = useState<ethers.providers.JsonRpcProvider>();
  const [getSigner, setGetSigner] = useState<ethers.Signer | undefined>();

  function hasEthereum() {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  }

  async function startProvider() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      await connectToMetaMask(provider, signer);
      setGetProvider(provider);
      setGetSigner(signer);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!hasEthereum()) {
      setPromptMetaMask(true);
      return;
    } else {
      startProvider();
    }
  }, []);

  async function requestAccount() {
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
    } catch (e) {
      alert(
        'Please connect to MetaMask. Make sure the MetaMask popup window is closed before connecting again.'
      );
    }
  }

  async function connectToMetaMask(
    provider: ethers.providers.JsonRpcProvider,
    signer: ethers.Signer
  ) {
    try {
      setConnected(true);
      const signerAddress = await signer.getAddress();
      const balance = await provider.getBalance(signerAddress);
      const { chainId, ensAddress, name } = await provider.getNetwork();
      setConnectedWalletBalance(`${balance}`);
      setConnectedWalletAddress(signerAddress);
      setConnectedChainId(chainId);
      setConnectedChainName(name);
      setConnectedEnsAddress(ensAddress);
      if (chainId) {
        setDisabled(true);
      }
    } catch (err) {
      console.error('err', err);
      return;
    }
  }

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        connectToMetaMask(getProvider, getSigner);
      });
      window.ethereum.on('accountsChanged', () => {
        connectToMetaMask(getProvider, getSigner);
      });
    }
  }, [getProvider]);

  const onSearchedInput = (searchedUser: string) => {
    getSearchedUserDetails(searchedUser);
  };

  async function getSearchedUserDetails(searchedUser: string) {
    try {
      setLoading(true);
      const [onSearchedEnsAvatar, onSearchWalletBalance, onSearchedWalletAddress] =
        await Promise.all([
          await getProvider?.getAvatar(searchedUser),
          await getProvider?.getBalance(searchedUser),
          await getProvider?._getAddress(searchedUser)
        ]);
      const formatOnSearchWalletBalance = ethers.utils.formatEther(onSearchWalletBalance || '0');
      const fetchedUserDetails = {
        onSearchedEnsAvatar,
        formatOnSearchWalletBalance,
        onSearchedWalletAddress,
        searchedUser
      };
      setSearchedUserDetails(fetchedUserDetails);
    } catch (err) {
      console.error('err', err);
      return;
    }
  }

  function setSearchedUserDetails(fetchedUserDetails: FetchedUserDetails) {
    const {
      onSearchedEnsAvatar,
      formatOnSearchWalletBalance,
      onSearchedWalletAddress,
      searchedUser
    } = fetchedUserDetails;
    setSearchedEnsAvatar(onSearchedEnsAvatar);
    setSearchedWalletAddress(onSearchedWalletAddress);
    setSearchedWalletBalance(`${formatOnSearchWalletBalance}`);
    setSearchedEnsName(searchedUser);
    setLoading(false);
  }

  return (
    <>
      {promptMetaMask ? (
        <div className="missing-metamask">Please install to MetaMask</div>
      ) : (
        <>
          <Header
            isDisabled={isDisabled}
            connectedChainId={connectedChainId}
            connectedChainName={connectedChainName}
            connectedEnsAddress={connectedEnsAddress}
            requestAccount={requestAccount}
          />
          <SearchEnsInput onSearchedInput={onSearchedInput} />
          <UserCard
            getSigner={getSigner}
            connected={connected}
            loading={loading}
            connectedWalletAddress={connectedWalletAddress}
            connectedWalletBalance={connectedWalletBalance}
            searchedEnsName={searchedEnsName}
            searchedEnsAvatar={searchedEnsAvatar}
            searchedWalletAddress={searchedWalletAddress}
            searchedWalletBalance={searchedWalletBalance}
          />
        </>
      )}
    </>
  );
};

export default App;
