// INPUTS
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const ratingInput = document.getElementById('rating');
const feedbackInput = document.getElementById('feedback');

// PREVIEW
const previewName = document.getElementById('preview-name');
const previewEmail = document.getElementById('preview-email');
const previewRating = document.getElementById('preview-rating');
const previewFeedback = document.getElementById('preview-feedback');

// SUMMARY
const totalEl = document.getElementById('total-responses');
const avgEl = document.getElementById('avg-rating');
const tableBody = document.getElementById('responses-body');

let responses = [];

// LIVE PREVIEW
function updatePreview() {
  previewName.textContent = nameInput.value || 'N/A';
  previewEmail.textContent = emailInput.value || 'N/A';
  previewRating.textContent = ratingInput.value || 'N/A';
  previewFeedback.textContent = feedbackInput.value || 'N/A';
}

nameInput.addEventListener('input', updatePreview);
emailInput.addEventListener('input', updatePreview);
ratingInput.addEventListener('change', updatePreview);
feedbackInput.addEventListener('input', updatePreview);

// SUBMIT
document.getElementById('submit-btn').addEventListener('click', function (e) {
  e.preventDefault(); // ✅ IMPORTANT

  if (!nameInput.value || !emailInput.value || !ratingInput.value || !feedbackInput.value) {
    alert("Please fill all fields");
    return;
  }

  // REMOVE "No responses yet"
  const emptyRow = document.getElementById('no-responses');
  if (emptyRow) {
    emptyRow.closest('tr').remove();
  }

  // ADD ROW
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${nameInput.value}</td>
    <td>${emailInput.value}</td>
    <td>${ratingInput.value}</td>
    <td>${feedbackInput.value}</td>
  `;
  tableBody.appendChild(row);

  // SAVE DATA
  responses.push({
    rating: Number(ratingInput.value)
  });

  // SUMMARY
  totalEl.textContent = responses.length;
  const sum = responses.reduce((a, b) => a + b.rating, 0);
  avgEl.textContent = (sum / responses.length).toFixed(2);

  // RESET
  nameInput.value = "";
  emailInput.value = "";
  ratingInput.value = "";
  feedbackInput.value = "";
  updatePreview();
});
