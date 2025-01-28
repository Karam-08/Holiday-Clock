// Store all the event countdowns
let events = [];

function addEvent() {
    // Get event name and date from the input fields
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;

    // Error message function
    if (!eventName || !eventDate) {
        alert("Please enter both event name and/or date.");
        return;
    }

    // Create a new event object
    const event = {
        name: eventName,
        date: new Date(eventDate),
        id: Date.now()
    };

    // Adds the event to the list of events
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

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteEvent(event.id));

        eventElement.appendChild(deleteButton);

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

function deleteEvent(eventId) {
    // Remove the event from the events array by filtering out the event with the given ID
    events = events.filter(event => event.id !== eventId);

    // Re-render the events to update the display
    renderEvents();
}

// Initially render events (if any)
renderEvents();