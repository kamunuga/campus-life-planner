# Campus Life Planner

## Theme
This Campus Life Planner uses a **vibrant, colorful theme** designed to be engaging and easy to navigate. The interface features:
- Gradient header and navigation buttons
- Colorful, elevated event cards with hover effects
- Dark-themed input forms for contrast
- Smooth scrolling between sections
- Bar graph visualization for time spent per category

---

## Features
- **Add, edit, delete events** with title, date, duration, and category/tag
- **Regex-based search** for filtering events by keywords or tags
- **Dynamic event cards** display on the main dashboard
- **Statistics chart** showing total duration per category
- **Smooth navigation** between "View Events" and "Add Event" sections
- Persistent **data storage using localStorage** so events remain after page reload

## Regex Catalog

The application supports **Regex-based search** for filtering events:

| Pattern                  | Description                                      | Example Match        |
|---------------------------|-----------------------------|--------------------|
| `^Sports`                | Events starting with "Sports"                    | Sports Match       |
| `^Study`                 | Events starting with "Study"                     | Study Group        |
| `\d{4}-\d{2}-\d{2}`      | Match date format `YYYY-MM-DD`                   | 2025-10-16         |
| `^@tag:\w+`              | Filter events by tag prefix                       | @tag:Project 

## Keyboard Map
- `Tab` → Navigate through inputs and buttons
- `Enter` → Submit form
- `Arrow Keys` → Move through lists
- `Esc` → Cancel editing

## Accessibility (a11y) Notes
- Semantic HTML tags (`<header>`, `<main>`, `<section>`, `<footer>`) used
- ARIA labels added for navigation and dynamic content
- Skip-to-content link for keyboard users
- Live regions (`aria-live`) for status updates

## How to Run test it
Currently, there are **manual tests** to check functionality:
1. **Add Event**: Fill in the form and save an event. Check if it appears in the event dashboard.
2. **Edit/Delete Event**: Use the buttons on event cards to modify or remove events.
3. **Regex Search**: Type regex patterns in the search bar to filter events dynamically.
4. **Chart Update**: Ensure the bar graph updates automatically when events are added/edited/deleted.
5. **Local Storage Persistence**: Reload the page and confirm that events remain visible.
