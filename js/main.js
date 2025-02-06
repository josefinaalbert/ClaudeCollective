// Prompt data
const prompts = [
    {
        id: 'morning-routine',
        category: 'wellness',
        title: 'Morning Routine Engineering',
        shortDescription: 'Create a science-backed morning routine tailored to your goals and natural rhythms',
        content: `I want to optimize my morning routine with these parameters:
- Wake up time: [desired time]
- Must leave for work/school by: [time]
- Energy level naturally peaks at: [time of day]
- Key morning goals: [e.g., exercise, meditation, work]
- Current challenges: [e.g., hitting snooze, feeling rushed]
- Essential tasks that must be included: [list tasks]
- Available time for morning routine: [duration]`,
        examples: [
            'Example: "I need to wake up at 6:30 AM, leave by 8:30 AM, my energy peaks mid-morning, goals are exercise and breakfast, currently struggling with hitting snooze, must include shower and coffee, have 2 hours total."',
            'Response will include: Optimal wake-up strategy, task sequencing based on energy levels, nutrition timing, and habit-stacking recommendations.'
        ],
        tips: [
            'Include your natural sleep patterns and energy rhythms',
            'Mention any existing habits you want to maintain',
            'Specify if you need quiet activities (roommates/family sleeping)',
            'Note any dietary restrictions for breakfast planning'
        ],
        mediaExample: 'assets/images/definition-tree-example.jpg',
        tags: ['productivity', 'wellness', 'habits', 'morning'],
    },
    {
        id: 'smart-grocery',
        category: 'wellness',
        title: 'Smart Grocery Planning',
        shortDescription: 'Generate personalized shopping lists that align with your health goals and budget',
        content: `Help me create a smart grocery list with these parameters:
Budget: [weekly/monthly amount]
Dietary Requirements: [any restrictions/preferences]
Health Goals: [e.g., protein intake, reduce sugar]
Cooking Skill Level: [beginner/intermediate/advanced]
Meal Prep Time Available: [hours per week]
Storage Space: [fridge/freezer capacity]
Shopping Frequency: [how often you can shop]
Number of People: [household size]
Regional Location: [for seasonal produce consideration]`,
        examples: [
            'Example: "$100/week, pescatarian, high-protein focus, intermediate cooking skills, 3 hours for meal prep, normal fridge, weekly shopping, cooking for 2, Pacific Northwest"',
            'Response includes: Categorized shopping list, meal planning suggestions, cost-effective protein sources, seasonal produce recommendations'
        ],
        tips: [
            'Specify any ingredients you particularly enjoy or dislike',
            'Mention if you need quick-prep options for busy days',
            'Include any kitchen equipment limitations',
            'Note if you need leftover-friendly meals'
        ],
        mediaExample: 'assets/images/definition-tree-example.jpg',
        tags: ['meal planning', 'budget', 'nutrition', 'shopping'],
    },
    {
        id: 'presentation-builder',
        category: 'education',
        title: 'Essay-to-Slides Converter',
        shortDescription: 'Transform written content into engaging presentation slides with optimal visual hierarchy',
        content: `Convert this essay/text into a presentation:

[Paste your essay/text here]

Presentation Parameters:
- Number of slides: [preferred range]
- Style: [professional/casual/academic]
- Color scheme: [if any preference]
- Must include sections for: [key points to highlight]
- Visual elements needed: [charts/images/diagrams]
- Time limit for presentation: [duration]
- Audience: [type and background]`,
        examples: [
            'Input: 2000-word research paper on climate change impacts',
            'Output: 12-15 slides including executive summary, key findings, data visualizations, and call to action'
        ],
        tips: [
            'Provide any specific branding guidelines',
            'Mention if certain content must be emphasized',
            'Specify if you need speaker notes',
            'Include any required citations or references format'
        ],
        mediaExample: 'assets/images/definition-tree-example.jpg',
        tags: ['presentations', 'education', 'content', 'design'],
    },
    {
        id: 'sorority-planning',
        category: 'college',
        title: 'Sorority Event Management Suite',
        shortDescription: 'Comprehensive templates for organizing and managing sorority events and operations',
        content: `Generate a [event type] planning template for:
Chapter: [name/size]
Event Type: [rush/philanthropy/formal]
Budget: [amount]
Timeline: [dates/duration]
Expected Attendance: [number]
Location Type: [venue requirements]
Special Requirements: [traditions/rules/considerations]

Additional Needs:
- Tracking system for: [members/budgets/tasks]
- Required documentation: [forms/reports]
- Communication plan: [announcements/updates]`,
        examples: [
            'Rush Week Template: "150-member chapter, 7-day rush, 200 PNMs, 4 rounds, $5000 budget, need tracking for attendance and voting"',
            'Philanthropy Event: "Annual 5K fundraiser, 300 participants, $3000 budget, needs sponsor tracking and volunteer management"'
        ],
        tips: [
            'Include any national organization requirements',
            'Specify any past event data to reference',
            'Note any collaboration with other organizations',
            'Mention any specific risk management needs'
        ],
        mediaExample: 'assets/images/definition-tree-example.jpg',
        tags: ['greek life', 'event planning', 'organization', 'college']
    },
    {
        id: 'urban-dictionary',
        category: 'entertainment',
        title: 'Gen Z Definition Tree Generator',
        shortDescription: 'Create viral-worthy urban dictionary entries with layered meanings and cultural references',
        content: `Help me create a Gen Z definition tree for the word/concept: [word/concept]

Style Parameters:
- Core vibe: [chaotic/intellectual/both]
- Cultural references to include: [list any specific themes]
- Target audience: [e.g., TikTok, Twitter, Instagram]
- Complexity level: [1-5, where 5 is most complex]
- Tone: [e.g., satirical, deadpan, academic]

Optional elements to include:
- Related slang terms
- Example usage scenarios
- Etymology (real or imagined)
- Cultural impact analysis`,
        examples: [
            'Example Input: "Create a definition tree for \'touch grass\' with complexity level 5, academic tone, targeting Twitter, including references to wellness culture and tech burnout"',
            'Response includes: Multi-layered definition starting from literal meaning, evolving through ironic usage, to meta-commentary on digital culture'
        ],
        tips: [
            'Include current events or trending topics for relevance',
            'Layer meanings from literal to increasingly abstract',
            'Mix high-brow and low-brow references',
            'Add unexpected twists to keep it engaging'
        ],
        mediaExample: 'assets/images/definition-tree-example.jpg',
        tags: ['humor', 'social media', 'content creation', 'viral']
    },
    {
        id: 'trend-forecast',
        category: 'fashion',
        title: 'Personal Style Curator & Trend Navigator',
        shortDescription: 'Get personalized shopping recommendations based on style preferences and trend analysis',
        content: `Create a personalized shopping guide with these parameters:

Style Profile:
- Core aesthetic: [e.g., coastal grandmother, dark academia]
- Price range: [budget breakdown]
- Key pieces needed: [list items]
- Occasion(s): [where you'll wear it]
- Current trends to incorporate: [specific trends]
- No-go styles/elements: [what to avoid]

Additional Considerations:
- Local weather/season: [location & season]
- Existing wardrobe colors: [main colors]
- Body type considerations: [any specific needs]
- Sustainability preferences: [if any]`,
        examples: [
            'Example: "Looking for spring transition pieces that blend dark academia with Y2K, budget $200-500 per piece, need versatile items for both office and weekend"',
            'Response includes: Curated item suggestions with styling combinations and where to find them'
        ],
        tips: [
            'Include specific measurements if relevant',
            'Mention any brand preferences or aversions',
            'Specify if you need size-inclusive options',
            'Note any dress code requirements'
        ],
        mediaExample: 'assets/videos/style-guide.mp4',
        tags: ['fashion', 'shopping', 'personal style', 'trends']
    }, 
    {
        id: 'creator-analytics',
        category: 'content',
        title: 'Content Creator Analytics Optimizer',
        shortDescription: 'Transform your engagement data into actionable content strategies',
        content: `Analyze my content performance and create a strategy:

Platform Data:
- Primary platform: [platform name]
- Current engagement rate: [percentage]
- Best performing content: [topics/formats]
- Worst performing content: [topics/formats]
- Peak posting times: [time ranges]
- Audience demographics: [key stats]

Goals:
- Growth targets: [specific numbers]
- Content pillars to develop: [topics]
- Monetization goals: [if any]
- Brand collaboration interests: [niches]`,
        examples: [
            'Input: "TikTok creator, 3.2% engagement rate, fashion hauls perform best, sit-down videos perform worst, seeking strategy to reach 100K followers"',
            'Output: Detailed content calendar, trend integration plan, and engagement strategy'
        ],
        tips: [
            'Include seasonal trends in your planning',
            'Consider cross-platform synergy',
            'Track competitor performance',
            'Plan content batching efficiently'
        ],
        mediaExample: 'assets/images/analytics-dashboard.jpg',
        tags: ['social media', 'analytics', 'growth', 'strategy']
    },
    {
        id: 'low-cal-drinks',
        category: 'wellness',
        title: 'Smart Sipping Guide',
        shortDescription: 'Discover delicious low-calorie drink options for both coffee shops and bars',
        content: `Create a customized drink guide:

Preferences:
- Type: [coffee/alcohol/both]
- Calorie limit: [max calories]
- Sweetness level: [1-5]
- Flavor profile: [preferred tastes]
- Must include: [specific ingredients]
- Must avoid: [restrictions]

For Coffee Drinks:
- Preferred coffee base: [espresso/cold brew/etc]
- Milk alternatives: [if any]
- Temperature: [hot/iced/both]

For Cocktails:
- Preferred spirits: [list]
- Mixer preferences: [list]
- Style: [fruity/dry/herb-forward]`,
        examples: [
            'Coffee Example: "Iced drink under 100 calories, very sweet taste, vanilla notes, no artificial sweeteners"',
            'Cocktail Example: "Tequila-based, under 120 calories, citrus-forward, no sweet mixers"'
        ],
        tips: [
            'Specify any dietary restrictions',
            'Note if you want the drink to look Instagram-worthy',
            'Include any allergies or sensitivities',
            'Mention if you need the drink to be discrete (for mocktails)'
        ],
        mediaExample: 'assets/images/drink-options.jpg',
        tags: ['wellness', 'nutrition', 'lifestyle', 'social']
    },
    {
        id: 'career-toolkit',
        category: 'professional',
        title: 'Career Development Navigator',
        shortDescription: 'Comprehensive career development tools for modern professionals',
        content: `Create personalized career content for:

Document Type:
- Format: [resume/cover letter/email/interview prep]
- Industry: [specific field]
- Experience level: [entry/mid/senior]
- Target company: [if specific]
- Key achievements: [bullet points]
- Unique selling points: [differentiators]

Style Preferences:
- Tone: [traditional/modern/creative]
- Format constraints: [length/structure]
- Keywords to include: [specific terms]
- Personal brand elements: [if any]`,
        examples: [
            'Resume Example: "Tech sales resume, 3 years experience, targeting startups, highlighting revenue growth and team leadership"',
            'Email Template: "Follow-up email after networking event, creative industry, focusing on potential collaboration"'
        ],
        tips: [
            'Include relevant metrics and KPIs',
            'Specify any industry-specific requirements',
            'Note any application system constraints',
            'Consider company culture in tone'
        ],
        mediaExample: 'assets/images/resume-example.jpg',
        tags: ['career', 'professional', 'development', 'job search']
    }
];

