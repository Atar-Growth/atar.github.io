function openTab(evt, tabName) {
  // Get all tab contents and tab links within the same container as the clicked tab
  var tabContainer = evt.currentTarget.parentNode;
  var tabContents = tabContainer.nextElementSibling.querySelectorAll('.tabcontent');
  var tabLinks = tabContainer.querySelectorAll('.tablinks');

  // Hide all tab contents and remove 'active' class from all tab links in the same container
  tabContents.forEach(content => content.style.display = 'none');
  tabLinks.forEach(link => link.className = link.className.replace(' active', ''));

  // Show the clicked tab's content and add 'active' class
  var tabContent = document.getElementById(tabName);
  tabContent.style.display = 'block';
  evt.currentTarget.className += ' active';
}

function copyCode(containerId) {
  const textArea = document.createElement('textarea');
  textArea.value = document.querySelector('#' + containerId + ' pre code').textContent;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('Copy');
  textArea.remove();
  alert('Code copied to clipboard!');
}

// Function to initialize the first tab of each group
function initializeTabs() {
  // Get all tab container elements
  var tabContainers = document.querySelectorAll('.tab');
  tabContainers.forEach(function(container) {
    // Find the first tablink in this container and click it
    var firstTabLink = container.getElementsByClassName('tablinks')[0];
    if (firstTabLink) {
      firstTabLink.click();
    }
  });
}

// Load the first tabs on page load
document.addEventListener("DOMContentLoaded", initializeTabs);
