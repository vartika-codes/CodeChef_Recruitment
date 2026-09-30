/* =====================================================
   CODECHEF ABES EC
   EVENT MANAGEMENT SYSTEM

   NOTE:
   No LocalStorage / Database / Backend is used.

   Everything exists only in JavaScript memory.
   Refreshing the page resets the data.
===================================================== */


/* =====================================================
   EVENT DATA
===================================================== */

let events = [

    {
        id: 1,

        name: "CodeChef Recruitment 2026",

        category: "Recruitment",

        date: "2026-10-10",

        time: "10:00",

        venue: "ABES Engineering College",

        description:
            "Join the CodeChef ABES EC chapter. Showcase your coding skills, creativity and problem-solving ability."
    },

    {
        id: 2,

        name: "CodeSprint 2026",

        category: "Contest",

        date: "2026-10-15",

        time: "11:00",

        venue: "Computer Lab - ABES EC",

        description:
            "A competitive programming contest designed to challenge your problem-solving and algorithmic thinking."
    },

    {
        id: 3,

        name: "Web Development Workshop",

        category: "Workshop",

        date: "2026-10-20",

        time: "02:00",

        venue: "Seminar Hall",

        description:
            "Learn the fundamentals of modern web development and build your first responsive website."
    },

    {
        id: 4,

        name: "CodeChef Hackathon",

        category: "Hackathon",

        date: "2026-11-05",

        time: "09:00",

        venue: "Innovation Lab",

        description:
            "Build innovative solutions, collaborate with developers and solve real-world problems."
    }

];


/* =====================================================
   REGISTRATION DATA
===================================================== */

let registrations = [];


/* =====================================================
   VARIABLES
===================================================== */

let editingEventId = null;

let selectedEvent = null;


/* =====================================================
   DISPLAY EVENTS
===================================================== */

function displayEvents() {

    const container =
        document.getElementById("eventsContainer");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const category =
        document
            .getElementById("categoryFilter")
            .value;


    const filteredEvents =
        events.filter(event => {

            const matchesSearch =
                event.name
                    .toLowerCase()
                    .includes(search);

            const matchesCategory =
                category === "all" ||
                event.category === category;

            return matchesSearch &&
                matchesCategory;
        });


    if (filteredEvents.length === 0) {

        container.innerHTML = `
            <div class="empty">
                <h3>No events found</h3>
                <p>
                    Try changing your search or filter.
                </p>
            </div>
        `;

        return;
    }


    container.innerHTML =
        filteredEvents
            .map(event => createEventCard(event))
            .join("");
}


/* =====================================================
   EVENT CARD
===================================================== */

