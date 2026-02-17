import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head ></Head>
      <body className="antialiased">
        <div className="container">
          <header>
              <h1>FOOTBALL HAZARD ALERT</h1>
              <div className="subtitle">Real-time Match Avoidance System</div>
          </header>
          <div className="status-bar">
              <div className="status-item">
                  <div>ACTIVE THREATS</div>
                  <span className="status-value status-value-danger">3</span>
              </div>
              <div className="status-item">
                  <div>UPCOMING WARNINGS</div>
                  <span className="status-value status-value-warn">2</span>
              </div>
          </div>
          <div className="status-bar">
              <div className="status-item">
                  <div>LAST UPDATED</div>
                  <span className="status-value status-value-white">14:32:07</span>
              </div>
          </div>
          <div className="nav-bar">
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
          </div>
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
