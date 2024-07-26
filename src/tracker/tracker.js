(function () {
  const API_URL = 'https://pathsense-95f645fbabcd.herokuapp.com/api/events';

  function initTracker() {
    console.log('%cTracker initialized', 'color: #2196F3; font-weight: bold;');
    if (typeof window !== 'undefined') {
      // Send initialization event
      logEvent('trackerInitialized', {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
      });
      trackUserJourney();
    } else {
      console.log(
        '%cWindow object not available, skipping user journey tracking',
        'color: #FFA500; font-weight: bold;',
      );
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
        body: JSON.stringify({ type, data }),
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
    } else {
      console.log(
        '%cWindow object not available, skipping event sending',
        'color: #FFA500; font-weight: bold;',
      );
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
  } else {
    console.log(
      '%cWindow object not available, UserJourneyTracker not exposed globally',
      'color: #FFA500; font-weight: bold;',
    );
  }
})();