function createEventCard(event) {

    const formattedDate =
        formatDate(event.date);


    return `

        <article class="event-card">

            <div class="event-image"></div>

            <div class="event-content">

                <span class="category">
                    ${event.category}
                </span>

                <h3>
                    ${escapeHTML(event.name)}
                </h3>

                <p class="event-description">
                    ${escapeHTML(event.description)}
                </p>

                <div class="event-details">

                    <span>
                        📅 ${formattedDate}
                    </span>

                    <span>
                        ⏰ ${event.time}
                    </span>

                    <span>
                        📍 ${escapeHTML(event.venue)}
                    </span>

                </div>

                <button
                    class="primary-btn"
                    onclick="openRegistration('${escapeHTML(event.name)}')">

                    Register Now

                </button>

            </div>

        </article>

    `;
}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(date) {

    const dateObject =
        new Date(date + "T00:00:00");


    return dateObject.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


/* =====================================================
   REGISTRATION MODAL
===================================================== */

function openRegistration(eventName) {

    selectedEvent = eventName;

    document.getElementById(
        "registrationTitle"
    ).textContent = eventName;

    document.getElementById(
        "registrationModal"
    ).classList.add("active");
}


function closeRegistration() {

    document.getElementById(
        "registrationModal"
    ).classList.remove("active");

    document
        .getElementById("registrationForm")
        .reset();

    selectedEvent = null;
}


/* =====================================================
   SUBMIT REGISTRATION
===================================================== */

function submitRegistration(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("studentName")
            .value
            .trim();

    const email =
        document
            .getElementById("studentEmail")
            .value
            .trim();

    const collegeYear =
        document
            .getElementById("collegeYear")
            .value
            .trim();

    const phone =
        document
            .getElementById("studentPhone")
            .value
            .trim();


    const registration = {

        id:
            Date.now(),

        event:
            selectedEvent,

        name:
            name,

        email:
            email,

        collegeYear:
            collegeYear,

        phone:
            phone

    };


    registrations.push(registration);


    alert(
        `Registration successful!\n\n` +
        `Event: ${selectedEvent}\n` +
        `Name: ${name}`
    );


    closeRegistration();


    displayRegistrations();
}


/* =====================================================
   ADMIN PANEL
===================================================== */

function openAdmin() {

    displayAdminEvents();

    displayRegistrations();

    document
        .getElementById("adminModal")
        .classList.add("active");
}


function closeAdmin() {

    document
        .getElementById("adminModal")
        .classList.remove("active");
}


/* =====================================================
   DISPLAY ADMIN EVENTS
===================================================== */

function displayAdminEvents() {

    const container =
        document.getElementById("adminEvents");


    container.innerHTML =
        events.map(event => {

            return `

                <div class="admin-event">

                    <div>

                        <h3>
                            ${escapeHTML(event.name)}
                        </h3>

                        <p>
                            ${event.category}
                            •
                            ${formatDate(event.date)}
                            •
                            ${event.time}
                        </p>

                    </div>


                    <div class="admin-actions">

                        <button
                            class="edit-btn"
                            onclick="editEvent(${event.id})">

                            Edit

                        </button>


                        <button
                            class="delete-btn"
                            onclick="deleteEvent(${event.id})">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }).join("");
}


/* =====================================================
   ADD EVENT
===================================================== */

function openAddEvent() {

    editingEventId = null;

    document.getElementById(
        "eventModalTitle"
    ).textContent = "Add Event";


    document
        .getElementById("eventForm")
        .reset();


    document
        .getElementById("eventModal")
        .classList.add("active");
}


/* =====================================================
   EDIT EVENT
===================================================== */

function editEvent(id) {

    const event =
        events.find(
            event => event.id === id
        );


    if (!event) {
        return;
    }


    editingEventId = id;


    document.getElementById(
        "eventModalTitle"
    ).textContent = "Edit Event";


    document.getElementById(
        "eventName"
    ).value = event.name;


    document.getElementById(
        "eventCategory"
    ).value = event.category;


    document.getElementById(
        "eventDate"
    ).value = event.date;


    document.getElementById(
        "eventTime"
    ).value = event.time;


    document.getElementById(
        "eventVenue"
    ).value = event.venue;


    document.getElementById(
        "eventDescription"
    ).value = event.description;


    document
        .getElementById("eventModal")
        .classList.add("active");
}


/* =====================================================
   SAVE EVENT
===================================================== */

function saveEvent(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("eventName")
            .value
            .trim();


    const category =
        document
            .getElementById("eventCategory")
            .value;


    const date =
        document
            .getElementById("eventDate")
            .value;


    const time =
        document
            .getElementById("eventTime")
            .value;


    const venue =
        document
            .getElementById("eventVenue")
            .value
            .trim();


    const description =
        document
            .getElementById("eventDescription")
            .value
            .trim();


    if (editingEventId === null) {

        const newEvent = {

            id:
                Date.now(),

            name:
                name,

            category:
                category,

            date:
                date,

            time:
                time,

            venue:
                venue,

            description:
                description
        };


        events.push(newEvent);


        alert("Event added successfully.");

    }

    else {

        const eventToEdit =
            events.find(
                event =>
                    event.id === editingEventId
            );


        if (eventToEdit) {

            eventToEdit.name =
                name;

            eventToEdit.category =
                category;

            eventToEdit.date =
                date;

            eventToEdit.time =
                time;

            eventToEdit.venue =
                venue;

            eventToEdit.description =
                description;
        }


        alert("Event updated successfully.");
    }


    closeEventModal();

    displayEvents();

    displayAdminEvents();
}


/* =====================================================
   DELETE EVENT
===================================================== */

function deleteEvent(id) {

    const event =
        events.find(
            event => event.id === id
        );


    if (!event) {
        return;
    }


    const confirmDelete =
        confirm(
            `Delete "${event.name}"?`
        );


    if (!confirmDelete) {
        return;
    }


    events =
        events.filter(
            event => event.id !== id
        );


    displayEvents();

    displayAdminEvents();
}


/* =====================================================
   CLOSE EVENT MODAL
===================================================== */

function closeEventModal() {

    document
        .getElementById("eventModal")
        .classList.remove("active");


    document
        .getElementById("eventForm")
        .reset();


    editingEventId = null;
}


/* =====================================================
   DISPLAY REGISTRATIONS
===================================================== */

function displayRegistrations() {

    const container =
        document.getElementById(
            "registrationTable"
        );


    const search =
        document
            .getElementById(
                "registrationSearch"
            )
            .value
            .toLowerCase();


    const filtered =
        registrations.filter(registration => {

            return (
                registration.name
                    .toLowerCase()
                    .includes(search)
                ||
                registration.email
                    .toLowerCase()
                    .includes(search)
                ||
                registration.event
                    .toLowerCase()
                    .includes(search)
            );

        });


    if (filtered.length === 0) {

        container.innerHTML = `

            <div class="empty">

                <h3>No registrations yet</h3>

                <p>
                    Registered students will
                    appear here.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <table>

            <thead>

                <tr>

                    <th>Name</th>

                    <th>Email</th>

                    <th>College / Year</th>

                    <th>Phone</th>

                    <th>Event</th>

                </tr>

            </thead>


            <tbody>

                ${filtered.map(registration => `

                    <tr>

                        <td>
                            ${escapeHTML(
                                registration.name
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.email
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.collegeYear
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.phone
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                registration.event
                            )}
                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(
            /[&<>"']/g,

            character => ({

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#39;"

            })[character]
        );
}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener(
    "click",
    function (event) {

        const registrationModal =
            document.getElementById(
                "registrationModal"
            );

        const adminModal =
            document.getElementById(
                "adminModal"
            );

        const eventModal =
            document.getElementById(
                "eventModal"
            );


        if (event.target === registrationModal) {

            closeRegistration();
        }


        if (event.target === adminModal) {

            closeAdmin();
        }


        if (event.target === eventModal) {

            closeEventModal();
        }

    }
);


/* =====================================================
   INITIAL LOAD
===================================================== */

displayEvents();