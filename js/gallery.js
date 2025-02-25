// Import Supabase client
import supabase from './supabaseClient.js';

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');

// Sample gallery items - replace with your actual data from Supabase
const galleryItems = [
    {
        id: 1,
        title: "Interactive Dashboard",
        image_url: "assets/images/visuals/dashboard.png",
        prompt: "Create a React component for a student dashboard that displays course progress, upcoming assignments, and grade averages with a clean, modern UI and color scheme.",
        creator: "Claude User",
        type: "react",
        tags: ["react", "dashboard", "ui"]
    },
    {
        id: 2,
        title: "Carbon Cycle Diagram",
        image_url: "assets/images/visuals/carbon-cycle.png",
        prompt: "Generate an SVG diagram showing the carbon cycle for my environmental science presentation, with arrows indicating carbon movement between atmosphere, plants, animals, soil, and oceans.",
        creator: "Eco Student",
        type: "svg",
        tags: ["svg", "science", "diagram"]
    },
    {
        id: 3,
        title: "Budget Visualization",
        image_url: "assets/images/visuals/budget-chart.png",
        prompt: "Create a React component that visualizes monthly budget data with a responsive pie chart showing expense categories and a bar chart tracking spending over time.",
        creator: "Finance Major",
        type: "visualization",
        tags: ["chart", "finance", "react"]
    },
    {
        id: 4,
        title: "Course Selection UI",
        image_url: "assets/images/visuals/course-ui.png",
        prompt: "Design a UI mockup for a course selection screen that displays course details, prerequisites, professor ratings, and allows for easy registration with a clean, accessible design.",
        creator: "Design Student",
        type: "ui",
        tags: ["ui", "education", "design"]
    },
    {
        id: 5,
        title: "Molecular Structure",
        image_url: "assets/images/visuals/molecule.png",
        prompt: "Generate an SVG visualization of a caffeine molecule with proper bond angles, atom colors, and chemical structure for my chemistry presentation.",
        creator: "Chemistry Major",
        type: "svg",
        tags: ["svg", "science", "chemistry"]
    },
    {
        id: 6,
        title: "Study Timer App",
        image_url: "assets/images/visuals/timer-app.png",
        prompt: "Create a React component for a Pomodoro-style study timer with customizable work/break intervals, task tracking, and a minimal, distraction-free interface.",
        creator: "Productivity Pro",
        type: "react",
        tags: ["react", "productivity", "app"]
    }
];

// Fetch gallery items from Supabase
async function fetchGalleryItems() {
    try {
        const { data, error } = await supabase
            .from('gallery_items')
            .select('*');
            
        if (error) {
            console.error('Error fetching gallery items:', error);
            // Fall back to sample data if there's an error
            return galleryItems;
        }
        
        // If we successfully got data from Supabase, use it
        // Otherwise, fall back to the sample data
        return data && data.length > 0 ? data : galleryItems;
    } catch (e) {
        console.error('Exception in fetchGalleryItems:', e);
        // Fall back to sample data on exception
        return galleryItems;
    }
}

// Create HTML for a gallery card
function createGalleryCard(item) {
    return `
        <div class="gallery-card" data-type="${item.type}">
            <div class="gallery-card-inner">
                <div class="gallery-card-front">
                    <img src="${item.image_url}" alt="${item.title}" class="gallery-image">
                    <h3 class="gallery-title">${item.title}</h3>
                </div>
                <div class="gallery-card-back">
                    <h3>${item.title}</h3>
                    <p class="gallery-prompt">${item.prompt}</p>
                    <div class="gallery-tags">
                        ${item.tags.map(tag => `<span class="gallery-tag">${tag}</span>`).join('')}
                    </div>
                    <p class="gallery-creator">Created by: ${item.creator}</p>
                </div>
            </div>
        </div>
    `;
}

// Render gallery items
function renderGalleryItems(items) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = items.map(item => createGalleryCard(item)).join('');
}

// Initialize gallery
async function initializeGallery() {
    // Fetch and render gallery items
    const items = await fetchGalleryItems();
    renderGalleryItems(items);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery);