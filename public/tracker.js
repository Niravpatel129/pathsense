(function () {
  const API_URL = 'http://localhost:3000/api/events';
  const ACCOUNT_ID = 'your-account-id'; // You'll need to replace this with actual account management

  function trackUserJourney() {
    const pageLoadTime = new Date();

    function logEvent(type, data) {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accountId: ACCOUNT_ID,
          type,
          data,
        }),
      }).catch(console.error);
    }
  }

  trackUserJourney();
})();
