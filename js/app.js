'use strict';

(function () {
    function init() {
        var router = new Router([
            new Route('home', 'home.html', true),
            new Route('about', 'about.html'),
            new Route('contact', 'contact.html'),
            new Route('portfolio', 'portfolio.html'),
            new Route('dice', 'dice.html'),
            new Route('dnd', 'dnd.html'),
            new Route('Cards', 'card.html'),
            new Route('Projects', 'projects.html'),
            new Route('groceryList', 'groceryList.html')
        ]);
    }

    init();
}());
