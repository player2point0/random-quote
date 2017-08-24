$(document).ready(function()
{
	//Default text
	var quote_text = "You have part of my attention. You have the minimum amount.";
	var quote_author = "Mark Zuckerberg";
	var image_source = "";
	var image_link = "";
	var photographer = "";
	var utm = "?utm_source=random-quote-generator&utm_medium=referral&utm_campaign=api-credit";


	//Forismatic API
	function newQuote()
	{
		$.ajax({//api request data
			url: "//api.forismatic.com/api/1.0/",
			jsonp: "jsonp",
			dataType: "jsonp",
			data: {
				method: "getQuote",
				lang: "en",
				format: "jsonp"
			},

			success: function(response)
			{//set text
				quote_text = response.quoteText;
				quote_author = response.quoteAuthor;

				changeQuote();
			},

			error: function()
			{//If an error occurs reset text
				quote_text = "You have part of my attention. You have the minimum amount.";
				quote_author = "Mark Zuckerberg";
				changeQuote();
			},

			complete: function(){
				newImage();//calls the new image function after the function has finished
			}
		});
	}

	//change the quote author and text
	function changeQuote()
	{
		$(".quote-text").text(quote_text);
		$(".quote-author").text(quote_author);
	}

	//Unsplash API
	function newImage()
	{
		$.ajax({
			url: "https://api.unsplash.com/search/photos?",
			"Accept-Version": "v1",
			data: {
				query: quoteKeyword(),
				client_id: "498442b90b9924c3a015f1bd1e3ac0669304df4e06fad7edc5bd55a70387b6a1",
			},

			success: function(response)
			{//set image
				console.log(response);
				image_source = response.results[0].links.download;
				image_link = response.results[0].links.html + utm;
				photographer = response.results[0].user.name;
				changeImage();
			},

			error: function()
			{//If an error occours set to default
				image_link = "https://unsplash.com/search/photos/attention?photo=6hWNyGeQXRk" + utm;
				photographer = "Alice Donovan Rouse";
				image_source = "Temp-min.jpeg";
				changeImage();
			}
		});
	}

	//Find a random image
	function randomImage()
	{
		console.log("random");
	}

	//changes image and photographer
	function changeImage()
	{
		var link = "url("+image_source+")";

		$("html").css("background", link);
		$("html").css("background-size", "cover");
		$(".photographer").text(photographer);
		$(".photographer").attr("href",image_link);
	}

	//returns longest word for finding image
	function quoteKeyword()
	{
		//Could use RegEx to split up string and remove any non letters
		var output = "";
		var words = quote_text.split(' ');

		for(var i = 0;i< words.length;i++)
		{
			if(words[i].length > output.length)
				{
					output = words[i];
				}
		}

		console.log(output);

		return output;
	}

	newQuote();

	$(".new-btn").click(function(){
		newQuote();
	});

	$(".twitter-btn").click(function(){
		window.open("https://twitter.com/intent/tweet?text="+quote_text+" -"+quote_author);
	})

});
