import { useState, useEffect } from 'react';
import './App.css';

const URL = "https://api.sr.se/api/v2/channels?format=json&size=100";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setPosts(data.channels.slice(0, 9));
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    const searchLower = search.toLowerCase();
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA.startsWith(searchLower) && !nameB.startsWith(searchLower)) {
      return -1;
    }
    if (!nameA.startsWith(searchLower) && nameB.startsWith(searchLower)) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      
        <input
          type="text"
          placeholder="Search channels..."
          value={search}
          onChange={handleSearch}
          className="p-2 mb-4 bg-slate-200 text-black rounded w-80"
        />
        <div className='grid grid-cols-3  gap-4 w-full m-3'>
          {
            filteredPosts.map((post, index) => (
              <div key={index}>
                <ul>
                  <li>
                    <div className='flex flex-col justify-self-center items-center rounded-lg w-fit gap-4 h-[550px] bg-slate-700 my-3'>
                      <img className='rounded-xl w-56 mt-4' src={post.image} alt={post.name} />
                      {post.liveaudio.url && (
                        <audio controls className=''>
                          <source src={post.liveaudio.url} type="audio/mpeg" />
                        </audio>
                      )}
                      <h1 className='text-xl font-bold'>{post.name}</h1>
                      <p className='text-left m-2 flex-wrap'>{post.tagline}</p>
                    </div>
                  </li>
                </ul>
              </div>
            ))
          }
        </div>
     
    </>
  );
}

export default App;
