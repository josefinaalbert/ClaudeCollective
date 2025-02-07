import React, { useState, useEffect } from 'react';

const PromptLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  
  const prompts = window.promptsData || [];

  // Categories for the filter buttons
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'wellness', label: 'Wellness' },
    { id: 'entertainment', label: 'Entertainment' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'college', label: 'College' },
    { id: 'lifestyle', label: 'Lifestyle' },
    { id: 'creative', label: 'Creative' },
    { id: 'content', label: 'Content' },
    { id: 'professional', label: 'Professional' }
  ];

  // Filter prompts based on search query and category
  const filterPrompts = () => {
    return prompts.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prompt.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || prompt.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  };

  // Update filtered prompts when search or category changes
  useEffect(() => {
    setFilteredPrompts(filterPrompts());
  }, [searchQuery, activeCategory]);

  return (
    <div className="prompt-library-wrapper">
      {/* Search and Filter Section */}
      <div className="prompt-filters-container">
        <input
          type="text"
          placeholder="Search prompts..."
          className="prompt-search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="category-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Prompts Grid */}
      <div className="prompts-scroll-container">
        <div className="prompts-grid">
          {filteredPrompts.map(prompt => (
            <div key={prompt.id} className="prompt-card">
              <h3 className="prompt-title">{prompt.title}</h3>
              <p className="prompt-description">{prompt.shortDescription}</p>
              
              <div className="prompt-tags">
                {prompt.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="prompt-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <button
                className="prompt-details-button"
                onClick={() => {/* Implement expand functionality */}}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Initialize the component when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    const promptLibraryRoot = document.getElementById('prompt-library-root');
    if (promptLibraryRoot) {
        const root = ReactDOM.createRoot(promptLibraryRoot);
        root.render(React.createElement(PromptLibrary));
    }
});
