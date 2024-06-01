document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var alert = document.getElementById('subscribeAlert');
    alert.classList.remove('d-none');

    setTimeout(function() {
        alert.classList.add('d-none');
      }, 5000);

    document.getElementById('email-newsletter').value = '';
  });