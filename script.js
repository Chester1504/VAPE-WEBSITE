function showPopup() {
    document.getElementById('popup').style.display = 'block';
  }

  function hidePopup() {
    document.getElementById('popup').style.display = 'none';
  }

  function checkAge(isAbove18) {
    if (isAbove18) {
      // If the user is 18 or older, they can proceed to the website
      hidePopup();
    } else {
      alert("Sorry, you must be 18 years or older to access this site.");
      // Redirect to another page or handle as appropriate
      window.location.href = "index.html";
    }
  }




