// application/views/panorama/panorama-ctl.js
// Usage: as module ng-controller="PanoramaCtrl", as POJO ng-controller="intv.app.views.panorama.PanoramaCtrl"
NSfn.namespace('intv.app.views').panorama = intv.app.views.panorama || angular.module('intv.app.views.panorama', []);


intv.app.views.panorama.PanoramaCtrl = function PanoramaCtrl($scope){
    var data = intv.app.views.panorama.data,  //TODO: get model from data service
        assets = data.assets;
    $scope.model = data;
    $scope.programs = data.assets;
    $scope.primary = assets.filter(function(x,i) {
                            return (i === 0 || i === 1 || i === 4 || i === 7 || i === 10);
                    });
    $scope.secondary = assets.filter(function(x,i) {
        return (i !== 0 && i !== 1 && i !== 4 && i !== 7 && i !== 10);
    });

    //Prompt the user to add this route to their home screen (IOS only)
    Modernizr.load({
        test: Modernizr.appleios,
        yep: 'core/libs/add2home.js',
        callback: function () {
            // show Add 2 Home bubble
            addToHome.show();
        }
    });
    console.log('Panorama Controller instantiated', Math.abs(new (Date) - intv.instrumentation.timings.bootstrap));
};

intv.app.views.panorama.PanoramaCtrl.$inject = [ "$scope"];
intv.app.views.panorama.controller('PanoramaCtrl', ['$scope', intv.app.views.panorama.PanoramaCtrl]);

