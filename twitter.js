(function initializeTwitterBird() {

  // Customization settings
  const twitterBlueColor = "rgb(29, 155, 240)";
  const customLogoClass = "custom-twitter-logo";

  // Define selectors for different logo positions
  const logoSelectors = {
    loading: "#react-root #placeholder > svg",
    header: "header[role='banner'] h1 > a[href$='home'] > div > svg",
    dialog: "div[aria-labelledby='modal-header'][role='dialog'] :is(svg[aria-label='Twitter'], div:has(> div[aria-label][role='button']) + div > svg)",
    mobile: "[data-testid='TopNavBar'] > div > div > div > div > div > div > div > svg"
  };

  // Generate comma-separated string of logo selectors
  let logoSelectorString = Object.values(logoSelectors).toString();

  // Find all logo elements using the generated selectors
  let logoElements = document.querySelectorAll(logoSelectorString);

  // Mutation Observer to track DOM changes
  const logosObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // Update the tab title to replace X with Twitter
      document.title = document.title.replace(/X/, "Twitter");

      mutation.addedNodes.forEach(function(elem) {
        // Update the logo elements
        logoSelectorString = Object.values(logoSelectors).toString();
        logoElements = document.querySelectorAll(logoSelectorString);

        // Perform the logo replacement check
        checkAndReplaceLogos();
      });
    });
  });

  // Start observing DOM changes
  logosObserver.observe(document.body, { childList: true, subtree: true });

  // Function to replace the logo with a customized SVG
  function replaceLogo(prevLogo, logoWidth, logoHeight) {
    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const logoParent = prevLogo.parentNode;

    // Set SVG attributes
    newSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    newSvg.setAttribute("viewBox", "0 0 24 24");
    newSvg.classList.add(customLogoClass);
    if (logoWidth) newSvg.setAttribute("width", logoWidth);
    if (logoHeight) newSvg.setAttribute("height", logoHeight);

    // Create the logo path
    const newPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    newPath.setAttribute("fill", twitterBlueColor);
    newPath.setAttribute("d", "M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z");

    // Append the path to the SVG and replace the original logo
    newSvg.appendChild(newPath);
    logoParent.replaceChild(newSvg, prevLogo);
  }

  // Function to check and replace logos
  function checkAndReplaceLogos() {
    logoElements.forEach(function(logo) {
      const isCustomLogo = !logo.classList.contains(customLogoClass);

      if (isCustomLogo) {
        if (logo.closest("#placeholder")) {
          // Customize for splash screen
          const logoContainer = document.getElementById("placeholder");
          logoContainer.style.justifyContent = "center";
          logoContainer.style.alignItems = "center";
          replaceLogo(logo, 72, 72);
        } else if (logo.closest("header[role='banner']")) {
          // Customize for header
          replaceLogo(logo, "100%", "2rem");
        } else if (logo.closest("div[aria-labelledby='modal-header'][role='dialog']")) {
          // Customize for dialog
          replaceLogo(logo, null, "2em");
        } else {
          // Default customization
          replaceLogo(logo);
        }
      }
    });
  }

  // Initial check and replacement of logos
  checkAndReplaceLogos();

  // Update tab icon
  const tabIcon = document.head.querySelector("link[rel='shortcut icon']");
  tabIcon.setAttribute('href', '//abs.twimg.com/favicons/twitter.2.ico');
})();
