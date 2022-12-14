// Helper pour faciliter la gestion des Try...Catch dans les controllers
function controllerHandler(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = controllerHandler;
