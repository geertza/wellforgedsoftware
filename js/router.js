class Router {
    constructor(routes) {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.routes = routes;
        this.rootElem = document.getElementById('app');
        this.loadedScripts = new Set();
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.hasChanged());
        this.hasChanged();
    }

    hasChanged() {
        const hash = window.location.hash.substring(1);
        const matchedRoute = this.routes.find((route) => route.isActiveRoute(hash));

        if (matchedRoute) {
            this.goToRoute(matchedRoute.htmlName);
        } else {
            const defaultRoute = this.routes.find((route) => route.default);
            if (defaultRoute) {
                this.goToRoute(defaultRoute.htmlName);
            }
        }
    }

    goToRoute(htmlName) {
        const url = 'views/' + htmlName;
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                // Extract script tags from HTML
                const scriptRegex = /<script\s+src=["']([^"']+)["']><\/script>/g;
                const scripts = [];
                let match;
                while ((match = scriptRegex.exec(html)) !== null) {
                    scripts.push(match[1]);
                }
                // Remove script tags from HTML before injecting
                const cleanHtml = html.replace(scriptRegex, '');
                this.rootElem.innerHTML = cleanHtml;
                // Load scripts in order, but only if not already loaded
                const loadScripts = (index) => {
                    if (index < scripts.length) {
                        const scriptSrc = scripts[index];
                        if (!this.loadedScripts.has(scriptSrc)) {
                            const script = document.createElement('script');
                            script.src = scriptSrc;
                            script.onload = () => {
                                this.loadedScripts.add(scriptSrc);
                                loadScripts(index + 1);
                            };
                            document.body.appendChild(script);
                        } else {
                            loadScripts(index + 1);
                        }
                    } else {
                        // After all scripts loaded, call renderProjects if present and this is projects.html
                        if (htmlName === 'projects.html' && typeof window.renderProjects === 'function') {
                            window.renderProjects();
                        }
                    }
                };
                loadScripts(0);
            })
            .catch((error) => console.error('Error loading route:', error));
    }
}
