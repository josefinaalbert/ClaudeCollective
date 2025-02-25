-- Create a new table for gallery items
CREATE TABLE IF NOT EXISTS gallery_items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  prompt TEXT NOT NULL,
  creator TEXT NOT NULL DEFAULT 'Claude User',
  type TEXT NOT NULL CHECK (type IN ('react', 'svg', 'ui', 'visualization')),
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add proper RLS policies
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- Create policy for read access (anyone can view)
CREATE POLICY gallery_items_select_policy ON gallery_items
  FOR SELECT USING (true);

-- Create policy for insert (authenticated users only)
CREATE POLICY gallery_items_insert_policy ON gallery_items
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Add sample gallery items
INSERT INTO gallery_items (title, image_url, prompt, creator, type, tags)
VALUES
(
  'Interactive Dashboard',
  'assets/images/visuals/dashboard.png',
  'Create a React component for a student dashboard that displays course progress, upcoming assignments, and grade averages with a clean, modern UI and color scheme.',
  'Claude User',
  'react',
  ARRAY['react', 'dashboard', 'ui']
),
(
  'Carbon Cycle Diagram',
  'assets/images/visuals/carbon-cycle.png',
  'Generate an SVG diagram showing the carbon cycle for my environmental science presentation, with arrows indicating carbon movement between atmosphere, plants, animals, soil, and oceans.',
  'Eco Student',
  'svg',
  ARRAY['svg', 'science', 'diagram']
),
(
  'Budget Visualization',
  'assets/images/visuals/budget-chart.png',
  'Create a React component that visualizes monthly budget data with a responsive pie chart showing expense categories and a bar chart tracking spending over time.',
  'Finance Major',
  'visualization',
  ARRAY['chart', 'finance', 'react']
),
(
  'Course Selection UI',
  'assets/images/visuals/course-ui.png',
  'Design a UI mockup for a course selection screen that displays course details, prerequisites, professor ratings, and allows for easy registration with a clean, accessible design.',
  'Design Student',
  'ui',
  ARRAY['ui', 'education', 'design']
),
(
  'Molecular Structure',
  'assets/images/visuals/molecule.png',
  'Generate an SVG visualization of a caffeine molecule with proper bond angles, atom colors, and chemical structure for my chemistry presentation.',
  'Chemistry Major',
  'svg',
  ARRAY['svg', 'science', 'chemistry']
),
(
  'Study Timer App',
  'assets/images/visuals/timer-app.png',
  'Create a React component for a Pomodoro-style study timer with customizable work/break intervals, task tracking, and a minimal, distraction-free interface.',
  'Productivity Pro',
  'react',
  ARRAY['react', 'productivity', 'app']
);