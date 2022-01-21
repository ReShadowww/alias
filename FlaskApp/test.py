import json
import random

with open("lt-alias-picked.json", "r", encoding="UTF-8") as fin:
    words = json.load(fin)
    total_words = len(words)


def gen_card():
    random_index = random.randint(0, total_words - 1)
    random_word = words[random_index]["zodis"]
    return random_word


p = 0
for word in words:
    c = len(word["zodis"])
    if c > p:
        p = c

print(p)