// DOM Elements
const promptLibraryRoot = document.getElementById('prompt-library-root');
const modal = document.getElementById('submission-modal');
const submitBtn = document.querySelector('.submit-btn');
const closeBtn = document.querySelector('.close-modal');
const submissionForm = document.getElementById('prompt-submission-form');

// Initialize prompt library
function initializePromptLibrary() {
    if (!promptLibraryRoot) return;

    // Create filter section
    const filterSection = document.createElement('div');
    filterSection.className = 'prompt-filters';
    filterSection.innerHTML = `
        <input type="text" placeholder="Search prompts..." class="prompt-search" />
        <div class="category-filters">
            <button class="category-btn active" data-category="all">All</button>
            <button class="category-btn" data-category="wellness">Wellness</button>
            <button class="category-btn" data-category="entertainment">Entertainment</button>
            <button class="category-btn" data-category="fashion">Fashion</button>
            <button class="category-btn" data-category="college">College</button>
        </div>
    `;

    // Create prompts grid
    const promptsGrid = document.createElement('div');
    promptsGrid.className = 'prompts-grid';

    // Add to DOM
    promptLibraryRoot.appendChild(filterSection);
    promptLibraryRoot.appendChild(promptsGrid);

    // Initial render
    renderPrompts(prompts);

    // Add event listeners
    const searchInput = filterSection.querySelector('.prompt-search');
    searchInput.addEventListener('input', handleSearch);

    const categoryButtons = filterSection.querySelectorAll('.category-btn');
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });

    // Add click listener for expanding cards
    promptsGrid.addEventListener('click', handleCardExpansion);
}

