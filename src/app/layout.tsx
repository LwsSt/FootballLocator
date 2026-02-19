import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";
import  { Archivo_Black, Roboto_Mono } from 'next/font/google';
import './global.css';
import { lastUpdated, matchData } from '@/lib/matches';

export const metadata:Metadata = {
  title: "FOOTBALL HAZARD ALERT",
  description: "Match Avoidance System"
}

export const viewport:Viewport = {
  width: "device-width",
  initialScale: 1.0
};

const archivo = Archivo_Black({
  weight: "400",
  display: "swap"
});

const roboto = Roboto_Mono({
  weight: "700",
  display: "swap"
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { activeThreats, upcomingThreats} = getThreatData();

  return (
    <html lang="en" className={`${archivo.className} ${roboto.className}`}>
      <body className="container">
        <header>
          <h1>FOOTBALL HAZARD ALERT</h1>
          <div className="subtitle">Match Avoidance System</div>
        </header>
        <div className="status-bar">
          <div className="status-item">
            <div>ACTIVE THREATS</div>
            <span className="status-value status-value-danger">{activeThreats}</span>
          </div>
          <div className="status-item">
            <div>UPCOMING WARNINGS (next 7 days)</div>
            <span className="status-value status-value-warn">{upcomingThreats}</span>
          </div>
        </div>
        <div className="status-bar">
          <div className="status-item">
            <div>LAST UPDATED</div>
            <span className="status-value status-value-white">{lastUpdated.toLocaleString("en-GB")}</span>
          </div>
        </div>
        {/* <div className="nav-bar">
          <div className="nav-section">
            <div className="nav-label">Month:</div>
            <div className="month-filters">
              <button className="month-btn">Jan</button>
              <button className="month-btn active">Feb</button>
              <button className="month-btn">Mar</button>
              <button className="month-btn">Apr</button>
              <button className="month-btn">May</button>
              <button className="month-btn">Jun</button>
              <button className="month-btn">Jul</button>
              <button className="month-btn">Aug</button>
              <button className="month-btn">Sep</button>
              <button className="month-btn">Oct</button>
              <button className="month-btn">Nov</button>
              <button className="month-btn">Dec</button>
            </div>
          </div>
        </div> */}
        <main>
          {children}
        </main>
        <Analytics />
        <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5068605212617728" crossOrigin="anonymous" async={true} />
      </body>
    </html>
  )
}

function getThreatData():{activeThreats:number, upcomingThreats:number} {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();

  const upcomingThreshold = new Date(today);
  upcomingThreshold.setMinutes(0);
  upcomingThreshold.setHours(0);
  upcomingThreshold.setDate(today.getDate() + 8);

  const data = matchData;

  const threats = data.reduce((acc, match) => {
    const { start } = match;

    if (start.getDate() == day && start.getMonth() == month) {
      acc.current++;
    } else if (start <= upcomingThreshold) {
      acc.upcoming++;
    }

    return acc;
  }, { current:0, upcoming:0 })

  return {
    activeThreats: threats.current,
    upcomingThreats: threats.upcoming
  }
}
