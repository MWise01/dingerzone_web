"use client";

import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Image from "next/image";

export default function GettingStartedPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#080A19]">
      {/* Reuse the main site header */}
      <Header />

      {/* Centered content area */}
      <main className="flex-1 flex justify-center px-4 py-8 md:px-8 md:py-12">
        <div className="w-full max-w-5xl">
          <GettingStartedAndAdvancedGuide />
        </div>
      </main>

      {/* Reuse the main site footer */}
      <Footer />
    </div>
  );
}

const GettingStartedAndAdvancedGuide: React.FC = () => {
  return (
    <div className="guide-root">
      <div className="guide-card">
        {/* HEADER */}
        <header className="guide-header">
          <div className="guide-header-left">
            <h1 className="guide-title">DINGERZONE</h1>
            <p className="guide-subtitle">
              Train Smarter. Play Harder. AI-powered baseball swing tips for
              players, parents &amp; coaches.
            </p>
          </div>
          <div className="guide-pill">
            Getting Started &amp; Advanced Features
          </div>
        </header>

        <div className="guide-accent-bar" />

        <main className="guide-content">
          {/* =============== GETTING STARTED =============== */}
          <section id="getting-started" className="section">
            <h2 className="section-title">Getting Started</h2>
            <p className="section-subtitle">
              New to DingerZone? Start here to download the app, create your
              account, and upload your first swings.
            </p>

            {/* STEP 1 */}
            <article className="step-card">
              <div className="step-pill">
                <div className="step-number">1</div>
                <div className="step-label">Get the App</div>
              </div>
              <div className="step-body-row">
                <div className="step-text">
                  <p>
                    Download <strong>DingerZone</strong> from the Apple App
                    Store:
                  </p>
                  <p className="mt-1">
                    <a
                      href="https://apple.co/3Js2maF"
                      target="_blank"
                      rel="noreferrer"
                      className="link"
                    >
                      https://apple.co/3Js2maF
                    </a>
                  </p>
                  <p className="mt-2">
                    Open the app to begin setting up your account.
                  </p>
                  <div className="tip-box">
                    Tip: Turn on automatic app updates so you always have the
                    latest features and improvements.
                  </div>
                </div>
                <div className="step-media">
                  <Image
                    src="/assets/images/dz_app_store.png"
                    alt="DingerZone app listing in the Apple App Store"
                    width={220}
                    height={440}
                    // className="phone-shot"
                  />
                </div>
              </div>
            </article>

            {/* STEP 2 */}
            <article className="step-card">
              <div className="step-pill">
                <div className="step-number">2</div>
                <div className="step-label">
                  Create Account &amp; Manage Subscription
                </div>
              </div>
              <div className="step-body-row">
                <div className="step-text">
                  <p>Create your login and unlock full AI-powered analysis.</p>
                  <ul className="step-list">
                    <li>
                      From the sign-in screen, choose to create a new account.
                    </li>
                    <li>Enter your email and a secure password.</li>
                    <li>
                      Open <strong>More &gt; Manage Subscription</strong> to
                      pick your plan.
                    </li>
                  </ul>
                  <div className="tip-box">
                    You can update or cancel your subscription any time from{" "}
                    <strong>Manage Subscription</strong>.
                  </div>
                </div>
                <div className="step-media step-media-column">
                  <Image
                    src="/assets/images/dz_sign_in.png"
                    alt="DingerZone sign-in screen"
                    width={200}
                    height={420}
                    className="phone-shot"
                  />
                  <Image
                    src="/assets/images/dz_manage_subscription.png"
                    alt="Subscription management screen"
                    width={200}
                    height={420}
                    className="phone-shot"
                  />
                </div>
              </div>
            </article>

            {/* STEP 3 */}
            <article className="step-card">
              <div className="step-pill">
                <div className="step-number">3</div>
                <div className="step-label">Create Player</div>
              </div>
              <div className="step-body-row">
                <div className="step-text">
                  <p>Set up at least one player for your account.</p>
                  <ul className="step-list">
                    <li>
                      Go to <strong>More &gt; My Players &gt; Add Player</strong>.
                    </li>
                    <li>
                      Enter their name, DOB, throwing hand, and batting side.
                    </li>
                    <li>Save to create their player profile.</li>
                  </ul>
                  <div className="tip-box">
                    Players can be assigned to multiple teams — great for
                    travel, rec, and school ball.
                  </div>
                </div>
                <div className="step-media step-media-column">
                  <Image
                    src="/assets/images/dz_create_player.png"
                    alt="Create player screen in DingerZone"
                    width={200}
                    height={420}
                    className="phone-shot"
                  />
                </div>
              </div>
            </article>

            {/* STEP 4 */}
            <article className="step-card">
              <div className="step-pill">
                <div className="step-number">4</div>
                <div className="step-label">Join Team</div>
              </div>
              <div className="step-body-row">
                <div className="step-text">
                  <p>Connect your player to the right team.</p>
                  <ul className="step-list">
                    <li>
                      Open <strong>More &gt; My Teams</strong>.
                    </li>
                    <li>
                      Use <strong>Pending Invites</strong> to accept your coach&apos;s
                      invite.
                    </li>
                    <li>
                      Assign the correct player when prompted so their swings
                      are linked to that team.
                    </li>
                  </ul>
                </div>
                <div className="step-media step-media-column">
                  <Image
                    src="/assets/images/dz_teams.png"
                    alt="Teams and invites screen"
                    width={200}
                    height={420}
                    className="phone-shot"
                  />
                </div>
              </div>
            </article>

            {/* STEP 5 */}
            <article className="step-card">
              <div className="step-pill">
                <div className="step-number">5</div>
                <div className="step-label">Upload Swings</div>
              </div>
              <div className="step-body-row">
                <div className="step-text">
                  <p>Send your first clips to the plate.</p>
                  <ul className="step-list">
                    <li>
                      Tap the <strong>Upload</strong> tab.
                    </li>
                    <li>
                      Select your player and choose up to{" "}
                      <strong>5 clips</strong> from your camera roll.
                    </li>
                    <li>Confirm to start AI processing.</li>
                  </ul>
                  <div className="tip-box tip-box-accent">
                    Filming tips: portrait mode, full body in frame, 5–10 second
                    clips, 1 swing per video, 60 fps if possible.
                  </div>
                </div>
                <div className="step-media">
                  <Image
                    src="/assets/images/dz_upload_swings.png"
                    alt="Upload swings screen"
                    width={220}
                    height={440}
                    className="phone-shot"
                  />
                </div>
              </div>
            </article>
          </section>

          {/* =============== DIVIDER =============== */}
          <div className="divider" />

          {/* =============== ADVANCED FEATURES =============== */}
          <section id="advanced-features" className="section">
            <h2 className="section-title">Advanced Features Guide</h2>
            <p className="section-subtitle">
              Once the basics are dialed in, use these tools to organize teams,
              go deeper on swings, leave rich feedback, and share highlight
              clips.
            </p>

            <div className="feature-grid">
              {/* FEATURE 1: CREATE TEAM */}
              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-number">1</div>
                  <div>
                    <div className="feature-title">Create Team</div>
                    <div className="feature-tagline">
                      Build your squad — coaches, players &amp; parents all in
                      one place.
                    </div>
                  </div>
                </div>
                <div className="feature-body-row">
                  <div className="feature-text">
                    <ul className="feature-list">
                      <li>
                        Tap <strong>More &gt; My Teams &gt; Add Team</strong>.
                      </li>
                      <li>Enter team name, age group, and season.</li>
                      <li>Add members by email (auto-invites sent).</li>
                      <li>Save to unlock the team dashboard.</li>
                    </ul>
                    <div className="tip-box">
                      Use clear names like{" "}
                      <strong>&quot;Club – Age – Season&quot;</strong> (e.g.,
                      &quot;NOVA Premier 14U – Spring 2026&quot;) so everyone
                      knows exactly which team to join.
                    </div>
                    <div className="chip-row">
                      <span className="chip">Coaches</span>
                      <span className="chip">Multi-player families</span>
                      <span className="chip">Program admins</span>
                    </div>
                  </div>
                  <div className="feature-media">
                    <Image
                      src="/assets/images/dz_create_team.png"
                      alt="Team dashboard in DingerZone"
                      width={220}
                      height={440}
                      className="phone-shot"
                    />
                  </div>
                </div>
              </article>

              {/* FEATURE 2: REVIEW SWINGS */}
              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-number">2</div>
                  <div>
                    <div className="feature-title">Review Swings</div>
                    <div className="feature-tagline">
                      AI instantly analyzes every swing — metrics, overlays,
                      slow-mo.
                    </div>
                  </div>
                </div>
                <div className="feature-body-row">
                  <div className="feature-text">
                    <ul className="feature-list">
                      <li>
                        Go to the <strong>Home</strong> tab and filter by player
                        or team.
                      </li>
                      <li>Tap any clip to open the swing detail view.</li>
                      <li>
                        Explore AI metrics, overlays, and recommended focus
                        points.
                      </li>
                      <li>
                        Pinch to zoom and scrub frame-by-frame to study key
                        positions.
                      </li>
                      <li>
                        Share individual swings with a secure link for remote
                        review.
                      </li>
                    </ul>
                    <div className="tip-box tip-box-green">
                      Review swings oldest to newest to clearly see how a
                      player’s mechanics evolve over time.
                    </div>
                    <div className="chip-row">
                      <span className="chip">Metrics</span>
                      <span className="chip">Slow-mo review</span>
                      <span className="chip">Frame-by-frame</span>
                    </div>
                  </div>
                  <div className="feature-media">
                    <Image
                      src="/assets/images/dz_home_swings.png"
                      alt="Home feed with swing list"
                      width={220}
                      height={440}
                      className="phone-shot"
                    />
                  </div>
                </div>
              </article>

              {/* FEATURE 3: CREATE FEEDBACK */}
              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-number">3</div>
                  <div>
                    <div className="feature-title">Create Feedback</div>
                    <div className="feature-tagline">
                      Leave notes, ratings, and drills — visible instantly.
                    </div>
                  </div>
                </div>
                <div className="feature-body-row">
                  <div className="feature-text">
                    <ul className="feature-list">
                      <li>Open any swing and access the feedback controls.</li>
                      <li>
                        Rate key stages (stance, load, stride, contact, finish,
                        etc.).
                      </li>
                      <li>
                        Dictate or type feedback calling out strengths, 1–2 key
                        fixes, and suggested drills.
                      </li>
                      <li>
                        Tap <strong>Submit</strong> to send feedback straight to
                        the player&apos;s feed.
                      </li>
                    </ul>
                    <div className="tip-box tip-box-accent">
                      Powerful pattern: 1 sentence of praise, 1 sentence on the
                      main fix, and 1 drill suggestion. Short and specific wins.
                    </div>
                    <div className="chip-row">
                      <span className="chip">Coach tools</span>
                      <span className="chip">Drill suggestions</span>
                      <span className="chip">Player development</span>
                    </div>
                  </div>
                  <div className="feature-media">
                    <Image
                      src="/assets/images/dz_feedback_detail.png"
                      alt="Feedback detail screen"
                      width={220}
                      height={440}
                      className="phone-shot"
                    />
                  </div>
                </div>
              </article>

              {/* FEATURE 4: SHARE CLIPS */}
              <article className="feature-card">
                <div className="feature-header">
                  <div className="feature-number">4</div>
                  <div>
                    <div className="feature-title">Share Clips</div>
                    <div className="feature-tagline">
                      Export highlights with overlays and share them anywhere.
                    </div>
                  </div>
                </div>
                <div className="feature-body-row">
                  <div className="feature-text">
                    <ul className="feature-list">
                      <li>
                        From the swing detail view, tap the{" "}
                        <strong>Share</strong> option.
                      </li>
                      <li>
                        Choose options like metrics overlay, slow-mo, or
                        watermark (if available).
                      </li>
                      <li>
                        Generate a secure link (time-limited) or save to your
                        camera roll.
                      </li>
                      <li>
                        One-tap share to Instagram, X, Hudl, team chats, and
                        more.
                      </li>
                    </ul>
                    <div className="tip-box">
                      A short clip paired with one crisp coaching cue usually
                      gets more engagement than a wall of text.
                    </div>
                    <div className="chip-row">
                      <span className="chip">Social</span>
                      <span className="chip">Recruiting</span>
                      <span className="chip">Team film</span>
                    </div>
                  </div>
                  <div className="feature-media">
                    <Image
                      src="/assets/images/dz_share_clip.png"
                      alt="Share clip options"
                      width={220}
                      height={440}
                      className="phone-shot"
                    />
                  </div>
                </div>
              </article>
            </div>
          </section>
        </main>

        {/* INNER FOOTER */}
        <footer className="guide-footer">
          Squad goals unlocked — now go create teams, review swings, send
          feedback, and share bombs.{" "}
          <span className="footer-help">
            Need help? Email{" "}
            <a href="mailto:support@dingerzone.com">support@dingerzone.com</a>.
          </span>
          <div className="footer-copy">© 2025 DINGERZONE</div>
        </footer>
      </div>

      {/* styled-jsx (scoped to this guide) */}
      <style jsx>{`
        .guide-root {
          width: 100%;
        }

        .guide-card {
          background-color: #151522;
          border-radius: 12px;
          border: 1px solid #333344;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        .guide-header {
          padding: 24px 32px 18px;
          border-bottom: 2px solid #333344;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .guide-header-left {
          max-width: 480px;
        }

        .guide-title {
          margin: 0;
          font-size: 32px;
          font-weight: 700;
          font-style: italic;
          letter-spacing: 0.05em;
          color: #ffffff;
        }

        .guide-subtitle {
          margin: 6px 0 0;
          font-size: 14px;
          color: #aaaaaa;
        }

        .guide-pill {
          padding: 6px 14px;
          border-radius: 999px;
          border: 1px solid #407bff;
          font-size: 12px;
          color: #a5b8ff;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .guide-accent-bar {
          height: 4px;
          background: linear-gradient(
            90deg,
            #407bff 0%,
            #5782f1 40%,
            #29fe82 100%
          );
        }

        .guide-content {
          padding: 24px 24px 28px;
        }

        @media (min-width: 768px) {
          .guide-content {
            padding: 26px 32px 32px;
          }
        }

        .section {
          margin-bottom: 12px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #ffffff;
          margin: 0 0 4px;
        }

        .section-subtitle {
          margin: 0 0 14px;
          font-size: 14px;
          color: #aaaaaa;
        }

        .step-card {
          border-radius: 10px;
          border: 1px dashed #333344;
          padding: 14px 14px 16px;
          margin-bottom: 12px;
          position: relative;
          background: radial-gradient(
            circle at top left,
            #2a2a3d 0,
            #151522 55%,
            #151522 100%
          );
        }

        @media (min-width: 768px) {
          .step-card {
            padding: 16px 18px 18px;
            margin-bottom: 16px;
          }
        }

        .step-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border-radius: 999px;
          background-color: #2a2a3d;
          margin-bottom: 10px;
        }

        .step-number {
          width: 24px;
          height: 24px;
          border-radius: 999px;
          background-color: #407bff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
        }

        .step-label {
          font-size: 15px;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
        }

        .step-body-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .step-body-row {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
          }
        }

        .step-text {
          flex: 1 1 260px;
          min-width: 0;
          font-size: 14px;
          color: #cccccc;
        }

        .step-text p {
          margin: 0;
        }

        .step-text p + p {
          margin-top: 4px;
        }

        .step-list {
          margin: 8px 0 0;
          padding-left: 18px;
          list-style: disc;
        }

        .step-list li {
          margin-bottom: 3px;
        }

        .step-media {
          flex: 0 0 auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .step-media-column {
          flex-direction: column;
          gap: 8px;
        }

        .tip-box {
          margin-top: 10px;
          padding: 8px 10px;
          border-radius: 6px;
          background-color: #1e1e2e;
          border: 1px solid #407bff;
          font-size: 12px;
          color: #cccccc;
        }

        .tip-box-accent {
          border-color: #ff5722;
          color: #ffeee8;
        }

        .tip-box-green {
          border-color: #29fe82;
          color: #e7fff4;
        }

        .phone-shot {
          border-radius: 12px;
          border: 1px solid #333344;
        }

        .link {
          color: #407bff;
          text-decoration: none;
        }

        .link:hover {
          text-decoration: underline;
        }

        .divider {
          margin: 22px 0 18px;
          height: 1px;
          background-color: #333344;
          opacity: 0.75;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
        }

        @media (min-width: 900px) {
          .feature-grid {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 14px;
          }
        }

        .feature-card {
          border-radius: 10px;
          border: 1px dashed #333344;
          padding: 14px 14px 16px;
          background: radial-gradient(
            circle at top left,
            #2a2a3d 0,
            #151522 55%,
            #151522 100%
          );
        }

        @media (min-width: 768px) {
          .feature-card {
            padding: 16px 18px 18px;
          }
        }

        .feature-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 8px;
        }

        .feature-number {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          background-color: #2a2a3d;
          border: 1px solid #407bff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
        }

        .feature-title {
          font-size: 15px;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
        }

        .feature-tagline {
          font-size: 12px;
          color: #aaaaaa;
        }

        .feature-body-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        @media (min-width: 768px) {
          .feature-body-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-start;
          }
        }

        .feature-text {
          flex: 1 1 260px;
          min-width: 0;
          font-size: 14px;
          color: #cccccc;
        }

        .feature-list {
          margin: 6px 0 0;
          padding-left: 18px;
          list-style: disc;
        }

        .feature-list li {
          margin-bottom: 4px;
        }

        .feature-media {
          flex: 0 0 auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 8px;
        }

        .chip {
          padding: 3px 10px;
          border-radius: 999px;
          font-size: 11px;
          background-color: #2a2a3d;
          color: #a5b8ff;
          border: 1px solid #407bff;
          white-space: nowrap;
        }

        .guide-footer {
          border-top: 1px solid #333344;
          background-color: #0d0d15;
          padding: 14px 24px 18px;
          text-align: center;
          font-size: 12px;
          color: #aaaaaa;
        }

        @media (min-width: 768px) {
          .guide-footer {
            padding: 16px 32px 20px;
          }
        }

        .guide-footer a {
          color: #a5b8ff;
          text-decoration: none;
        }

        .guide-footer a:hover {
          text-decoration: underline;
        }

        .footer-help {
          display: block;
          margin-top: 4px;
        }

        .footer-copy {
          margin-top: 4px;
          font-size: 11px;
          color: #555566;
        }

        @media (max-width: 640px) {
          .guide-header {
            padding: 20px 18px 16px;
          }
          .guide-content {
            padding: 18px 18px 24px;
          }
          .guide-footer {
            padding: 12px 18px 16px;
          }
        }
      `}</style>
    </div>
  );
};


