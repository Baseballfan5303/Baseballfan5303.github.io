1/12/22 (\*Work in progress\*)

Hello readers! Long time no see.

After taking a long break dealing with more pressing matters, I finally
found the time to work on the things I now really love doing, working on
computer science projects such as this one. While I have been working on
improving this site of mine, I also created a brand-new web site, an
interactive web application which deals with machine learning and Major
League Baseball. The name of the web site is [Predicting MLB Teams\'
Success](https://predictingmlbteamssuccess.azurewebsites.net/). This
article will dive into my reasonings for making this project, the
process I underwent to create it, and my final thoughts.

**Why did I make this project?**

As I am now on a nice break and wanted something to re-kickstart my work
in the field of computer science, I chose to set out on a quest to find
a better format for creating websites using my favorite software, Visual
Studio. With the 2022 edition out and the creation of .NET 6.0
(basically 5.0 with long-term support), I decided that learning a new
method for web development would be the best bang-for-my-buck to
relearn. In my quest, I discovered Blazor, a Microsoft-based web
framework that uses C\# and HTML coding to create pages and components
for a rich user interface (Microsoft). So, now that I found a
development platform, I needed an idea. As you may have seen from some
of my earlier posts, I have a fascination with the MLB and baseball as a
whole. When I was introduced to machine learning and Visual Studio\'s
Model Builder using ML.NET, I started looking for ways to take baseball
data and generate model to make accurate predictions. My first true
attempt to use machine learning with baseball data was to analyze 2021
MLB umpire\'s performance to determine if the home or away team would be
favored in a given game. Even though I had created a structured and
interactive C\# console app to accommodate my data, I realized in the
end that the model was only guessing its predictions. Since the
r-squared value on the dataset was around 0, there was no correlation in
the data and so any prediction the model made could not have been
accurate. 

Well, time passed, and my next idea sparked. I would attempt to predict
how many games a team wins in a season based on a team\'s total Wins
Above Replacement (WAR) statistic. WAR measures how much better or worse
a player is than their replacement, or in other words, a player\'s total
contributions to their team (The Stadium Reviews & Fangraphs). Yes, WAR,
might not be the most accurate stat for measuring how good a player is,
yet combining every player on a team\'s WAR stat does have adequate
correlation with success. For any MLB team, success can be measured in
several ways, whether this is making the playoffs, winning the World
Series, or just getting positive results even when rebuilding. However,
for me, success for a team comes from how many wins they will achieve. I
hope this project will allow users to learn how well their favorite team
might do based on how good their players are.

**The process of making this project**

When I first started working with machine learning and baseball data, my
goal was always for there to be an interactive application for users to
gain insight through prediction. My umpire performance model was
unavoidably unusable because of the dataset, so I turned my attention
over to predicting wins. My initial idea for this projects\' purpose was
to \"Use historical MLB team win and WAR data to predict any MLB team\'s
win total based on projected/actual total team WAR.\" So, the process of
making this project began desiring a simple console app which would
simulate individual teams\' seasons for projections or simulate entire
MLB seasons based on projected WAR. Additionally, three main variables
were potent in using my data and model
together: *knownWins*, *expectedWins*, and *knownWAR*. And of course,
to understand the data I used, I went to
[Baseball-Reference](https://www.baseball-reference.com/leagues/team_compare.cgi?request=1&year=2021&lg=MLB&stat=WAR)
and manually entered each team\'s total WAR data from the years
2006-2021, excluding 2020. I chose this particular set of data because
MLB experts have labelled this time period as the \"post-stereoid\" era.
I assume most users will use this website to make future predictions for
their team, rather than try to rethink the past, so I wanted results to
be as realistic to today\'s era of baseball as possible. In addition, I
excluded the 2020 MLB season because each team only played 60 games,
which could create confounding results. I already had prior experience
working with ML.NET and C\# Console Apps, so this intro phase did not
take very long for me, and I then quickly turned to the more difficult
part of the process: converting my idea into a website. 

Instead of using ASP.NET Core 2.1 like I did for building this blog (it
is now out of support), I took the time to learn Blazor Server, the
framework I mentioned above.

\[To be continued\]

***-Andrew***
