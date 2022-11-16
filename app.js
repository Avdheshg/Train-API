
/* 

    Overview
        Create and start the server
        Read the JSON file and send it as response
        Develop the overview template and send the response
        Build the trains page

    Create the server
        import the http module
        creater the server using createServer function
        start and listen to the server

    Read the JSON file and send it as response
        import the fs module
        Read the JSON file using readFileSync

        Define a route for "/" or "/overview" route
        extract the curr url, pathName from req.url
        check if the curr route is home route
            send the JSON file

    Develop the overview template and send the response
        Overview
            Develop the all details of all trains inside the card 
            Replace the above string in the overview template

                Develop details of all trains inside the card
                    Read the card template
                    Write a replaceTemplate function which will replace all the details and will return a replaced string
                    TR the features array
                        for each ele, call the replaceTemplate function with curr ele and the template to replace the details
                        save them into a new array
                    convert the whole array into one single string using join function

                replace the placeholer in overview template with the above generated single string

    Build the trains page
        Read the trains template
        define a new route for "/trains" 
            import url module
            extract "pathname" and "query" from the "req.url" by converting "req.url" string into an object
            according to the entered query, find the object from the array of objects
            call the replaceTemplate function and replace the details
            send the above string to the server

*/

const http = require("http");
const fs = require("fs");
const url = require("url");

// reading JSON
let JSONDataString = fs.readFileSync(`${__dirname}/trains.json`, "utf-8");
let JSONData = JSON.parse(JSONDataString);
JSONData = JSONData.features;
// console.log(JSONData.features[0].properties.name);

// reading overview template
const tempOverview = fs.readFileSync(`${__dirname}/templates/tempOverview.html`, "utf-8");

// reading card template 
const tempCard = fs.readFileSync(`${__dirname}/templates/tempCard.html`, "utf-8"); 

// reading Train template
const tempTrain = fs.readFileSync(`${__dirname}/templates/tempTrain.html`, "utf-8");

const server = http.createServer((req, res) => { 
    const {pathname, query} = url.parse(req.url, true);

    if (pathname === "/") {
        let JSONCardsString = JSONData.map((curr) => {
            return replaceTemplate(tempCard, curr.properties);
        }).join("");
        const overviewString = tempOverview.replace("{%ALL_CARDS%}", JSONCardsString);
        res.end(overviewString);
    } else if (pathname === "/trains") {
        const foundTrain = JSONData.find((curr) => {
            return curr.properties.name === query.name;
        })
        const queryTrain = replaceTemplate(tempTrain, foundTrain.properties);
        res.end(queryTrain);
    }
});

server.listen(3000, () => {
    console.log("Server is running on the port 3000");
}) 

// replace template function
const replaceTemplate = (template, object) => {
    // console.log(template, object);
    let output = template.replace(/{%NAME%}/g, object.name);
    output = output.replace(/{%NUMBER%}/g, object.number);
    output = output.replace(/{%FROM%}/g, object.from_station_name);
    output = output.replace(/{%TO%}/g, object.to_station_name);
    output = output.replace(/{%ARRIVAL%}/g, object.arrival);
    output = output.replace(/{%DEPARTURE%}/g, object.departure);
    output = output.replace(/{%DURATION%}/g, object.duration_m);
    
    output = output.replace(/{%FIRST_AC%}/g, object.first_class);
    output = output.replace(/{%SLEEPER%}/g, object.sleeper);
    output = output.replace(/{%SECOND_AC%}/g, object.second_ac);
    output = output.replace(/{%THIRD_AC%}/g, object.third_ac);
    output = output.replace(/{%CHAIR_CAR%}/g, object.chair_car);  
    output = output.replace(/{%RETURN_TRAIN%}/g, object.return_train);
    output = output.replace(/{%TYPE%}/g, object.type);
    output = output.replace(/{%DISTANCE%}/g, object.distance);
    return output;
}

/*  
    name   number     from_station_name   to_station_name     duration_m    arrival  departure

    first_class      sleeper        second_ac    third_ac    chair_car     return_train           type    distance
    
    Features V can add:
        Special color for Rajdhani, special trains
        Searching functionality

*/













































































