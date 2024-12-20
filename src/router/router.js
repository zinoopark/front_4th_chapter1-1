import { Auth } from "../auth/auth";

export const createRouter = (routes) => {
  const rootContainer = document.getElementById("root");
  const protectedRoutes = ["/profile"];

  const renderRoute = () => {
    const path = window.location.pathname || "/";
    console.log("Current Path:", path);

    if (protectedRoutes.includes(path) && !Auth.isLoggedIn()) {
      window.history.pushState(null, "", "/login");
      routes["/login"]();
      return;
    }
    if (["/login"].includes(path) && Auth.isLoggedIn()) {
      window.history.pushState(null, "", "/");
      routes["/"]();
      return;
    }

    const route = routes[path] || routes["/404"];
    route();
  };

  rootContainer.addEventListener("click", (e) => {
    console.log("clicked");
    const target = e.target.closest("a");
    if (target) {
      console.log(target);
      e.preventDefault();
      window.history.pushState(null, "", target.getAttribute("href"));
      renderRoute();
    }
  });

  const handleHashChange = () => {
    const path = window.location.hash.slice(1) || "/";
    window.history.pushState(null, "", path);
    renderRoute();
  };
  window.addEventListener("popstate", renderRoute);
  window.addEventListener("hashchange", handleHashChange);
  // window.addEventListener("load", renderRoute);

  renderRoute();
};
