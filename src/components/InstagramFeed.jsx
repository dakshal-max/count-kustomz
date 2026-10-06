import React, { useState, useEffect } from 'react';
import { ExternalLink, Heart, MessageCircle, ArrowUpRight, CheckCircle2, RefreshCw, Key, Settings, Sparkles } from 'lucide-react';
import Instagram from './InstagramIcon';
import { INSTAGRAM_URL, INSTAGRAM_HANDLE, INSTAGRAM_STORIES } from '../data/furnitureData';
import { fetchLiveInstagramData } from '../services/instagramService';

export default function InstagramFeed() {
  const [activePostModal, setActivePostModal] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [tokenInput, setTokenInput] = useState('');
  const [feedUrlInput, setFeedUrlInput] = useState('');

  // Initial fetch and auto-polling loop (every 5 minutes)
  const syncInstagram = async (customTokenOrUrl = null) => {
    setIsSyncing(true);
    const data = await fetchLiveInstagramData(customTokenOrUrl);
    setProfileData(data);
    setIsSyncing(false);
  };

  useEffect(() => {
    syncInstagram();
    const interval = setInterval(() => {
      syncInstagram();
    }, 300000); // 5 mins
    return () => clearInterval(interval);
  }, []);

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (tokenInput.trim()) {
      localStorage.setItem('count_kustom_ig_token', tokenInput.trim());
    }
    if (feedUrlInput.trim()) {
      localStorage.setItem('count_kustom_ig_feed_url', feedUrlInput.trim());
    }
    setShowConfigModal(false);
    syncInstagram();
  };

  const currentData = profileData || {
    name: "Count Kustom | Custom Furniture",
    bio: "Elevating spaces through master craftsmanship.\nSculptural woodwork & custom luxury living",
    postsCount: 4,
    followersCount: 13,
    followingCount: 1,
    avatar: "/count-kustom-logo.jpg",
    posts: [],
    isLive: false
  };

  return (
    <section id="instagram" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FAF8F5] border-b border-[#E6DFD5] relative selection:bg-[#EAE4DA]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Instagram Profile Banner */}
        <div className="bg-[#FAF8F5] border border-[#E0D7C9] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 text-left relative overflow-hidden">
          
          {/* Top Live Sync Status Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
              currentData.isLive
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-[#EAE4DA] text-[#6E6659] border border-[#D8CEBE]'
            }`}>
              <span className={`w-2 h-2 rounded-full ${currentData.isLive ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'}`}></span>
              <span>{currentData.isLive ? 'LIVE INSTAGRAM SYNCED' : 'AUTO-SYNC ACTIVE'}</span>
            </span>

            <button
              onClick={() => syncInstagram()}
              disabled={isSyncing}
              className="p-1.5 rounded-full bg-white border border-[#D8CEBE] text-[#1C1B18] hover:bg-[#EAE4DA] transition-all shadow-sm"
              title="Refresh Instagram Feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#D4AF37]' : ''}`} />
            </button>

            <button
              onClick={() => setShowConfigModal(true)}
              className="p-1.5 rounded-full bg-white border border-[#D8CEBE] text-[#1C1B18] hover:bg-[#EAE4DA] transition-all shadow-sm"
              title="Configure API Token / Feed URL"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left mt-4 sm:mt-0">
            {/* IG Avatar Logo */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#C8B082] to-[#1C1B18] shadow-md">
                <img
                  src={currentData.avatar || "/count-kustom-logo.jpg"}
                  alt="Count Kustom Custom Furniture Logo"
                  className="w-full h-full object-cover rounded-full border-2 border-white"
                />
              </div>
              <span className="absolute bottom-0 right-0 bg-[#1C1B18] text-[#D4AF37] p-1.5 rounded-full shadow">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>

            {/* Profile Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h3 className="font-serif-lim text-2xl sm:text-3xl font-semibold text-[#1C1B18]">
                  {currentData.name || "Count Kustom | Custom Furniture"}
                </h3>
                <span className="text-xs bg-[#EAE4DA] text-[#4A453E] px-3 py-1 rounded-full font-bold tracking-wider">
                  {INSTAGRAM_HANDLE}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#4A453E] max-w-xl font-normal leading-relaxed whitespace-pre-line">
                {currentData.bio}
              </p>

              <div className="pt-2 flex items-center justify-center sm:justify-start gap-6 text-xs text-[#1C1B18] font-medium">
                <span><strong>{currentData.postsCount}</strong> Posts</span>
                <span><strong>{currentData.followersCount}</strong> Followers</span>
                <span><strong>{currentData.followingCount}</strong> Following</span>
              </div>
            </div>
          </div>

          {/* Follow CTA Button */}
          <div className="shrink-0">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1C1B18] text-[#FAF8F5] px-6 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#38352F] transition-all flex items-center gap-2 shadow-md hover:scale-105"
            >
              <Instagram className="w-4 h-4 text-[#D4AF37]" />
              <span>FOLLOW {INSTAGRAM_HANDLE}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Studio Highlights & Reels */}
        <div className="space-y-4 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#7C7569]">
            Studio Highlights & Reels
          </span>
          <div className="flex items-center gap-6 overflow-x-auto pb-3 scrollbar-none">
            {INSTAGRAM_STORIES.map((story) => (
              <a
                key={story.id}
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 group flex-shrink-0"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-0.5 bg-gradient-to-tr from-[#D4AF37] to-[#1C1B18] group-hover:scale-105 transition-transform">
                  <img
                    src={story.cover}
                    alt={story.title}
                    className="w-full h-full object-cover rounded-full border-2 border-white"
                  />
                </div>
                <span className="text-[11px] font-medium text-[#4A453E] group-hover:text-[#1C1B18]">
                  {story.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Live Instagram Feed Grid */}
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7C7569]">
                Live Instagram Feed ({INSTAGRAM_HANDLE})
              </span>
              {isSyncing && <span className="text-[10px] text-[#D4AF37] font-semibold animate-pulse">Syncing...</span>}
            </div>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-[#1C1B18] hover:text-[#D4AF37] flex items-center gap-1 underline"
            >
              <span>View full profile on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(currentData.posts || []).map((post) => (
              <div
                key={post.id}
                onClick={() => setActivePostModal(post)}
                className="group relative aspect-square bg-[#EAE4DA] rounded-2xl overflow-hidden border border-[#E0D7C9] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <img
                  src={post.image}
                  alt="Count Kustom Atelier Instagram Post"
                  className="w-full h-full object-cover img-zoom"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4AF37]">
                      {post.date}
                    </span>
                    <Instagram className="w-4 h-4 text-white/80" />
                  </div>

                  <p className="text-xs font-light line-clamp-3 leading-relaxed">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-white/20">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" /> {post.comments}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37]">Inspect</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* INSTAGRAM POST MODAL */}
      {activePostModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-2xl w-full border border-[#E0D7C9] shadow-2xl overflow-hidden relative text-left grid grid-cols-1 sm:grid-cols-2">
            
            {/* Image */}
            <div className="aspect-square bg-[#EAE4DA]">
              <img
                src={activePostModal.image}
                alt="Instagram post detail"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#E0D7C9]">
                  <div className="flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-[#1C1B18]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1C1B18]">
                      {INSTAGRAM_HANDLE}
                    </span>
                  </div>
                  <button
                    onClick={() => setActivePostModal(null)}
                    className="text-xs font-semibold text-[#7C7569] hover:text-[#1C1B18]"
                  >
                    Close
                  </button>
                </div>

                <p className="text-xs text-[#4A453E] leading-relaxed">
                  {activePostModal.caption}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-[#1C1B18]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> {activePostModal.likes} likes
                  </span>
                  <span>{activePostModal.date}</span>
                </div>
              </div>

              <a
                href={activePostModal.permalink || INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1C1B18] text-white py-3 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2 hover:bg-[#38352F] transition-all"
              >
                <Instagram className="w-4 h-4 text-[#D4AF37]" />
                <span>Open Post on Instagram</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* CONFIGURATION MODAL */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] rounded-3xl max-w-md w-full p-6 border border-[#E0D7C9] shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0D7C9]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <h4 className="font-bold text-[#1C1B18] text-sm">Instagram Real-time Auto-Sync Settings</h4>
              </div>
              <button onClick={() => setShowConfigModal(false)} className="text-xs font-bold text-stone-500">✕</button>
            </div>

            <p className="text-xs text-[#6E6659] leading-relaxed">
              Connect your Meta Instagram Access Token or dynamic JSON Feed URL (e.g. Behold.so / LightWidget). Any new photos posted to <strong>@countkustom.atelier</strong> will immediately render on the site!
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-[#1C1B18]">Instagram Access Token (Meta Graph API)</label>
                <input
                  type="password"
                  placeholder="IGQVJ..."
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0D7C9] rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#1C1B18]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#1C1B18]">Or Behold.so / Feed JSON URL</label>
                <input
                  type="url"
                  placeholder="https://behold.so/api/v1/feed/..."
                  value={feedUrlInput}
                  onChange={(e) => setFeedUrlInput(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E0D7C9] rounded-xl bg-white focus:outline-none focus:ring-1 focus:ring-[#1C1B18]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 bg-stone-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-white bg-[#1C1B18] font-semibold hover:bg-[#38352F]"
                >
                  Save & Sync Live
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
}
