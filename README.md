# Imasse Citation Generator Accuracy Test

![GitHub manifest version](https://img.shields.io/github/manifest-json/v/imasse-dev/imasse-extension.svg?style=flat-square) 

Imasse's Browser Extension and Imasse's Citation Generator Accuracy Test is distributed under the Mozilla Public License 2.0 [License](LICENSE)

## Start Test
- To start test run crawler.py

## Read Test Result
Connect to RaspberryPi
```ssh emily@emily.local```

Cd into directory with crawler.py file
```cd /Desktop```

Check to make sure test is complete
```tail -f nohup.out```
- This should show the text "completed" (if this text does not display do not continue with the next steps).

Check test results
```tail -f save.txt```
- This will display a text file with 3 sections of numbers each line that are divided by hyphens
 - First section: # of 0's
 - Second section: # of 2's
 - Third section: # of trial's
- Look at the bottom line and write down the values

You can now type exit to close the SSH connection