// "use client";

// import React, { FC } from "react";
// import Image from "next/image";

// const GettingStartedAndAdvancedPage: FC = () => {
//   return (
    // <div className="dz-page-root">
    //   <div className="wrapper">
    //     <div className="container">
    //       {/* HEADER */}
    //       <div className="header">
    //         <div className="header-left">
    //           <h1>DINGERZONE</h1>
    //           <p>
    //             Train Smarter. Play Harder. AI-powered baseball swing tips for
    //             players, parents &amp; coaches.
    //           </p>
    //         </div>
    //         <div className="header-pill">
    //           Getting Started &amp; Advanced Features
    //         </div>
    //       </div>
    //       <div className="blue-bar" />

    //       <div className="content">
    //         {/* ================= GETTING STARTED SECTION ================= */}
    //         <section id="getting-started">
    //           <h2 className="section-title">Getting Started</h2>
    //           <p className="section-subtitle">
    //             New to DingerZone? Start here to download the app, set up your
    //             account, and upload your first swings.
    //           </p>

    //           {/* STEP 1 – Get the App */}
    //           <div className="step-card">
    //             <div className="step-pill">
    //               <div className="step-number">1</div>
    //               <div className="step-label">Get the App</div>
    //             </div>
    //             <div className="step-content">
    //               <div className="step-text">
    //                 <div className="step-body">
    //                   <p>
    //                     Download <strong>DingerZone</strong> from the Apple App
    //                     Store:
    //                   </p>
    //                   <p>
    //                     <a
    //                       href="https://apple.co/3Js2maF"
    //                       target="_blank"
    //                       rel="noreferrer"
    //                       className="link"
    //                     >
    //                       https://apple.co/3Js2maF
    //                     </a>
    //                   </p>
    //                   <p>Open the app to begin setting up your account.</p>
    //                   <div className="tip-box">
    //                     Tip: Turn on automatic app updates so you always have
    //                     the latest features and improvements.
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="step-media">
    //                 {/* App Store / landing screenshot */}
    //                 <Image
    //                   src="/images/dz-app-store.png"
    //                   alt="DingerZone app listing in the Apple App Store"
    //                   width={220}
    //                   height={440}
    //                   className="phone-shot"
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           {/* STEP 2 – Create Account & Manage Subscription */}
    //           <div className="step-card">
    //             <div className="step-pill">
    //               <div className="step-number">2</div>
    //               <div className="step-label">
    //                 Create Account &amp; Manage Subscription
    //               </div>
    //             </div>
    //             <div className="step-content">
    //               <div className="step-text">
    //                 <div className="step-body">
    //                   <p>
    //                     Create your login and unlock full AI-powered swing
    //                     analysis.
    //                   </p>
    //                   <ul>
    //                     <li>
    //                       From the sign-in screen, choose the option to create a
    //                       new account.
    //                     </li>
    //                     <li>Enter your email and a secure password.</li>
    //                     <li>
    //                       Navigate to <strong>More &gt; Manage Subscription</strong> to
    //                       pick the plan that fits your needs.
    //                     </li>
    //                   </ul>
    //                   <div className="tip-box">
    //                     You can update or cancel your subscription any time from
    //                     the Manage Subscription screen.
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="step-media step-media-column">
    //                 {/* Sign-in screen */}
    //                 <Image
    //                   src="/images/dz-sign-in.png"
    //                   alt="DingerZone sign-in screen"
    //                   width={200}
    //                   height={420}
    //                   className="phone-shot"
    //                 />
    //                 {/* Manage subscription screen */}
    //                 <Image
    //                   src="/images/dz-manage-subscription.png"
    //                   alt="DingerZone manage subscription screen"
    //                   width={200}
    //                   height={420}
    //                   className="phone-shot"
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           {/* STEP 3 – Create Player & Join Teams */}
    //           <div className="step-card">
    //             <div className="step-pill">
    //               <div className="step-number">3</div>
    //               <div className="step-label">Create Player &amp; Join Teams</div>
    //             </div>
    //             <div className="step-content">
    //               <div className="step-text">
    //                 <div className="step-body">
    //                   <p>
    //                     Set up at least one player, then connect them to the
    //                     right team.
    //                   </p>
    //                   <ul>
    //                     <li>
    //                       Go to <strong>More &gt; My Players &gt; Add Player</strong> to
    //                       enter name, DOB, and throwing/batting info.
    //                     </li>
    //                     <li>
    //                       Use <strong>More &gt; My Teams</strong> to accept invites or
    //                       manage active teams.
    //                     </li>
    //                   </ul>
    //                 </div>
    //               </div>
    //               <div className="step-media step-media-column">
    //                 {/* Create player screen */}
    //                 <Image
    //                   src="/images/dz-create-player.png"
    //                   alt="Create player screen in DingerZone"
    //                   width={200}
    //                   height={420}
    //                   className="phone-shot"
    //                 />
    //                 {/* Teams / invites screen */}
    //                 <Image
    //                   src="/images/dz-teams.png"
    //                   alt="Teams and invites screen in DingerZone"
    //                   width={200}
    //                   height={420}
    //                   className="phone-shot"
    //                 />
    //               </div>
    //             </div>
    //           </div>

    //           {/* STEP 4 – Upload Swings */}
    //           <div className="step-card">
    //             <div className="step-pill">
    //               <div className="step-number">4</div>
    //               <div className="step-label">Upload Swings</div>
    //             </div>
    //             <div className="step-content">
    //               <div className="step-text">
    //                 <div className="step-body">
    //                   <p>Send your first swings to the plate.</p>
    //                   <ul>
    //                     <li>Tap the <strong>Upload</strong> tab.</li>
    //                     <li>
    //                       Select the correct player and choose up to{" "}
    //                       <strong>5 clips</strong> from your camera roll.
    //                     </li>
    //                   </ul>
    //                   <div className="tip-box em">
    //                     Filming tips: portrait mode, full body in frame, 5–10s
    //                     clips, 1 swing per video.
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="step-media">
    //                 {/* Upload screen */}
    //                 <Image
    //                   src="/images/dz-upload-swings.png"
    //                   alt="Upload swings screen in DingerZone"
    //                   width={220}
    //                   height={440}
    //                   className="phone-shot"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </section>

    //         <div className="divider" />

    //         {/* ================= ADVANCED FEATURES SECTION ================= */}
    //         <section id="advanced-features">
    //           <h2 className="section-title">Advanced Features Guide</h2>
    //           <p className="section-subtitle">
    //             Once you’ve got the basics down, use these tools to organize
    //             teams, dive deeper into swings, leave rich feedback, and share
    //             highlight clips.
    //           </p>

    //           <div className="advanced-grid">
    //             {/* FEATURE 1: CREATE TEAM */}
    //             <article className="feature-card">
    //               <div className="feature-header">
    //                 <div className="feature-number">1</div>
    //                 <div className="feature-title-wrap">
    //                   <div className="feature-title">Create Team</div>
    //                   <div className="feature-tagline">
    //                     Build your squad — coaches, players &amp; parents all in
    //                     one place.
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="feature-content">
    //                 <div className="feature-body">
    //                   <ul>
    //                     <li>
    //                       Tap the <strong>More</strong> tab &rarr;{" "}
    //                       <strong>My Teams</strong> &rarr;{" "}
    //                       <strong>Add Team</strong>.
    //                     </li>
    //                     <li>Enter team name, age group, and season.</li>
    //                     <li>
    //                       Add members by email so invites are sent automatically.
    //                     </li>
    //                     <li>
    //                       Tap <strong>Save</strong> to unlock the team
    //                       dashboard.
    //                     </li>
    //                   </ul>
    //                   <div className="tip-box">
    //                     Use clear names such as{" "}
    //                     <strong>"Club – Age – Season"</strong> (e.g., “NOVA
    //                     Premier 14U – Spring 2026”) so everyone knows exactly
    //                     which team they’re joining.
    //                   </div>
    //                   <div className="feature-chip-row">
    //                     <span className="chip">Coaches</span>
    //                     <span className="chip">Multi-player families</span>
    //                     <span className="chip">Program admins</span>
    //                   </div>
    //                 </div>
    //                 <div className="feature-media">
    //                   {/* Team dashboard / create team screenshot */}
    //                   <Image
    //                     src="/images/dz-team-dashboard.png"
    //                     alt="Team dashboard in DingerZone"
    //                     width={220}
    //                     height={440}
    //                     className="phone-shot"
    //                   />
    //                 </div>
    //               </div>
    //             </article>

    //             {/* FEATURE 2: REVIEW SWINGS */}
    //             <article className="feature-card">
    //               <div className="feature-header">
    //                 <div className="feature-number">2</div>
    //                 <div className="feature-title-wrap">
    //                   <div className="feature-title">Review Swings</div>
    //                   <div className="feature-tagline">
    //                     AI instantly analyzes every swing — metrics, overlays,
    //                     slow-mo.
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="feature-content">
    //                 <div className="feature-body">
    //                   <ul>
    //                     <li>
    //                       Go to the <strong>Home</strong> tab and apply filters
    //                       for a specific player or team.
    //                     </li>
    //                     <li>Tap any clip to open the swing detail view.</li>
    //                     <li>
    //                       Access AI metrics, overlays, and recommendations from
    //                       the same screen.
    //                     </li>
    //                     <li>
    //                       Pinch to zoom, scrub frame-by-frame, and focus on key
    //                       positions.
    //                     </li>
    //                     <li>
    //                       Use built-in sharing to send a custom link to coaches
    //                       or friends.
    //                     </li>
    //                   </ul>
    //                   <div className="tip-box">
    //                     Review swings oldest to newest for a player to clearly
    //                     see how mechanics change over time.
    //                   </div>
    //                   <div className="feature-chip-row">
    //                     <span className="chip">Metrics</span>
    //                     <span className="chip">Slow-mo review</span>
    //                     <span className="chip">Frame-by-frame</span>
    //                   </div>
    //                 </div>
    //                 <div className="feature-media">
    //                   {/* Home feed / swing list screenshot */}
    //                   <Image
    //                     src="/images/dz-home-swings.png"
    //                     alt="Home feed with swing list in DingerZone"
    //                     width={220}
    //                     height={440}
    //                     className="phone-shot"
    //                   />
    //                 </div>
    //               </div>
    //             </article>

    //             {/* FEATURE 3: CREATE FEEDBACK */}
    //             <article className="feature-card">
    //               <div className="feature-header">
    //                 <div className="feature-number">3</div>
    //                 <div className="feature-title-wrap">
    //                   <div className="feature-title">Create Feedback</div>
    //                   <div className="feature-tagline">
    //                     Leave notes, ratings, drills — visible instantly to your
    //                     players.
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="feature-content">
    //                 <div className="feature-body">
    //                   <ul>
    //                     <li>
    //                       Open any swing and use the feedback controls (sliders
    //                       / ratings).
    //                     </li>
    //                     <li>
    //                       Rate key stages (e.g., stance, load, stride, contact,
    //                       finish).
    //                     </li>
    //                     <li>
    //                       Dictate or type feedback that calls out strengths, 1–2
    //                       key fixes, and suggested drills.
    //                     </li>
    //                     <li>
    //                       Tap <strong>Submit</strong> to send feedback directly
    //                       into the player’s feed.
    //                     </li>
    //                   </ul>
    //                   <div className="tip-box em">
    //                     A powerful pattern: 1 sentence of praise, 1 sentence on
    //                     the main fix, and 1 drill suggestion. Short and specific
    //                     works best for young athletes.
    //                   </div>
    //                   <div className="feature-chip-row">
    //                     <span className="chip">Coach tools</span>
    //                     <span className="chip">Drill suggestions</span>
    //                     <span className="chip">Player development</span>
    //                   </div>
    //                 </div>
    //                 <div className="feature-media">
    //                   {/* Feedback detail screenshot */}
    //                   <Image
    //                     src="/images/dz-feedback-detail.png"
    //                     alt="Feedback detail screen in DingerZone"
    //                     width={220}
    //                     height={440}
    //                     className="phone-shot"
    //                   />
    //                 </div>
    //               </div>
    //             </article>

    //             {/* FEATURE 4: SHARE CLIPS */}
    //             <article className="feature-card">
    //               <div className="feature-header">
    //                 <div className="feature-number">4</div>
    //                 <div className="feature-title-wrap">
    //                   <div className="feature-title">Share Clips</div>
    //                   <div className="feature-tagline">
    //                     Export highlights with overlays and share them anywhere.
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="feature-content">
    //                 <div className="feature-body">
    //                   <ul>
    //                     <li>
    //                       From the swing detail screen, tap the{" "}
    //                       <strong>Share</strong> option.
    //                     </li>
    //                     <li>
    //                       Choose how to share: add metrics overlay, slow-mo, or
    //                       watermark if available.
    //                     </li>
    //                     <li>
    //                       Generate a secure link (with time-limited access) or
    //                       save the clip to your camera roll.
    //                     </li>
    //                     <li>
    //                       One-tap share to Instagram, X, Hudl, team chats, and
    //                       more.
    //                     </li>
    //                   </ul>
    //                   <div className="tip-box">
    //                     A single short clip plus one key coaching cue gets more
    //                     engagement than a huge list of notes.
    //                   </div>
    //                   <div className="feature-chip-row">
    //                     <span className="chip">Social</span>
    //                     <span className="chip">Recruiting</span>
    //                     <span className="chip">Team film</span>
    //                   </div>
    //                 </div>
    //                 <div className="feature-media">
    //                   {/* Share sheet / share clip screenshot */}
    //                   <Image
    //                     src="/images/dz-share-clip.png"
    //                     alt="Share clip options in DingerZone"
    //                     width={220}
    //                     height={440}
    //                     className="phone-shot"
    //                   />
    //                 </div>
    //               </div>
    //             </article>
    //           </div>
    //         </section>
    //       </div>

    //       {/* FOOTER */}
    //       <div className="footer">
    //         Squad goals unlocked — now go create teams, review swings, send
    //         feedback, and share bombs.
    //         <br />
    //         Need help? Email{" "}
    //         <a href="mailto:support@dingerzone.com">
    //           support@dingerzone.com
    //         </a>
    //         .
    //         <small>© 2025 DINGERZONE</small>
    //       </div>
    //     </div>
    //   </div>

