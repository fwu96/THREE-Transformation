# README file for Workbook (Assignment) 7

It is the student's responsibility to fill this in.
See <https://graphics.cs.wisc.edu/WP/cs559-sp2019/workbooks/#README_files>

## please answer these first three required questions "inline" (as in the instructions)

Name: Feifan Wu

WiscID: fwu62

GitHub Login: fwu96

## please answer these next (optional) questions on a line following the questions

Attributions:

Parts of the Assignment you did (or did not) do:

Did you do any bonus parts?

Notes to the Grader:
- Airplanes
    - I made two same shaped airplanes (with different size and color)
    - Each of them have four baldes which are rotating on their own center
    - Both of them are moving in a circle but with different speeds
    - There are two radars on the plane track two airplanes' moving
    - There is a sphere geomerty on each radar which should be seen obviously that pointing to its target airplane
    - I add two spotlights for each airplane, which are following them when they are moving
- Carousel
    - Following the requirements that I add another swing and the carousel to the park
    - I change the size and relocated them
    - I add horses on the poles, for the shape of horse, there is a function at the bottom of `parkobjects.js`
    - In the function of shape of horse, I use an simple array of colors to make random color of the materials, so each time load / refresh the website, those ten horses should appears different colors
    - Similar to the colors, each horses' y position is randomly chosen to located them on the poles, so if there is no animation, each time load / refresh the webpage those horses would located at different height (even though the difference might be tiny)
    - When the poles rotates in a circle, each horse will also move upside-down
        - Based on my experience in reality from my childhood, those horses do not have a regular speed and order of their movements. Sometimes a horse might stay at a heigh for a while but sometimes it will go down / up immediatly when hitting some height
        - Therefore, I make those horses move with "ramdonly" speed, also each of them will begin to move starting from each own y position
        - That is, you might can notice that some horses might change the moving speed (of upside-down) during the spinning, and those ten horses are not moving in a same way
- Construction
    - I add a backhoe to the world
    - The backhoe made up by a base, a body (can be thought as driver room), a front-dozer, and an arm (have front arm and a dozer)
    - The sliders control the transition of different parts of the construction
        - slider `x` change the x position of the whole backhoe
        - silder `z` change the z position of the whole backhoe
        - slider `theta` rotate the whole backhoe around y
        - slider `spin` rotate the "driver room" (the body) around y
        - slider `front dozer rotate` rotate the front-dozer at the "front" (or at the left at the beginning without any translations)
        - slider `back arm rotate` rotate the whole arm at back (or right at the beginning)
        - slider `back forearm rotate` rotate the whole forearm
        - slider `back bucket rotate` rotate only the bucket which attach the arm