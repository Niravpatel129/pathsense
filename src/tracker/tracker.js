(function () {
  const API_URL = 'https://pathsense-95f645fbabcd.herokuapp.com/api/events';
  let ACCOUNT_ID = 'fake_account_123'; // Set a fake account ID to begin with

  function initTracker(accountId) {
    ACCOUNT_ID = accountId || ACCOUNT_ID; // Use provided accountId or keep the fake one
    console.log(
      '%cTracker initialized with account ID:',
      'color: #2196F3; font-weight: bold;',
      ACCOUNT_ID,
    );
    if (typeof window !== 'undefined') {
      trackUserJourney();
    }
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

    console.log('%cTracker setup complete', 'color: #4CAF50; font-weight: bold;');
  }

  function logEvent(type, data) {
    console.log('%cEvent logged:', 'color: #4CAF50; font-weight: bold;', { type, data });
    if (typeof window !== 'undefined') {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: ACCOUNT_ID, type, data }),
      }).catch(function (error) {
        console.error('%cError logging event:', 'color: #F44336; font-weight: bold;', error);
      });
    }
  }

  // Expose the init function globally
  if (typeof window !== 'undefined') {
    window.UserJourneyTracker = {
      init: initTracker,
      logCustomEvent: function (eventType, eventData) {
        logEvent(eventType, eventData);
      },
    };
  }
})();
