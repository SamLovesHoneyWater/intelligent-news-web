// app/panel/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import styles from './panel.module.css';

interface NewsItem {
  title: string;
  description: string;
  image_url: string;
  article_url: string;
}

interface StockNews {
  [symbol: string]: NewsItem[];
}

const PanelPageUnsuspense = () => {
  const searchParams = useSearchParams();
  const stocks = searchParams.get('stocks')?.split(',') || [];
  const [newsData, setNewsData] = useState<StockNews>({});

  useEffect(() => {
    const fetchNewsForSymbols = async () => {
      const newsPromises = stocks.map(async (symbol) => {
        try {
          const response = await fetch(`/api/ticker_news?symbol=${symbol}`);
          if (!response.ok) {
            return { 
              [symbol]: [{ 
                title: "SERVER_ERROR",
                description: `Server returned error code: ${response.status}`,
                image_url: "",
                article_url: ""
              }] 
            };
          }
          const data = await response.json();
          return { [symbol]: data };
        } catch (error) {
          return { [symbol]: [{ 
            title: "CONNECTION_FAILED",
            description: "Please check if the news server is running",
            image_url: "" ,
            article_url: ""
          }]};
        }
      });

      const results = await Promise.all(newsPromises);
      const combinedNews = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setNewsData(combinedNews);
    };

    fetchNewsForSymbols();
  }, []);

  useEffect(() => {
    // Create and load TradingView widgets for each stock
    stocks.forEach((symbol) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
      script.innerHTML = JSON.stringify({
        "symbol": `${symbol}`,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "1D",
        "colorTheme": "dark",
        "isTransparent": true,
        "autosize": true,
        "largeChartUrl": "",
        "chartOnly": false
      });

      const container = document.getElementById(`tradingview-widget-${symbol}`);
      if (container) {
        // Clear existing content
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        
        // Create new widget container structure
        const widgetContainer = document.createElement('div');
        widgetContainer.className = 'tradingview-widget-container';
        
        const widget = document.createElement('div');
        widget.className = 'tradingview-widget-container__widget';
        
        //const copyright = document.createElement('div');
        //copyright.className = 'tradingview-widget-copyright';
        //copyright.innerHTML = '<a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span class="blue-text">Track all markets on TradingView</span></a>';
        
        widgetContainer.appendChild(widget);
        //widgetContainer.appendChild(copyright);
        widgetContainer.appendChild(script);
        
        container.appendChild(widgetContainer);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scrollIndicator}>
        <button 
          className={styles.scrollButton}
          onClick={() => {
        const container = document.querySelector(`.${styles.columnsContainer}`);
        if (container) {
          container.scrollBy({ left: 300, behavior: 'smooth' });
        }
          }}
        >
          Scroll Right →
        </button>
      </div>
      <div className={styles.columnsContainer}>
        {stocks.map((symbol) => (
          <div key={symbol} className={styles.column}>
            <div className={styles.symbolHeader}>
              <h2>{symbol}</h2>
            </div>
            
            {/* TradingView Widget Container */}
            <div id={`tradingview-widget-${symbol}`} className={styles.widgetContainer}>
              {/* Widget will be dynamically inserted here */}
            </div>

            {/* News Section */}
            <div className={styles.newsContainer}>
                {!newsData[symbol] ? (
                <div className={styles.loading}>Loading...</div>
                ) : newsData[symbol].length === 0 ? (
                <div className={styles.noNews}>No news available for {symbol}</div>
                ) : newsData[symbol][0]?.title === "CONNECTION_FAILED" ? (
                <div className={styles.errorMessage}>
                  Unable to connect to news service, please try again later
                </div>
                ) : newsData[symbol][0]?.title === "SERVER_ERROR" ? (
                <div className={styles.errorMessage}>
                  News service is currently unavailable.
                </div>
                ) : (
                newsData[symbol].map((news, index) => (
                <article key={index} className={styles.newsItem}>
                  <a 
                  href={news.article_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.newsLink}
                  >
                  <div className={styles.newsContent}>
                  <img 
                  src={news.image_url || '/placeholder.png'} 
                  alt={news.title}
                  className={styles.newsImage}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.png';
                  }}
                  />
                  <div className={styles.newsText}>
                  <h3 className={styles.newsTitle}>{news.title}</h3>
                  <p className={styles.newsDescription}>{news.description}</p>
                  </div>
                  </div>
                  </a>
                </article>
                ))
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PanelPage() {
  return (
    <Suspense>
      <PanelPageUnsuspense />
    </Suspense>
  );
}