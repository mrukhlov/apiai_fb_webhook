'use strict';

const express = require('express');
const bodyParser = require('body-parser');

function isDefined(obj) {
    if (typeof obj == 'undefined') {
        return false;
    }

    if (!obj) {
        return false;
    }

    return obj != null;
}

const app = express();

app.use(bodyParser.text({type: 'application/json'}));

app.post('/webhook/', (req, res) => {

    //setting variable for custom intent checkk
    var weather_query = false;

    //creating custom fb formated message template
    const generic_message = {
        attachment: {
            type: "template",
            payload: {
                template_type: "generic",
                elements: []
            }
        }
    };

    //creating custom payload elements template for pizza webhook example
    var HAWAIIAN_CHICKEN = {
        title: "HAWAIIAN CHICKEN",
        subtitle: "Chicken meat, juicy pineapples and Mozzarella cheese on tomato pizza sauce.",
        item_url: "https://en.wikipedia.org/wiki/Pizza",
        image_url: "http://www.phdelivery.com.my/i/menu/pizza/pizza_hawaiianchicken.jpg",
        buttons: [/*{
         type: "web_url",
         url: "https://en.wikipedia.org/wiki/Pizza",
         title: "Open Web URL"
         },*/ {
            type: "postback",
            title: "Show HAWAIIAN CHICKEN",
            payload: "HAWAIIAN CHICKEN"
        }]
    };
    var CHICKEN_PEPPERONI = {
        title: "CHICKEN PEPPERONI",
        subtitle: "Chicken pepperoni topped with mozzarella cheese and tomato pizza sauce.",
        item_url: "https://en.wikipedia.org/wiki/Pizza",
        image_url: "http://www.phdelivery.com.my/i/menu/pizza/pizza_chickenpepperoni.jpg",
        buttons: [/*{
         type: "web_url",
         url: "https://en.wikipedia.org/wiki/Pizza",
         title: "Open Web URL"
         },*/ {
            type: "postback",
            title: "Show CHICKEN PEPPERONI",
            payload: "CHICKEN PEPPERONI"
        }]
    };
    var TROPICAL_CHICKEN = {
        title: "TROPICAL CHICKEN",
        subtitle: "Sliced chicken rolls and pineapples accompanied by tomato pizza sauce.",
        item_url: "https://en.wikipedia.org/wiki/Pizza",
        image_url: "http://www.phdelivery.com.my/i/menu/pizza/pizza_tropicalchicken.jpg",
        buttons: [/*{
         type: "web_url",
         url: "https://en.wikipedia.org/wiki/Pizza",
         title: "Open Web URL"
         },*/ {
            type: "postback",
            title: "Show TROPICAL CHICKEN",
            payload: "TROPICAL CHICKEN"
        }]
    };
    var SPICY_TUNA = {
        title: "SPICY TUNA",
        subtitle: "Tuna and onion on a sambal sauce.",
        item_url: "https://en.wikipedia.org/wiki/Pizza",
        image_url: "http://www.phdelivery.com.my/i/menu/pizza/pizza_spicytuna.jpg",
        buttons: [/*{
         type: "web_url",
         url: "https://en.wikipedia.org/wiki/Pizza",
         title: "Open Web URL"
         },*/ {
            type: "postback",
            title: "Show SPICY TUNA",
            payload: "SPICY TUNA"
        }]
    };

    try {
        var data = JSONbig.parse(req.body);
        //console.log(data);
        switch(data.result.action){
            //check for intent action from requeset
            case 'show_pizza':
                //check if we receive parameters from intent
                if(isDefined(data.result.parameters['pizza_type']) == true){
                    switch(data.result.parameters.pizza_type){
                        case 'HAWAIIAN CHICKEN':
                            //customizing formated message template
                            generic_message.attachment.payload.elements = [];
                            generic_message.attachment.payload.elements.push(HAWAIIAN_CHICKEN);
                            generic_message.attachment.payload.elements[0].buttons[0].title = 'Go back';
                            generic_message.attachment.payload.elements[0].buttons[0].payload = 'pizza';
                            break;
                        case 'CHICKEN PEPPERONI':
                            generic_message.attachment.payload.elements = [];
                            generic_message.attachment.payload.elements.push(CHICKEN_PEPPERONI);
                            generic_message.attachment.payload.elements[0].buttons[0].title = 'Go back';
                            generic_message.attachment.payload.elements[0].buttons[0].payload = 'pizza';
                            break;
                        case 'TROPICAL CHICKEN':
                            generic_message.attachment.payload.elements = [];
                            generic_message.attachment.payload.elements.push(TROPICAL_CHICKEN);
                            generic_message.attachment.payload.elements[0].buttons[0].title = 'Go back';
                            generic_message.attachment.payload.elements[0].buttons[0].payload = 'pizza';
                            break;
                        case 'SPICY TUNA':
                            generic_message.attachment.payload.elements = [];
                            generic_message.attachment.payload.elements.push(SPICY_TUNA);
                            generic_message.attachment.payload.elements[0].buttons[0].title = 'Go back';
                            generic_message.attachment.payload.elements[0].buttons[0].payload = 'pizza';
                            break;
                    }
                } else {
                    //if we have no parameter in received query, send full template
                    generic_message.attachment.payload.elements.push(HAWAIIAN_CHICKEN, CHICKEN_PEPPERONI, TROPICAL_CHICKEN, SPICY_TUNA);
                }
            break;
        }
		return res.status(200).json({
			data: {
				facebook: generic_message
			}
		});
    } catch (err) {
        return res.status(400).json({
            status: "error",
            error: err
        });
    }
});

app.listen(REST_PORT, () => {
    console.log('Rest service ready on port ' + REST_PORT);
});