module.exports = async (req, res) => {
  try {
    const response = await fetch('https://ignaciobriceno.com/wp-json/wp/v2/posts?per_page=1');
    if (!response.ok) throw new Error('WP API error');
    const posts = await response.json();
    const post = posts[0];

    const title = post.title.rendered
      .replace(/&#8217;/g, "'")
      .replace(/&#8220;|&#8221;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&#8211;|&#8212;/g, '-');

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
    res.status(200).json({
      title: title,
      link: post.link
    });
  } catch (err) {
    res.status(500).json({ error: 'No se pudo obtener el articulo' });
  }
};
