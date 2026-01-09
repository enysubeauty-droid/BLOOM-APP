import React, { useState, useEffect } from 'react';
import { Heart, ShoppingBag, BookOpen, MessageCircle, Sparkles, Calendar, User, Home, TrendingUp, Award } from 'lucide-react';

const LadyBloomApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [userPoints, setUserPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [journals, setJournals] = useState([]);
  const [moodBoards, setMoodBoards] = useState([]);
  const [cycleDay, setCycleDay] = useState(1);
  const [userName, setUserName] = useState('Beautiful');

  useEffect(() => {
    const storedPoints = localStorage.getItem('userPoints');
    const storedStreak = localStorage.getItem('streak');
    const storedJournals = localStorage.getItem('journals');
    const storedBoards = localStorage.getItem('moodBoards');
    const storedName = localStorage.getItem('userName');
    
    if (storedPoints) setUserPoints(parseInt(storedPoints));
    if (storedStreak) setStreak(parseInt(storedStreak));
    if (storedJournals) setJournals(JSON.parse(storedJournals));
    if (storedBoards) setMoodBoards(JSON.parse(storedBoards));
    if (storedName) setUserName(storedName);
  }, []);

  const addPoints = (points) => {
    const newPoints = userPoints + points;
    setUserPoints(newPoints);
    localStorage.setItem('userPoints', newPoints);
  };

  const products = [
    { name: 'Water Base Cream Lubricant', price: '£19.99', image: '🌸' },
    { name: 'Probiotic Intimate Wash', price: '£12.00', image: '💧' },
    { name: 'Olive Massage Oil', price: '£9.99', image: '🌿' },
    { name: 'SPA Water Base Lubricant', price: '£24.99', image: '✨' }
  ];

  const articles = [
    { title: 'Understanding Your Cycle: A Complete Guide', category: 'Health', readTime: '8 min' },
    { title: 'Natural Ways to Balance Vaginal pH', category: 'Wellness', readTime: '5 min' },
    { title: 'Self-Love Practices for Everyday', category: 'Mindfulness', readTime: '6 min' },
    { title: 'Intimacy After Heartbreak: Healing & Reconnecting', category: 'Relationships', readTime: '10 min' }
  ];

  const intimacyTips = [
    { tip: 'Communication is the foundation of great intimacy. Try sharing one desire with your partner tonight.', emoji: '💬' },
    { tip: 'Self-pleasure is self-care. Explore what feels good for you without pressure or expectations.', emoji: '🌺' },
    { tip: 'Create ambiance: lighting, scents, and music can transform your intimate space.', emoji: '🕯️' },
    { tip: 'Hydration matters! Use quality lubricants to enhance comfort and pleasure.', emoji: '💦' }
  ];

  const affirmations = [
    'I am worthy of love and pleasure',
    'My body is beautiful and deserves care',
    'I honor my needs and boundaries',
    'I am healing and growing stronger every day',
    'I embrace my sensuality with confidence'
  ];

  const ChatBot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
      { sender: 'bot', text: `Hello ${userName}! 💕 I'm here to listen and support you. How are you feeling today?` }
    ]);

    const sendMessage = async () => {
      if (!input.trim()) return;
      
      const userMessage = { sender: 'user', text: input };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: `You are a compassionate emotional support companion for women, specializing in heartbreak, relationships, feminine wellness, and self-love. Respond with empathy, warmth, and encouragement. Keep responses under 100 words. User says: "${input}"`
              }
            ]
          })
        });

        const data = await response.json();
        const botResponse = data.content[0].text;
        setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
        addPoints(5);
      } catch (error) {
        setMessages(prev => [...prev, { sender: 'bot', text: "I'm having trouble connecting right now, but I'm here for you. 💕" }]);
      }
    };

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-pink-500 text-white' : 'bg-pink-100 text-gray-800'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Share what's on your heart..."
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <button onClick={sendMessage} className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Journal = () => {
    const [entry, setEntry] = useState('');
    const [mood, setMood] = useState('😊');

    const saveEntry = () => {
      if (!entry.trim()) return;
      const newEntry = {
        id: Date.now(),
        text: entry,
        mood: mood,
        date: new Date().toLocaleDateString()
      };
      const updated = [newEntry, ...journals];
      setJournals(updated);
      localStorage.setItem('journals', JSON.stringify(updated));
      setEntry('');
      addPoints(10);
      alert('Journal saved! +10 points ✨');
    };

    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">My Journal</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-2 mb-4">
            {['😊', '😌', '😢', '😍', '💪', '🌸'].map(e => (
              <button
                key={e}
                onClick={() => setMood(e)}
                className={`text-3xl p-2 rounded-lg ${mood === e ? 'bg-pink-100' : ''}`}
              >
                {e}
              </button>
            ))}
          </div>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="How are you feeling today? What's on your mind?"
            className="w-full h-40 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button onClick={saveEntry} className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
            Save Entry
          </button>
        </div>
        <div className="space-y-4">
          {journals.map(j => (
            <div key={j.id} className="bg-pink-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{j.mood}</span>
                <span className="text-sm text-gray-600">{j.date}</span>
              </div>
              <p className="text-gray-800">{j.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MoodBoard = () => {
    const [boardName, setBoardName] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const sampleImages = [
      '🌸', '💐', '🌺', '🌷', '🌹', '🦋', '✨', '💖', '🌙', '⭐', '🌈', '🔮'
    ];

    const createBoard = () => {
      if (!boardName.trim() || selectedImages.length === 0) return;
      const newBoard = {
        id: Date.now(),
        name: boardName,
        images: selectedImages,
        date: new Date().toLocaleDateString()
      };
      const updated = [newBoard, ...moodBoards];
      setMoodBoards(updated);
      localStorage.setItem('moodBoards', JSON.stringify(updated));
      setBoardName('');
      setSelectedImages([]);
      addPoints(15);
      alert('Mood board created! +15 points ✨');
    };

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-pink-600 mb-4">My Mood Boards</h2>
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <input
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="Board name (e.g., 'My Dream Life', 'Self Love')"
            className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <div className="grid grid-cols-6 gap-2 mb-4">
            {sampleImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImages(prev => 
                  prev.includes(img) ? prev.filter(i => i !== img) : [...prev, img]
                )}
                className={`text-4xl p-4 rounded-lg ${selectedImages.includes(img) ? 'bg-pink-200' : 'bg-gray-100'} hover:bg-pink-100`}
              >
                {img}
              </button>
            ))}
          </div>
          <button onClick={createBoard} className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600">
            Create Board
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {moodBoards.map(board => (
            <div key={board.id} className="bg-pink-50 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">{board.name}</h3>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {board.images.map((img, idx) => (
                  <div key={idx} className="text-3xl">{img}</div>
                ))}
              </div>
              <span className="text-sm text-gray-600">{board.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch(currentView) {
      case 'home':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-pink-400 to-purple-400 rounded-lg p-8 text-white mb-6">
              <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}! 🌸</h1>
              <p className="text-lg">Today's affirmation: "{affirmations[Math.floor(Math.random() * affirmations.length)]}"</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="text-yellow-500" />
                  <h3 className="font-bold">Your Points</h3>
                </div>
                <p className="text-3xl font-bold text-pink-600">{userPoints}</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="text-green-500" />
                  <h3 className="font-bold">Streak</h3>
                </div>
                <p className="text-3xl font-bold text-pink-600">{streak} days</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => setCurrentView('chat')} className="bg-pink-100 p-4 rounded-lg hover:bg-pink-200">
                  <MessageCircle className="mx-auto mb-2 text-pink-600" />
                  <span className="text-sm">Chat with Support</span>
                </button>
                <button onClick={() => setCurrentView('journal')} className="bg-purple-100 p-4 rounded-lg hover:bg-purple-200">
                  <BookOpen className="mx-auto mb-2 text-purple-600" />
                  <span className="text-sm">Journal</span>
                </button>
                <button onClick={() => setCurrentView('tips')} className="bg-red-100 p-4 rounded-lg hover:bg-red-200">
                  <Heart className="mx-auto mb-2 text-red-600" />
                  <span className="text-sm">Intimacy Tips</span>
                </button>
                <button onClick={() => setCurrentView('cycle')} className="bg-blue-100 p-4 rounded-lg hover:bg-blue-200">
                  <Calendar className="mx-auto mb-2 text-blue-600" />
                  <span className="text-sm">Track Cycle</span>
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'shop':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Shop LADYBLOOM</h2>
            <div className="grid grid-cols-2 gap-6">
              {products.map((product, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-pink-50 p-8 text-6xl text-center">{product.image}</div>
                  <div className="p-4">
                    <h3 className="font-bold mb-2">{product.name}</h3>
                    <p className="text-pink-600 font-bold text-xl mb-4">{product.price}</p>
                    <button className="w-full bg-pink-500 text-white py-2 rounded-full hover:bg-pink-600">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Health & Wellness Articles</h2>
            <div className="space-y-4">
              {articles.map((article, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow p-6 hover:shadow-lg cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <span className="text-sm text-pink-600 bg-pink-100 px-3 py-1 rounded-full">{article.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{article.readTime} read • Click to read more</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'chat':
        return <ChatBot />;

      case 'tips':
        return (
          <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Intimacy Tips & Tricks</h2>
            <div className="space-y-4">
              {intimacyTips.map((item, idx) => (
                <div key={idx} className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg shadow p-6">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl">{item.emoji}</span>
                    <p className="text-gray-800 flex-1">{item.tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'journal':
        return <Journal />;

      case 'moodboard':
        return <MoodBoard />;

      case 'cycle':
        return (
          <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Cycle Tracker</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg">Current Cycle Day</h3>
                  <p className="text-4xl font-bold text-pink-600">{cycleDay}</p>
                </div>
                <div className="text-6xl">
                  {cycleDay <= 7 ? '🌙' : cycleDay <= 14 ? '🌸' : cycleDay <= 21 ? '✨' : '🌺'}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCycleDay(1)} className="flex-1 bg-pink-500 text-white py-2 rounded-full">New Cycle</button>
                <button onClick={() => setCycleDay(prev => (prev % 28) + 1)} className="flex-1 bg-purple-500 text-white py-2 rounded-full">Next Day</button>
              </div>
              <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                <h4 className="font-bold mb-2">Phase: {cycleDay <= 7 ? 'Menstrual' : cycleDay <= 14 ? 'Follicular' : cycleDay <= 21 ? 'Ovulation' : 'Luteal'}</h4>
                <p className="text-sm text-gray-700">Track your cycle to understand your body better and plan your wellness routine.</p>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">My Profile</h2>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-pink-200 rounded-full flex items-center justify-center text-3xl">
                  👑
                </div>
                <div>
                  <input
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      localStorage.setItem('userName', e.target.value);
                    }}
                    className="text-2xl font-bold border-b-2 border-pink-200 focus:outline-none focus:border-pink-400"
                  />
                  <p className="text-gray-600">LADYBLOOM Member</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between p-4 bg-pink-50 rounded-lg">
                  <span className="font-bold">Total Points</span>
                  <span className="text-pink-600 font-bold">{userPoints}</span>
                </div>
                <div className="flex justify-between p-4 bg-purple-50 rounded-lg">
                  <span className="font-bold">Current Streak</span>
                  <span className="text-purple-600 font-bold">{streak} days 🔥</span>
                </div>
                <div className="flex justify-between p-4 bg-yellow-50 rounded-lg">
                  <span className="font-bold">Journal Entries</span>
                  <span className="text-yellow-600 font-bold">{journals.length}</span>
                </div>
                <div className="flex justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-bold">Mood Boards</span>
                  <span className="text-blue-600 font-bold">{moodBoards.length}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
                <h3 className="font-bold mb-2">Your Achievements 🏆</h3>
                <div className="flex gap-2 flex-wrap">
                  {userPoints >= 50 && <span className="bg-white px-3 py-1 rounded-full text-sm">First Steps ✨</span>}
                  {userPoints >= 100 && <span className="bg-white px-3 py-1 rounded-full text-sm">Rising Star 🌟</span>}
                  {journals.length >= 5 && <span className="bg-white px-3 py-1 rounded-full text-sm">Journaling Queen 📝</span>}
                  {streak >= 7 && <span className="bg-white px-3 py-1 rounded-full text-sm">Week Warrior 💪</span>}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>View not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="pb-20">
        {renderView()}
      </div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
        <div className="flex justify-around p-3">
          <button onClick={() => setCurrentView('home')} className={`flex flex-col items-center ${currentView === 'home' ? 'text-pink-600' : 'text-gray-600'}`}>
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button onClick={() => setCurrentView('shop')} className={`flex flex-col items-center ${currentView === 'shop' ? 'text-pink-600' : 'text-gray-600'}`}>
            <ShoppingBag size={24} />
            <span className="text-xs mt-1">Shop</span>
          </button>
          <button onClick={() => setCurrentView('blog')} className={`flex flex-col items-center ${currentView === 'blog' ? 'text-pink-600' : 'text-gray-600'}`}>
            <BookOpen size={24} />
            <span className="text-xs mt-1">Blog</span>
          </button>
          <button onClick={() => setCurrentView('chat')} className={`flex flex-col items-center ${currentView === 'chat' ? 'text-pink-600' : 'text-gray-600'}`}>
            <MessageCircle size={24} />
            <span className="text-xs mt-1">Chat</span>
          </button>
          <button onClick={() => setCurrentView('profile')} className={`flex flex-col items-center ${currentView === 'profile' ? 'text-pink-600' : 'text-gray-600'}`}>
            <User size={24} />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<LadyBloomApp />);