//       {/* styled-jsx */}
//       <style jsx>{`
//         .dz-page-root {
//           min-height: 100vh;
//           background-color: #080a19;
//           display: flex;
//           justify-content: center;
//           padding: 24px 12px 40px;
//           box-sizing: border-box;
//         }
//         .wrapper {
//           width: 100%;
//           max-width: 1040px;
//         }
//         .container {
//           background-color: #151522;
//           border-radius: 12px;
//           border: 1px solid #333344;
//           box-shadow: 0 18px 40px rgba(0, 0, 0, 0.4);
//           overflow: hidden;
//         }
//         .header {
//           padding: 24px 32px 18px;
//           border-bottom: 2px solid #333344;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 16px;
//           flex-wrap: wrap;
//         }
//         .header-left h1 {
//           margin: 0;
//           font-size: 32px;
//           font-weight: 700;
//           font-style: italic;
//           letter-spacing: 0.5px;
//           color: #ffffff;
//         }
//         .header-left p {
//           margin: 6px 0 0;
//           font-size: 14px;
//           color: #aaaaaa;
//         }
//         .header-pill {
//           padding: 6px 14px;
//           border-radius: 999px;
//           border: 1px solid #407bff;
//           font-size: 12px;
//           color: #a5b8ff;
//           text-transform: uppercase;
//           letter-spacing: 0.1em;
//           white-space: nowrap;
//         }
//         .blue-bar {
//           height: 4px;
//           background: linear-gradient(
//             90deg,
//             #407bff 0%,
//             #5782f1 40%,
//             #29fe82 100%
//           );
//         }
//         .content {
//           padding: 26px 32px 32px;
//         }
//         @media (max-width: 640px) {
//           .content {
//             padding: 20px 18px 24px;
//           }
//         }

