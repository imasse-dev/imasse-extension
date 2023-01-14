import time
import requests
import urllib.parse

finala = 0
finalb = 0
finalc = 0
finald = 0
finale = 0
finalf = 0
finalg = 0
finalt = 0

def remove(x):
  return x.replace(" ", "")


def fetch(x, y):
  au = "https://api.imasse.com/citations/search?q=" + x
  a = requests.get(url=au)
  a = a.json()
  bu = "https://autocite.citation-api.com/api/v3/query?url=" + y
  b = requests.get(url=bu)
  b = b.json()
  b = b["results"][0]["csl"]
  check(a, b)


def check(x, y):
  result = ""

  def match(x, y, z):

    def null(x):
      if x == "":
        x = None
    if x == y:
      return "0"
    else:
      return z

  try:
    result += match(x["author"][0]["given"], y["author"][0]["given"], "1")
  except:
    result += "0"
  try:
    result += match(x["author"][0]["family"], y["author"][0]["family"], "2")
  except:
    result += "0"
  try:
    result += match(x["title"], y["title"], "3")
  except:
    result += "0"
  try:
    result += match(x["containerTitle"], y["container-title"], "4")
  except:
    result += "0"
  try:
    result += match(str(x["issued"]["year"]), y["issued"]["date-parts"][0][0], "5")
  except:
    result += "0"
  try:
    if (y["issued"]["date-parts"][0][1])[0] == "0":
      result += match(str(x["issued"]["month"]), (y["issued"]["date-parts"][0][1])[1:],"6")
    else:
      result += match(str(x["issued"]["month"]), y["issued"]["date-parts"][0][1], "6")
  except:
    result += "0"
  try:
    if (y["issued"]["date-parts"][0][2])[0] == "0":
      result += match(x["issued"]["day"], y["issued"]["date-parts"][0][2], "7")
    else:
      result += match(str(x["issued"]["day"]), y["issued"]["date-parts"][0][2], "7")
  except:
    result = result + "0"
  a = result.count("1")
  b = result.count("2")
  c = result.count("3")
  d = result.count("4")
  e = result.count("5")
  f = result.count("6")
  g = result.count("7")

  global finala
  finala += a
  global finalb
  finalb += b
  global finalc
  finalc += c
  global finald
  finald += d
  global finale
  finale += e
  global finalf
  finalf += f
  global finalg
  finalg += g
  
def save(y):
  file = open("save.txt", "a")
  file.write(y + "\n")
  file.close()
  
for z in range(1):
  try:
    wi = "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extlinks&format=json"
    w = requests.get(url=wi)
    w = w.json()
    for i in w["query"]["pages"]:
      for j in w["query"]["pages"][i]["extlinks"]:
        link = (str(j))[7:len(str(j)) - 2]
        if link[0:7] == "http://" or link[0:8] == "https://":
          linkEncoded = urllib.parse.quote(link, safe="")
          try:
            fetch(linkEncoded, link)
            finalt += 1
          except:
            print("Invalid Website")
          time.sleep(1)
  except:
    print("Invalid Wiki")
completeStr = str(finala) + "-" + str(finalb) + "-" + str(finalc) + "-" + str(finald) + "-" + str(finale) + "-" + str(finalf) + "-" + str(finalg) + "-" + str(finalt * 7)
save(completeStr)
print("Complete")
