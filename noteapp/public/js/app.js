// URL
const API_BASE = '/api/notes';

let currentPage = 1;
let editingId = null;

$(async function () {
  bindPageButtons();
  bindForm();
  await loadNotes(1);
});

// movement buttom for switching the page
function bindPageButtons() {
  $('.page-btn').on('click', async function () {
    const page = Number($(this).data('page'));
    currentPage = page;
    $('#pageNumber').val(page);

    $('.page-btn').removeClass('btn-primary').addClass('btn-outline-primary');
    $(this).removeClass('btn-outline-primary').addClass('btn-primary');

    resetForm();
    await loadNotes(page);
  });
}

// form
function bindForm() {
  $('#noteForm').on('submit', async function (e) {
    e.preventDefault();
    const title = $('#title').val().trim();
    const content = $('#content').val().trim();
    const pageNumber = Number($('#pageNumber').val());

    if (!title || !content) return;

    try {
      if (editingId) {
        const res = await fetch(`${API_BASE}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content })
        });
        if (!res.ok) throw new Error('can not save note');
      } else {

        // create new one
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, content, pageNumber })
        });
        if (!res.ok) throw new Error('Create failed');
      }

      resetForm();
      await loadNotes(currentPage);
    } catch (err) {
      console.error(err);
      alert('Error: Could not save note.');
    }
  });

  $('#cancelEditBtn').on('click', function () {
    resetForm();
  });
}

async function loadNotes(page) {
  try {
    const res = await fetch(`${API_BASE}?page=${page}`);
    const notes = await res.json();
    renderNotes(notes);
  } catch (err) {
    console.error('loadNotes error:', err);
  }
}

function renderNotes(notes) {
  const $list = $('#notesList');
  $list.empty();

  if (!notes.length) {
    $list.append(`<li class="list-group-item">No notes yet on Page ${currentPage}.</li>`);
    return;
  }

  notes.forEach(note => {
    const created = new Date(note.createdAt).toLocaleString();
    const li = $(`
      <li class="list-group-item d-flex justify-content-between align-items-start">
        <div>
          <div class="fw-bold">${escapeHtml(note.title)}</div>
          <div>${escapeHtml(note.content)}</div>
          <small class="text-muted">Created: ${created}</small>
        </div>
        <div class="ms-3 d-flex gap-2">
          <button class="btn btn-sm btn-outline-secondary edit-btn">Edit</button>
          <button class="btn btn-sm btn-outline-danger delete-btn">Delete</button>
        </div>
      </li>
    `);

    li.find('.edit-btn').on('click', () => {
      editingId = note._id;
      $('#title').val(note.title);
      $('#content').val(note.content);
      $('#saveBtn').text('Update Note').removeClass('btn-success').addClass('btn-warning');
      $('#cancelEditBtn').show();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    li.find('.delete-btn').on('click', async () => {
      if (!confirm('Delete this note?')) return;
      try {
        const res = await fetch(`${API_BASE}/${note._id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Delete failed');
        await loadNotes(currentPage);
      } catch (err) {
        console.error(err);
        alert('Error: Could not delete note.');
      }
    });

    $list.append(li);
  });
}

// reset the form
function resetForm() {
  editingId = null;
  $('#title').val('');
  $('#content').val('');
  $('#saveBtn').text('Save Note').removeClass('btn-warning').addClass('btn-success');
  $('#cancelEditBtn').hide();
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[s]));
}
