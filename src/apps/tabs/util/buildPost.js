/**
 * Returns post object for testing
 *
 * @returns {Post}
 * @public
 */

export default function buildPost() {
  return {
    id: 1,
    name: 'Name',
    tagline: 'Tagline',
    discussion_url: 'http://example.com',
    screenshot_url: { '300px': 'http://example.com/screen' },
    votes_count: 32,
    comments_count: 22,
    topics: [{
      id: 1,
      name: 'iPhone',
    }],
  };
}
