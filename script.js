document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('dark-mode-toggle');
  const body = document.body;

  // Load saved mode from localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.setItem('darkMode', 'disabled');
    }
  });
});

// Load data dari JSON
fetch('data/guru.json')
  .then(response => response.json())
  .then(data => {
    guruData = data;
    renderGuru(data);
  })
  .catch(error => console.error('Error loading data:', error));

// Fungsi render data
function renderGuru(data) {
  guruContainer.innerHTML = data.map(guru => `
            <div class="guru-card" data-id="${guru.id}">
                <img src="../images/${guru.foto}" alt="${guru.nama}">
                <div class="guru-info">
                    <h3>${guru.nama}</h3>
                    <p class="jabatan">${guru.jabatan}</p>
                    <p class="mapel">${guru.mapel}</p>
                    <p class="bio">${guru.bio}</p>
                    <p class="nip"><small>NIP: ${guru.nip}</small></p>
                </div>
            </div>
        `).join('');
}

// Fitur pencarian
searchInput.addEventListener('input', function (e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredData = guruData.filter(guru =>
    guru.nama.toLowerCase().includes(searchTerm) ||
    guru.mapel.toLowerCase().includes(searchTerm)
  );
  renderGuru(filteredData);
});
