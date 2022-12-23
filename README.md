PROJECT 3 - Bee Colonies and Honey Production and Sales
    
    contributors: Niurika Gonzalez, Jack Elsbrock, Kyle Hunstein, Hannah Kim

OVERVIEW:

    *The purpose of this project is to find a data source and transform it into a live website with visualizations using Python Flask API, HTML/CSS, Javascript & a database. The subject our group decided to focus on is bee farming; more specifically how the production and cost of honey has changed over the past two decades, and the number of bee colonies across the U.S.  

DATA EXTRACTION:

    *Our search for data ended with us using the USDA source listed at the bottom of this page. We were able to use the 'Quick Stats' link on their page to clean and download our data to a CSV. Once we had the CSV we pulled it into pandas to further clean the data and upload the result to pgAdmin to create a SQL database.

VISUALIZATION:

    *The deliverable was to create a dashboard on a live webpage. Our interactive elements include a dropdown that changes both the line and graph charts based on the state chosen by the user and an interactive color map. The line graph shows selling price per year of honey. The bar graph shows honey production per year. Finally, the map show number of colonies per state.   

CODE OVERVIEW:

    -We set up our default page with an init funciton to show a bar graph and line graph with Alabama data when the page first runs.
    
    -Line and bar graphs were set up in two separate functions. Additionally, another function was created so that you can view different state data by selecting the  state from a dropdown menu set in alphabetical order.

    -In regards to the map, a function was created to display states in different colors depending on number of honey bee colonies.

    -Flask app was created to render the webpage locally. 


SOME OBSERVATIONS OUR GROUP MADE:

    -Generally, price increases over the time of the survey (2000 - 2021). In almost every state, the selling price of honey in 2021 was over double of the selling price in 2000.

    -There is no observable trend in production volume over time. We assume this is because the production of honey depends solely on the behavior of bees and they are at the mercy of weather, predators and inconsistencies in their food supply, amongst many other factors that largely can't be controlled by bee farmers.

    -According to our map, bee colonies are concentrated more in the northern states that border Canada compared to any other region in the US. Standalone states (California, Texas, Florida) show similar numbers to some states within the northern region. However, as a whole the northern US states are more densely populated with bee colonies.

    -There is a relatively strong inverse correlation between the amount of honey produced and the selling price of honey. For a majority of the years in our data, if the amount of honey produced decreased compared to the previous year, the price would go up (and visa versa). This trend appears to be mostly true regardless of the state.

CONSIDERATIONS AND FUTURE DEVELOPMENT:

    -Further analysis could include anding another dropdown menu for the map that could allow the user to view and compare colony data of multiple years rather than only 2021.

    -With more time we would have rendered our data with flask rather than simply loading it from a csv. 

Source: USDA
https://www.nass.usda.gov/Surveys/Guide_to_NASS_Surveys/Bee_and_Honey/index.php


