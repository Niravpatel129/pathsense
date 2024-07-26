(function () {
  const API_URL = 'https://pathsense-95f645fbabcd.herokuapp.com/api/events';
  let ACCOUNT_ID = null; // Initialize ACCOUNT_ID as null

  function initTracker(accountId) {
    if (!accountId) {
      console.error(
        '%cAccount ID is required for initialization',
        'color: #F44336; font-weight: bold;',
      );
      return;
    }
    ACCOUNT_ID = accountId;
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
    if (!ACCOUNT_ID) {
      console.error(
        '%cTracker not initialized with account ID',
        'color: #F44336; font-weight: bold;',
      );
      return;
    }
    console.log('%cEvent logged:', 'color: #4CAF50; font-weight: bold;', { type, data });
    if (typeof window !== 'undefined') {
      fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId: ACCOUNT_ID, type, data }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(
            '%cEvent successfully sent to server:',
            'color: #4CAF50; font-weight: bold;',
            data,
          );
        })
        .catch(function (error) {
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
