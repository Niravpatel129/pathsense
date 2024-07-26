(function () {
  const API_URL = 'https://your-heroku-app.herokuapp.com/api/events';
  let ACCOUNT_ID = null;

  function initTracker(accountId) {
    ACCOUNT_ID = accountId;
    trackUserJourney();
  }

  function trackUserJourney() {
    const pageLoadTime = new Date();

    // Log page view event
    logEvent('pageView', {
      url: window.location.href,
      timestamp: pageLoadTime.toISOString(),
    });

    // Track user interactions
    document.addEventListener('click', function (e) {
      logEvent('click', {
        elementId: e.target.id,
        elementClass: e.target.className,
        elementTag: e.target.tagName,
        timestamp: new Date().toISOString(),
      });
    });

    // Track page unload
    window.addEventListener('beforeunload', function () {
      logEvent('pageUnload', {
        url: window.location.href,
        duration: new Date() - pageLoadTime,
        timestamp: new Date().toISOString(),
      });
    });
  }

  function logEvent(type, data) {
    if (!ACCOUNT_ID) {
      console.error('Tracker not initialized with account ID');
      return;
    }
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId: ACCOUNT_ID, type, data }),
    }).catch(console.error);
  }

  // Expose the init function globally
  window.UserJourneyTracker = {
    init: initTracker,
    logCustomEvent: function (eventType, eventData) {
      if (!ACCOUNT_ID) {
        console.error('Tracker not initialized with account ID');
        return;
      }
      logEvent(eventType, eventData);
    },
  };
})();
