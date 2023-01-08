import time
import requests
import urllib.parse

finalx = 0
finaly = 0
finalz = 0


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

  def match(x, y):

    def null(x):
      if x == "":
        x = None

    #if remove(str(null(x)).lower()) == remove(str(null(y)).lower()):
    if x == y:
      return "1"
    else:
      return "0"

  try:
    result += match(x["author"][0]["given"], y["author"][0]["given"])
  except:
    result += "2"
  try:
    result += match(x["author"][0]["literal"], y["author"][0]["family"])
  except:
    result += "2"
  try:
    result += match(x["title"], y["title"])
  except:
    result += "2"
  try:
    result += match(x["containerTitle"], y["container-title"])
  except:
    result += "2"
  try:
    result += match(x["issued"]["year"], y["issued"]["date-parts"][0][0])
  except:
    result += "2"
  try:
    result += match(x["issued"]["month"], y["issued"]["date-parts"][0][1])
  except:
    result += "2"
  try:
    result += match(x["issued"]["day"], y["issued"]["date-parts"][0][2])
  except:
    result = result + "2"
  print(result)
  x = result.count("0")
  z = result.count("1")
  global finalx
  finalx += x
  global finalz
  finalz += z
  print(x)
  # send(x)


def save(y):
  file = open("save.txt", "a")
  file.write(y + "\n")
  file.close()
  # print('case-3')

# NUM_TIMES is number of wikipedia articles to scrape (on average 1 article equals 10 citations)
for z in range(NUM_TIMES):
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
            finaly += 1
          except:
            print("Invalid Website")
            # print(link);
          time.sleep(1)
  except:
    print("Invalid Wiki")

completeStr = str(finalx) + "-" + str(finalz) + "-" + str(finaly * 7)
save(completeStr)
print("complete")
