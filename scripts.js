// Load events from local storage or start empty
let events = JSON.parse(localStorage.getItem('events')) || [];

// DOM references
const eventForm = document.getElementById('event-form');
const eventList = document.getElementById('event-list');
const addEventBtn = document.getElementById('add-event-btn');
const viewEventsBtn = document.getElementById('view-events');

// --- Navigation buttons ---
addEventBtn.addEventListener('click', () => {
  document.getElementById('add-event-section').scrollIntoView({ behavior: 'smooth' });
});

viewEventsBtn.addEventListener('click', () => {
  document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' });
});

// --- Render events ---
function renderEvents() {
  eventList.innerHTML = '';
  if (events.length === 0) {
    eventList.innerHTML = `<p style="text-align:center;color:#64748b;">No events yet. Add one below!</p>`;
    return;
  }

  events.forEach((ev, index) => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <h3>${ev.title}</h3>
      <p><strong>Date:</strong> ${ev.date}</p>
      <p><strong>Duration:</strong> ${ev.duration} min</p>
      <p><strong>Tag:</strong> ${ev.tag || '—'}</p>
      <div class="actions">
        <button onclick="editEvent(${index})">Edit</button>
        <button onclick="deleteEvent(${index})">Delete</button>
      </div>
    `;
    eventList.appendChild(card);
  });
}

// --- Save event ---
eventForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value;
  const duration = document.getElementById('duration').value;
  const tag = document.getElementById('tag').value.trim();

  if (!title || !date || !duration) {
    alert('Please fill out all required fields.');
    return;
  }

  const newEvent = { title, date, duration, tag };
  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));
  renderEvents();
  eventForm.reset();
  alert('Event saved successfully!');
  document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' });
});

// --- Edit event ---
window.editEvent = index => {
  const ev = events[index];
  document.getElementById('title').value = ev.title;
  document.getElementById('date').value = ev.date;
  document.getElementById('duration').value = ev.duration;
  document.getElementById('tag').value = ev.tag;
  events.splice(index, 1); // remove so it updates on save
  localStorage.setItem('events', JSON.stringify(events));
  document.getElementById('add-event-section').scrollIntoView({ behavior: 'smooth' });
};

// --- Delete event ---
window.deleteEvent = index => {
  if (confirm('Are you sure you want to delete this event?')) {
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    renderEvents();
  }
};
// --- Initial load ---
renderEvents();
// --- stat rendering ---
let chart;

function renderChart() {
  const ctx = document.getElementById('eventsChart').getContext('2d');

  // Group total durations by tag
  const totals = {};
  events.forEach(ev => {
    const tag = ev.tag || 'Other';
    totals[tag] = (totals[tag] || 0) + Number(ev.duration);
  });

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  // Destroy existing chart before re-creating
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Total Duration (minutes)',
        data,
        backgroundColor: '#3b82f6',
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        title: {
          display: labels.length > 0,
          text: 'Time Spent per Category',
          color: '#1e293b',
          font: { size: 16 }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: '#475569' }
        },
        x: {
          ticks: { color: '#475569' }
        }
      }
    }
  });
}

// Update chart whenever events change
function updateAll() {
  renderEvents();
  renderChart();
}

// Replace all renderEvents() calls with updateAll()
eventForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const date = document.getElementById('date').value;
  const duration = document.getElementById('duration').value;
  const tag = document.getElementById('tag').value.trim();

  if (!title || !date || !duration) {
    alert('Please fill out all required fields.');
    return;
  }

  const newEvent = { title, date, duration, tag };
  events.push(newEvent);
  localStorage.setItem('events', JSON.stringify(events));
  updateAll();
  eventForm.reset();
  alert('Event saved successfully!');
  document.getElementById('events-section').scrollIntoView({ behavior: 'smooth' });
});

// When deleting or editing events, also call updateAll()
window.deleteEvent = index => {
  if (confirm('Are you sure you want to delete this event?')) {
    events.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(events));
    updateAll();
  }
};

// On page load
updateAll();