var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var alert = document.getElementById('subscribeAlert');
    alert.classList.remove('d-none');

    setTimeout(function() {
        alert.classList.add('d-none');
      }, 5000);

    document.getElementById('email-newsletter').value = '';
  });