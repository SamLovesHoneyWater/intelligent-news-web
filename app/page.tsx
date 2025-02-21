"use client";

import Image from "next/image";
import { useState } from 'react';

const stocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', exchange: 'NasdaqGS-US' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'META', name: 'Meta Platforms, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', exchange: 'NasdaqGS-US' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'ADBE', name: 'Adobe Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'CRM', name: 'Salesforce Inc.', exchange: 'NYSE-US' },
  { symbol: 'INTC', name: 'Intel Corporation', exchange: 'NasdaqGS-US' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'AMD', name: 'Advanced Micro Devices Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'IBM', name: 'International Business Machines', exchange: 'NYSE-US' },
  { symbol: 'NOW', name: 'ServiceNow, Inc.', exchange: 'NYSE-US' },
  { symbol: 'ORCL', name: 'Oracle Corporation', exchange: 'NYSE-US' },
  { symbol: 'LYFT', name: 'Lyft, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'UBER', name: 'Uber Technologies, Inc.', exchange: 'NYSE-US' },
  { symbol: 'SNAP', name: 'Snap Inc.', exchange: 'NYSE-US' },
  { symbol: 'TWTR', name: 'Twitter, Inc.', exchange: 'NYSE-US' },
  { symbol: 'PINS', name: 'Pinterest, Inc.', exchange: 'NYSE-US' },
  { symbol: 'ZM', name: 'Zoom Video Communications', exchange: 'NasdaqGS-US' },
  { symbol: 'SHOP', name: 'Shopify Inc.', exchange: 'NYSE-US' },
  { symbol: 'SQ', name: 'Block Inc.', exchange: 'NYSE-US' },
  { symbol: 'PYPL', name: 'PayPal Holdings Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'COIN', name: 'Coinbase Global Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'HOOD', name: 'Robinhood Markets, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'DUOL', name: 'Duolingo, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'ABNB', name: 'Airbnb, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'DASH', name: 'DoorDash, Inc.', exchange: 'NYSE-US' },
  { symbol: 'RBLX', name: 'Roblox Corporation', exchange: 'NYSE-US' },
  { symbol: 'U', name: 'Unity Software Inc.', exchange: 'NYSE-US' },
  { symbol: 'NET', name: 'Cloudflare, Inc.', exchange: 'NYSE-US' },
  { symbol: 'PLTR', name: 'Palantir Technologies Inc.', exchange: 'NYSE-US' },
  { symbol: 'CFLT', name: 'Confluent, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'SNOW', name: 'Snowflake Inc.', exchange: 'NYSE-US' },
  { symbol: 'ROKU', name: 'Roku, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'SPOT', name: 'Spotify Technology S.A.', exchange: 'NYSE-US' },
  { symbol: 'CRWD', name: 'CrowdStrike Holdings, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'DOCU', name: 'DocuSign, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'DDOG', name: 'Datadog, Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'CRSP', name: 'CRISPR Therapeutics AG', exchange: 'NasdaqGS-US' },
  { symbol: 'TDOC', name: 'Teladoc Health, Inc.', exchange: 'NYSE-US' },
  { symbol: 'AAL', name: 'American Airlines Group Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'DAL', name: 'Delta Air Lines Inc.', exchange: 'NYSE-US' },
  { symbol: 'UAL', name: 'United Airlines Holdings Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'LUV', name: 'Southwest Airlines Co.', exchange: 'NYSE-US' },
  { symbol: 'GM', name: 'General Motors Company', exchange: 'NYSE-US' },
  { symbol: 'F', name: 'Ford Motor Company', exchange: 'NYSE-US' },
  { symbol: 'TM', name: 'Toyota Motor Corporation', exchange: 'NYSE-US' },
  { symbol: 'HMC', name: 'Honda Motor Co. Ltd.', exchange: 'NYSE-US' },
  { symbol: 'NIO', name: 'NIO Inc.', exchange: 'NYSE-US' },
  { symbol: 'LI', name: 'Li Auto Inc.', exchange: 'NasdaqGS-US' },
  { symbol: 'XPEV', name: 'XPeng Inc.', exchange: 'NYSE-US' }
];

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [watchlist, setWatchlist] = useState<{ symbol: string; name: string; exchange: string }[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const addToWatchlist = (stock: { symbol: string; name: string; exchange: string }) => {
    if (!watchlist.includes(stock)) {
      setWatchlist([...watchlist, stock]);
    }
  };

  const filteredStocks = stocks.filter(stock => {
    const search = searchTerm.toLowerCase().trim();
    return stock.symbol.toLowerCase().includes(search) || 
           stock.name.toLowerCase().includes(search) ||
           stock.name.toLowerCase().split(' ').some(word => word.startsWith(search));
  });

  return (
    <div className="interactive_block_container">
      <div className="stocks_search_bar_container">
        <input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded bg-gray-700 text-white"
        />
        {searchTerm && (
          <ul className="stocks_search_result_list_container">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
              <li key={stock.symbol} className="stock_search_result_container">
                <button
                  onClick={() => {
                  addToWatchlist(stock);
                  setSearchTerm('');
                  }}
                  className="px-3 py-1 mr-2 text-sm bg-blue-600 hover:bg-blue-700 
                  text-white rounded-full transition-colors duration-200 
                  flex items-center space-x-1"
                >
                  <span>+</span>
                  <span>Add</span>
                </button>
                <span className="text-white">({stock.symbol}) {stock.name}</span>
              </li>
              ))
            ) : (
              <p className="stock_search_result_container">No results found</p>
            )}
          </ul>
        )}
      </div>
      <h3 className="text-lg font-bold" style={{margin: '20px 0 0 20px' }}>My Watchlist</h3>
      <div className="watchlist_container ">
        {watchlist.length > 0 ? (
          <ul>
        {watchlist.map((stock) => (
          <li key={stock.symbol} className="watchlist_item flex justify-between items-center">
            <span>({stock.symbol}) {stock.name}</span>
            <button
            onClick={() => setWatchlist(watchlist.filter(item => item.symbol !== stock.symbol))}
            className="text-gray-600 hover:text-gray-400"
            >
            ✕
            </button>
          </li>
        ))}
          </ul>
        ) : (
        <p className="watchlist_item text-gray-500">
          Add something to your watchlist to get started.
        </p>
        )}
      </div>
      <a
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        href={`/panel?stocks=${watchlist.map(stock => stock.symbol).join(',')}`}
      >
        <Image
          className="dark:invert"
          src="/vercel.svg"
          alt="Vercel logomark"
          width={20}
          height={20}
        />
        Get curated news
      </a>

    </div>
  );
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="split_screen_container">
        <div className="title_container sm:w-2/3 w-full">
          <h1 className="text-3xl sm:text-4xl font-bold flex items-center gap-2">
        📈 Intelligent Market News
          </h1>
          <div className="text-base font-[family-name:var(--font-geist-mono)]">
        <p className="mb-4 text-lg sm:text-xl" style={{ fontWeight: 600, whiteSpace: 'normal' }}>
          Our LLM Agents filter through stock news and curate a list of the most important news for your portfolio.
        </p>
          </div>
          
          <div className="text-base font-[family-name:var(--font-geist-mono)]">
        <p className="mb-2">
          Missed out on market events because you didn't see the news? 🤦‍♂️
        </p>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
        <p className="mb-2">
          Tired of low-quality news sources? 🤷‍♀️
        </p>
        <p className="mb-2">
          Want market news that are actually RELEVANT to your portfolio?
        </p>
        
        <p className="mb-2">
          We can help!
        </p>
          </div>
        </div>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
          >
        See our news dashboard
          </a> */}
        </div>
        
        <div className="w-full sm:w-1/3 sm:ml-8">
          <Watchlist />
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="mailto:binruih@uchicago.edu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/email.svg"
            alt="Email icon"
            width={16}
            height={16}
          />
          Provide Feedback →
        </a>
      </footer>
    </div>
  );
}