//TODO: Move int.app.views.panorama.data into a Service and inject it.
intv.app.views.panorama.data = {
    "assets": [
        {
            "program_id": "1350491",
            "program_title": "True Detective",
            "program_url": "true-detective",
            "tune_in": "PREMIERING SUN 9PM",
            "marketing_message": "Touch darkness and darkness touches you back.",
            "call_to_action": {
                "message": "Watch a Preview",
                "url": "true-detective/?section=landing"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/true-detective/mobile/panoramas/131112-true-detective-a-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/true-detective/mobile/panoramas/131112-true-detective-a-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/true-detective/mobile/panoramas/131112-true-detective-a-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/true-detective/mobile/panoramas/131112-true-detective-a-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/true-detective/mobile/panoramas/131112-true-detective-a-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/true-detective/mobile/panoramas/131112-true-detective-a-230x125.jpg"
            },
            "alt": "131112-true-detective-a"
        },
        {
            "program_id": "1359241",
            "program_title": "Looking",
            "program_url": "looking",
            "tune_in": "PREMIERING SUN JAN 19",
            "marketing_message": "Find something real. A new series about living - and loving - in San Francisco.",
            "call_to_action": {
                "message": "Watch a Preview",
                "url": "looking/?section=landing"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/looking/mobile/panorama/looking-ep1-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/looking/mobile/panorama/looking-ep1-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/looking/mobile/panorama/looking-ep1-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/looking/mobile/panorama/looking-ep1-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/looking/mobile/panorama/looking-ep1-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/looking/mobile/panorama/looking-ep1-230x125.jpg"
            },
            "alt": "Augustin"
        },
        {
            "program_id": "1352478",
            "program_title": "Girls",
            "program_url": "girls",
            "tune_in": "PREMIERING SUN 10 PM",
            "marketing_message": "Happily whatever after. ",
            "call_to_action": {
                "message": "Watch a Preview",
                "url": "girls/?section=latest"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/girls/mobile/panorama/131112-girls-s3-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/girls/mobile/panorama/131112-girls-s3-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/girls/mobile/panorama/131112-girls-s3-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/girls/mobile/panorama/131112-girls-s3-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/girls/mobile/panorama/131112-girls-s3-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/girls/mobile/panorama/131112-girls-s3-230x125.jpg"
            },
            "alt": "131112-girls-s3"
        },
        {
            "program_id": "1361221",
            "program_title": "Silicon Valley",
            "program_url": "silicon-valley",
            "tune_in": "COMING IN APRIL",
            "marketing_message": "From creator Mike Judge a new comedy about making it in high tech.",
            "call_to_action": {
                "message": "Find Out More",
                "url": "silicon-valley/?section=landing"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/silicon-valley/mobile/panorama/140108-silicon-valley-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/silicon-valley/mobile/panorama/140108-silicon-valley-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/silicon-valley/mobile/panorama/140108-silicon-valley-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/silicon-valley/mobile/panorama/140108-silicon-valley-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/silicon-valley/mobile/panorama/140108-silicon-valley-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/silicon-valley/mobile/panorama/140108-silicon-valley-230x125.jpg"
            },
            "alt": "Silicon Valley"
        },
        {
            "program_id": "1361222",
            "program_title": "The Normal Heart",
            "program_url": "movies/the-normal-heart",
            "tune_in": "COMING IN MAY",
            "marketing_message": "HBO Films presents Larry Kramer's adaptation of his award-winning play.",
            "call_to_action": {
                "message": "Find Out More",
                "url": "movies/the-normal-heart/?section=landing"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/movies/the-normal-heart/mobile/panorama/140108-the-normal-heart-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/movies/the-normal-heart/mobile/panorama/140108-the-normal-heart-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/movies/the-normal-heart/mobile/panorama/140108-the-normal-heart-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/movies/the-normal-heart/mobile/panorama/140108-the-normal-heart-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/movies/the-normal-heart/mobile/panorama/140108-the-normal-heart-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/movies/the-normal-heart/mobile/panorama/140108-the-normal-heart-230x125.jpg"
            },
            "alt": "The Normal Heart"
        },
        {
            "program_id": "1358110",
            "program_title": "Real Time with Bill Maher",
            "program_url": "real-time-with-bill-maher",
            "tune_in": "RETURNS FRI JAN 17",
            "marketing_message": "Join Bill's audience and see Real Time live in Los Angeles.",
            "call_to_action": {
                "message": "Find Out More",
                "url": "real-time-with-bill-maher/?section=latest"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/real-time-with-bill-maher/mobile/panorama/131112-bill-maher-01-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/real-time-with-bill-maher/mobile/panorama/131112-bill-maher-01-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/real-time-with-bill-maher/mobile/panorama/131112-bill-maher-01-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/real-time-with-bill-maher/mobile/panorama/131112-bill-maher-01-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/real-time-with-bill-maher/mobile/panorama/131112-bill-maher-01-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/real-time-with-bill-maher/mobile/panorama/131112-bill-maher-01-230x125.jpg"
            },
            "alt": "131112-bill-maher-01"
        },
        {
            "program_id": "1358358",
            "program_title": "Game of Thrones",
            "program_url": "game-of-thrones",
            "tune_in": "#RoastJoffrey",
            "marketing_message": "Roast Joffrey on Twitter, Facebook, Instagram and Vine using #RoastJoffery.",
            "call_to_action": {
                "message": "Find Out More",
                "url": "game-of-thrones/?section=latest"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/game-of-thrones/mobile/panorama/131212-roast-joffrey-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/game-of-thrones/mobile/panorama/131212-roast-joffrey-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/game-of-thrones/mobile/panorama/131212-roast-joffrey-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/game-of-thrones/mobile/panorama/131212-roast-joffrey-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/game-of-thrones/mobile/panorama/131212-roast-joffrey-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/game-of-thrones/mobile/panorama/131212-roast-joffrey-230x125.jpg"
            },
            "alt": "Roast Joffrey"
        },
        {
            "program_id": "1360860",
            "program_title": "Behind the Candelabra",
            "program_url": "movies/behind-the-candelabra",
            "tune_in": "HBO FILMS",
            "marketing_message": "Michael Douglas and Matt Damon star in the story of Liberace.",
            "call_to_action": {
                "message": "Find Out More",
                "url": "movies/behind-the-candelabra/?section=landing"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/movies/behind-the-candelabra/mobile/panorama/behind-the-candelabra-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/movies/behind-the-candelabra/mobile/panorama/behind-the-candelabra-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/movies/behind-the-candelabra/mobile/panorama/behind-the-candelabra-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/movies/behind-the-candelabra/mobile/panorama/behind-the-candelabra-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/movies/behind-the-candelabra/mobile/panorama/behind-the-candelabra-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/movies/behind-the-candelabra/mobile/panorama/behind-the-candelabra-230x125.jpg"
            },
            "alt": "Behind the Candelabra"
        },
        {
            "program_id": "1352889",
            "program_title": "Real Sports with Bryant Gumbel",
            "program_url": "real-sports-with-bryant-gumbel",
            "tune_in": "RETURNS TUE JAN 21",
            "marketing_message": "Nothing's out of bounds.",
            "call_to_action": {
                "message": "Find Out More",
                "url": "real-sports-with-bryant-gumbel/?section=landing"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/real-sports-with-bryant-gumbel/mobile/panorama/131112-real-sports-01-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/real-sports-with-bryant-gumbel/mobile/panorama/131112-real-sports-01-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/real-sports-with-bryant-gumbel/mobile/panorama/131112-real-sports-01-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/real-sports-with-bryant-gumbel/mobile/panorama/131112-real-sports-01-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/series/real-sports-with-bryant-gumbel/mobile/panorama/131112-real-sports-01-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/series/real-sports-with-bryant-gumbel/mobile/panorama/131112-real-sports-01-230x125.jpg"
            },
            "alt": "131112-real-sports-01"
        },
        {
            "program_id": "1361224",
            "program_title": "The Education of Mohammad Hussein",
            "program_url": "documentaries/the-education-of-mohammad-hussein",
            "tune_in": "NOW ON AIR",
            "marketing_message": "Growing up Muslim in America.",
            "call_to_action": {
                "message": "Watch a Preview",
                "url": "documentaries/the-education-of-mohammad-hussein/?section=latest"
            },
            "primary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/documentaries/the-education-of-mohammad-hussein/mobile/panorama/131223-the-education-of-mohammad-hussein-2300x2560.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/documentaries/the-education-of-mohammad-hussein/mobile/panorama/131223-the-education-of-mohammad-hussein-1150x1280.jpg"
            },
            "secondary": {
                "double_res": "http://i.lv3.hbo.com/assets/images/documentaries/the-education-of-mohammad-hussein/mobile/panorama/131223-the-education-of-mohammad-hussein-1100x800.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/documentaries/the-education-of-mohammad-hussein/mobile/panorama/131223-the-education-of-mohammad-hussein-550x400.jpg"
            },
            "program": {
                "double_res": "http://i.lv3.hbo.com/assets/images/documentaries/the-education-of-mohammad-hussein/mobile/panorama/131223-the-education-of-mohammad-hussein-460x250.jpg",
                "single_res": "http://i.lv3.hbo.com/assets/images/documentaries/the-education-of-mohammad-hussein/mobile/panorama/131223-the-education-of-mohammad-hussein-230x125.jpg"
            },
            "alt": "The Education of Mohammad Hussein"
        }
    ],
    "contentType": "LITE_PANORAMA",
    "moduleType": "PANORAMA",
    "meta": {
        "metaKeywords": "HBO, HBO shows, HBO series, Game of Thrones, True Blood, Real Time with Bill Maher, Boardwalk Empire, Eastbound & Down, Hello Ladies, Girls, Veep, The Newsroom, Curb Your Enthusiasm, videos, episode guide, schedule, original series",
        "metaTitle": "HBO Official Site",
        "metaDescription": "HBO's official website contains schedule information, original video content, episode guides, polls, bulletin boards, and more!"
    },
    "url": "http://m.hbo.com/01-09-2014",
    "analytics": {
        "contentModule": " ",
        "subsection": "home",
        "section": "panorama",
        "pageName": "panorama: home",
        "franchise": "global",
        "contentType": "panorama",
        "contentPath": "global: global: panorama"
    },
    "microData": {},
    "canonicalService": {
        "enable": true,
        "endpoint": "http://www.hbo.com/apps/mapper"
    },
    "profileHelper": {
        "authKey": "xA5T4ZdyNWga4mlopstRspemi6PsgQdfN9gMn3i",
        "profileServer": "http://www.hbo.com"
    }
};
console.log('loaded panorama controller', Math.abs(new (Date) - intv.instrumentation.timings.bootstrap));