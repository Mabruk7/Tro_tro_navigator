// Immediately Invoked Function Expression (IIFE) to encapsulate the script
(function () {
  "use strict";

  // --- Configuration (Set your own log endpoint if needed) ---
  // If you have a personal server endpoint for error logging, put it here.
  // Otherwise, set to null to disable network logging.
  const LOG_ENDPOINT = null; // Example: 'https://my-personal-logging-server.com/log'

  /**
   * Helper to send an error/log report to a server if LOG_ENDPOINT is set.
   * @param {object} logData - The data object to send.
   */
  function sendLog(logData) {
    if (!LOG_ENDPOINT) return;

    const payload = {
      ...logData,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };

    fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.error("Failed to send log to personal endpoint:", err);
    });
  }

  /**
   * Formats arguments from console calls or errors into a single string.
   * @param {any[]} args - Arguments passed to a console function or an error object.
   * @returns {string} - Formatted string.
   */
  function formatArgs(args) {
    return args
      .map((arg) => {
        if (arg instanceof Error) {
          return arg.stack ? `${arg.message}\n\n${arg.stack}` : arg.message;
        }
        if (arg instanceof HTMLElement) {
          return arg.outerHTML;
        }
        if (typeof arg === "object" && arg !== null) {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return String(arg); // Handle circular references gracefully
          }
        }
        return String(arg);
      })
      .join(" ");
  }

  // --- Global Error and Promise Rejection Handlers ---

  window.onerror = function (message, source, lineno, colno, error) {
    const fullMessage = error?.stack ? `${message}\n\n${error.stack}` : message;
    console.error("Global Uncaught Error:", fullMessage);
    sendLog({
      type: "RUNTIME_ERROR",
      message: fullMessage,
      context: { source, lineno, colno },
    });
  };

  window.onunhandledrejection = function (event) {
    const reason = event.reason;
    const message = reason?.message || String(reason);
    const stack = reason?.stack || null;
    const fullMessage = stack ? `${message}\n\n${stack}` : message;
    console.error("Unhandled Promise Rejection:", fullMessage);
    sendLog({
      type: "PROMISE_REJECTION",
      message: fullMessage,
    });
  };

  // --- Console Method Overrides (Optional but useful for central logging) ---

  // Save original console methods
  const original = {
    error: console.error,
    log: console.log,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
  };

  console.error = function (...args) {
    const message = formatArgs(args);
    sendLog({ type: "CONSOLE_ERROR", message });
    original.error.apply(console, args);
  };

  console.log = function (...args) {
    const message = formatArgs(args);
    sendLog({ type: "CONSOLE_LOG", message });
    original.log.apply(console, args);
  };

  // You can similarly override `warn`, `info`, and `debug` if you need to log them.

  // --- DOM and Navigation Event Tracking (Simplified) ---

  // Notify when the document is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    console.info("Script: DOMContentLoaded");
    // Any logic you want to run after the DOM is ready
  });

  // Enhance History API to track path changes
  if (window.history && window.history.pushState) {
    const originalPushState = window.history.pushState;
    window.history.pushState = function () {
      originalPushState.apply(this, arguments);
      console.info(
        `Script: pushState navigated to ${window.location.pathname}`
      );
      // Run personal page-view tracking logic here if needed
    };

    const originalReplaceState = window.history.replaceState;
    window.history.replaceState = function () {
      originalReplaceState.apply(this, arguments);
      console.info(
        `Script: replaceState navigated to ${window.location.pathname}`
      );
    };

    window.addEventListener("popstate", function () {
      console.info(`Script: popstate navigated to ${window.location.pathname}`);
    });
  }

  window.addEventListener("hashchange", function () {
    console.info(`Script: hashchange to ${window.location.hash}`);
  });
})();
