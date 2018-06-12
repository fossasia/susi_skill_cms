window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
    };
  };
