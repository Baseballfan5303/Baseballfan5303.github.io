5/28/21

Hello readers!

Sorry it has been so long since I posted last. May was very busy.

This is honestly the first post that truly encapsulates what I will be
using this blog for: merging sports and computer science. Today we will
look into the hot topic of baseball stats and not only how they are
calculated, but more importantly, how they can be calculated with
efficiency. Let\'s just say it is not enjoyable to manually calculate
some baseball stats, but we can do so automatically using Python
programming and existing data available on the Internet!

Here we go! Let\'s outline the steps necessary to become an automated
baseball statistician.\

1.  Set up a workspace to use our data as input into a program
2.  Collect existing baseball data (we will be using data from the 2019
    MLB Season found
    on [https://www.baseball-reference.com/](https://www.baseball-reference.com/)
3.  Find formulas to calculate our desired stats\
4.  Create a program that reads our data (input) and calculates then
    outputs our desired stats

**Setup a workspace**

Whenever I work with programming like we will doing today, I always work
in Visual Studio Code (VSC). Much like its friend Visual Studio
developed by the same company, Microsoft, VSC specializes in coding and
even has really good development and extension features. I recommend
downloading it to make a workspace where our data is easily
accessible: [https://code.visualstudio.com/Download](https://code.visualstudio.com/Download).

Once you have downloaded VSC, if you do not have Python installed
already, please use this link to download its
software: [https://www.python.org/downloads](https://www.python.org/downloads).
I recommend downloading the latest version available. If you are unsure,
just download a 3.7 or 3.8 version.

Create a folder on your computer for this project and if you right-click
on it, you should get the option to \"Open with Code\". Click on this to
see your folder open in VSC\'s folder explorer on the left-hand side.
You will want to make 2 new files right away in this folder.

1.  batter\_data.csv
2.  pitcher\_data.csv

Click the \"New File\" button next to the folder name to create a new
file. This folder will eventually have 6 files total: two more .csv and
two .py files from GitHub.\

::: {.tss_actions}
:::

**Collect existing baseball data**

For this article and teaching purposes, I will be using two sets of
customized data from Baseball Reference. These are the two sets:

-   2019 MLB Standard Batting
    Stats: [https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml](https://www.baseball-reference.com/leagues/MLB/2019-standard-batting.shtml)
-   2019 MLB Standard Pitching
    Stats: [https://www.baseball-reference.com/leagues/MLB/2019-standard-pitching.shtml](https://www.baseball-reference.com/leagues/MLB/2019-standard-pitching.shtml)

I used these two data sets and customized them for the purpose of this
article. I did so by clicking the \"Share & Export\" dropdown menu and
choosing \"Modify, Export & Share Table\". This allowed me to exclude^1^
certain columns so that we could manually calculate the stats. To make
this data usable for our Python program, we must use the same dropdown
to choose \"Get table as CSV\". Once the table converts to a text format
on the website, copy and paste all 1000+ rows into the .csv we created
in the section above based on which table you collected from. The batter
data from Baseball Reference goes into the batter\_data.csv file and the
same with the pitcher data.

Good job! You just learned how to do simple data collection. Note that
if want to present this data in any form to reference the source you got
it from. This applies to anything you find on the Internet!

For this article, I changed some things up so that your program only
analyzes around 10 players at a time instead of all 1,000.  You can
download those \"partial data\" .csv files I used through my
GitHub: [https://github.com/Baseballfan5303/VS-BlogWebsite/tree/main/BlogArticles/AutomatedBaseballStats](https://github.com/Baseballfan5303/VS-BlogWebsite/tree/main/BlogArticles/AutomatedBaseballStats).
Using only a part of the large dataset allows testing the Python program
to be quicker and easier.

**Finding formulas**

Before we go through the code, we need to find the formulas to calculate
our desired stats. The website we will use for this is Fangraphs
([https://library.fangraphs.com/](https://library.fangraphs.com/)).
Use the search bar to type in each stat in order to find the proper
formula to use.

**Creating the program**

I have added the code to both the batter and pitcher stat programs in
the same GitHub location as above. Please feel free to download the .py
files and use/test with them; you will want to save the Python files in
the same folder you created in step 1 and added the .csv files to. You
might be wondering how I came up with this program what each section of
the program means, and what we are getting as output. Well, let me
explain.

Batting Stats:

-   We want to find batting average (AVG), on-base percentage (OBP),
    slugging percentage (SLG), on-base + slugging (OPS), batting average
    on balls in play (BABIP), total bases (TB), and isolated power
    (ISO).
-   First, we *import csv* so we can read a .csv file.
-   We then define our variables which are the stats we want to find.
    *singles* is a global variable because we need to calculate this
    stat for TB.
-   The *playerStats* array contains each batter\'s stats as we iterate
    through our .csv rows. Each index value of the array represents a
    stat column.
-   The function *open(file, mode)* in Line 22 allows use to read our
    partial data .csv file. Make sure the file we are opening is the
    \"batter\_partial\_data.csv\"!
-   Line 23 sets *myData* as the .csv reader; *myData* represents the
    rows of the sheet.
-   Line 24 starts our for loop iteration through the rows of the sheet.
    The *playerStats* array becomes *rw* in Line 26.
-   Lines 29-37 set the variables our formulas require by referencing an
    index value of *playerStats* based on the column headers in the csv.
    For example, *ab = int(playerStats\[7\])* means at bats = the
    integer value of the 8th column in this row of data.
-   In lines 40-50, we perform our calculations. Setting our variables
    in Lines 29-37 allow us to change index values for our formulas in
    only one place, instead of multiple.
-   For batters, decimal stats are rounded to three decimal places,
    hence the *round(\...,3)* function being used.
-   Line 53 prints the batter\'s name in the row we are currently
    iterating through.
-   Lines 54-60 print the batter\'s stats.

Pitching Stats (anything listed as explaining the pitching stats program
differs from the batting stats program):

-   We want to find earned run average (ERA), adjusted earned run
    average (ERA+), fielding independent pitching (FIP), walks + hits
    per inning (WHIP).
-   When defining our variables, we need the league ERA in
    2019, *lg\_era* (4.49 in 2019), for ERA+ and a constant for the FIP
    formula, *fip\_const* (generally 3.1).
-   Be sure to use the \"pitcher\_partial\_data.csv\" file in line 20!
-   Notice that we are getting different variables and index values in
    lines 27-33. This is because the formulas for our desired pitching
    stats are different from the batting stats.

------------------------------------------------------------------------

Voila! You have now become an automated baseball statistician! We used
data in the form of a .csv, ran it through a Python program, and got
desired statistics outputted!

I encourage you to play around with different sets of data, try to
calculate even more stats, and even try to repeat this process for
another sport! Remember to manually change the file being read in each
program and any constants that might change from year to year.

Good luck with your data collecting and programming!

***-Andrew***

------------------------------------------------------------------------

^1^ Excluded from batter data I collected: AVG, OBP, SLG, TB; Excluded
from pitcher data I collected: ERA, ERA+, FIP, WHIP
