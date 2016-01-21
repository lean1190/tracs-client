(function () {
    "use strict";

    angular
        .module("TracsClient.factories")
        .factory("LoginFactory", LoginFactory);

    LoginFactory.$inject = ["$http", "$q", "localStorageService"];

    function LoginFactory($http, $q, localStorageService) {

        var service = {
            authorize: authorize
        };

        return service;

        function tradeCodeForTokens(authorizationCode, googleOauthOptions) {
            return $http({
                url: "https://www.googleapis.com/oauth2/v3/token",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                params: {
                    code: authorizationCode,
                    redirect_uri: googleOauthOptions.redirectUri,
                    client_id: googleOauthOptions.clientId,
                    client_secret: googleOauthOptions.clientSecret,
                    scope: "",
                    grant_type: "authorization_code"
                }
            }).then(function(result) {
                return result.data;
            });
        }

        function authorize(googleOauthOptions) {

            return $q(function (resolve, reject) {
                var authUrl = "https://accounts.google.com/o/oauth2/auth?" +
                    "redirect_uri=" + googleOauthOptions.redirectUri +
                    "&response_type=code" +
                    "&client_id=" + googleOauthOptions.clientId +
                    "&scope=" + googleOauthOptions.scopes +
                    "&approval_prompt=force" +
                    "&access_type=offline";

                console.log("AuthURL: ", authUrl);

                var authWindow = window.open(authUrl, "_blank", "location=no,toolbar=no");

                // Agrega un evento para escuchar cada vez que cambia la página
                authWindow.addEventListener("loadstart", function (event) {
                    var url = event.url,
                        responseCode = /\?code=(.+)$/.exec(url),
                        responseError = /\?error=(.+)$/.exec(url);

                    console.log("url", url);
                    console.log("code", responseCode, "error", responseError);

                    // Ya sea por okey o por error, cierra la ventana activa de autorización
                    if (responseCode || responseError) {
                        authWindow.close();
                    }

                    // Si se pudo recuperar el código de autorización correctamente
                    if (responseCode) {
                        var authorizationCode = responseCode[1];

                        return tradeCodeForTokens(authorizationCode, googleOauthOptions).then(function (result) {
                            console.log("Tokens result", result);
                        });
                    } else if (responseError) {
                        // El usuario denegó el acceso a la app
                        reject({
                            error: responseError[1]
                        });
                    }
                });
            });
        }
    }

})();
