const UNSPLASH_KEY = "txppfk0bKUk0LGIlOjYPwxRUbd0VNJAATQCNkBjFef0";

export const fetchPhotos = async ({ page, perPage, query }) => {
  const endpoint = query ? "search/photos" : "photos";
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    order_by: "popular",
    ...(query ? { query } : {}),
  });
  const res = await fetch(
    `https://api.unsplash.com/${endpoint}?${params.toString()}`,
    {
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    }
  );
  if (!res.ok) throw new Error("Unsplash API error " + res.status);
  const data = await res.json();
  return data?.results ?? data;
};
