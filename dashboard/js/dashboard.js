// Sidebar functionality
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('.lg\\:ml-64');
const sidebarItems = document.querySelectorAll('.sidebar-item');
const toggleButton = document.getElementById('sidebar-toggle');
const mobileMenuButton = document.getElementById('mobile-menu');
const mobileCloseButton = document.getElementById('mobile-close');
const sidebarOverlay = document.getElementById('sidebar-overlay');
let isSidebarCollapsed = false;

// Toggle sidebar
function toggleSidebar() {
  if (!sidebar || !mainContent) return;

  isSidebarCollapsed = !isSidebarCollapsed;

  if (isSidebarCollapsed) {
    sidebar.style.width = '5rem';
    mainContent.style.marginLeft = '5rem';
    document.querySelectorAll('.sidebar-text').forEach(text => {
      text.style.display = 'none';
    });
    toggleButton?.classList.add('sidebar-collapsed');
  } else {
    sidebar.style.width = '16rem';
    mainContent.style.marginLeft = '16rem';
    document.querySelectorAll('.sidebar-text').forEach(text => {
      text.style.display = 'block';
    });
    toggleButton?.classList.remove('sidebar-collapsed');
  }
}

// Active menu item
if (sidebarItems) {
  sidebarItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      sidebarItems.forEach(i => i.classList.remove('sidebar-active'));
      // Add active class to clicked item
      item.classList.add('sidebar-active');
    });
  });
}

// Mobile menu functionality
function openMobileSidebar() {
  sidebar?.classList.remove('-translate-x-full');
  sidebarOverlay?.classList.remove('hidden');
  document.body.classList.add('overflow-hidden'); // Prevent background scrolling
}

function closeMobileSidebar() {
  sidebar?.classList.add('-translate-x-full');
  sidebarOverlay?.classList.add('hidden');
  document.body.classList.remove('overflow-hidden'); // Restore scrolling
}

if (mobileMenuButton) {
  mobileMenuButton.addEventListener('click', () => {
    openMobileSidebar();
  });
}

if (mobileCloseButton) {
  mobileCloseButton.addEventListener('click', () => {
    closeMobileSidebar();
  });
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener('click', () => {
    closeMobileSidebar();
  });
}

// Handle responsive sidebar
function handleResize() {
  if (!sidebar || !mainContent) return;

  if (window.innerWidth < 1024) {
    sidebar.classList.add('-translate-x-full');
    mainContent.style.marginLeft = '0';
    sidebarOverlay?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  } else {
    sidebar.classList.remove('-translate-x-full');
    mainContent.style.marginLeft = isSidebarCollapsed ? '5rem' : '16rem';
    sidebarOverlay?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

window.addEventListener('resize', handleResize);
handleResize();

// Navbar Functionality
document.addEventListener('DOMContentLoaded', function () {
  // Theme Toggle
  const themeButton = document.querySelector('[data-theme-toggle]');
  const notificationsButton = document.querySelector('[data-notifications-toggle]');
  const notificationsPanel = document.querySelector('[data-notifications-panel]');
  const messagesButton = document.querySelector('[data-messages-toggle]');
  const messagesPanel = document.querySelector('[data-messages-panel]');

  // Theme Toggle
  if (themeButton) {
    let isDarkMode = localStorage.getItem('darkMode') === 'true';

    function updateTheme() {
      document.documentElement.classList.toggle('dark', isDarkMode);
      themeButton.innerHTML = `<i class="fas fa-${isDarkMode ? 'moon' : 'sun'} text-gray-600"></i>`;
    }

    themeButton.addEventListener('click', () => {
      isDarkMode = !isDarkMode;
      localStorage.setItem('darkMode', isDarkMode);
      updateTheme();
    });

    // Set initial theme
    updateTheme();
  }

  // Notifications Toggle
  if (notificationsButton && notificationsPanel) {
    notificationsButton.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationsPanel.classList.toggle('hidden');
      if (messagesPanel) messagesPanel.classList.add('hidden');
    });
  }

  // Messages Toggle
  if (messagesButton && messagesPanel) {
    messagesButton.addEventListener('click', (e) => {
      e.stopPropagation();
      messagesPanel.classList.toggle('hidden');
      if (notificationsPanel) notificationsPanel.classList.add('hidden');
    });
  }

  // Close panels when clicking outside
  document.addEventListener('click', (e) => {
    if (notificationsPanel && !notificationsButton?.contains(e.target) && !notificationsPanel.contains(e.target)) {
      notificationsPanel.classList.add('hidden');
    }
    if (messagesPanel && !messagesButton?.contains(e.target) && !messagesPanel.contains(e.target)) {
      messagesPanel.classList.add('hidden');
    }
  });

  // Profile Dropdown
  const profileButton = document.getElementById('profile-dropdown-btn');
  const profileDropdown = document.getElementById('profile-dropdown');
  const dropdownIcon = document.getElementById('profile-dropdown-icon');

  if (profileButton && profileDropdown && dropdownIcon) {
    profileButton.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
      dropdownIcon.classList.toggle('rotate-180');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.add('hidden');
        dropdownIcon.classList.remove('rotate-180');
      }
    });
  }
});
