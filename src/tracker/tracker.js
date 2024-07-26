(function () {
  const API_URL = 'https://pathsense-95f645fbabcd.herokuapp.com/api/events';
  let ACCOUNT_ID = null;

  function initTracker(accountId) {
    ACCOUNT_ID = accountId;
    console.log(
      '%cTracker initialized with account ID:',
      'color: #2196F3; font-weight: bold;',
      ACCOUNT_ID,
    );
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
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accountId: ACCOUNT_ID, type, data }),
    }).catch(function (error) {
      console.error('%cError logging event:', 'color: #F44336; font-weight: bold;', error);
    });
  }

  // Expose the init function globally
  window.UserJourneyTracker = {
    init: initTracker,
    logCustomEvent: function (eventType, eventData) {
      if (!ACCOUNT_ID) {
        console.error(
          '%cTracker not initialized with account ID',
          'color: #F44336; font-weight: bold;',
        );
        return;
      }
      logEvent(eventType, eventData);
    },
  };
})();
