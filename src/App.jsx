import { useState, useEffect } from 'react';
import './App.css';
import  SkeletonLoader  from './component/Skeleton';

const URL = "https://api.sr.se/api/v2/channels?format=json&size=100";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        setTimeout(async () => {
          const data = await response.json();
          setPosts(data.channels);
          setLoading(false);
        },600 );

      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
  };

  const filteredPosts = posts.filter(post =>
    post.name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 9); 

  return (
    <div>
      <input
        type="text"
        placeholder="Search channels..."
        value={search}
        onChange={handleSearch}
        className="p-2 m-4 bg-slate-200 text-black rounded justify-center items-center md:w-80"
      />
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-center gap-4 w-fit m-3">
          {[...Array(9)].map((_, index) => (
             <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center place-items-center gap-4 w-fit m-3">
          {filteredPosts.map((post) => (
            <div className='w-full' key={post.id}>
              <ul>
                <li>
                  <div className="flex flex-col justify-center items-center rounded-lg w-full gap-4 h-[550px] bg-lime-600 my-3">
                    <a href={post.siteurl} target="_blank" className="w-56 mt-4">
                      <img className="rounded-xl w-full" src={post.image} alt={post.name} />
                    </a>
                    {post.liveaudio && post.liveaudio.url && (
                      <audio controls>
                        <source src={post.liveaudio.url} type="audio/mpeg" />
                      </audio>
                    )}
                    <h1 className="text-xl font-bold">{post.name}</h1>
                    <p className="text-left m-2 flex-wrap">{post.tagline}</p>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
