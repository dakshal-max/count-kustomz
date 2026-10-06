// Instagram Real-time Sync Service for Count Kustom Atelier (@countkustom.atelier)

const INSTAGRAM_FALLBACK = {
  username: "countkustom.atelier",
  name: "COUNT KUSTOMz",
  bio: "Elevating spaces through master craftsmanship.\nSculptural woodwork & custom luxury living",
  postsCount: 4,
  followersCount: 13,
  followingCount: 1,
  avatar: "/count-kustom-logo.jpg",
  posts: [
    {
      id: "ig-1",
      image: "/limed-oak-dining-table.jpg",
      likes: "3,890",
      comments: "142",
      caption: "Handcrafted solid live-edge dining table in organic timber slab installed in a sunlit sanctuary dining space. Handcrafted at @countkustom.atelier. WA: +91 85918 51282 #liveedgediningtable #bespokefurniture",
      date: "JUST NOW",
      permalink: "https://www.instagram.com/countkustom.atelier"
    },
    {
      id: "ig-2",
      image: "/wooden-coffee-table.jpg",
      likes: "3,120",
      comments: "104",
      caption: "Organic live-edge wooden coffee table with rich natural grain figure on woven jute rug backdrop. @countkustom.atelier.",
      date: "2 DAYS AGO",
      permalink: "https://www.instagram.com/countkustom.atelier"
    },
    {
      id: "ig-3",
      image: "/credenza-console.jpg",
      likes: "2,890",
      comments: "88",
      caption: "Monolithic concrete & micro-cement credenza console installation under wall TV. Quiet architectural simplicity by @countkustom.atelier.",
      date: "5 DAYS AGO",
      permalink: "https://www.instagram.com/countkustom.atelier"
    },
    {
      id: "ig-4",
      image: "/stone-coffee-table.jpg",
      likes: "3,050",
      comments: "92",
      caption: "Sculptural raw stone boulder coffee tables paired with low-slung living room seating. @countkustom.atelier.",
      date: "1 WEEK AGO",
      permalink: "https://www.instagram.com/countkustom.atelier"
    }
  ]
};

/**
 * Fetch live profile and posts from Meta Instagram Graph API or Behold/LightWidget feed URL.
 * Accepts optional token or feed URL.
 */
export async function fetchLiveInstagramData(apiTokenOrUrl = null) {
  const token = apiTokenOrUrl || import.meta.env.VITE_INSTAGRAM_TOKEN || localStorage.getItem('count_kustom_ig_token');
  const feedUrl = import.meta.env.VITE_INSTAGRAM_FEED_URL || localStorage.getItem('count_kustom_ig_feed_url');

  if (!token && !feedUrl) {
    return { ...INSTAGRAM_FALLBACK, isLive: false, lastSynced: new Date().toISOString() };
  }

  try {
    // Mode A: Public Feed JSON (Behold.so / LightWidget / Custom Endpoint)
    if (feedUrl) {
      const response = await fetch(feedUrl);
      if (response.ok) {
        const data = await response.json();
        return parseFeedJson(data);
      }
    }

    // Mode B: Official Meta Instagram Graph API
    if (token) {
      const profileRes = await fetch(`https://graph.instagram.com/me?fields=id,username,biography,media_count&access_token=${token}`);
      const mediaRes = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url,like_count,comments_count&access_token=${token}`);

      if (profileRes.ok && mediaRes.ok) {
        const profile = await profileRes.json();
        const media = await mediaRes.json();

        const formattedPosts = (media.data || []).slice(0, 8).map((item, idx) => ({
          id: item.id || `ig-live-${idx}`,
          image: item.media_url || item.thumbnail_url || INSTAGRAM_FALLBACK.posts[idx % 4].image,
          likes: item.like_count ? item.like_count.toLocaleString() : '100+',
          comments: item.comments_count ? item.comments_count.toLocaleString() : '12',
          caption: item.caption || 'Live post from @countkustom.atelier',
          date: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'RECENT',
          permalink: item.permalink || 'https://www.instagram.com/countkustom.atelier'
        }));

        return {
          username: profile.username || 'countkustom.atelier',
          name: 'COUNT KUSTOMz',
          bio: profile.biography || INSTAGRAM_FALLBACK.bio,
          postsCount: profile.media_count || formattedPosts.length,
          followersCount: INSTAGRAM_FALLBACK.followersCount,
          followingCount: INSTAGRAM_FALLBACK.followingCount,
          avatar: '/count-kustom-logo.jpg',
          posts: formattedPosts.length ? formattedPosts : INSTAGRAM_FALLBACK.posts,
          isLive: true,
          lastSynced: new Date().toISOString()
        };
      }
    }
  } catch (err) {
    console.warn('Instagram live fetch error, fallback active:', err);
  }

  return { ...INSTAGRAM_FALLBACK, isLive: false, lastSynced: new Date().toISOString() };
}

function parseFeedJson(data) {
  if (Array.isArray(data)) {
    const posts = data.slice(0, 8).map((p, i) => ({
      id: p.id || `ig-feed-${i}`,
      image: p.mediaUrl || p.sizes?.large?.mediaUrl || p.displayUrl || INSTAGRAM_FALLBACK.posts[i % 4].image,
      likes: p.likes || '250+',
      comments: p.comments || '18',
      caption: p.caption || 'Bespoke custom piece from @countkustom.atelier',
      date: p.timestamp ? new Date(p.timestamp).toLocaleDateString() : 'RECENT',
      permalink: p.permalink || 'https://www.instagram.com/countkustom.atelier'
    }));

    return {
      ...INSTAGRAM_FALLBACK,
      posts: posts.length ? posts : INSTAGRAM_FALLBACK.posts,
      isLive: true,
      lastSynced: new Date().toISOString()
    };
  }
  return INSTAGRAM_FALLBACK;
}