//         .section-title {
//           font-size: 20px;
//           font-weight: 700;
//           letter-spacing: 0.05em;
//           margin: 0 0 6px;
//           text-transform: uppercase;
//           color: #ffffff;
//         }
//         .section-subtitle {
//           margin: 0 0 18px;
//           font-size: 14px;
//           color: #aaaaaa;
//         }
//         .divider {
//           height: 1px;
//           background-color: #333344;
//           margin: 26px 0 18px;
//           opacity: 0.7;
//         }

//         .step-card {
//           border-radius: 10px;
//           border: 1px dashed #333344;
//           padding: 16px 18px 18px;
//           margin-bottom: 18px;
//           position: relative;
//           background: radial-gradient(
//             circle at top left,
//             #2a2a3d 0,
//             #151522 50%,
//             #151522 100%
//           );
//         }
//         .step-pill {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 4px 10px;
//           border-radius: 999px;
//           background-color: #2a2a3d;
//           margin-bottom: 10px;
//         }
//         .step-number {
//           width: 24px;
//           height: 24px;
//           border-radius: 999px;
//           background-color: #407bff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 14px;
//           font-weight: 700;
//           font-style: italic;
//         }
//         .step-label {
//           font-size: 16px;
//           font-weight: 700;
//           font-style: italic;
//         }
//         .step-content {
//           display: flex;
//           gap: 16px;
//           align-items: flex-start;
//           justify-content: space-between;
//           flex-wrap: wrap;
//         }
//         .step-text {
//           flex: 1 1 260px;
//           min-width: 0;
//         }
//         .step-media {
//           flex: 0 0 auto;
//           display: flex;
//           align-items: flex-start;
//           justify-content: center;
//         }
//         .step-media-column {
//           flex-direction: column;
//           gap: 8px;
//         }
//         .step-body {
//           font-size: 14px;
//           color: #cccccc;
//           margin-top: 2px;
//         }
//         .step-body p {
//           margin: 4px 0;
//         }
//         .step-body ul {
//           margin: 6px 0 4px 18px;
//           padding: 0;
//         }
//         .step-body li {
//           margin-bottom: 3px;
//         }
//         .tip-box {
//           margin-top: 10px;
//           padding: 8px 10px;
//           border-radius: 6px;
//           background-color: #1e1e2e;
//           border: 1px solid #407bff;
//           font-size: 13px;
//           color: #cccccc;
//         }
//         .tip-box.em {
//           border-color: #ff5722;
//           color: #ffeee8;
//         }
//         .phone-shot {
//           border-radius: 12px;
//           border: 1px solid #333344;
//         }
//         .link {
//           color: #407bff;
//           text-decoration: none;
//         }
//         .link:hover {
//           text-decoration: underline;
//         }

