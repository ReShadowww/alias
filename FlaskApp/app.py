from flask import Flask, render_template, url_for, request, jsonify
import json
import random

app = Flask(__name__)

with open("lt-alias-picked.json", "r", encoding="UTF-8") as fin:
    words = json.load(fin)

@app.route('/')
def index():
    return render_template("index.html")


@app.route('/_new_card')
def add_numbers():
    return jsonify(gen_cards())


def gen_cards():
    cards = []
    i = 1
    while i < 9:
        rand = random.randint(0, len(words) - 1)
        if words[rand]["kalbos_dalis"] and int(words[rand]["pavartojimo_daznis"]) > 2:
            cards.append(words[rand]["zodis"].capitalize())
            i += 1
    return cards

if __name__ == "__main__":
    app.run(debug=True)
