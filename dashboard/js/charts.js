// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Traffic Overview Chart
  const trafficCtx = document.getElementById('trafficChart')?.getContext('2d');
  if (trafficCtx) {
    new Chart(trafficCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Organic Traffic',
            data: [30000, 35000, 32000, 40000, 38000, 45000],
            borderColor: '#3b82f6',
            tension: 0.3,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
          },
          {
            label: 'Paid Traffic',
            data: [25000, 28000, 27000, 35000, 32000, 40000],
            borderColor: '#a855f7',
            tension: 0.3,
            fill: true,
            backgroundColor: 'rgba(168, 85, 247, 0.1)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // User Behavior Chart
  const behaviorCtx = document.getElementById('behaviorChart')?.getContext('2d');
  if (behaviorCtx) {
    new Chart(behaviorCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Page Views',
          data: [1200, 1900, 1500, 2100, 1800, 2500, 1800],
          backgroundColor: '#4f46e5',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              drawBorder: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  // Add real-time updates simulation
  function addNewActivity() {
    const activities = [
      { icon: 'shopping-cart', color: 'green', text: 'New purchase' },
      { icon: 'user-plus', color: 'blue', text: 'New user registered' },
      { icon: 'comment', color: 'yellow', text: 'New comment' }
    ];

    const activity = activities[Math.floor(Math.random() * activities.length)];
    const container = document.querySelector('.space-y-6');

    if (container) {
      const newActivity = document.createElement('div');
      newActivity.className = 'flex items-center space-x-4 animate-pulse';
      newActivity.innerHTML = `
                <div class="relative">
                    <div class="w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center">
                        <i class="fas fa-${activity.icon} text-${activity.color}-500"></i>
                    </div>
                    <div class="absolute -top-1 -right-1 w-3 h-3 bg-${activity.color}-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                    <p class="text-sm font-medium">${activity.text}</p>
                    <p class="text-xs text-gray-500">Just now</p>
                </div>
            `;

      // Add new activity at the top
      container.insertBefore(newActivity, container.firstChild);

      // Remove oldest activity if more than 4
      if (container.children.length > 4) {
        container.removeChild(container.lastChild);
      }

      // Remove animation class after animation completes
      setTimeout(() => {
        newActivity.classList.remove('animate-pulse');
      }, 2000);
    }
  }

  // Simulate real-time updates every 5 seconds
  setInterval(addNewActivity, 5000);
});