function createPromptCard(prompt) {
    return `
        <div class="prompt-card" data-id="${prompt.id}">
            <div class="prompt-card-header">
                <h3>${prompt.title}</h3>
                <button class="expand-btn" aria-label="Expand">
                    <svg class="expand-icon" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M7 10l5 5 5-5" fill="none" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
            </div>
            <p class="prompt-short-description">${prompt.shortDescription}</p>
            
            <div class="prompt-card-expandable">
                ${prompt.mediaExample ? `
                <div class="prompt-media">
                    ${prompt.mediaExample.endsWith('.mp4') ? `
                        <video controls class="prompt-video">
                            <source src="${prompt.mediaExample}" type="video/mp4">
                        </video>
                    ` : `
                        <img src="${prompt.mediaExample}" alt="Example for ${prompt.title}" class="prompt-image">
                    `}
                </div>
                ` : ''}
                
                <div class="prompt-section">
                    <h4>Prompt Template</h4>
                    <p class="prompt-template">${prompt.content}</p>
                </div>
                
                ${prompt.examples ? `
                <div class="prompt-section">
                    <h4>Examples</h4>
                    <ul class="prompt-examples">
                        ${prompt.examples.map(example => `<li>${example}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
                
                ${prompt.tips ? `
                <div class="prompt-section">
                    <h4>Tips</h4>
                    <ul class="prompt-tips">
                        ${prompt.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
            
            <div class="prompt-tags">
                ${prompt.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

function renderPrompts(promptsToRender) {
    const promptsGrid = document.querySelector('.prompts-grid');
    if (!promptsGrid) return;

    promptsGrid.innerHTML = promptsToRender.map(prompt => createPromptCard(prompt)).join('');
}

function handleSearch(e) {
    const searchQuery = e.target.value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchQuery) ||
                            prompt.shortDescription.toLowerCase().includes(searchQuery) ||
                            prompt.content.toLowerCase().includes(searchQuery);
        const matchesCategory = activeCategory === 'all' || prompt.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    renderPrompts(filteredPrompts);
}

function handleCategoryFilter(e) {
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    const category = e.target.dataset.category;
    const searchQuery = document.querySelector('.prompt-search').value.toLowerCase();

    const filteredPrompts = prompts.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchQuery) ||
                            prompt.shortDescription.toLowerCase().includes(searchQuery) ||
                            prompt.content.toLowerCase().includes(searchQuery);
        const matchesCategory = category === 'all' || prompt.category === category;
        return matchesSearch && matchesCategory;
    });

    renderPrompts(filteredPrompts);
}

function handleCardExpansion(e) {
    const card = e.target.closest('.prompt-card');
    if (!card) return;

    const expandBtn = card.querySelector('.expand-btn');
    if (!expandBtn.contains(e.target) && !e.target.matches('.expand-btn')) return;

    const expandableContent = card.querySelector('.prompt-card-expandable');
    const isExpanded = card.classList.toggle('expanded');
    
    // Update aria-expanded state
    expandBtn.setAttribute('aria-expanded', isExpanded);
    
    // Smooth height transition
    if (isExpanded) {
        expandableContent.style.height = expandableContent.scrollHeight + 'px';
    } else {
        expandableContent.style.height = '0';
    }
}

// Modal functionality
function openSubmissionForm() {
    if (modal) modal.style.display = 'block';
}

function closeModal() {
    if (modal) modal.style.display = 'none';
}

// Event listeners
if (closeBtn) closeBtn.onclick = closeModal;
if (modal) {
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
}

if (submissionForm) {
    submissionForm.onsubmit = function(event) {
        event.preventDefault();
        
        const formData = {
            category: document.getElementById('prompt-category').value,
            title: document.getElementById('prompt-title').value,
            content: document.getElementById('prompt-content').value
        };

        console.log('Prompt submitted:', formData);
        
        submissionForm.reset();
        closeModal();
        
        alert('Thank you for your submission!');
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializePromptLibrary);