// Import Supabase client
import supabase from './supabaseClient.js';

// DOM Elements
const promptLibraryRoot = document.getElementById('prompt-library-root');
const modal = document.getElementById('submission-modal');
const submitBtn = document.querySelector('.submit-btn');
const closeBtn = document.querySelector('.close-modal');
const submissionForm = document.getElementById('prompt-submission-form');

// Fetch prompts from Supabase
async function fetchPrompts() {
    try {
        console.log('Fetching prompts...');
        const { data: prompts, error } = await supabase
            .from('prompts')
            .select('*');

        if (error) {
            console.error('Error fetching prompts:', error);
            return [];
        }

        if (!prompts || !Array.isArray(prompts)) {
            console.error('Invalid prompts data:', prompts);
            return [];
        }

        return prompts.map(prompt => {
            try {
                return {
                    ...prompt,
                    // Store content as markdown instead of using separators
                    examples: prompt.examples || '',
                    tips: prompt.tips || '',
                    tags: prompt.tags ? prompt.tags.split(',').map(tag => tag.trim()) : []
                };
            } catch (e) {
                console.error('Error processing prompt:', prompt, e);
                return prompt;
            }
        });
    } catch (e) {
        console.error('Exception in fetchPrompts:', e);
        return [];
    }
}

// Initialize prompt library
async function initializePromptLibrary() {
    if (!promptLibraryRoot) return;

    // Create error message container
    const errorContainer = document.createElement('div');
    errorContainer.style.display = 'none';
    errorContainer.style.color = 'red';
    errorContainer.style.padding = '1rem';
    promptLibraryRoot.appendChild(errorContainer);

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
            <button class="category-btn" data-category="lifestyle">Lifestyle</button>
            <button class="category-btn" data-category="creative">Creative</button>
            <button class="category-btn" data-category="content">Content</button>
            <button class="category-btn" data-category="professional">Professional</button>
        </div>
    `;

    // Create prompts grid
    const promptsGrid = document.createElement('div');
    promptsGrid.className = 'prompts-grid';

    // Add to DOM
    promptLibraryRoot.appendChild(filterSection);
    promptLibraryRoot.appendChild(promptsGrid);

    // Fetch and render prompts
    const prompts = await fetchPrompts();
    if (prompts.length === 0) {
        errorContainer.style.display = 'block';
        errorContainer.textContent = 'No prompts found. Please check console for errors.';
    } else {
        errorContainer.style.display = 'none';
        renderPrompts(prompts);
    }

    // Store prompts in state for filtering
    window.allPrompts = prompts;

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
    // Helper function to safely parse markdown
    const parseMarkdown = (text) => {
        if (!text) return '';
        try {
            return marked.parse(text);
        } catch (e) {
            console.error('Error parsing markdown:', e);
            return text;
        }
    };

    // Helper function to check if media is a video
    const isVideo = (mediaPath) => mediaPath?.endsWith('.mp4');
    const isInVideoFolder = (mediaPath) => mediaPath?.includes('/videos/');
    const shouldBeOnSide = (mediaPath) => isVideo(mediaPath) && isInVideoFolder(mediaPath);

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
            <p class="prompt-short-description">${prompt.short_description}</p>
            
            <div class="prompt-card-expandable">
                <div class="prompt-card-content">
                    <div class="prompt-content-main">
                        ${prompt.media_url && !shouldBeOnSide(prompt.media_url) ? `
                        <div class="prompt-media-top">
                            <img src="${prompt.media_url}" alt="Example for ${prompt.title}" class="prompt-image">
                        </div>
                        ` : ''}
                        
                        <div class="prompt-section">
                            <h4>Prompt Template</h4>
                            <p class="prompt-template">${prompt.content}</p>
                        </div>
                        
                        ${prompt.examples ? `
                        <div class="prompt-section">
                            <h4>Examples</h4>
                            <div class="prompt-examples formatted-content">
                                ${parseMarkdown(prompt.examples)}
                            </div>
                        </div>
                        ` : ''}
                        
                        ${prompt.tips ? `
                        <div class="prompt-section">
                            <h4>Tips</h4>
                            <div class="prompt-tips formatted-content">
                                ${parseMarkdown(prompt.tips)}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    ${prompt.media_url && shouldBeOnSide(prompt.media_url) ? `
                    <div class="prompt-media-side">
                        <video controls autoplay muted loop playsinline class="prompt-video">
                            <source src="${prompt.media_url}" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    ` : ''}
                </div>
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

function handleCardExpansion(e) {
    const card = e.target.closest('.prompt-card');
    if (!card) return;

    const expandBtn = card.querySelector('.expand-btn');
    if (!expandBtn.contains(e.target) && !e.target.matches('.expand-btn')) return;

    // Close any currently expanded cards
    const currentlyExpanded = document.querySelector('.prompt-card.expanded');
    if (currentlyExpanded && currentlyExpanded !== card) {
        currentlyExpanded.classList.remove('expanded');
        const expandedContent = currentlyExpanded.querySelector('.prompt-card-expandable');
        expandedContent.style.height = '0';
        currentlyExpanded.querySelector('.expand-btn').setAttribute('aria-expanded', 'false');
    }

    // Toggle the clicked card
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

function handleSearch(e) {
    const searchQuery = e.target.value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    const filteredPrompts = window.allPrompts.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchQuery) ||
                            prompt.short_description.toLowerCase().includes(searchQuery) ||
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

    const filteredPrompts = window.allPrompts.filter(prompt => {
        const matchesSearch = prompt.title.toLowerCase().includes(searchQuery) ||
                            prompt.short_description.toLowerCase().includes(searchQuery) ||
                            prompt.content.toLowerCase().includes(searchQuery);
        const matchesCategory = category === 'all' || prompt.category === category;
        return matchesSearch && matchesCategory;
    });

    renderPrompts(filteredPrompts);
}

// Modal functionality for submitting new prompts
async function handlePromptSubmission(formData) {
    const { data, error } = await supabase
        .from('prompts')
        .insert([{
            id: formData.title.toLowerCase().replace(/\s+/g, '-'),
            title: formData.title,
            category: formData.category,
            content: formData.content,
            short_description: formData.shortDescription || '',
            examples: formData.examples || '',
            tips: formData.tips || '',
            tags: formData.tags || '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }]);

    if (error) {
        console.error('Error submitting prompt:', error);
        alert('Failed to submit prompt. Please try again.');
        return false;
    }

    // Refresh prompts
    window.allPrompts = await fetchPrompts();
    renderPrompts(window.allPrompts);
    return true;
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
    submissionForm.onsubmit = async function(event) {
        event.preventDefault();
        
        const formData = {
            category: document.getElementById('prompt-category').value,
            title: document.getElementById('prompt-title').value,
            content: document.getElementById('prompt-content').value,
            shortDescription: document.getElementById('prompt-short-description')?.value || '',
            examples: document.getElementById('prompt-examples')?.value || '',
            tips: document.getElementById('prompt-tips')?.value || '',
            tags: document.getElementById('prompt-tags')?.value || ''
        };

        const success = await handlePromptSubmission(formData);
        
        if (success) {
            submissionForm.reset();
            closeModal();
            alert('Thank you for your submission!');
        }
    };
}

function initializeCollapsibleSections() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(collapsible => {
        // Get the section content (next sibling after the h2)
        const content = collapsible.parentElement.querySelector('.section-content');
        
        // Set initial state
        if (!content.classList.contains('show')) {
            content.style.maxHeight = '0';
            collapsible.parentElement.classList.add('collapsed');
        }
        
        collapsible.addEventListener('click', function() {
            // Toggle the collapsed state
            const isCollapsed = this.parentElement.classList.toggle('collapsed');
            
            // Toggle content visibility
            if (!isCollapsed) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializePromptLibrary();
    initializeCollapsibleSections(); // Add this line
});