//         .advanced-grid {
//           display: grid;
//           grid-template-columns: minmax(0, 1fr);
//           gap: 16px;
//         }
//         @media (min-width: 900px) {
//           .advanced-grid {
//             grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
//           }
//         }
//         .feature-card {
//           border-radius: 10px;
//           border: 1px dashed #333344;
//           padding: 16px 18px 18px;
//           background: radial-gradient(
//             circle at top left,
//             #2a2a3d 0,
//             #151522 55%,
//             #151522 100%
//           );
//           position: relative;
//         }
//         .feature-header {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           margin-bottom: 8px;
//         }
//         .feature-number {
//           width: 26px;
//           height: 26px;
//           border-radius: 999px;
//           background-color: #2a2a3d;
//           border: 1px solid #407bff;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 14px;
//           font-weight: 700;
//           font-style: italic;
//         }
//         .feature-title-wrap {
//           display: flex;
//           flex-direction: column;
//           gap: 2px;
//         }
//         .feature-title {
//           font-size: 16px;
//           font-weight: 700;
//           font-style: italic;
//           color: #ffffff;
//         }
//         .feature-tagline {
//           font-size: 13px;
//           color: #aaaaaa;
//         }
//         .feature-content {
//           display: flex;
//           gap: 16px;
//           align-items: flex-start;
//           justify-content: space-between;
//           flex-wrap: wrap;
//         }
//         .feature-body {
//           font-size: 14px;
//           color: #cccccc;
//           margin-top: 4px;
//           flex: 1 1 260px;
//           min-width: 0;
//         }
//         .feature-body ul {
//           margin: 6px 0 4px 18px;
//           padding: 0;
//         }
//         .feature-body li {
//           margin-bottom: 4px;
//         }
//         .feature-media {
//           flex: 0 0 auto;
//           display: flex;
//           align-items: flex-start;
//           justify-content: center;
//         }
//         .feature-chip-row {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 6px;
//           margin-top: 8px;
//         }
//         .chip {
//           padding: 3px 10px;
//           border-radius: 999px;
//           font-size: 11px;
//           background-color: #2a2a3d;
//           color: #a5b8ff;
//           border: 1px solid #407bff;
//           white-space: nowrap;
//         }

//         .footer {
//           padding: 16px 32px 20px;
//           border-top: 1px solid #333344;
//           font-size: 13px;
//           color: #aaaaaa;
//           text-align: center;
//           background-color: #0d0d15;
//         }
//         .footer small {
//           display: block;
//           margin-top: 4px;
//           font-size: 11px;
//           color: #555566;
//         }
//         .footer a {
//           color: #a5b8ff;
//           text-decoration: none;
//         }
//         .footer a:hover {
//           text-decoration: underline;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default GettingStartedAndAdvancedPage;