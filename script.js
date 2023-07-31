const eventForm = document.getElementById('event-form');
const eventsList = document.getElementById('events-list');

// Função para adicionar um evento
function addEvent(event) {
  const title = event.target.elements['title'].value;
  const date = event.target.elements['date'].value;
  const time = event.target.elements['time'].value;

  const eventItem = document.createElement('li');
  eventItem.innerHTML = `
    <strong>${title}</strong><br>
    Data: ${date}<br>
    Horário: ${time}
  `;

  eventsList.appendChild(eventItem);

  // Limpar o formulário
  event.target.reset();

  // Salvar o evento no LocalStorage
  saveEvent(title, date, time);
}

// Função para salvar um evento no LocalStorage
function saveEvent(title, date, time) {
  let events = [];

  if (localStorage.getItem('events')) {
    events = JSON.parse(localStorage.getItem('events'));
  }

  events.push({ title, date, time });
  localStorage.setItem('events', JSON.stringify(events));
}

// Função para carregar os eventos salvos no LocalStorage
function loadEvents() {
  if (localStorage.getItem('events')) {
    const events = JSON.parse(localStorage.getItem('events'));

    events.forEach(event => {
      const eventItem = document.createElement('li');
      eventItem.innerHTML = `
        <strong>${event.title}</strong><br>
        Data: ${event.date}<br>
        Horário: ${event.time}
      `;
      eventsList.appendChild(eventItem);
    });
  }
}

// Carregar os eventos ao carregar a página
loadEvents();

// Adicionar um evento quando o formulário for enviado
eventForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addEvent(e);
});
