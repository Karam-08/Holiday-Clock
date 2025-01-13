// script.js

// Store all the event countdowns
let events = [];

function addEvent() {
    // Get event name and date from the input fields
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;

    if (!eventName || !eventDate) {
        alert("Please enter both event name and/or date.");
        return;
    }

    // Create a new event object
    const event = {
        name: eventName,
        date: new Date(eventDate),
        id: Date.now()  // Unique ID for each event
    };

    // Add the event to the list of events
    events.push(event);

    // Clear input fields
    document.getElementById('eventName').value = '';
    document.getElementById('eventDate').value = '';

    // Update the display with the new event
    renderEvents();
}

function renderEvents() {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // Clear existing events

    events.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        eventElement.setAttribute('id', event.id);

        const eventNameElement = document.createElement('h3');
        eventNameElement.textContent = event.name;

        const timeRemainingElement = document.createElement('div');
        timeRemainingElement.classList.add('time');
        eventElement.appendChild(eventNameElement);
        eventElement.appendChild(timeRemainingElement);

        eventList.appendChild(eventElement);

        // Start the countdown for this event
        updateCountdown(event, timeRemainingElement);
    });
}

function updateCountdown(event, timeRemainingElement) {
    // Function to update the countdown for a specific event
    const interval = setInterval(() => {
        const now = new Date();
        const timeDifference = event.date - now;

        if (timeDifference <= 0) {
            clearInterval(interval);
            timeRemainingElement.textContent = `${event.name} is here!`;
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            timeRemainingElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000); // Update every second
}

// Initially render events (if any)
renderEvents();